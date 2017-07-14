import Datastore from 'nedb'

class Database {
  Database (filename, schema, autoload = true) {
    this._db = new Datastore({filename: filename, autoload: autoload})
    this._schema = schema
    this._loaded = autoload
    this._commandWhitelist = ['find', 'findOne', 'put', 'remove']
  }

  loadDatabase () {
    return new Promise((resolve, reject) => {
      this._db.loadDatabase(err => {
        if (err) {
          return reject(err)
        }
        resolve()
      })
    })
  }

  get isDatabaseLoaded () {
    return this._loaded
  }

  set isDatabaseLoaded (val) {
    console.warn(`Refusing to set db load state to ${val}`)
  }

  execute (command, args) {
    if (typeof this[command] !== 'function' || this._commandWhitelist.indexOf(command) === -1) {
      throw new Error(`Bad DB command: ${command}`)
    }
    if (command === 'put') {
      if (typeof options === 'undefined') {
        args.options = {}
      }
      if (typeof args.options.upsert === 'undefined') {
        args.options.upsert = true
      }
    }
    return new Promise((resolve, reject) => {
      const cb = (err, docs) => {
        if (this._handleError(err, reject)) {
          this._handleResult(docs, resolve)
        }
      }
      if (command === 'put') {
        return this._db[command](args.query, args.payload, args.options, cb)
      }
      return this._db[command](args.query, cb)
    })
  }

  _handleError (err, reject) {
    if (err) {
      console.error(`Database error: ${err.message} Code: ${err.code}`)
      reject(err)
      return false
    }
    return true
  }

  _handleResult (data, resolve) {
    resolve(data)
    return true
  }
}

export default Database
