// render example map
export default () => {

  const el = document.createElement('script')
  el.async = false
  el.src = './lib/d3-playbooks.riot-components.min.js'
  el.type = 'text/javascript'
  document.body.appendChild(el)

  d3.playbooks.defaults({
    width: 800,
    height: 600
  })

  const renderMap = () => {
    d3.playbooks.choroplethMap({
      elementId: 'mymap',
      dataUrl: './data/nrw_data.csv',
      geoDataUrl: './data/nrw.json',
      // responsiveSvg: true,
      topojsonLayerName: 'germany_munis',
      getId: f => f.properties.RS.substring(1),
      drawExtra: c => {
        const labels = c.data.filter(d => d.value > 2000).map(d => {
          const centroid = c.path.centroid(d)
          d.x = centroid[0]
          d.y = centroid[1]
          return d
        })
        c.g.selectAll('.label')
            .data(labels)
          .enter().append('text')
            .attr('transform', d => 'translate(' + [d.x, d.y] + ')')
            .attr('class', 'label')
            .attr('dx', '.5em')
            .style('fill', 'black')
            .style('font-size', '10px')
            .text(d => d.properties.GEN)
        c.g.selectAll('.point')
            .data(labels)
          .enter().append('circle')
            .attr('r', 2)
            .style('fill', 'black')
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
      }
    }).render().infobox({
      template: '<p><strong>{name}</strong><br>Bevoelkerungsdichte: {value}</p>'
    })

    d3.playbooks.choroplethMap({
      elementId: 'map2',
      geoDataUrl: './data/world.json',
      getValue: f => f.properties.SHAPE_AREA,
      isTopojson: true,
      topojsonLayerName: 'CNTR_RG_03M_2014'
    }).render().infobox({
      template: '<p>Area: {value}</p>'
    })

  }

  setTimeout(renderMap, 1000)

}
