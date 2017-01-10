if (!Array.isArray) {
  Array.isArray = (arg) => {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
}
