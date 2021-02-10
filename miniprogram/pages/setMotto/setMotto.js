// miniprogram/pages/setMotto/setMotto.js
let content = ''
const db =wx.cloud.database()
let mottoShow =true
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mottosList:[],
    mottoShow:true,
    placeholder:'',
    wordnum: 0,
    content:'',
    slelectId:-1
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      placeholder: options.placeholder,
      wordnum: options.placeholder.length,
      content: options.placeholder
    })
   this.getMottoList()
   this.getUserMottoShow()
  },
  //文本框操作
  onInput(event) {
    console.log(event)
    content = event.detail.value
    let wordnum = event.detail.value.length
    this.setData({
      wordnum,
      content
    })
  },
  //获取用户是否显示格言
  getUserMottoShow(){
  wx.cloud.callFunction({
    name:'getUserTime',
    data:{
      $url:'getBirthday'
    }
  }).then((res)=>{
    if (res.result[0].motto){
    mottoShow=res.result[0].mottoShow
    this.setData({
     mottoShow
    })
    }
  })
  },
  //获取格言列表
  getMottoList(){
  db.collection('motto').get().then((res)=>{
    // console.log(res.data[0].motto);
this.setData({
  mottosList:res.data[0].motto
})
  }).catch(console.error)
  },
  //用户修改格言
  changeMotto(event){
    console.log(event.target.dataset.length)
    if (event.target.dataset.index){
      console.log('存在')
      this.setData({
        slelectId: event.target.dataset.index-1
      })
    }
let newMotto =event.target.dataset.motto
// console.log(newMotto)
      wx.cloud.callFunction({
        name: 'saveMotto',
        data: {
          $url: 'changeMotto',
          motto: newMotto,
          mottoShow: this.data.mottoShow
        }
      }).then((res) => {
        console.log(res)
        wx.showToast({
          title: '修改成功',
          image: '../../images/smile6.png'
        })
      })
  },
  //设置是否显示格言
  setMottoShow(event){
//  console.log(event.detail.value)
    if (event.detail.value){
      this.setData({
        mottoShow:true
      })
      this.changeMottoShow()
      wx.showToast({
        title: '显示已开启',
        image: '../../images/smile16.png'
      })
    }
    else{
      this.setData({
        mottoShow: false
      })
      this.changeMottoShow()
      wx.showToast({
        title: '显示已关闭',
        image: '../../images/smile17.png'
      })
    }
  },
  //设置格言是否显示的数据库操作方法
  changeMottoShow(){
      wx.cloud.callFunction({
        name: 'saveMotto',
        data: {
          $url: 'changeMottoShow',
          mottoShow: this.data.mottoShow
        }
      }).then((res) => {
        console.log(res)
      })
  },
selectMotto(event){
 this.setData({
   slelectId: event.target.dataset.index
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