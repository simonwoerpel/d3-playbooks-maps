export default ({
  curve,
  multiData,
  xCol,
  yCols,
  xScale,
  yScale,
  g,
  getColor,
  yDomain
}) => {
  const {xValues, yValues} = multiData

  const line = d3.line()
    .x((d, i) => xScale(xValues[i]))
    .y(yScale)

  if (curve) {
    line.curve(curve)
  }

  return g.selectAll('.line')
      .data(yValues)
    .enter().append('path')
      .attr('class', 'line')
      .attr('d', line)
      .style('stroke', d => getColor(d))
}
