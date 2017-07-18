//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    activity: {
      title: "北极自由光",
      image: "../../images/banner.png",
    },
    modal: {
      hidden: true,
      typo: null,
      errMessage: null,
      data: {},
    }
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })

      wx.request({
        url: app.makeRequestUrl("/api/user"),
        method: "POST",
        data: {
          userinfo: userInfo
        },
        header: {
          'Cookie': app.globalData.cookie,
        }
      })
    });

    //获取 activity 信息
    wx.request({
      url: app.makeRequestUrl("/api/activity"),
      method: "GET",
      header: {
        'Cookie': app.globalData.cookie,
      },
      success: function(res) {
        that.setData({
          activity: res.data
        });
        wx.setNavigationBarTitle({
          title: res.data.title
        });
      }
    })
  },

  onSubmit: function(e) {
    var that = this;
    wx.getWeRunData({
      success(res) {
        wx.request({
          url: app.makeRequestUrl("/api/sport"),
          method: "POST",
          data: {
            encrypted_data: res.encryptedData,
            iv: res.iv,
            activity_id: that.data.activity.id,
          },
          header: {
            'Cookie': app.globalData.cookie,
          },
          success: function(res) {
            var modalStatus = {
              hidden: false,
              data: res.data,
            }
            if (res.statusCode == 200) {
              modalStatus.typo = 0 
            } else {
              modalStatus.typo = 1
            }

            that.setData({
              modal: modalStatus
            });
          }
        })
      },
      fail(data) {
        wx.showToast({
          title: '请确认已授权获取运动数据',
          icon: "warn",
          duration: 1000
        })
      }
    })
  },

  onModalHide: function(e) {
    this.setData({
      modal: {
        hidden: true,
        typo: null,
        data: null,
        errMessage: null,
      }
    });
  }
})
