import { alert } from 'notie'

class Message {
  static noticeAlert (type, text, opt) {
    alert({
      type,
      text,
      ...opt
    })
  }

  static success (text, opt) {
    this.noticeAlert('info', text, opt)
  }

  static error (text, opt) {
    this.noticeAlert('error', text, opt)
  }

  static warning (text, opt) {
    this.noticeAlert('warning', text, opt)
  }

  static info (text, opt) {
    this.noticeAlert('info', text, opt)
  }

  static neutral (text, opt) {
    this.noticeAlert('neutral', text, opt)
  }
}

export default Message
