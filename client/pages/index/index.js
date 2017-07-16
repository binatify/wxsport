//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    runData: 0,
    banner: {
      name: "北极自由光",
      bg: "../../images/banner.png",
    },
    modalFlag: true,
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      console.log(userInfo)
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })

    wx.getWeRunData({
      success(res) {
        const encryptedData = res.encryptedData;
        console.log(encryptedData);
      }
    })
  },

  onSubmit: function(e) {
    this.setData({
      modalFlag: false
    })
  },

  onModalHide: function(e) {
    this.setData({
      modalFlag: true
    })
  }
})
