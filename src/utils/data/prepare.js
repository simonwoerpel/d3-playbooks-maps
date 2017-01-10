/*
 * prepare x / y data based on transform funcs
 */
export default ({
  rawData,
  xCol,
  yCol,
  yCols,
  xTransform,
  yTransform,
  yTransforms
}) => {
  return rawData.map(d => {
    d[xCol] = xTransform(d[xCol])
    if (yCols) {
      yCols.map(c => {
        const cd = d[c]
        const transform = yTransforms[c] || yTransform
        d[c] = transform(cd)
      })
    } else {
      d[yCol] = yTransform(d[yCol])
    }
    return d
  })
}
