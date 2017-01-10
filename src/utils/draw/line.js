export default ({
  curve,
  data,
  xCol,
  yCol,
  xScale,
  yScale,
  g,
  getColor
}) => {
  const line = d3.line()
    .x(d => xScale(d[xCol]))
    .y(d => yScale(d[yCol]))

  if (curve) {
    line.curve(curve)
  }

  return g.append('path')
      .datum(data)
      .attr('class', 'line')
      .attr('d', line)
      .style('stroke', d => getColor(d))
}
