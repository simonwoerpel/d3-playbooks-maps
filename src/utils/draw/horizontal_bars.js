export default ({
  data,
  xCol,
  yCol,
  xScale,
  yScale,
  g,
  getColor,
  barMargin,
  barWidth,
}) => {
  const origBandWidth = yScale.bandwidth()
  const bandWith = barWidth ? barWidth : origBandWidth - barMargin
  // make bars center
  const yFix = (origBandWidth - bandWith) / 2
  return g.selectAll('.bar')
      .data(data)
    .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => 0)
      .attr('height', bandWith)
      .attr('y', d => yScale(d[yCol]) + yFix)
      .attr('width', d => xScale(d[xCol]))
      .style('fill', d => getColor(d))
}
