import moment from 'moment'

const byteScales = ['B', 'kB', 'MB', 'GB', 'TB', 'PB'].map((unit, i) => {
  return {
    unit: unit,
    size: i > 0 ? Math.pow(1024, i) : 0
  }
})

class Formatters {
  static fileSize (value, entry) {
    let isDir = entry.type === 'directory',
      output = value || 0,
      granularity = 0
    while (granularity < byteScales.length && output > byteScales[granularity].size) {
      granularity++
    }
    granularity = Math.max(granularity - 1, 0)
    output /= byteScales[granularity].size || 1
    return isDir ? '' : `${output.toFixed(granularity > 0 ? 2 : 0)} ${byteScales[granularity].unit}`
  }

  static dateFull (value) {
    return moment(value).format('HH:mm:ss DD.MM.YY')
  }

  static mimeIcon (value) {
    const map = {
        unknown: 'insert drive file',
        directory: 'folder',
        image: 'photo',
        audio: 'audiotrack',
        video: 'movie'
      },
      mime = typeof value === 'string' ? value.split('/').unshift() : 'unknown'
    return map[mime] || map.unknown
  }
}

export default Formatters
