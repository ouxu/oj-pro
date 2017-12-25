/**
 * Created by out_xu on 17/10/29.
 */
import scrollToView from 'scroll-into-view'
const scrollToAnchor = (anchorName) => {
  if (anchorName) {
    let anchorElement = document.getElementById(anchorName)
    if (anchorElement) { scrollToView(anchorElement) }
  }
}

export default scrollToAnchor
