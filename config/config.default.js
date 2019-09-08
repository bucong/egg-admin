'use strict';
const path = require('path');

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1535608252642_8210';

  config.session = {
    key: 'SESSION_ID',
    maxAge: 3600000, // 过期时间
    httpOnly: true, // 只有服务端可访问
    encrypt: true, // 加密
    renew: true // 延长回话周期
  }

  // add your config here
  config.middleware = ['adminauth', 'compress'];
  config.adminauth = {
    match: '/admin'
  }

  //配置nunjucks模板引擎，使用.html文件
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.html': 'nunjucks',
    }
  };
  
  //设置监听端口
  config.cluster = {
    listen: {
      path: '',
      port: 3000,
      hostname: '0.0.0.0',
    }
  };

  //跨域配置
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: false
    },
    domainWhiteList: ['http://127.0.0.1:8080'], //白名单
  };
  
  config.cors = {
    // origin: '*', //允许所有跨域访问，关闭则允许白名单访问
    credentials: true, // 允许跨域请求携带cookies
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };
  
  // 配置表单可提交数量
  config.multipart = {
    fields: '50',
  };

  //配置数据库
  config.mysql = {
    client: {
      // host: 'localhost',
      host: '47.100.51.191',
      port: '3306',
      user: 'root',
      password: 'Bucong0934',
      database: 'eggadmin',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  // redis配置
  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: '', 
      db: 0
    }, 
  }
  
  // QQ登录参数
  config.qqOptions = {
    client_id: '101479867',
    client_secret: '053cf1fc1b4a07f339ff213665d5523f'
  }

  // 手机验证码key
  config.phoneOptions = {
    apikey: '62c24eee15f35061421cb0e0beca9e0a'
  }

  // 支付宝配置参数
  config.alipayOptions = {
    app_id: '2018122062672017',     
    appPrivKeyFile: "MIIEowIBAAKCAQEAytRAWUJE+t7Xg62PFPpwCxaIBwO942bZX2ehlHbdLSs0i1H3xHlIGTF/0pAYksLuXq8ovyGW263MqvAjt5n97JPjD1ip9eFuIZhZ2wbrOac+MerE+x7agDOBgmJGwdffxbGRRkjz/OtwrIfIVf7TcAm/MPSAuD3RAIkvVXzQO16x6BnBnev1JR+HybeyUssMCk1y6JZ2pZ4H62gGKGvDQcV8NW0q7g4qu2CwQKMVhbnMpG/wRuIla/MOB9MPZiV4CINsxNGya5mmzkXTemjheRl9me6dEZEgKU+tcgTH5Y36faRphbQQ9ATAt3EZQXw4gkoO9vHyEsf7mAAOofQyVQIDAQABAoIBAG+PpUEzKRvPnDyqJuwD/8KphvJMxZIhjOhj6MTvSCJDBGipEh24E8b/qe3YIhv/KftcXo4aXI7CHrPa19px0e/hO9/CBeHfN6M02B+Xw6P3cEcmeWgihU5EhjR/96lBIqzrSRuensz7dwL+wFtEiWmzgrzbjz1HiwC/dBCSUTqFlT7+M+xx8N6w3gQbZ8bpW33XY4KB26C5G8/g6ImEMUbNez8p+24qVztszHWfDHmGJp//Z4g6dgyd2RNrNZdzCyNmlsFRYRXgKa1WbC7qi2ihPUMmYLhlD5OFwZkGbk7bPy+GTYfAK6JjHRjONtdcE06pVFPUMlr7OL96MsABt1UCgYEA8YEPuvbE0Y4i+YlHrYxJ8iJ8WceWL1mNp6QFG6cNQ06+ohPhVVjEdKSFLQIz03aRGQI+E6Kuki5JVwlUeUmqJM1LJxA7NEm9b+YNQG+Y/23FcYAbuaiJp22qpo45XNLSs6QoKcqyJkZwM/Niv07mLP907PSt6WzM4a10vVs+pu8CgYEA1wDpWdxPpUsVfggCrfel6DveLzHvtX4DWPbL9NXj2j39B6Y0+1BuHMw5WZ/GoZxC0Gi/buuspwaqws9HiGg5ttMJqz23YOKUwHkpZrIpZjyVAjDoRduKcaX3q4/NCs5CPzWoGjfcJXoxcoZuYos5/kg+tXhmsH/DA0jmTfyR2vsCgYATZ71t1npGJFenGWLLDSS78g1v4Vut/lIlkEZgzHGCYQdsWpCWnQVcIgQZc73aVgKesdFvHnlMga+e8L765/Jl9qD9SI6ZSvuPzDpwXQc8LwPYdOTFbEdzTpqRu4fcb4xCpwQbJ5BdBvfpFLtwh9Ry9SveBmMbCIUF9TwWIwjLvQKBgFcQpG5iO9J4zFREFCm0rneTvs6nzyVUyTA+iKs17lYTYiK12KComl6JCPRVMk+BgsD4mgTl5P2iQoYvAA2p/y0c2r6AeIEAYDJtHinbHc6r27+OZJDdbXvGNLxBuEuW6NbF+LPdSQXYLKvu6kZ3kN17DgHYpuT0Z9ktrS2JiNr/AoGBAMBMG/25ioZMVuMFL2D1NqW221NLGMnHtFSATT1o6XGNEd5/PABCei7l2KSSrv93wyXllnk6cVauSn32zmKNWC0i6Ei89wYIUlgF7grRxBWHm0H8hgbss4YHqEf19t8Fu9QW0g48VXWsZaDmoNQotxytWx3rJ5jIuvz8xWz+UkbH",   
    alipayPubKeyFile: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhb/KlxYfhRE8KRp92MQM8ZB8NVjoM9LYFOnPIuNtcMZVA8ld7ybDP2FiA+QEE7wLGqMImwl1Y4xzkrTLCjHVC8fdR8ZvzZR2I3ZOrARerI9+RbkCfT+7YLv55+A+WTHEyiB+v7PfXVTT28s0CHNLPXMyQD1u8UVEQEpbMSs8hH3pJF55Li7kc5VvJpV3RVO9TXZTVAA5mSp9FvO3u+47IJDgFVLnqqHh6ETL1nHVpxiAY2LGer+RWpVYD8v+We+VWsrfJP7bO0xr2pwizldepo8YNYPgcIAIwd7KiveypL1pA0xWgSjUHzrkVh1j/nSnvJgKSdydU/VRcaVt/Mt8wwIDAQAB"
  };

  config.alipayBasicParams={
    return_url: 'http://47.100.51.191:3000/pay/payReturn', //支付成功返回地址
    notify_url: 'http://47.100.51.191:3000/api/pay/alipayNotify' //支付成功异步通知地址
  }

  return config;
};
