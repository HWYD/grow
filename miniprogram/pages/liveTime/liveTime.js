// miniprogram/pages/liveTime/liveTime.js
const db = wx.cloud.database()
let userTime=''
let inval
let width
let height
let isgotoMotto=true
Page({
  /**
   * 页面的初始数据
   */
  data: {
   timeList:[
     {
       name:'年',
       value:'--',
     }, {
       name: '月',
       value: '--',
     }, {
       name: '周',
       value: '--',
     }, {
       name: '天',
       value: '--',
     }, {
       name: '小时',
       value: '--',
     }, {
       name: '分钟',
       value: '--',
     }, {
       name: '秒',
       value: '--',
     }],
    yearFixed: '--',
    isShow:false,
    birthday:'',
    motto:'',
    mottoShow:true
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取系统信息  
    wx.getSystemInfo({
      //获取系统信息成功，将系统窗口的宽高赋给页面的宽高  
      success:  (res)=> {
       width = res.windowWidth
        // console.log(that.width)   375
       height = res.windowHeight
        // console.log(that.height)  625
        // 这里的单位是PX，实际的手机屏幕有一个Dpr，这里选择iphone，默认Dpr是2
      }
    })
    this.getbirth()   
  }, 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.drawClock();
    // 每40ms执行一次drawClock()，人眼看来就是流畅的画面
    this.interval = setInterval(this.drawClock, 40);
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

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getbirth()
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

  },
  //切换界面
  onChange() {
    this.setData({
      isShow: !this.data.isShow
    })
  },
  //获取用户时间
  getbirth() {
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'getUserTime',
      data: {
        $url: 'getBirthday'
      }
    }).then((res) => {
      if (res.result.length == 0) {
        wx.hideLoading()
        wx.showModal({
          title: '没有设置日期哦~',
        })
        clearInterval(inval)
      }
      else {
        userTime = res.result[0].birthday
        inval = setInterval(() => {
          this.calculate()
        }, 1000)
        wx.hideLoading()
        console.log(inval)
      }
      wx.stopPullDownRefresh()
    })
  },
  //用户设置时间
  bindDateChange(e) {
    this.savebirth(e.detail.value)
    isgotoMotto =true
  },
  //保存用户的出生日期
  savebirth(time) {
    wx.cloud.callFunction({
      name: 'getUserTime',
      data: {
        $url: 'saveTime',
        birthday: time
      }
    }).then((res) => {
      console.log(res)
      // clearInterval(inval)
      // this.getbirth()
      userTime = time
      inval = setInterval(() => {
        this.calculate()
      }, 1000)
    })
  },
  //计算所有时间
  calculate() {
    let birthTime = new Date(userTime)
    let nowTime = new Date()
    let betweenTime = nowTime - birthTime
    let tmpVal = 1000 * 60 * 60 * 24
    //计算相差年月周等
    let yearFixed = (betweenTime / (tmpVal * 365)).toFixed(8)
    let year = Math.floor(betweenTime / (tmpVal * 365))
    let month = (nowTime.getFullYear() * 12 + nowTime.getMonth()) - (birthTime.getFullYear() * 12 + birthTime.getMonth())
    let week = Math.floor(betweenTime / (tmpVal * 7))
    let day = Math.ceil(betweenTime / tmpVal)
    let hours = Math.ceil(betweenTime / (tmpVal / 24))
    let minutes = Math.ceil(betweenTime / 60000)
    let seconds = Math.ceil(betweenTime / 1000)
    this.setData({
      birthday: userTime,
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
  //获取格言详情
  getMottodetail() {
    wx.cloud.callFunction({
      name: 'getUserTime',
      data: {
        $url: 'getBirthday'
      }
    }).then((res) => {
      console.log(res)
      if (res.result.length == 0) {
        isgotoMotto = false
        this.setData({
          motto: '人生中有些事你不竭尽所能去做，你永远不知道你自己有多出色。'
        })
        return
      }
      else {
        if (res.result[0].motto) {
          console.log('有')
          this.setData({
            motto: res.result[0].motto,
            mottoShow: res.result[0].mottoShow
          })
        }
        else {
          console.log('没有')
          this.setData({
            motto: '人生中有些事你不竭尽所能去做，你永远不知道你自己有多出色。'
          })
          this.setFirMotto()
        }
      }
    })
  },
  //为用户初次设置格言
  setFirMotto() {
    let newMotto = '人生中有些事你不竭尽所能去做，你永远不知道你自己有多出色。'
    wx.cloud.callFunction({
      name: 'saveMotto',
      data: {
        $url: 'changeMotto',
        motto: newMotto,
        mottoShow: this.data.mottoShow
      }
    }).then((res) => {
      console.log(res)
    })
  },
  //跳转格言页面
  gotoMotto(event) {
    console.log(event.target.dataset.motto)
    let newMotto = event.target.dataset.motto
    if (isgotoMotto) {
      wx.navigateTo({
        url: `../setMotto/setMotto?placeholder=${newMotto}`
      })
    }
    else {
      wx.showToast({
        title: '请先设置日期',
        image: '../../images/smile12.png'
      })
    }
  },

 // 所有的canvas属性以及Math.sin,Math.cos()等涉及角度的参数都是用弧度表示
  // 时钟
  drawClock: function () {
    const ctx = wx.createCanvasContext('clock');
    // var height = this.height;
    // var width = this.width;
    //  console.log(height+'哦'+width)

    // 设置文字对应的半径
    var R = width / 2 - 116;
    // 把原点的位置移动到屏幕中间，及宽的一半，高的一半
    ctx.translate(width / 2, height *0.19);

    // 画外框
    function drawBackground() {
      // 设置线条的粗细，单位px
      ctx.setLineWidth(5);
      // 开始路径
      ctx.beginPath();
      // ctx.setStrokeStyle('pink');
      // 运动一个圆的路径
      // arc(x,y,半径,起始位置，结束位置，false为顺时针运动)
      ctx.arc(0, 0, width / 2 - 100, 0, 2 * Math.PI, false);
      ctx.closePath();
      // 描出点的路径
      ctx.stroke();
    };

    // 画时钟数
    function drawHoursNum() {
      ctx.setFontSize(18);
      // 圆的起始位置是从3开始的，所以我们从3开始填充数字
      var hours = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
      hours.forEach(function (hour, i) {
        var rad = (2 * Math.PI / 12) * i;
        var x = R * Math.cos(rad);
        var y = R * Math.sin(rad);
        // 因为微信小程序不支持BaseLine这个属性，所以这里我们只能自己手动调整位置
        if (hour == 12) {
          ctx.fillText(hour, x - 11, y + 6);
        } else if (hour == 6) {
          ctx.fillText(hour, x - 5, y + 6);
        } else {
          ctx.fillText(hour, x - 6, y + 6);
        }
      })
    };

    // 画数字对应的点
    function drawdots() {
      for (let i = 0; i < 60; i++) {
        var rad = 2 * Math.PI / 60 * i;
        var x = (R + 15) * Math.cos(rad);
        var y = (R + 15) * Math.sin(rad);
        ctx.beginPath();
        // 每5个点一个比较大
        if (i % 5 == 0) {
          ctx.arc(x, y, 2, 0, 2 * Math.PI, false);
        } else {
          ctx.arc(x, y, 1, 0, 2 * Math.PI, false);
        }
        ctx.setFillStyle('black');
        ctx.fill();
      }
      ctx.closePath();
    }

    // 画时针
    function drawHour(hour, minute) {
      // 保存画之前的状态
      ctx.save();
      ctx.beginPath();
      // 根据小时数确定大的偏移
      var rad = 2 * Math.PI / 12 * hour;
      // 根据分钟数确定小的偏移
      var mrad = 2 * Math.PI / 12 / 60 * minute;
      // 做旋转
      ctx.rotate(rad + mrad);
      ctx.setLineWidth(8);
      // 设置线条结束样式为圆
      ctx.setLineCap('round');
      // 时针向后延伸8个px；
      ctx.moveTo(0, 8);
      // 一开始的位置指向12点的方向，长度为R/2
      ctx.lineTo(0, -R / 2);
      ctx.stroke();
      ctx.closePath();
      // 返回画之前的状态
      ctx.restore();
    }

    // 画分针
    function drawMinute(minute, second) {
      ctx.save();
      ctx.beginPath();
      // 根据分钟数确定大的偏移
      var rad = 2 * Math.PI / 60 * minute;
      // 根据秒数确定小的偏移
      var mrad = 2 * Math.PI / 60 / 60 * second;
      ctx.rotate(rad + mrad);
      // 分针比时针细
      ctx.setLineWidth(6);
      ctx.setLineCap('round');
      ctx.moveTo(0, 10);
      // 一开始的位置指向12点的方向，长度为3 * R / 4
      ctx.lineTo(0, -3 * R / 4);
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    }

    // 画秒针
    function drawSecond(second, msecond) {
      ctx.save();
      ctx.beginPath();
      // 根据秒数确定大的偏移
      var rad = 2 * Math.PI / 60 * second;
      // 1000ms=1s所以这里多除个1000
      var mrad = 2 * Math.PI / 60 / 1000 * msecond;
      ctx.rotate(rad + mrad);
      ctx.setLineWidth(4);
      // 设置线条颜色为红色，默认为黑色
      ctx.setStrokeStyle('red');
      ctx.setLineCap('round');
      ctx.moveTo(0, 12);
      ctx.lineTo(0, -R);
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    }

    //画出中间那个灰色的圆
    function drawDot() {
      ctx.beginPath();
      ctx.arc(0, 0, 8, 0, 2 * Math.PI, false);
      ctx.setFillStyle('lightgrey');
      ctx.fill();
      ctx.closePath();
    }

    function Clock() {
      // 实时获取各个参数
      var now = new Date();
      var hour = now.getHours();
      var minute = now.getMinutes()
      var second = now.getSeconds();
      var msecond = now.getMilliseconds();
      // 依次执行各个方法
      drawBackground();
      drawHoursNum();
      // drawdots();
      drawHour(hour, minute);
      drawMinute(minute, second);
      drawSecond(second, msecond);
      drawDot();
      // 微信小程序要多个draw才会画出来，所以在最后画出
      ctx.draw();
    }
    // 执行Clock这个方法，实际上执行了所有步骤
    Clock();
  }  
})