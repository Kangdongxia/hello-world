let baseUrl = ""; //这里是一个默认的url，可以没有
switch (process.env.NODE_ENV) {
  case "development":
    baseUrl = "https://www.myxygene.com/xyblog"; //这里是本地的请求url
    //baseUrl = "https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"; //这里是本地的请求url
    break;
  case "alpha": // 注意这里的名字要和步骤二中设置的环境名字对应起来
    baseUrl = "http://www.cnblogs.com/XHappyness/"; //这里是测试环境中的url
    break;
  case "production":
    baseUrl = "https://www.myxygene.com/xyblog"; //生产环境url
    break;
}

export default baseUrl;
