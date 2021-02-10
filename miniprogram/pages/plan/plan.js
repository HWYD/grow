// pages/plan/plan.js
let perform
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hint: [{
      id: 0,
      plan: '跑步3公里'
    }, {
      id: 1,
        plan: '背20个单词'
    }, {
      id: 2,
        plan: '阅读一小时'
    }],
   isExist:false,
   planList:[],
   perform:[],
   selectGoal:['目标1','目标2','目标3']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  
  },
  //获取目标列表
  getPlanList(){
    let planList = wx.getStorageSync('planList')
     perform =wx.getStorageSync('perform')
    if(perform ==''){
      wx.setStorageSync('perform', [3, 3, 3])
      perform = [3, 3, 3]
    }
    if (planList == '') {
      this.setData({
        perform,
        isExist: false
      })
    }
    else {
      this.setData({
        planList,
        perform,
        isExist: true
      })
    }
    wx.stopPullDownRefresh()
  },
  //跳转页面
  onPlanning(event) {
    wx.navigateTo({
      url: `../planning/planning?planId=${event.target.dataset.planid}`,
    })
  },
  //目标是否完成
  isperform(event){
  let index =event.target.dataset.planid
  wx.showModal({
    title: '确定目标完成了吗',
    confirmText:'完成',
    cancelText:'我再想想',
    success:(res)=>{    
      if (res.confirm) {
        wx.showToast({
          title: '太棒啦',
          mask: true
        })
        perform[index]=index
        wx.setStorageSync('perform', perform)
        this.setData({
          perform
        })
      } else if (res.cancel) {
        wx.showToast({
          title: '加油呀!',
          image:'../../images/hint.png',
          mask:true
        })
        perform[index] = 3
        wx.setStorageSync('perform', perform)
        this.setData({
          perform
        })
        
      }
    },
   
  })
  },
  //选择目标行动
  selectGoal(event){
  console.log(event.detail.value);
  wx.navigateTo({
    url: `../acting/acting?id=${event.detail.value}`,
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
    this.getPlanList()
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
    // this.setData({
    //   planList:[]
    // })
this.getPlanList()
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