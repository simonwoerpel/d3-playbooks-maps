import Promise from 'promise-polyfill'

export default ({
  isTopojson,
  topojsonLayerName,
  topojsonObjectsAccessor,
  geoDataUrl,
  geoData
}) => {
  if (geoData) {
    return new Promise(r => r(geoData))
  } else {
    return new Promise((resolve, reject) => {
      // d3.json(geoDataUrl, (err, d) => err ? reject(err) : resolve(d))
      d3.json(geoDataUrl, (err, d) => {
        if (err) reject(err)
        if (isTopojson) {
          resolve(topojson.feature(d, d[topojsonObjectsAccessor][topojsonLayerName]))
        } else {
          resolve(d)
        }
      })
    })
  }
}

