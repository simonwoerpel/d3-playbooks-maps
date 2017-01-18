/** compute getColor func special for choropleths
 *
 * @param color -
 *  a callable - will just return as is
 *  an Array, this will compute a d3 scaleQuantile
**/
export default ({
  color,
  yDomain
}) => {
  if (typeof color === 'function') return color
  else {
    return d3.scaleQuantile()
      .domain(yDomain)
      .range(color)
  }
}
