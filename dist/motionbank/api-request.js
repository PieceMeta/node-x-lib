import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import request from 'superagent';

var ApiRequest = function () {
  function ApiRequest(config) {
    _classCallCheck(this, ApiRequest);

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
    };
  }

  _createClass(ApiRequest, [{
    key: 'authenticatePiecemakerRequest',
    value: function authenticatePiecemakerRequest(req) {
      var _this = this;

      if (typeof this._config.piecemaker.token === 'string') {
        return req.headers('X-Authentication', this._config.piecemaker.token);
      }
      return request.post(this._config.piecemaker.host + '/api/v1/users/login.json', {
        email: this._config.piecemaker.email,
        password: this._config.piecemaker.password
      }).then(function (res) {
        _this._config.piecemaker.token = res.data.token;
        return req.headers('X-Authentication', _this._config.piecemaker.token);
      }).catch(function (err) {
        throw err;
      });
    }
  }, {
    key: 'authenticateMosysRequest',
    value: function authenticateMosysRequest(req) {
      var _this2 = this;

      if (typeof this._config.mosys.token === 'string') {
        return req.headers('X-Authentication', this._config.mosys.token);
      }
      return request.post(this._config.mosys.host + '/api/v1/users/login.json', {
        email: this._config.mosys.email,
        password: this._config.mosys.password
      }).then(function (res) {
        _this2._config.mosys.token = res.data.token;
        return req.headers('X-Authentication', _this2._config.mosys.token);
      }).catch(function (err) {
        throw err;
      });
    }
  }, {
    key: 'getCell',
    value: function getCell(id, payload) {
      var req = request.get(this._config.mosys.host + '/api/v1/cells/' + id + '.json', payload);
      return this.authenticateMosysRequest(req).catch(function (err) {
        throw err;
      });
    }
  }, {
    key: 'createCell',
    value: function createCell(payload) {
      var req = request.post(this._config.mosys.host + '/api/v1/cells.json', payload);
      return this.authenticateMosysRequest(req).catch(function (err) {
        throw err;
      });
    }
  }, {
    key: 'updateCell',
    value: function updateCell(id, payload) {
      var req = request.put(this._config.mosys.host + '/api/v1/cells/' + id + '.json', payload);
      return this.authenticateMosysRequest(req).catch(function (err) {
        throw err;
      });
    }
  }, {
    key: 'getEvent',
    value: function getEvent(id, payload) {
      var req = request.get(this._config.piecemaker.host + '/api/v1/events/' + id + '.json', payload);
      return this.authenticatePiecemakerRequest(req).catch(function (err) {
        throw err;
      });
    }
  }, {
    key: 'createEvent',
    value: function createEvent(payload) {
      var req = request.post(this._config.piecemaker.host + '/api/v1/events.json', payload);
      return this.authenticatePiecemakerRequest(req).catch(function (err) {
        throw err;
      });
    }
  }, {
    key: 'updateEvent',
    value: function updateEvent(id, payload) {
      var req = request.put(this._config.piecemaker.host + '/api/v1/events/' + id + '.json', payload);
      return this.authenticatePiecemakerRequest(req).catch(function (err) {
        throw err;
      });
    }
  }]);

  return ApiRequest;
}();

export default ApiRequest;