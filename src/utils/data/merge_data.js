// merge geoData with csvData, if there is some
//
// csvData:
//    xCol = csv column to identify geoData by getId(feature)
//    yCol = csv column with numerical values
//
// geoData:
//    getId = function to get identification value from feature (acts as `x`)
//    getValue = function to get numerical value from feature (acts as `y`)

export default ({
  csvData,
  xCol,
  yCol,
  features,
  getValue,
  getId
}) => {
  if (csvData) {
    const findData = id => csvData.find(d => d[xCol] === id)
    return features.map(f => {
      const id = getId(f)
      const data = findData(id) || {}
      f[xCol] = id
      f[yCol] = data[yCol]

      // copy over from geojson feature properties
      Object.keys(f.properties).map(k => {
        f[k] = f.properties[k]
      })

      // add remaining data from csv
      Object.keys(data).filter(k => k !== xCol).map(k => {
        f[k] = data[k]
      })
      return f
    })
  } else {
    return features.map(f => {
      f[xCol] = getId(f)
      f[yCol] = getValue(f)
      return f
    })
  }
}
