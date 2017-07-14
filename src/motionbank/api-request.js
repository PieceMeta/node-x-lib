import request from 'superagent'

class ApiRequest {
  constructor (config) {
    this._config = {
      piecemaker: {
        email: config.piecemaker.email,
        password: config.piecemaker.password,
        token: null
      },
      mosys: {
        email: config.piecemaker.email,
        password: config.piecemaker.password,
        token: null
      }
    }
  }

  authenticatePiecemakerRequest (req) {
    if (typeof this._config.piecemaker.token === 'string') {
      return req.headers('X-Authentication', this._config.piecemaker.token)
    }
    return request
      .post(`${this._config.piecemaker.host}/api/v1/users/login.json`, {
        email: this._config.piecemaker.email,
        password: this._config.piecemaker.password
      })
      .then(res => {
        this._config.piecemaker.token = res.data.token
        return req.headers('X-Authentication', this._config.piecemaker.token)
      })
      .catch(err => {
        throw err
      })
  }

  authenticateMosysRequest (req) {
    if (typeof this._config.mosys.token === 'string') {
      return req.headers('X-Authentication', this._config.mosys.token)
    }
    return request
      .post(`${this._config.mosys.host}/api/v1/users/login.json`, {
        email: this._config.mosys.email,
        password: this._config.mosys.password
      })
      .then(res => {
        this._config.mosys.token = res.data.token
        return req.headers('X-Authentication', this._config.mosys.token)
      })
      .catch(err => {
        throw err
      })
  }

  getCell (id, payload) {
    const req = request.get(`${this._config.mosys.host}/api/v1/cells/${id}.json`, payload)
    return this.authenticateMosysRequest(req)
      .catch(err => {
        throw err
      })
  }

  createCell (payload) {
    const req = request.post(`${this._config.mosys.host}/api/v1/cells.json`, payload)
    return this.authenticateMosysRequest(req)
      .catch(err => {
        throw err
      })
  }

  updateCell (id, payload) {
    const req = request.put(`${this._config.mosys.host}/api/v1/cells/${id}.json`, payload)
    return this.authenticateMosysRequest(req)
      .catch(err => {
        throw err
      })
  }

  getEvent (id, payload) {
    const req = request.get(`${this._config.piecemaker.host}/api/v1/events/${id}.json`, payload)
    return this.authenticatePiecemakerRequest(req)
      .catch(err => {
        throw err
      })
  }

  createEvent (payload) {
    const req = request.post(`${this._config.piecemaker.host}/api/v1/events.json`, payload)
    return this.authenticatePiecemakerRequest(req)
      .catch(err => {
        throw err
      })
  }

  updateEvent (id, payload) {
    const req = request.put(`${this._config.piecemaker.host}/api/v1/events/${id}.json`, payload)
    return this.authenticatePiecemakerRequest(req)
      .catch(err => {
        throw err
      })
  }
}

export default ApiRequest
