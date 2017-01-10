import '../polyfills/is_array.js'

/**
 * transform input data given on init via the `data` option
 * to array of mappings:
 *    [{x: 1, y: 2}, {x: 2, y: 3}, ...]
 * to have same structure as the asynchronous `dataUrl` csv handling
**/
export default ({
  data,
  xCol,
  yCol,
  yCols // FIXME
}) => {

  /**
   * [
   *  ['a', 'b', 'c'],   <= xCol (default: 'x')
   *  [1, 2, 3]          <= yCol (default: 'y')
   * ]
  **/
  if (Array.isArray(data) && Array.isArray(data[0])) {
    return data[0].map((d, i) => {
      const _data = {}
      _data[xCol] = d
      _data[yCol] = data[1][i]
      return _data
    })
  }

  /**
   * {
   *   x: [1, 2, 3],
   *   y: [4, 5, 6],
   *   foo: ['a', 'b', 'c']
   * }
   **/
  else if (data.constructor === Object) {
    const keys = Object.keys(data)
    return data[keys[0]].map((_, i) => {
      const d = {}
      keys.map(k => {d[k] = data[k][i]})
      return d
    })
  }

  else return data
}
