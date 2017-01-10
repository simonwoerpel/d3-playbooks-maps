export default ({
  g,
  geoData,
  getFeatures,
  path,
  getColor
}) => {

  return g
      .attr('class', 'map')
    .selectAll('path')
      .data(getFeatures(geoData))
    .enter().append('path')
      .attr('class', 'map__item')
      .attr('d', path)
      .attr('fill', d => getColor(d.properties.destatis.population_density))

}
