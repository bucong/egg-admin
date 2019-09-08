'use strict';

const Service = require('egg').Service;

class QqLoginService extends Service {
  // 测试地址 https://graph.qq.com/oauth2.0/authorize?client_id=101479867&redirect_uri=http%3a%2f%2fshare.zrpic.com%2fjnwtv-live-cartoon-h5%2ftest.html&response_type=code&scope=get_user_info&state=http%3a%2f%2flocalhost%3a8080%2f
  async qqLogin(query) {
    let db = this.app.mysql;
    let res = {
      code: 0,
      data: {},
      msg: ''
    };
    //第一步，获取token
    let tokenData = await this.ctx.curl('https://graph.qq.com/oauth2.0/token',{
      data: {
        grant_type: 'authorization_code',
        client_id: this.config.qqOptions.client_id,
        redirect_uri: query.redirect_uri,
        client_secret: this.config.qqOptions.client_secret,
        code: query.code
      }
    });
    let tokenResult = tokenData.data.toString('utf8');
    this.ctx.logger.info(tokenResult);
    if (tokenResult.substr(0, 12) === 'access_token') {
      let tokenArr = tokenResult.split('&');
      let token = tokenArr[0].split('=')[1];
      //第二步，获取openid
      let openIdData = await this.ctx.curl('https://graph.qq.com/oauth2.0/me',{
        data: {
          access_token: token
        }
      });
      let openIdResult = openIdData.data.toString('utf8');
      this.ctx.logger.info(openIdResult);
      let openIdLen = openIdResult.length;
      let openIdObj = JSON.parse(openIdResult.substring(9, openIdLen - 3));
      let openId = openIdObj.openid;
      //第三步，获取用户信息
      let userData = await this.ctx.curl('https://graph.qq.com/user/get_user_info',{
        data: {
          access_token: token,
          oauth_consumer_key: this.config.qqOptions.client_id,
          openid: openId
        }
      });
      let userResult = userData.data.toString('utf8');
      let userInfo = JSON.parse(userResult);
      this.ctx.logger.info(userInfo);
      let selectUser = await db.select('user', {
        where: {
          qq_openId: openId
        }
      })
      let userToken = await this.service.user.getToken();
      if(selectUser.length > 0){
        //已经注册过
        delete selectUser[0].password;
        await db.update('user', {token: userToken}, {
          where: {
            qq_openId: openId
          }
        })
        selectUser[0].token = userToken;
        res.data = selectUser[0];
      }else{
        //新用户
        let insertUser = await db.insert('user', {
          login_type: query.loginType,
          qq_openId: openId,
          name: userInfo.nickname,
          figureurl: userInfo.figureurl_qq,
          add_time: (new Date()).getTime(),
          token: userToken
        })
        if(insertUser.affectedRows === 1){
          let getUserInfo = await db.select('user', {
            where: {
              qq_openId: openId
            }
          })
          delete getUserInfo[0].password;
          res.data = getUserInfo[0];
        }
      }
    } else {
      // let errMsgLen = tokenResult.length;
      // let errMsgObj = JSON.parse(tokenResult.substring(9, errMsgLen - 3));
      // let errMsg = errMsgObj.error_description;
      // res.msg = errMsg;
      res.code = 1;
      res.msg = 'code失效';
    }
    return res;
  }
}

module.exports = QqLoginService;
