// miniprogram/pages/addThings/addThings.js
let isSetTime=false
let content=''
Page({

  /**
   * 页面的初始数据
   */
  data: {
   thingTime:'未选择',
  },
  setTime(event){
    isSetTime=true
  this.setData({
    thingTime: event.detail.value
  })
  },
  //获取组件传过来的文本框内容
  getText(event){
     console.log(event.detail)
    content = event.detail
  },
  submitTask(){
  // console.log(1234)
  if(content==''){
    wx.showToast({
      title: '内容不能为空',
      image:'../../images/smile12.png'
    })
    return
  }
  else if (!isSetTime){
    wx.showToast({
      title: '时间未设置',
      image: '../../images/smile12.png'
    })
    return
  }
  else{
    let newarry={
      'time': this.data.thingTime,
      'detail': content,
      'distance':''
    }
   wx.getStorage({
      key: 'thingsList',
      success: function(res) {
        console.log(res.data)
       let oldarry = res.data
       oldarry.push(newarry)
       wx.setStorage({
         key: 'thingsList',
         data: oldarry,
       })
      },
      fail:(res)=>{
        console.log(12345)
        wx.setStorage({
      key: 'thingsList',
      data:[newarry]
    })
      }
    })
    wx.showToast({
      title: '添加成功',
    })
  }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})