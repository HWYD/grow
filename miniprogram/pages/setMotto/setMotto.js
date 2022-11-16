// miniprogram/pages/setMotto/setMotto.js
import { formatDate } from '../../utils/index'
let content = ''
const db = wx.cloud.database()
let mottoShow = true
Page({
  /**
   * 页面的初始数据
   */
  data: {
    mottosList: [],
    slelectId: -1,
    userConfig: {
      birthday: '',
      mottoShow: false,
      motto: ''
    },
    slelectEndTime:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'userConfig',
      success: (res) => {
        this.setData({
          userConfig: JSON.parse(res.data)
        })
      }
    })
    const slelectEndTime = formatDate()
    this.setData({
      slelectEndTime
    })
    // this.getMottoList()
    // this.getUserMottoShow()
  },
  //文本框操作
  onInput(event) {
    content = event.detail.value
    let wordnum = event.detail.value.length
    this.setData({
      wordnum,
      userConfig: {
        ...this.data.userConfig,
        motto: content
      }
    })
  },
  //用户设置时间
  bindDateChange(e) {
    this.setData({
      userConfig: {
        ...this.data.userConfig,
        birthday: e.detail.value
      }
    })
  },
  //获取格言列表
  getMottoList() {
    db.collection('motto')
      .get()
      .then((res) => {
        this.setData({
          mottosList: res.data[0].motto
        })
      })
      .catch(console.error)
  },
  //保存设置
  save() {
    wx.setStorage({
      key: 'userConfig',
      data: JSON.stringify(this.data.userConfig),
      success: () => {
        wx.showToast({
          title: '设置成功',
          image: '../../images/smile16.png'
        })
        setTimeout(()=>{
          wx.navigateBack()
        },1000)
      }
    })
  },
  //用户修改格言
  changeMotto(event) {
    let newMotto = event.target.dataset.motto
    wx.setStorage({
      key: 'motto',
      data: newMotto,
      success() {
        wx.showToast({
          title: '设置成功',
          image: '../../images/smile16.png'
        })
      }
    })
  },
  //设置是否显示格言
  setMottoShow(event) {
    this.setData({
      userConfig: {
        ...this.data.userConfig,
        mottoShow: event.detail.value
      }
    })
  },
  selectMotto(event) {
    this.setData({
      slelectId: event.target.dataset.index
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
