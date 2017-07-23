//app.js
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  getUserCookie: function(cb) {
    var that = this
    if (this.globalData.cookie) {
      typeof cb == "function" && cb(this.globalData.cookie)
    } else {
      wx.login({
        success: function (res) {
          if (res.code) {
            wx.request({
              url: that.makeRequestUrl("/api/session/login"),
              method: "POST",
              data: {
                code: res.code
              },
              success: function (res) {
                that.globalData.cookie = res.header["Set-Cookie"];
                typeof cb == "function" && cb(that.globalData.cookie)
              }
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      });
    }
  },

  makeRequestUrl: function(endpoint){
    return "https://sport1.zuoyouba.com" + endpoint
    // return "http://localhost:3000" + endpoint
  },

  globalData: {
    userInfo: null,
    cookie: null
  }
})
