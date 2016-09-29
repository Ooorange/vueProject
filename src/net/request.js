/**
 * Created by orange on 16/9/27.
 */
import Vue from 'vue';
import Promise from 'pinkie-promise';
import APIConst from '../const/APIConst';
import Native from '../utils/NativeProxy/Native';

const CODE_MAPS = {
  101: '系统错误',
  102: '缺少参数',
  103: 'invalid token',
  104: '非法参数',
  801: '手机号无效',
  803: '老用户',
  901: 'go back',
};

function loginVerify(data, needLogin) {
  return new Promise((resolve, reject) => {
    if (needLogin) {
      Native.getTokenAndKey().then((auth) => {
        const encodeData = {};
        encodeData.token = auth.token;
        resolve(encodeData);
      }, reject);
    } else {
      resolve(data);
    }
  });
}

function base(type, data, option, needLogin) {
  return new Promise((resolve, reject) => {
    const requsetData = Object.assign({
      version: APP_VERSION,
    }, data);
    let action = requsetData.action || '';
    const requestOption = Object.assign({
      headers: {
        // 服务端没有设置allow-headers
      },
      timeout: 0,
      beforeSend(request) {
        const req = request;
        req.headers = {
          'Content-Type': 'text/plain;charset=utf-8',
        };
      },
    }, option);

    loginVerify(data, needLogin).then((encodeData) => {
      let apiServer = requestOption;
      if (action === 'user.account.sendCode' || action === 'user.account.login') {
        apiServer = APIConst.AUTH_API;
      }
      Vue.http[type](`${apiServer}?${action}`, JSON.stringify(encodeData), requestOption).then((response) => {
        const responseData = response.data;
        const code = response.code;
        if (code === 0) {
          resolve(responseData);
        } else if (code === 103) {
          Native.invalidToken().then(() => {
            // 登陆信息失效
            Native.reload();
          })
        } else {
          let msg = responseData.msg;
          let codeMsg = CODE_MAPS[code];
          if (!codeMsg) {
            codeMsg = `unknow code ${code}!`;
          }
          msg = msg || codeMsg;

          reject({
            message: msg,
            response: res,
            error: true,
          });
        }
      })
        .catch((err => {
          reject({
            message: `${err.status}:${err.statusText || '网络错误'}`,
            response: err,
            error: true,
          });
        }));
    }, reject)
  });
}

export default class Request {
  static post(data, options, needLogin) {
    return base('post', data, options, needLogin);
  }

  static get(data, options) {
    return base('get', data, options);
  }
}
