export default class Api {
  constructor () {
    this.options = null
    this.url = 'http://localhost:7070/'
  }

  sendRequest (name, id = null, form = null) {
    if (id && form) {
      const url = this.url + `?method=${name}&id=${id}`
      this.options = {
        method: 'POST',
        body: form
      }
      return this.createRequest(url, this.options)
    } else if (form) {
      const url = this.url + `?method=${name}`
      this.options = {
        method: 'POST',
        body: form
      }
      return this.createRequest(url, this.options)
    } else if (id) {
      const url = this.url + `?method=${name}&id=${id}`
      return this.createRequest(url)
    } else {
      const url = this.url + `?method=${name}`
      return this.createRequest(url)
    }
  }

  async createRequest (url, options = undefined) {
    const response = await fetch(url, options)
    return response.json()
  }
}
