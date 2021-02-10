// pages/me/me.js
let startTime=''
let show = [
  { express: '../../images/smile.png', desc: '高兴认识你哦~' },
  { express: '../../images/smile1.png', desc: '来啊，加微信' },
  { express: '../../images/smile2.png', desc: '请你喝茶~!' },
  { express: '../../images/smile3.png', desc: '咳咳!~' },
  { express: '../../images/smile4.png', desc: '天气不错呀!~' },
  { express: '../../images/smile5.png', desc: '我要睡觉啦!' },
  { express: '../../images/smile6.png', desc: '哈哈哈~' },
  { express: '../../images/smile7.png', desc: '给你小心心' },
  { express: '../../images/smile8.png', desc: '害羞啦!~' },
  { express: '../../images/smile9.png', desc: '真的嘛~' },
  { express: '../../images/smile10.png', desc: '猪猪侠同意了?' },
  { express: '../../images/smile11.png', desc: '请吃饭嘛~' },
  { express: '../../images/smile12.png', desc: '哦~' },
  { express: '../../images/smile13.png', desc: '好开心呀!~' },
  { express: '../../images/smile14.png', desc: '讨厌!~' },
  { express: '../../images/smile15.png', desc: '嗯嗯好呢!~' },
]
Page({

  /**
   * 页面的初始数据
   */
  data: {
   timeContent:'',
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.getbirth()
  },
  isshowMotto(){
   wx.showModal({
     title: '是否显示格言？',
     cancelText:'隐藏',
     confirmText:'显示',
     success:((res)=>{
       if (res.confirm) {
        this.changeMottoShow(true)
       } else if (res.cancel) {
         this.changeMottoShow(false)
       }
     })

   })
  },
  //设置格言是否显示的数据库操作方法
  changeMottoShow(detail) {
    wx.cloud.callFunction({
      name: 'saveMotto',
      data: {
        $url: 'changeMottoShow',
        mottoShow: detail
      }
    }).then((res) => {
      console.log(res)
    })
  },
  //获取用户时间
  getbirth() {
    wx.cloud.callFunction({
      name: 'getUserTime',
      data: {
        $url: 'getBirthday'
      }
    }).then((res) => {
      console.log(res.result[0].createTime)
      startTime = res.result[0].createTime
      startTime = new Date(startTime)
      let nowTime =new Date()
      let timeContent = Math.ceil((nowTime - startTime)/1000/60/60/24)
      // console.log(nowTime - startTime)
      // console.log(timeContent)
      this.setData({
          timeContent
      })
    })
    
  },
  showAuthor(){
    let ran = Math.floor(Math.random() * 16)
   console.log(ran)
   wx.showToast({
     title: show[ran].desc,
     image:show[ran].express,
     mask:true
   })
  }, 
  myShare(){
wx.showLoading({
  title: '生成中',
})
wx.cloud.callFunction({
  name:'myShare'
}).then((res)=>{
  // console.log(res)
  const fileId =res.result
  wx.previewImage({
    urls: [fileId],
    current:fileId
  })
  wx.hideLoading()
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