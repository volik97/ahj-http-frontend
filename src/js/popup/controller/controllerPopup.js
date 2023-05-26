import Popup from '../popup'

export default class PopupCntrl {
  constructor () {
    this.type = null
  }

  closeModalWindow (node) {
    node.parentElement.remove(node.parentElement)
  }

  openModalWindow (type, name = null, description = null) {
    this.type = type
    if ((name, description)) {
      const popup = new Popup(type)
      document.body.insertAdjacentHTML(
        'beforeend',
        popup.renderPopup(name, description)
      )
    } else {
      const popup = new Popup(type)
      document.body.insertAdjacentHTML('beforeend', popup.renderPopup())
    }
  }
}
