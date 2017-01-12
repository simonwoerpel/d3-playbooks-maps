import '../utils/polyfills/is_array.js'

export default (template, C) => {
  for (let [func, functions] of template) {
    C[func] = (opts={}) => {
      // parent funcs can either be mapping for storing returns
      // or just an array of funcs to run
      if (Array.isArray(functions)) {
        functions.map(f => C[f](C, opts))
      } else {
        for (let [attr, f] of functions) {
          // don't store return as value if attr starts with `_`
          if (attr.indexOf('_') == 0) {
            C[f](C, opts)
          } else {
            C[attr] = C[f](C, opts)
          }
        }
      }
    }
  }
}
