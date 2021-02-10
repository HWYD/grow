let getThings
let thingsList
let nowTime = new Date()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    thingsList: '',
    isshow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  getData() {
    wx.getStorage({
      key: 'thingsList',
      success: (res) => { 
       
         thingsList = res.data
        for (let i = 0; i < thingsList.length; i++) {
          let tip = "还有"
          let timeValue = thingsList[i].time
           timeValue = timeValue.replace(/-/g,'/')
          let eachTime = new Date(timeValue)
          let betweendays = Math.floor((eachTime - nowTime) / (1000 * 60 * 60 * 24))
          if(betweendays<0){
            betweendays = Math.abs(Math.ceil((eachTime - nowTime) / (1000 * 60 * 60 * 24))) 
            tip="已过"
          }
          let betweenhours = ((eachTime - nowTime) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          betweenhours= betweenhours.toFixed(1)
          thingsList[i].distance = tip+betweendays + '天' + Math.abs(betweenhours) + '小时'
        }
        this.setData({
          thingsList: thingsList,
          isshow: true
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
    this.getData()
  },
  refresh() {
    getThings = wx.getStorageSync('thingsList');
    this.setData({
      thingsList: getThings
    })
  },
  addThing() {
    wx.navigateTo({
      url: '../addThings/addThings',
    })
  },
  ondelete(event) {
    console.log(event)
    let thingIndex = event.currentTarget.dataset.index
    wx.showModal({
      title: '是否删除事件？',
      // content: '',
      confirmText: '删除',
      success: (res) => {
        if (res.confirm) {
          thingsList.splice(thingIndex, 1)
          wx.setStorageSync('thingsList', thingsList)
          this.getData()
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