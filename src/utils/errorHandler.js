import codeHelper from './codeHelper'
import message from 'utils/message'

export default (error, dispatch) => {
  if (error.message >= 400) {
    switch (+error.message) {
      case 1004:
        dispatch({type: 'user/logout'})
        break
      case 1013:
        dispatch({type: 'user/logout'})
        break
      case 6001:
        window.history.go(-1)
        break
      default:
        break
    }
    message.error(codeHelper(error.message))
  } else {
    console.error('top:->', error)
  }
}
