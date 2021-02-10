// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const TcbRouter = require('tcb-router')
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const app= new TcbRouter({
    event
  })
  //作者上传格言推荐列表
  app.router('uploadMottos', async (ctx, next) => {
    let mottos = event.mottos
    ctx.body = await db.collection('motto').where({
      _openid: wxContext.OPENID
    }).update({
      data: {
        motto: mottos
      }
    }).then((res) => {
      console.log(res)
      return 'this is ok!'
    }).catch(console.error)
  })
  //用户修改格言
  app.router('changeMotto',async (ctx,next)=>{
    let motto =event.motto
    let mottoShow=event.mottoShow
    ctx.body =await db.collection('birthday').where({
      _openid: wxContext.OPENID
    }).update({
      data:{
        motto: motto,
        mottoShow:mottoShow
      }
    }).then((res)=>{
      return 'this is ok!'
    }).catch(console.error)
  })

  //用户修改格言是否显示
  app.router('changeMottoShow', async (ctx, next) => {
    let motto = event.motto
    let mottoShow = event.mottoShow
    ctx.body = await db.collection('birthday').where({
      _openid: wxContext.OPENID
    }).update({
      data: {
        mottoShow: mottoShow
      }
    }).then((res) => {
      return 'this is ok!'
    }).catch(console.error)
  })


  return app.serve()


//   return {
//     // event,
//     // openid: wxContext.OPENID,
//     // appid: wxContext.APPID,
//     // unionid: wxContext.UNIONID,
//     ok
//   }
}