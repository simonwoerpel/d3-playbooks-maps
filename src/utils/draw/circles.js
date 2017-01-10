export default function({
  data,
  sizeCol,
  xCol,
  yCol,
  xScale,
  yScale,
  g,
  getColor,
  getSize
}) {
  return g.selectAll('.dot')
      .data(data)
    .enter().append('circle')
      .attr('class', 'dot')
      .attr('r', d => getSize(d[sizeCol]))
      .attr('cx', d => xScale(d[xCol]))
      .attr('cy', d => yScale(d[yCol]))
      .style('fill', d => getColor(d))
}
