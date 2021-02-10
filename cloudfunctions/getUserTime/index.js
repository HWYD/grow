// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const TcbRouter =require('tcb-router')
const db =cloud.database()
const birthCollection =db.collection('birthday')

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const app =new TcbRouter({
    event
  })
  app.router('saveTime',async(ctx,next)=>{
    let birthday = event.birthday
    const ishave =await  birthCollection.where({
      _openid:wxContext.OPENID
    }).get().then((res)=>{
    return  res.data
    })
  let ok =false
    if(ishave.length==0){
      // console.log('没有')
    await  birthCollection.add({
        data:{
          birthday,
          _openid:wxContext.OPENID,
          createTime:db.serverDate(),

        }
      })
    }
    else{
      console.log('有')
      await birthCollection.where({
        _openid: wxContext.OPENID
      }).update({
        data :{
          birthday:birthday
        }
      }).then((res)=>{
        console.log(res)
      })
    }
  })



  //获取用户日期数据
  app.router('getBirthday',async(ctx,next)=>{
  ctx.body= await birthCollection.where({
   _openid:wxContext.OPENID
   }).get().then((res)=>{
     return res.data
   })
  })

  //返回openid
  app.router('getOpenid',async(ctx,next)=>{
    ctx.body = wxContext.OPENID
  })
  

app.router('getbgImg',async(ctx,next)=>{
  ctx.body= await db.collection('banner').where({
    _id: 'fbaae60c-88e4-4516-924f-d73f28598421'
  }).get().then((res)=>{
    return res.data
  })
})
app.router('sendNews',async(ctx,next)=>{
  let _openid = wxContext.OPENID
  try {
    const result1 = await cloud.openapi.subscribeMessage.send({
      touser: _openid,
      page: 'pages/plan/plan',
      lang: 'zh_CN',
      data: {
        name3: {
          value: '339208499'
        },
        thing1: {
          value: '2015年01月05日'
        },
        date4: {
          value: '2015年01月05日'
        },
        thing2: {
          value: '广州市新港中路397号'
        }
      },
      templateId: 'eGOzRvbdm1Uc8mMArg8O5M3e4z8OC41ZjD7YDv3yvLA',
      miniprogramState: 'developer'
    })
    console.log(123445)
    console.log(result1)
    return result1
  } catch (err) {
    console.log(err)
    return err
  }

})


 return app.serve()
}