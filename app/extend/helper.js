let sd = require('silly-datetime');
module.exports = {
  // 传入时间戳参数times
  formatDate(times){
    return sd.format(new Date(times), 'YYYY-MM-DD HH:mm');
  }
}