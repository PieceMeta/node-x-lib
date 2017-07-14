import fs from 'fs-extra'
import path from 'path'
import Promise from 'bluebird'
import readChunk from 'read-chunk'
import fileType from 'file-type'

class Filesystem {
  static listDirectory (req, res, next, config = {}) {
    if (Object.keys(req.params).length === 0) {
      res.send(400, {})
      return next()
    }
    const dirPath = path.join(config.rootPath, req.params[Object.keys(req.params)[0]])
    return fs.readdir(dirPath)
      .then(entries => {
        return Promise.map(entries, entry => {
          const fileInfo = {
            base: path.basename(entry, path.extname(entry)),
            ext: path.extname(entry),
            info: {type: 'unknown'}
          }
          if (!config.getFileInfo) {
            return fileInfo
          }
          return fs.stat(path.join(dirPath, entry))
            .then(stat => {
              if (stat.isFile()) {
                return readChunk(path.join(dirPath, entry), 0, 4100)
                  .then(buffer => {
                    fileInfo.info = fileType(buffer) || {type: 'unknown'}
                    return stat
                  })
              }
              else if (stat.isDirectory()) {
                fileInfo.type = 'directory'
              }
              return stat
            })
            .then(stat => {
              fileInfo.info.mode = stat.mode
              fileInfo.info.size = stat.size
              fileInfo.info.ctime = stat.ctime
              fileInfo.info.mtime = stat.mtime
              fileInfo.info.atime = stat.atime
              return fileInfo
            })
            .catch(err => {
              console.warn(`No file info for ${path.join(dirPath, entry)} - Error: ${err.message}`)
              return fileInfo
            })
        })
      })
      .then(entries => res.send({
        path: dirPath,
        entries: entries
      }))
      .catch(err => {
        console.error(`Failed to list directory ${dirPath} - Error: ${err.message}`)
        next(err)
      })
  }
}

export default Filesystem
