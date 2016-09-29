/**
 * Created by orange on 16/9/28.
 */
const userAgent = window.navigator.userAgent;
const env ={
  isWeixin: /micromessenger/i.test(userAgent),
  isAndroid: /android/i.test(userAgent),
  isAlipayClient: /alipaydefined/i.test(userAgent),
  isIOS: /iPad|iPhone|iPod/.test(userAgent),
  isAPP: false,
  appVersion: 'oldVersion',
};

function extractApp() {
  const matches = userAgent.match(/\b\s*app=carKey(?:,\s*version=([\d\.]+))*/i);
  if (matches) {
    env.isAndroid = true;
    env.isAPP = true;
    env.appVersion = matches[1];
    if (!env.appVersion) {
      env.appVersion = 'oldversion';
    }
  }
}

extractApp();

export default userAgent;
