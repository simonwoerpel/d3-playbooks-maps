export default ({
  height,
  data,
  xCol,
  yCol,
  xScale,
  yScale,
  g,
  getColor,
  barMargin,
  barWidth
}) => {
  const origBandWidth = xScale.bandwidth()
  const bandWith = barWidth ? barWidth : origBandWidth - barMargin
  // make bars center
  const xFix = (origBandWidth - bandWith) / 2
  return g.selectAll('.bar')
      .data(data)
    .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(d[xCol]) + xFix)
      .attr('width', bandWith)
      .attr('y', d => yScale(d[yCol]))
      .attr('height', d => height - yScale(d[yCol]))
      .style('fill', d => getColor(d))
}
