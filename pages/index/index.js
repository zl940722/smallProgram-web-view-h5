const app = getApp();
Page({
    onLoad: function (options) {
        console.log(options, 'options');
        var that = this;
        var token = '';
        if (app.globalData.token && app.globalData.token != '') {
            token = app.globalData.token;
            that.setData({
                url: 'https://xxx.com' + token,
                token: token
            });
        } else {
            app.openidCallback = function (openidCallback) {
                token = openidCallback;
                if (openidCallback != '') {
                    token = openidCallback;
                    that.setData({
                        url: 'https://xxx.com' + token,
                        token: token
                    });
                }
            }
        }
    }
});