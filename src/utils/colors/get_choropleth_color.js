
/** compute getColor func special for choropleths
 *
 * @param color -
 *  an Array, this will compute a d3 scaleQuantile
 *  a callable - will just return as is
**/
export default ({
  color,
  features,
  yCol
}) => {
  if (typeof color === 'function') return color
  else {
    const domain = d3.extent(features, d => d[yCol])
    return d3.scaleQuantile()
      .domain(domain)
      .range(color)
  }
}
