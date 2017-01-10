export default function({
  multiData,
  yExtent
}) {
  if (yExtent)  return yExtent
  else {
    const extents = []
    multiData.yValues.forEach(v => {
      d3.extent(v).forEach(e => extents.push(e))
    })
    return d3.extent(extents)
  }
}
