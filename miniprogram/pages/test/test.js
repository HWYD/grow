// miniprogram/pages/test/test.js
let getThings
let nowTime =new Date()
Page({

  /**
   * 页面的初始数据
   */
  data: {
   thingsList:'',
   isshow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.getData()
  },
getData(){
  wx.getStorage({
    key: 'thingsList',
    success: (res) => {
      let thingsList = res.data
      for (let i = 0; i < thingsList.length; i++) {
        let eachTime = new Date(thingsList[i].time)
        let betweendays = Math.floor((eachTime - nowTime) / (1000 * 60 * 60 * 24))
        let betweenhours = Math.floor(((eachTime - nowTime) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        thingsList[i].distance = betweendays + '天' + Math.abs(betweenhours)  + '小时'
        console.log(betweendays + '天' + betweenhours + '小时')
      }
      console.log(thingsList)
      this.setData({
        thingsList: thingsList,
        isshow:true
      })
    },
    fail: (res) => {
      this.setData({
        isshow: false
      })
    }
  })
 

},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  //  console.log(nowTime)
  //  let othertime =new Date('2010-3-3')
  //  console.log(nowTime< othertime)
  },
 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.refresh()
  },
  refresh(){
    getThings = wx.getStorageSync('thingsList');
    this.setData({
      thingsList: getThings
    })
  },
  addThing(){
   wx.navigateTo({
     url: '../addThings/addThings',
   })
  },
  ondelete(event) {
    let thingIndex=event.currentTarget.dataset
    wx.showModal({
      title: '是否删除事件？',
      // content: '',
      confirmText: '删除',
      success: (res) => {
        if (res.confirm) {
          getThings.splice(thingIndex,1)
          wx.setStorageSync('thingsList', getThings)
          this.refresh()
        } else if (res.cancel) {
          
        }
      }
    })
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