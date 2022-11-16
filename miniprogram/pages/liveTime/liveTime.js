// miniprogram/pages/liveTime/liveTime.js
// const db = wx.cloud.database()

let birthTime
let clockInterval //时钟定时器
let inval //计算成长时间定时器
let width
let height
let ctx, R
Page({
  /**
   * 页面的初始数据
   */
  data: {
    timeList: [
      {
        name: '年',
        value: '--'
      },
      {
        name: '月',
        value: '--'
      },
      {
        name: '周',
        value: '--'
      },
      {
        name: '天',
        value: '--'
      },
      {
        name: '小时',
        value: '--'
      },
      {
        name: '分钟',
        value: '--'
      },
      {
        name: '秒',
        value: '--'
      }
    ],
    yearFixed: '--',
    otherDisplay: false,
    userConfig: {
      birthday: '',
      mottoShow: false,
      motto: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取系统信息
    wx.getSystemInfo({
      //获取系统信息成功，将系统窗口的宽高赋给页面的宽高
      success: (res) => {
        // width:375,height625
        width = res.windowWidth
        height = res.windowHeight
        // 这里的单位是PX，实际的手机屏幕有一个Dpr，这里选择iphone，默认Dpr是2
      }
    })
    this.getUserConfig()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.createClock()
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 页面隐藏清除定时器，重启定时器
    if (!clockInterval) {
      this.createClock()
    }
    if (!inval) {
      this.getUserConfig()
    }
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(clockInterval)
    clearInterval(inval)
    clockInterval = ''
    inval = ''
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(clockInterval)
    clearInterval(inval)
  },
  //切换界面
  onChange() {
    this.setData({
      otherDisplay: !this.data.otherDisplay
    })
  },
  //获取用户时间
  getUserConfig() {
    wx.getStorage({
      key: 'userConfig',
      success: (res) => {
        this.setData({
          userConfig: JSON.parse(res.data)
        })
        const DateArr = this.data.userConfig.birthday.split('-')
        birthTime = new Date(DateArr[0],Number(DateArr[1])-1,DateArr[2],0,0,0,0)
        this.calculate()
        inval = setInterval(() => {
          this.calculate()
        }, 1000)
      },
      fail: () => {
        birthTime = new Date()
        this.calculate()
        inval = setInterval(() => {
          this.calculate()
        }, 1000)
      }
    })
  },
  //计算所有时间
  calculate() {
    let nowTime = new Date()
    let betweenTime = nowTime - birthTime
    let tmpVal = 1000 * 60 * 60 * 24
    //计算相差年月周等
    let yearFixed = (betweenTime / (tmpVal * 365)).toFixed(8)
    let year = Math.floor(betweenTime / (tmpVal * 365))
    let month = nowTime.getFullYear() * 12 + nowTime.getMonth() - (birthTime.getFullYear() * 12 + birthTime.getMonth())
    let week = Math.floor(betweenTime / (tmpVal * 7))
    let day = Math.floor(betweenTime / tmpVal)
    let hours = Math.floor(betweenTime / (tmpVal / 24))
    let minutes = Math.floor(betweenTime / 60000)
    let seconds = Math.floor(betweenTime / 1000)
    this.setData({
      ['timeList[0].value']: year,
      ['timeList[1].value']: month,
      ['timeList[2].value']: week,
      ['timeList[3].value']: day,
      ['timeList[4].value']: hours,
      ['timeList[5].value']: minutes,
      ['timeList[6].value']: seconds,
      yearFixed
    })
  },
  //跳转设置页面
  setting() {
    wx.navigateTo({
      url: `../setMotto/setMotto`
    })
  },

  // 所有的canvas属性以及Math.sin,Math.cos()等涉及角度的参数都是用弧度表示
  // 画外框
  drawBackground() {
    // 设置线条的粗细，单位px
    ctx.setLineWidth(5)
    // 开始路径
    ctx.beginPath()
    // ctx.setStrokeStyle('pink');
    // 运动一个圆的路径
    // arc(x,y,半径,起始位置，结束位置，false为顺时针运动)
    ctx.arc(0, 0, width / 2 - 100, 0, 2 * Math.PI, false)
    ctx.closePath()
    // 描出点的路径
    ctx.stroke()
  },

  // 画时钟数
  drawHoursNum() {
    ctx.setFontSize(18)
    // 圆的起始位置是从3开始的，所以我们从3开始填充数字
    var hours = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2]
    hours.forEach(function (hour, i) {
      var rad = ((2 * Math.PI) / 12) * i
      var x = R * Math.cos(rad)
      var y = R * Math.sin(rad)
      // 因为微信小程序不支持BaseLine这个属性，所以这里我们只能自己手动调整位置
      if (hour == 12) {
        ctx.fillText(hour, x - 11, y + 6)
      } else if (hour == 6) {
        ctx.fillText(hour, x - 5, y + 6)
      } else {
        ctx.fillText(hour, x - 6, y + 6)
      }
    })
  },

  // 画数字对应的点
  drawdots() {
    for (let i = 0; i < 60; i++) {
      var rad = ((2 * Math.PI) / 60) * i
      var x = (R + 15) * Math.cos(rad)
      var y = (R + 15) * Math.sin(rad)
      ctx.beginPath()
      // 每5个点一个比较大
      if (i % 5 == 0) {
        ctx.arc(x, y, 2, 0, 2 * Math.PI, false)
      } else {
        ctx.arc(x, y, 1, 0, 2 * Math.PI, false)
      }
      ctx.setFillStyle('black')
      ctx.fill()
    }
    ctx.closePath()
  },

  // 画时针
  drawHour(hour, minute) {
    // 保存画之前的状态
    ctx.save()
    ctx.beginPath()
    // 根据小时数确定大的偏移
    const rad = ((2 * Math.PI) / 12) * hour
    // 根据分钟数确定小的偏移
    const mrad = ((2 * Math.PI) / 12 / 60) * minute
    // 做旋转
    ctx.rotate(rad + mrad)
    ctx.setLineWidth(8)
    // 设置线条结束样式为圆
    ctx.setLineCap('round')
    // 时针向后延伸8个px；
    ctx.moveTo(0, 8)
    // 一开始的位置指向12点的方向，长度为R/2
    ctx.lineTo(0, -R / 2)
    ctx.stroke()
    ctx.closePath()
    // 返回画之前的状态
    ctx.restore()
  },

  // 画分针
  drawMinute(minute, second) {
    ctx.save()
    ctx.beginPath()
    // 根据分钟数确定大的偏移
    const rad = ((2 * Math.PI) / 60) * minute
    // 根据秒数确定小的偏移
    const mrad = ((2 * Math.PI) / 60 / 60) * second
    ctx.rotate(rad + mrad)
    // 分针比时针细
    ctx.setLineWidth(6)
    ctx.setLineCap('round')
    ctx.moveTo(0, 10)
    // 一开始的位置指向12点的方向，长度为3 * R / 4
    ctx.lineTo(0, (-3 * R) / 4)
    ctx.stroke()
    ctx.closePath()
    ctx.restore()
  },

  // 画秒针
  drawSecond(second, msecond) {
    ctx.save()
    ctx.beginPath()
    // 根据秒数确定大的偏移
    const rad = ((2 * Math.PI) / 60) * second
    // 1000ms=1s所以这里多除个1000
    const mrad = ((2 * Math.PI) / 60 / 1000) * msecond
    ctx.rotate(rad + mrad)
    ctx.setLineWidth(4)
    // 设置线条颜色为红色，默认为黑色
    ctx.setStrokeStyle('red')
    ctx.setLineCap('round')
    ctx.moveTo(0, 12)
    ctx.lineTo(0, -R)
    ctx.stroke()
    ctx.closePath()
    ctx.restore()
  },

  //画出中间那个灰色的圆
  drawDot() {
    ctx.beginPath()
    ctx.arc(0, 0, 8, 0, 2 * Math.PI, false)
    ctx.setFillStyle('lightgrey')
    ctx.fill()
    ctx.closePath()
  },

  drawClock() {
    // 实时获取各个参数
    const now = new Date()
    const hour = now.getHours()
    const minute = now.getMinutes()
    const second = now.getSeconds()
    const msecond = now.getMilliseconds()
    // 把原点的位置移动到屏幕中间，及宽的一半，高的一半
    ctx.translate(width / 2, height * 0.19)
    // 依次执行各个方法
    this.drawBackground()
    this.drawHoursNum()
    // drawdots();
    this.drawHour(hour, minute)
    this.drawMinute(minute, second)
    this.drawSecond(second, msecond)
    this.drawDot()
    // 微信小程序要多个draw才会画出来，所以在最后画出
    ctx.draw()
  },
  createClock() {
    //时钟操作
    ctx = wx.createCanvasContext('clock')
    // 设置文字对应的半径
    R = width / 2 - 116
    // 执行Clock这个方法，实际上执行了所有步骤
    // 每40ms执行一次drawClock()，人眼看来就是流畅的画面
    clockInterval = setInterval(this.drawClock, 40)
  }
})
