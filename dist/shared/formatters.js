import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import moment from 'moment';

var byteScales = ['B', 'kB', 'MB', 'GB', 'TB', 'PB'].map(function (unit, i) {
  return {
    unit: unit,
    size: i > 0 ? Math.pow(1024, i) : 0
  };
});

var Formatters = function () {
  function Formatters() {
    _classCallCheck(this, Formatters);
  }

  _createClass(Formatters, null, [{
    key: 'fileSize',
    value: function fileSize(value, entry) {
      var isDir = entry.type === 'directory',
          output = value || 0,
          granularity = 0;
      while (granularity < byteScales.length && output > byteScales[granularity].size) {
        granularity++;
      }
      granularity = Math.max(granularity - 1, 0);
      output /= byteScales[granularity].size || 1;
      return isDir ? '' : output.toFixed(granularity > 0 ? 2 : 0) + ' ' + byteScales[granularity].unit;
    }
  }, {
    key: 'dateFull',
    value: function dateFull(value) {
      return moment(value).format('HH:mm:ss DD.MM.YY');
    }
  }, {
    key: 'mimeIcon',
    value: function mimeIcon(value) {
      var map = {
        unknown: 'insert drive file',
        directory: 'folder',
        image: 'photo',
        audio: 'audiotrack',
        video: 'movie'
      },
          mime = typeof value === 'string' ? value.split('/').unshift() : 'unknown';
      return map[mime] || map.unknown;
    }
  }]);

  return Formatters;
}();

export default Formatters;