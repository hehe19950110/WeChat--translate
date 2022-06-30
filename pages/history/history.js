const app = getApp()

Page({
  data: {
    history: []
  }, //历史记录页面的初始数据为空数组

  onLoad: function (options) {
  }, //生命周期函数--监听页面加载

  onShow: function () {
    this.setData({ history: wx.getStorageSync('history')})
  },

  onTapItem: function(e) {
    wx.reLaunch({
      url: `/pages/index/index?query=${e.currentTarget.dataset.query}` //带着选中数据跳转至首页
    }) 
    /** 
    wx.reLaunch(Object object),关闭所有页面，打开到应用内的某个页面
    url必填属性，需要跳转的应用内页面路径 (代码包路径)，路径后可以带参数。
    参数与路径之间使用?分隔，参数键与参数值用=相连，不同参数用&分隔；如 'path?key=value&key2=value2'
    **/

  },

  onHide: function () {
  }, //生命周期函数--监听页面隐藏

  onUnload: function () {
  }, //生命周期函数--监听页面卸载

  onPullDownRefresh: function () {
  }, //页面相关事件处理函数--监听用户下拉动作

  onReachBottom: function () {
  }, //页面上拉触底事件的处理函数

  onShareAppMessage: function () {
  } //用户点击右上角分享
})