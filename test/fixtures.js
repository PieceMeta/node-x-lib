const filesystem = {
  entries: {
    image: {
      base: 'fake-img',
      ext: '.jpg',
      info: {
        type: 'image/jpg',
        mime: 'image/jpg',
        size: Math.pow(1024, 3) * 0.5,
        ctime: new Date(),
        mtime: new Date()
      }
    },
    directory: {
      base: 'fake-dir',
      // TODO: is this really undefined for a dir, maybe just empty?
      ext: undefined,
      info: {
        type: 'directory',
        mime: undefined,
        size: 4,
        ctime: new Date(),
        mtime: new Date()
      }
    }
  }
}

export {
  filesystem
}
