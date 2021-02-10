// miniprogram/pages/acting/acting.js
let count = 0, hours, minutes = 0, seconds=0
let interval =null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    seconds:'',
    minutes:'',
    motto:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
console.log(options)

    interval =  setInterval(()=>{
      this.countadd()},1000)
  },
  countadd(){
  seconds++
  if(seconds==60){
 minutes++
 seconds=0
  }
 
  
    this.setData({
      seconds: this.showNum(seconds),
      minutes: this.showNum(minutes)
    })
  
  
  },
 showNum(num) {
    if(num < 10) {
      return '0' + num
    }
    return num
  },
  getMottodetail() {
    wx.cloud.callFunction({
      name: 'getUserTime',
      data: {
        $url: 'getBirthday'
      }
    }).then((res) => {
      if (res.result.length == 0) {
        this.setData({
          motto: '闹钟响起时，要么起来为实现梦想而拼搏，要么关掉继续做你的白日梦！'
        })
        
      }
      else {
        if (res.result[0].motto) {
          this.setData({
            motto: res.result[0].motto
          })
        }else{
          this.setData({
            motto: '闹钟响起时，要么起来为实现梦想而拼搏，要么关掉继续做你的白日梦！'
          })
        }
      }
    })
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
    this.getMottodetail()
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
    if (interval != null) {
      clearInterval(interval);
      interval = null;
    }
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