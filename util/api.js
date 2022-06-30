import md5 from './md5.min.js'

const appid = '20220630001260336'
const key = 'dJGuU0tC59ZhdWIJSXVU'

function translate(q, { from = 'auto', to = 'auto' } = { from: 'auto', to: 'auto' }) {
  return new Promise((resolve, reject) => {
    let salt = Date.now()
    let sign = md5(`${appid}${q}${salt}${key}`)
    wx.request({
      url: 'https://fanyi-api.baidu.com/api/trans/vip/translate',
      data: {
        q,
        from,
        to,
        appid,
        salt,
        sign
      },
      success(res) {
        if (res.data && res.data.trans_result) {
          resolve(res.data)
        } else {
          reject({ status: 'error', msg: '翻译失败' })
          wx.showToast({
            title: '翻译失败',
            icon: 'none',
            duration: 3000
          }) 
          /**
           wx.showToast(Object object)显示消息提示框,	duration,提示的延迟时间
          注意:
            wx.showLoading 和 wx.showToast 同时只能显示一个
            wx.showToast 应与 wx.hideToast 配对使用
          **/
        }
      },
      fail() {
        reject({ status: 'error', msg: '翻译失败' })
        wx.showToast({
          title: '网络异常',
          icon: 'none',
          duration: 3000
        })
      }
    })
  })
}
module.exports.translate = translate