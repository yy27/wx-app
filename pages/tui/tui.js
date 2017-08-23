// pages/tui/tui.js
var app = getApp()
Page({
  data:{
    leftNav:[],
    rightNav:[],
    active:false
  },
  onLoad:function(options){
    var that = this
    wx.request({
      url: app.data.api+'?a=category&c=subscribe',
      data: {},
      method: 'GET', 
      header: {
          'content-type': 'application/json'
      },
      success: function(res){
        that.setData({
          leftNav:res.data.list
        })
      console.log(that.data.leftNav[0])
      var id=that.data.leftNav[0].id
        wx.request({
          url: app.data.api+'?a=list&c=subscribe&category_id='+id,
          data: {},
          method: 'GET', 
          header: {
              'content-type': 'application/json'
          },
          success: function(res){
            that.setData({
              rightNav:res.data.list
            })
          }
        })
      }
    })
    // 
    
    
  },
  changeRightNav:function(e){
    var that = this
    var id = e.currentTarget.dataset.id
    wx.request({
      url: app.data.api+'?a=list&c=subscribe&category_id='+id,
      data: {},
      method: 'GET', 
      header: {
          'content-type': 'application/json'
      },
      success: function(res){
        that.setData({
          rightNav:res.data.list
        })
        console.log(res.data.list)

      }
    })
  }
})