// render example map
export default () => {
  d3.playbooks.choroplethMap({
    geoDataUrl: './data/nrw.json',
    responsiveSvg: true,
    // drawExtra: c => {
    //   const labels = c.geoData.features.filter(d => d.properties.destatis.population_density > 2000).map(d => {
    //     const centroid = c.path.centroid(d)
    //     d.x = centroid[0]
    //     d.y = centroid[1]
    //     return d
    //   })
    //   c.g.selectAll('.label')
    //       .data(labels)
    //     .enter().append('text')
    //       .attr('transform', d => 'translate(' + [d.x, d.y] + ')')
    //       .attr('class', 'label')
    //       .attr('dx', '.5em')
    //       .style('fill', 'black')
    //       .style('font-size', '10px')
    //       .text(d => d.properties.GEN)
    //   c.g.selectAll('.point')
    //       .data(labels)
    //     .enter().append('circle')
    //       .attr('r', 2)
    //       .style('fill', 'black')
    //       .attr('cx', d => d.x)
    //       .attr('cy', d => d.y)
    // }
  }).build()
}
