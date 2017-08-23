// pages/detail/detail.js

var app = getApp()
Page({
  data:{
    comment:[],
    item:{},
    datatype:41,
    width:0,//屏幕的宽
    height:0,//屏幕的高
  },
  onLoad:function(options){
    var _this =  this
    var commentId = options.id
    var dtype = options.type
    var id = wx.getStorageSync('id')
    var profile = wx.getStorageSync('profile')
    var name = wx.getStorageSync('name')
    var time = wx.getStorageSync('time')
    var content = wx.getStorageSync('content')
    var url = wx.getStorageSync('url')
    var num = wx.getStorageSync('num').split("/")
    var width = wx.getStorageSync('width')
    var height = wx.getStorageSync('height')
    var bimageuri = wx.getStorageSync('bimageuri')
    var detailObj = {
      id:commentId,
      profile_image:profile,
      name:name,
      create_time:time,
      text:content,
      videouri:url,
      cdn_img:url,
      voiceuri:url,
      love:num[0],
      hate:num[1],
      repost:num[2],
      comment:num[3],
      width:width,
      height:height,
      bimageuri:bimageuri
    }
    this.setData({
      item:detailObj,
      datatype:dtype
    })
    var _this = this
    wx.getSystemInfo({
        success: function(res) {
            var windowHeight = res.windowHeight
            var windowWidth = res.windowWidth
            _this.setData({
              width:windowWidth,
              height:windowHeight
            })
            
        }
    })
    console.log(dtype)
    wx.request({
      url: app.data.api+'?a=dataList&c=comment&data_id='+commentId,
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        var allData = res.data.data
        _this.setData({
          comment:allData
        })
        console.log(_this.data.comment)
      }
    })
  },
  showimg:function(e){
    var that = this
    var imgarray = []
    imgarray.push(e.target.dataset.url)
    wx.previewImage({
      current: imgarray,
      urls: imgarray
    })
  },
})