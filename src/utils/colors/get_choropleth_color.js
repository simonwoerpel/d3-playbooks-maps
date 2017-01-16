/** compute getColor func special for choropleths
 *
 * @param color -
 *  a callable - will just return as is
 *  an Array, this will compute a d3 scaleQuantile
**/
export default ({
  color,
  data,
  yCol
}) => {
  if (typeof color === 'function') return color
  else {
    const domain = d3.extent(data, d => d[yCol])
    return d3.scaleQuantile()
      .domain(domain)
      .range(color)
  }
}
