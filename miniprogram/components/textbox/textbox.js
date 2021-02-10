// components/textbox/textbox.js
let content=''
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    textlength:{
      type: Number,
      value: 50
    },
    placeholder:{
        type:String,
        value:'请输入'
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onInput(event) {
      console.log(event)
      content = event.detail.value
      let wordnum = event.detail.value.length
      this.setData({
        wordnum
      })
       this.triggerEvent('textdetail',content)
    },
   
  }
})
