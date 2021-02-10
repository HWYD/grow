// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

 const result =await cloud.openapi.wxacode.getUnlimited({
    scene:wxContext.OPENID,
   lineColor: {
     'r': 0,
     'g': 0,
     'b': 128
   },
  })
  
const upload =await  cloud.uploadFile({
  cloudPath:'myCode/'+Date.now()+'-'+Math.random()+'.png',
  fileContent:result.buffer
})
  return upload.fileID



// console.log(result)

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}