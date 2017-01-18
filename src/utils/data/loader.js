import Promise from 'promise-polyfill'
import transformData from './transform_data.js'

function _loadCsv(dataUrl) {
  return new Promise((resolve, reject) => {
    d3.csv(dataUrl, (err, d) => {err ? reject(err) : resolve(d)})
  })
}


export default ({
  data,
  dataUrl,
  xCol,
  yCol,
  yCols,
  filter,
  timeFormat
}) => {
  if (data || dataUrl) {
    return new Promise((resolve) => {
      // also return promise if data is already there
      const _getData = data ?
        new Promise(r => r(transformData({data, xCol, yCol}))) :
        _loadCsv(dataUrl)
      _getData.then((rows) => {
        if (filter) rows = rows.filter(filter)
        if (timeFormat) {
          // FIXME
          const parseTime = d3.timeParse(timeFormat)
          rows.forEach(r => r[xCol] = parseTime(r[xCol]))
        }

        // ensure data is present
        // FIXME overthink for maps
        // if (xCol && yCols) {
        //   resolve(rows.filter(r => (r[xCol] && yCols.map(c => r[c]).every(e => !!e))))
        // } else {
        //   resolve(rows.filter(r => (r[xCol] && r[yCol])))
        // }
        resolve(rows)
      })
    })
  } else {
    return new Promise(r => r(null))
  }
}
