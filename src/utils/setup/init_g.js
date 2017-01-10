// init svg elemnt child (`g`) the first time
// @return g
export default ({
  svg,
  margin
}) => {
  return svg
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
}
