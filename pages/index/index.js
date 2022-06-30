import { translate } from '../../util/api.js'
const app = getApp()

Page({
  data: {
    query: '',
    hideClearIcon: true, //是否隐藏输入框右上角icon“X”，是
    result: [],  //用户输入信息后得到的一个数组
    curLang: {}  //当前选择的语言
  },

  onInput: function(e) {
    this.setData({'query': e.detail.value})  //获取到用户输入的信息
    if(this.data.query.length > 0) {
      this.setData({ 'hideClearIcon': false })
    }else{
      this.setData({ 'hideClearIcon': true })
    }  //根据输入框内是否有内容，来展示或者隐藏右上角icon“X”
    console.log('focus')
  },

  onLoad: function( options) {
    console.log('lonload..')
    console.log(options)
    if(options.query) {
      this.setData({ query: options.query })
    } //在历史页面，执行reLaunch(）跳转至首页，会执行onLoad，把历史页面的数据参数也一并跳转带来。（即 再次显示历史数据中的翻译需求及内容）
  },
  onShow: function () {
    if (this.data.curLang.lang !== app.globalData.curLang.lang) {
      this.setData({ curLang: app.globalData.curLang })
      this.onConfirm()
    } //如果当前的语言不等于之前设置的语言，那么 设置语言并执行onConfirm()
  },

  onTapClose: function() {
    this.setData({ query: '', hideClearIcon: true})
  },

  onConfirm: function() {
    if (!this.data.query) return
    translate(this.data.query, {from: 'auto', to: this.data.curLang.lang}).then(res=>{
      this.setData({'result': res.trans_result})
      let history = wx.getStorageSync('history')||[]
      history.unshift({ query: this.data.query, result: res.trans_result[0].dst})
      history.length = history.length > 10 ? 10 : history.length
      wx.setStorageSync('history', history)
    })
  }
})
