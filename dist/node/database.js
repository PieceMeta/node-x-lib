import _Promise from 'babel-runtime/core-js/promise';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import Datastore from 'nedb';

var Database = function () {
  function Database() {
    _classCallCheck(this, Database);
  }

  _createClass(Database, [{
    key: 'Database',
    value: function Database(filename, schema) {
      var autoload = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      this._db = new Datastore({ filename: filename, autoload: autoload });
      this._schema = schema;
      this._loaded = autoload;
      this._commandWhitelist = ['find', 'findOne', 'put', 'remove'];
    }
  }, {
    key: 'loadDatabase',
    value: function loadDatabase() {
      var _this = this;

      return new _Promise(function (resolve, reject) {
        _this._db.loadDatabase(function (err) {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
    }
  }, {
    key: 'execute',
    value: function execute(command, args) {
      var _this2 = this;

      if (typeof this[command] !== 'function' || this._commandWhitelist.indexOf(command) === -1) {
        throw new Error('Bad DB command: ' + command);
      }
      if (command === 'put') {
        if (typeof options === 'undefined') {
          args.options = {};
        }
        if (typeof args.options.upsert === 'undefined') {
          args.options.upsert = true;
        }
      }
      return new _Promise(function (resolve, reject) {
        var cb = function cb(err, docs) {
          if (_this2._handleError(err, reject)) {
            _this2._handleResult(docs, resolve);
          }
        };
        if (command === 'put') {
          return _this2._db[command](args.query, args.payload, args.options, cb);
        }
        return _this2._db[command](args.query, cb);
      });
    }
  }, {
    key: '_handleError',
    value: function _handleError(err, reject) {
      if (err) {
        console.error('Database error: ' + err.message + ' Code: ' + err.code);
        reject(err);
        return false;
      }
      return true;
    }
  }, {
    key: '_handleResult',
    value: function _handleResult(data, resolve) {
      resolve(data);
      return true;
    }
  }, {
    key: 'isDatabaseLoaded',
    get: function get() {
      return this._loaded;
    },
    set: function set(val) {
      console.warn('Refusing to set db load state to ' + val);
    }
  }]);

  return Database;
}();

export default Database;