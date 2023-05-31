import Api from './api/api'
import PopupCntrl from './popup/controller/controllerPopup'
import TicketCtnrl from './tickets/ticketscntrl'

export default class App {
  constructor () {
    this.api = new Api()
    this.ticketController = new TicketCtnrl()
    this.popupController = new PopupCntrl()
  }

  async bindToDOM () {
    const tickets = await this.api.sendRequest('allTickets')
    const ticketsWrapper = document.getElementsByClassName('tickets')
    tickets.forEach(element => {
      ticketsWrapper[0].insertAdjacentHTML('afterbegin', this.ticketController.createTicket(element.id, element.name, element.created, element.status))
    })
  }

  descriptionViewer (e) {
    if (e.target.classList.contains('active')) {
      return this.ticketController.closeDescription(e.target)
    }
    if (
      e.target.classList.contains('title') &&
      e.target.tagName.toLowerCase() === 'a'
    ) {
      const target = e.target
      const id = e.target.parentElement.parentElement.getAttribute('id')
      this.api.sendRequest('ticketByID', id).then((data) => {
        this.ticketController.showDescription(data.description, target)
      })
    }
  }

  async changeStatus(id){
    const result = await this.api.sendRequest('changeStatus', id)
    console.log(result)
  }

  async submitFunction (e) {
    e.preventDefault()
    const typeSubmit = e.target.id
    switch (typeSubmit) {
      case 'createTicket':
        try {
          const tickets = document.getElementsByClassName('tickets')
          const form = new FormData(document.querySelector('form'))
          const result = await this.api.sendRequest(e.target.id, null, form)
          this.popupController.closeModalWindow(document.querySelector('form'))
          console.log(result)
          return tickets[0].insertAdjacentHTML(
            'afterbegin',
            this.ticketController.createTicket(
              result.id,
              result.name,
              result.created
            )
          )
        } catch (err) {
          console.log(err)
        }
        return
      case 'editTicket':
        try {
          const ticket = Array.from(
            document.getElementsByClassName('ticket')
          ).find((item) => item.id === this.ticketController.idTicket)
          const form = new FormData(document.querySelector('form'))
          const result = await this.api.sendRequest(
            e.target.id,
            ticket.id,
            form
          )
          const ticketInApi = result.find((item) => item.id === ticket.id)
          const title = ticket.querySelector('a')
          title.textContent = ticketInApi.name
          this.popupController.closeModalWindow(document.querySelector('form'))
        } catch (err) {
          console.log(err)
        }
        return
      case 'deleteTicket':
        try {
          const ticket = Array.from(
            document.getElementsByClassName('ticket')
          ).find((item) => item.id === this.ticketController.idTicket)
          await this.api.sendRequest(e.target.id, ticket.id)
          ticket.remove(ticket)
          this.popupController.closeModalWindow(document.querySelector('form'))
        } catch {}
    }
  }

  events () {
    this.bindToDOM()
    this.ticketController.events()
    document.addEventListener('click', (e) => this.descriptionViewer(e))
    document.addEventListener('submit', async (e) => this.submitFunction(e))
    document.addEventListener('change', (e) => {
      this.changeStatus(e.target.parentElement.id)
    })
  }
}

const app = new App()
app.events()
