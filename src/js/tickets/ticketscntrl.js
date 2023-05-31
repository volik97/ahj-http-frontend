import PopupCntrl from '../popup/controller/controllerPopup'
import Api from '../api/api'

export default class TicketCtnrl {
  constructor () {
    this.popup = new PopupCntrl()
    this.api = new Api()
    this.bodyTickets = document.querySelector('div')
    this.idTicket = null
  }

  createTicket (id, name, created, status) {
    return `<div class="ticket" id="${id}">
    <input type="checkbox" class="checkbox" ${status ? 'checked' : ''}>
    <div class="bodyTicket">  
      <a class="title">${name}</a>
    </div>
    <a class="date">${created}</a>
    <button class="btn editTicket"></button>
    <button class="btn deleteTicket"></button>
  </div>`
  }

  showDescription (description, e) {
    e.classList.add('active')
    const descriptionBlock = document.createElement('a')
    descriptionBlock.classList.add('description')
    descriptionBlock.textContent = description
    e.parentElement.insertAdjacentElement('beforeend', descriptionBlock)
  }

  closeDescription (e) {
    e.classList.remove('active')
    e.nextElementSibling.remove()
  }

  openPopup (e, name = null, description = null) {
    if (e.target.tagName.toLowerCase() === 'button') {
      if ((name, description)) {
        this.popup.openModalWindow(e.target.classList[1], name, description)
        this.form = document.querySelector('form')
        this.form.addEventListener('click', (event) => {
          if (event.target.classList.contains('cancel-btn')) {
            this.popup.closeModalWindow(this.form)
          }
        })
        return
      }
      this.popup.openModalWindow(e.target.classList[1])
      this.form = document.querySelector('form')
      this.form.addEventListener('click', (event) => {
        if (event.target.classList.contains('cancel-btn')) {
          this.popup.closeModalWindow(this.form)
        }
      })
    }
  }

  events () {
    this.bodyTickets.addEventListener('click', async (e) => {
      if (e.target.parentElement.hasAttribute('id')) {
        this.idTicket = e.target.parentElement.getAttribute('id')
      }
      if (e.target.classList.contains('editTicket')) {
        const id = e.target.parentElement.getAttribute('id')
        const { name, description } = await this.api.sendRequest(
          'ticketByID',
          id
        )
        this.openPopup(e, name, description)
        return
      }
      this.openPopup(e)
    })
  }
}
