// pages/me/me.js
let startTime = ''
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
  { express: '../../images/smile15.png', desc: '嗯嗯好呢!~' }
]
Page({
  /**
   * 页面的初始数据
   */
  data: {
    useTime: '',
    userInfo: '',
    canIUseGetUserProfile: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'userInfo',
      success: (res) => {
        this.setData({
          userInfo: JSON.parse(res.data)
        })
      }
    })
    this.getuseTime()
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用 wx.getUserProfile 获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo
        })
        wx.setStorage({
          key: 'userInfo',
          data: JSON.stringify(res.userInfo)
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用 getUserInfo 获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    this.setData({
      userInfo: e.detail.userInfo
    })
  },
  setting() {
    wx.navigateTo({
      url: `../setMotto/setMotto`
    })
  },
  //获取用户使用时间
  getuseTime() {
    wx.getStorage({
      key: 'createTime',
      success: (res) => {
        const useTime = Math.ceil((Date.now() - res.data) / 1000 / 60 / 60 / 24)
        this.setData({ useTime })
      }
    })
  },
  showAuthor() {
    let ran = Math.floor(Math.random() * 16)
    wx.showToast({
      title: show[ran].desc,
      image: show[ran].express,
      mask: true
    })
  },
  myShare() {
    wx.showLoading({
      title: '生成中'
    })
    wx.cloud
      .callFunction({
        name: 'myShare'
      })
      .then((res) => {
        const fileId = res.result
        wx.previewImage({
          urls: [fileId],
          current: fileId
        })
        wx.hideLoading()
      })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
})
