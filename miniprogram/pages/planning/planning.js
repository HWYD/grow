// miniprogram/pages/planning/planning.js
let content = ''
let keyname =''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeholder:'',
    wordnum:0,
  },
  onInput(event){
  content =event.detail.value
    let wordnum = event.detail.value.length
    this.setData({
      wordnum
    })
  },
  //设置目标
  changePlan(){
  let planList = wx.getStorageSync('planList')
    if (planList==''){
      let hint = [{
        id: 0,
        plan: '跑步3公里'
      }, {
        id: 1,
          plan: '背20个单词'
      }, {
        id: 2,
          plan: '阅读一小时'
      }]
      for (let i = 0; i < hint.length; i++) {
        if (keyname == hint[i].id) {
          hint[i].plan = content
        }
      }
      wx.setStorageSync('planList', hint)
     
    }
    else{
      for (let i = 0; i < planList.length; i++) {
        if (keyname == planList[i].id) {
          planList[i].plan = content
        }
      }
      wx.setStorageSync('planList', planList)
     
    }
    
    let perform =wx.getStorageSync('perform')
    perform[keyname]=3
    wx.setStorageSync('perform',perform )
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      mask: true
    })
    setTimeout(() => {
      wx.navigateBack({
        delta: 1
      })},1000)
    
  },
  onBlur(event) {
    console.log(event)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   keyname=options.planId
   let ishave = wx.getStorageSync('planList')
    if (ishave==''){
      if(keyname==0){
        content = '跑步3公里'
      }
      else if(keyname==1){
        content = '背20个单词'
      }
      else{
        content = '阅读一小时'
      }
     this.setData({
       placeholder:content,
       wordnum: content.length
     })
    }
    else{ 
      content = ishave[keyname].plan 
        this.setData({
          placeholder: content,
          wordnum: content.length
        })
             
    }
  
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