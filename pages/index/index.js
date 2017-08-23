// pages/index/index.js
var app = getApp()
var allMaxtime = 0
var page = 1
var flag = true
Page({
  data: {
    nav:[{
      index:0,
      name:"推荐",
      url_type:1
    },{
      index:1,
      name:"视频",
      url_type:41
    },{
      index:2,
      name:"图片",
      url_type:10
    },{
      index:3,
      name:"段子",
      url_type:29
    },{
      index:4,
      name:"声音",
      url_type:31
    }],
    current:0,
    allList:[],
    width:0,//屏幕的宽
    height:0,//屏幕的高
    videoList:[],
    imgList:[],
    haList:[],
    audioList:[],
    currentType:1,
    pictures:[],
    zIndex:-1,
    zanRed:false,
    lowZan:false
  },
  onLoad:function(options){
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
    wx.showLoading({title: '加载中',})
    wx.request({
      url: app.data.api+'?a=list&c=data&type=1&page=1',
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        page++
        allMaxtime = res.data.info.maxtime
        var allData = res.data.list
        _this.setData({
          allList:allData
        })
        wx.hideLoading()
        console.log(allData)
      }
    })
  },
  changeCurrent:function(e){
    var cu = e.detail.current
    var url_type = this.data.nav[cu].url_type
    var _this = this
    this.setData({
      current:cu,
      currentType:url_type
    })
    wx.request({
      url: app.data.api+'?a=list&c=data&type='+url_type,
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        _this.chooseList(res,url_type,_this)
        wx.hideLoading()
      }
    })
  },
  chooseList:function(res,url_type,target){
      var allData = res.data.list
      if(url_type==1){
        target.setData({
          allList:target.data.allList.concat(allData)
        })
      }
      if(url_type==41){
        target.setData({
          videoList:target.data.videoList.concat(allData)
        })
      }
      if(url_type==10){
        target.setData({
          imgList:target.data.imgList.concat(allData)
        })
      }
      if(url_type==29){
        target.setData({
          haList:target.data.haList.concat(allData)
        })
      }
      if(url_type==31){
        target.setData({
          audioList:target.data.audioList.concat(allData)
        })
      }
  },
  changeNav:function(e){
    wx.showLoading({
      title: '加载中',
    })
    var url_type = e.currentTarget.dataset.url
    var index = e.currentTarget.dataset.index
    
    this.setData({
      current:index
    })
    
  },
  showMore:function(){
    if(flag){
      flag = false
      var _this = this
      var cuType = _this.data.currentType
      wx.showLoading({title: '加载中',})
      wx.request({
        url: app.data.api+'?a=list&c=data&type='+cuType, 
        data: {
          page: page ,
          maxtime: allMaxtime
        },
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
          allMaxtime = res.data.info.maxtime
          page++
          var allData = res.data.list
          _this.chooseList(res,cuType,_this)
          wx.hideLoading()
          flag = true
        }
      })
    }
    
  },
  playvedio:function(){
    
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
  addZan:function(e){
    this.setData({
      zanRed:true
    })
  },
  low:function(){
    this.setData({
      lowZan:true
    })
  },
  goTo:function(e){
    var id = e.currentTarget.dataset.id
    var datatype = e.currentTarget.dataset.type
    var profile = e.currentTarget.dataset.profile
    var name = e.currentTarget.dataset.name
    var time = e.currentTarget.dataset.time
    var content = e.currentTarget.dataset.content
    var url = e.currentTarget.dataset.url
    var num = e.currentTarget.dataset.num
    var width = e.currentTarget.dataset.width
    var height = e.currentTarget.dataset.height
    var bimageuri = e.currentTarget.dataset.bimageuri
    console.log(bimageuri)
    wx.navigateTo({
      url: '/pages/detail/detail?id='+id+'&type='+datatype,
      success: function(res){
        wx.setStorageSync('id', id)
        wx.setStorageSync('profile', profile)
        wx.setStorageSync('name', name)
        wx.setStorageSync('time', time)
        wx.setStorageSync('content', content)
        wx.setStorageSync('url', url)
        wx.setStorageSync('num', num)
        wx.setStorageSync('width', width)
        wx.setStorageSync('height', height)
        wx.setStorageSync('bimageuri', bimageuri)
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  }
})