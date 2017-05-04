// merge geoData with csvData, if there is some
//
// csvData:
//    xCol = csv column to identify geoData by getId(feature)
//    yCol = csv column with numerical values
//
// geoData:
//    getId = function to get identification value from feature (acts as `x`)
//    getValue = function to get numerical value from feature (acts as `y`)
//
// in general, data will be assigned to geoJson-features directly like `f.name`
// (instead of `f.properties.name`

export default ({
  csvData,
  xCol,
  yCol,
  features,
  getValue,
  getId,
  getProps
}) => {

  const setFeatData = feat => {
    const props = getProps(feat)
    Object.keys(props).map(k => {
      feat[k] = props[k]
      const value = getValue(feat)
      if (value) feat[yCol] = value
    })
    return feat
  }

  features.map(f => setFeatData(f))

  // get additional data from csv, existing keys will be overwritten
  if (csvData) {
    // get csvData mapping for efficient matching
    const cData = {}
    csvData.map(d => cData[d[xCol]] = d)

    const setFeatCsvData = feat => {
      const featId = getId(feat)
      const data = cData[featId] || {__data_missing__: true}
      Object.keys(data).map(k => feat[k] = data[k])
      return feat
    }

    features.map(f => setFeatCsvData(f))

  }

  return features
}
