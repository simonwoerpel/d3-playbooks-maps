export default ({
  g,
  data,
  path,
  getColor,
  nullColor,
  yCol
}) => {
  return g
      .attr('class', 'map')
    .selectAll('path')
      .data(data)
    .enter().append('path')
      .attr('class', 'map__item')
      .attr('d', path)
      .attr('fill', d => getColor(d[yCol]) || nullColor)
}
