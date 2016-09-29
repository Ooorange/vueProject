/**
 * Created by orange on 16/9/28.
 *
 * 浏览器,微信,Native app端的入口代理
 * es6:Class内部只有静态方法，没有静态属性。
 */
import env from '../env';
import Promise from 'pinkie-promise';

const readyPromise = new Promise((resolve, reject) => {

});
//js 调用java
function callNative(name, data) {
  return readyPromise.then(() => {
    if (env.isAPP) {
        // 是移动端
    } else if (env.isWeixin) {
        // 微信
    } else {
        // 浏览器
    }
  });
}

export default class Native {
  static getTokenAndKey({ needLogin = true} = {needLogin: true}) {
    return callNative.apply('getTokenAndKey', { needLogin })
      .then((result) => {
        if (needLogin && !result.token) {
          throw new Error('用户未登录');
        }
        return result;
      });
  }
  static invalidToken() {
    return ;
  }
}
