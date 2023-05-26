export default class Popup {
  constructor (type) {
    this.type = type
  }

  renderPopup (name = null, description = null) {
    switch (this.type) {
      case 'addTicket':
        return `
        <div class="modal">
          <form id="createTicket" action="">
            <fieldset>
              <legend>Добавить тикет</legend>
              <div class="form-field">
                <label for="title">Краткое описание</label>
                <input type="text" id="title" name="name" placeholder="Enter title" required/>
              </div>
              <div class="form-field">
                <label for="description">Подробное описание</label>
                <textarea id="description" name="description" placeholder="Enter description" required></textarea>
              </div>
              <button type="submit" id="addTicket" class="add-btn">Добавить</button>
              <button type="button" class="cancel-btn">Отмена</button>
            </fieldset>
          </form>
          </div>
        `
      case 'editTicket':
        return `
        <div class="modal">
            <form id="editTicket" action="">
              <fieldset>
                <legend>Редактировать тикет</legend>
                <div class="form-field">
                  <label for="title">Краткое описание</label>
                  <input type="text" id="title" name="name" placeholder="Enter title" value="${name}" required/>
                </div>
                <div class="form-field">
                  <label for="description">Подробное описание</label>
                  <textarea id="description" name="description" placeholder="Enter description">${description}</textarea>
                </div>
              <button type="submit" id="editTicket" class="edit-btn editTicket">Редактировать</button>
              <button class="cancel-btn">Отмена</button>
              </fieldset>
            </form>
          </div>
        `
      case 'deleteTicket':
        return `
        <div class="modal">
          <form id="deleteTicket">
          <fieldset>
          <legend>Удалить тикет</legend>
            <div class="text">Вы уверены, что хотите удалить тикет? Это действие необратимо.</div>
            <button type="submit" id="deleteTicket" class="delete-btn">Удалить</button>
            <button class="cancel-btn">Отмена</button>
          </fieldset>
          </div>
        `
    }
  }
}
