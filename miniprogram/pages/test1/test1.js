// miniprogram/pages/test1/test1.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    progress:[
      {
        title:'出生',
        desc:'描述1',
        icon:''
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
    ]
  },

uploadMottos(){
wx.cloud.callFunction({
  name:'saveMotto',
  data:{
    $url:'uploadMottos',
    mottos: ['敢于面对困境的人，生命因此坚强；敢于挑战逆境的人，生命因此茁壮。', '所有漂亮的结果都是在行动中，收获的你不需要很厉害才能开始，但你需要开始才能变得很厉害。', '只有你学会把自己已有的成绩都归零，才能腾出空间去接纳更多的新东西，如此才能使自己不断的超越自己。', '伟大的事业不是靠力气速度和身体的敏捷完成的，而是靠性格意志和知识的力量完成的。', '沉浸于现实的忙碌之中，没有时间和精力思念过去，成功也就不会太远了。', '生活比你想象的要容易得多，只要学会接受那些不可接受的，放弃那些不愿放弃的，容忍那些不可容忍的。', '你要求的次数愈多，你就越容易得到你要的东西，而且连带地也会得到更多乐趣。', '没有平日的失败，就没有最终的成功。重要的是分析失败原因并吸取教训。', '没有一颗心会因为追求梦想而受伤，当你真心想要某样东西时，整个宇宙都会联合起来帮你完成。', '所有的困难都是上天给你预设的劫难，使你坚强，所有的挫折都会让你吃一堑长一智，使你充实让你睿智。不经历了风雨，哪能见到彩虹，不尝过人生百味，哪能懂得人生的真谛。', '这世界根本没有绝对的公平，车走车路，马走马路，凭真本事是竞争的砝码，长袖善舞，懂得敷衍，也是竞争的手段，无可厚非，就看你要什么，坚守什么。', '只要有一种无穷的自信充满了心灵，再凭着坚强的意志和独立不羁的才智，总有一天会成功的。', '只要路是对的，就不害怕遥远。只要认准是值得的，就不在乎沧桑变化。', '无论你觉得自己多么的了不起，也永远有人比你更强；无论你觉得自己多么的不幸，永远有人比你更加不幸。', '成功不会向我们走来，我们必须走向胜利；智慧不会向我们走来，我们必须勤奋思索；快乐不会向我们走来，我们必须用心体验。', '所有的胜利，与征服自己的胜利比起来，都是微不足道；所有的失败，与失去自己的失败比起来，更是微不足道。', '每个人都有潜在的能量，只是很容易被习惯所掩盖，被时间所迷离，被惰性所消磨。', '很难说什么是办不到的事情，因为昨天的梦想，可以是今天的希望，并且还可以成为明天的现实。','解决问题只有两条途径。要么改变这个问题，要么改变你的态度，去接受它。']
  }
}).then((res)=>{
  console.log(res)
})
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  edit(e){
    console.log(e.currentTarget.dataset.milepost)
  },
  getToken() {
    wx.login({
      success: (res) => {
        console.log(res.code)
        let code = res.code
        wx.request({
          url: `http://47.115.14.10/index.php/api/v1/token/user`,
          data: {
            code: code
          },
          method: 'POST',
          success: (res) => {
            console.log(res)
          }
        })
      }
    })
  },
  getAllow() {
    wx.requestSubscribeMessage({
      tmplIds: ['eGOzRvbdm1Uc8mMArg8O5M3e4z8OC41ZjD7YDv3yvLA'], //这里填入我们生成的模板id
      success(res) {
        console.log('授权成功', res)
      },
      fail(res) {
        console.log('授权失败', res)
      }
    })
  },
  sendNews(){
    console.log(123)
wx.cloud.callFunction({
  name:'getUserTime',
  data:{
  $url:'sendNews'
  }
 
}).then((res)=>{
  console.log(res)
})
  },
  getopenid(){
  wx.cloud.callFunction({
    name:'getUserTime',
    data:{
      $url:'getOpenid'
    }
  }).then((res)=>{
    console.log(res)
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