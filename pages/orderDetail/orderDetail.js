const app = getApp();
var APIURL_DEVELOP = require('../../https').APIURL_DEVELOP;
var dataArray = [];
Page({
    data: {
        src: '../images/greenTel.png'
    },
    onShow: function (res) {
        // var token =  wx.getStorageSync('token');
        var that = this;
        var token = '';
        if (app.globalData.token && app.globalData.token != '') {
            token = app.globalData.token;
            if(dataArray.length !== 0) {
                dataArray.map(data => {
                    if(that.options.orderSn === data.orderSn){
                        that.setData({
                            Industry: data,
                            date: new Date(data.createDate).toLocaleString()
                        })
                    }else{
                        wx.request({
                            url: APIURL_DEVELOP + '/xxx',
                            data: {
                                orderSn: that.options.orderSn
                            },
                            statusCode: 200,
                            header: {'token': token},
                            method: 'GET',
                            success: function (res) {
                                dataArray.push(res.data.result);
                                that.setData({
                                    Industry: res.data.result,
                                    date: new Date(res.data.result.createDate).toLocaleString()
                                })
                            }
                        })
                    }

                })
            }else{
                wx.request({
                    url: APIURL_DEVELOP + '/xxx',
                    data: {
                        orderSn: that.options.orderSn
                    },
                    statusCode: 200,
                    header: {'token': token},
                    method: 'GET',
                    success: function (res) {
                        dataArray.push(res.data.result);
                        that.setData({
                            Industry: res.data.result,
                            date: new Date(res.data.result.createDate).toLocaleString()
                        })
                    }
                })
            }
        } else {
            app.openidCallback = function (openidCallback) {
                token = openidCallback;
                if (openidCallback != '') {
                    token = openidCallback;
                    wx.request({
                        url: APIURL_DEVELOP + '/xxx',
                        data: {
                            orderSn: that.options.orderSn
                        },
                        statusCode: 200,
                        header: {'token': token},
                        method: 'GET',
                        success: function (res) {
                            that.setData({
                                Industry: res.data.result,
                                date: new Date(res.data.result.createDate).toLocaleString()
                            })
                        }
                    })
                }
            }
        }

    },
    onUnload:function () {
        console.log('back')
    },
    openAlert: function (res) {
        var that = this;
        wx.makePhoneCall({
            phoneNumber: that.data.Industry.mobile === null ? '' : that.data.Industry.mobile, //仅为示例，并非真实的电话号码
            showCancel: false,
            success: function (res) {
                console.log(res, 's')
            },
            fail: function (res) {
                console.log(res, 'f')
            }
        });
    }
});
