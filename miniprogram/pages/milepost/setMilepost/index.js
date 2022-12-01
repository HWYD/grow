// miniprogram/pages/setMotto/setMotto.js
// import { formatDate, addZero } from '../../utils/index'
let milepostIndex = 0,course
Page({
  /**
   * 页面的初始数据
   */
  data: {
    milepost:{
      title:'',
      desc:'',
      icon:''
    },
    rules: [{
      name: 'title',
      rules: {required: false, message: '单选列表是必选项'},
    }, {
      name: 'desc',
      rules: {required: true, message: '多选列表是必选项'},
    }, {
      name: 'icon',
      rules: {required: true, message: '请输入姓名'},
    }],
    milepostList:[
      {
        title:'描述1描述1描述1描述',
        desc:'描述1描',
        icon:'weui-icon-info'
      },
      {
        title:'小学',
        desc:'描述1',
        icon:'weui-icon-info'
      },
      {
        title:'初中',
        desc:'描述1',
        icon:'weui-icon-warn'
      },
      {
        title:'高中',
        desc:'描述1',
        icon:'weui-icon-success'
      },
      {
        title:'大学',
        desc:'描述1',
        icon:'weui-icon-waiting'
      }
    ],
    icons:[
      {name: '', value: '0', checked: true},
      {name: 'weui-icon-info', value: '1'},
      {name: 'weui-icon-success', value: '2'},
      {name: 'weui-icon-waiting', value: '3'}
    ],
    mottosList: [],
    slelectId: -1,
    userConfig: {
      birthday: '',
      birthTime: '',
      mottoShow: false,
      motto: ''
    },
    slelectEndDay: '',
    tipShow: false,
    tipMsg:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options,'optipon')
    milepostIndex = options.index
    this.setData({
      milepost: JSON.parse(options.value)
    })
    wx.getStorage({
      key: 'course',
      success: (res) => {
          course= res.data
      }
    })
  },
  //文本编辑
  formInputChange(e) {
    const {field} = e.currentTarget.dataset
    console.log(e)
    this.setData({
      [`milepost.${field}`]: e.detail.value
    })
  },
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)

    const radioItems = this.data.radioItems
    for (let i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value === e.detail.value
    }

    this.setData({
      radioItems,
      'milepost.icon': e.detail.value
    })
  },
  //保存设置
  save() {
    console.log(course)
    course[milepostIndex] = this.data.milepost
    wx.setStorage({
      key: 'course',
      data: course,
      success: () => {
        wx.showToast({
          title: '设置成功',
          image: '/images/smile16.png'
        })
        setTimeout(() => {
          wx.navigateBack()
        }, 1000)
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
