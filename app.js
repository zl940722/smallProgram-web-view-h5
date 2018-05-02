var APIURL_DEVELOP = require('https').APIURL_DEVELOP;
App({
    onLaunch: function () {
        var token = wx.getStorageSync('token');
        var that = this;
        wx.login({
            success: function (res) {
                console.log(res.code);
                if (res.code) {
                    wx.getUserInfo({
                        withCredentials: true,
                        success: function (res_user) {
                            wx.request({
                                //后台接口地址
                                url: APIURL_DEVELOP + '/launch',
                                data: {
                                    code: res.code
                                },
                                method: 'POST',
                                header: {
                                    'content-type': 'application/json'
                                },
                                success: function (res) {
                                    that.globalData.token = res.data.result.token;
                                    if (that.openidCallback) {
                                        that.openidCallback(res.data.result.token);
                                        wx.setStorageSync('token', res.data.result.token);
                                    }
                                }
                            })
                        }, fail: function () {
                            wx.showModal({
                                title: '警告通知',
                                content: '您点击了拒绝授权,将无法正常显示个人信息,点击确定重新获取授权。',
                                success: function (res) {
                                    if (res.confirm) {
                                        wx.openSetting({
                                            success: function (res) {
                                                if (res.authSetting["scope.userInfo"]) {////如果用户重新同意了授权登录
                                                    wx.login({
                                                        success: function (res_login) {
                                                            if (res_login.code) {
                                                                wx.getUserInfo({
                                                                    withCredentials: true,
                                                                    success: function (res_user) {
                                                                        wx.request({
                                                                            url: APIURL_DEVELOP + '/launch',
                                                                            data: {
                                                                                code: res_login.code
                                                                            },
                                                                            method: 'POST',
                                                                            header: {
                                                                                'content-type': 'application/json'
                                                                            },
                                                                            success: function (res) {
                                                                                that.globalData.token = res.data.result.token;
                                                                                if (that.openidCallback) {
                                                                                    that.openidCallback(res.data.result.token);
                                                                                    wx.setStorageSync('token', res.data.result.token);
                                                                                }
                                                                            }
                                                                        })
                                                                    }
                                                                })
                                                            }
                                                        }
                                                    });
                                                }
                                            },
                                            fail: function (res) {

                                            }
                                        })

                                    }
                                }
                            })
                        }, complete: function (res) {


                        }
                    })
                }
            }
        })
    },
    globalData: {
        userInfo: null
    }
});