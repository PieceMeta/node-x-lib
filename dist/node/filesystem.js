import _Object$keys from 'babel-runtime/core-js/object/keys';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import fs from 'fs-extra';
import path from 'path';
import Promise from 'bluebird';
import readChunk from 'read-chunk';
import fileType from 'file-type';

var Filesystem = function () {
  function Filesystem() {
    _classCallCheck(this, Filesystem);
  }

  _createClass(Filesystem, null, [{
    key: 'listDirectory',
    value: function listDirectory(req, res, next) {
      var config = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      if (_Object$keys(req.params).length === 0) {
        res.send(400, {});
        return next();
      }
      var dirPath = path.join(config.rootPath, req.params[_Object$keys(req.params)[0]]);
      return fs.readdir(dirPath).then(function (entries) {
        return Promise.map(entries, function (entry) {
          var fileInfo = {
            base: path.basename(entry, path.extname(entry)),
            ext: path.extname(entry),
            info: { type: 'unknown' }
          };
          if (!config.getFileInfo) {
            return fileInfo;
          }
          return fs.stat(path.join(dirPath, entry)).then(function (stat) {
            if (stat.isFile()) {
              return readChunk(path.join(dirPath, entry), 0, 4100).then(function (buffer) {
                fileInfo.info = fileType(buffer) || { type: 'unknown' };
                return stat;
              });
            } else if (stat.isDirectory()) {
              fileInfo.type = 'directory';
            }
            return stat;
          }).then(function (stat) {
            fileInfo.info.size = stat.size;
            fileInfo.info.ctime = stat.ctime;
            fileInfo.info.mtime = stat.mtime;
            return fileInfo;
          }).catch(function (err) {
            console.warn('No file info for ' + path.join(dirPath, entry) + ' - Error: ' + err.message);
            return fileInfo;
          });
        });
      }).then(function (entries) {
        return res.send({
          path: dirPath,
          entries: entries
        });
      }).catch(function (err) {
        console.error('Failed to list directory ' + dirPath + ' - Error: ' + err.message);
        next(err);
      });
    }
  }]);

  return Filesystem;
}();

export default Filesystem;