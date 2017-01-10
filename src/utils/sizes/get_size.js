// compute getSize function
export default ({
  data,
  sizeRange,
  sizeCol,
  size
}) => {
  if (sizeCol) {
    const domain = d3.extent(data, d => d[sizeCol])
    return d3.scaleLinear()
      .domain(domain)
      .range(sizeRange)
  } else {
    return () => size
  }
}
