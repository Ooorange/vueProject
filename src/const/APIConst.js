/**
 * Created by orange on 16/9/28.
 */

let APIConst = {};

if (process.env.NODE_ENV === 'pro') {

} else if (process.env.NODE_ENV === 'uat') {

} else if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'dev') {
  APIConst.API = 'http://test.orange.com/api';
  APIConst.AUTH_API = 'http://testorange.com/auth';
}

export default APIConst;

