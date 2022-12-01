// pages/milepost/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    course:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // wx.setStorage({
    //   key: 'course',
    //   data: this.data.course,
    //   success() {
    //     wx.showToast({
    //       title: '设置成功',
    //       image: '../../images/smile16.png'
    //     })
    //   }
    // })
    this.getCourse()
  },
  getCourse(){
    wx.getStorage({
      key: 'course',
      success: (res) => {
        this.setData({
          course: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },
  edit(e){
    console.log(e.currentTarget.dataset.milepost)
    wx.navigateTo({
      url: `./setMilepost/index?value=${JSON.stringify(e.currentTarget.dataset.milepost)}&index=${e.currentTarget.dataset.index}`
    })
  }
})