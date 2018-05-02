page({
    onLoad: function () {
       wx.request({
           url: APIURL_DEVELOP + '/getOrderDetail',
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
});