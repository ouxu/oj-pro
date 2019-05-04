import codeHelper from './codeHelper'
import message from 'utils/message'

const noop = () => null

export default (error, dispatch = noop) => {
  if (error.message >= 400) {
    switch (+error.message) {
      case 1004:
        dispatch({ type: 'user/logout' })
        break
      case 1013:
        dispatch({ type: 'user/logout' })
        break
      default:
        break
    }
    message.error(codeHelper(error.message))
  } else {
    console.error('top:->', error)
  }
  error && error.preventDefault && error.preventDefault()
}
