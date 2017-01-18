// render example map
export default () => {

  // sorry for this hack but it's necessary because of current
  // webpack stack during development
  const el = document.createElement('script')
  el.async = false
  el.src = './lib/d3-playbooks.riot-components.min.js'
  el.type = 'text/javascript'
  document.body.appendChild(el)

  d3.playbooks.choroplethMap.defaults({
    width: 800,
    height: 800,
  })


  const renderMaps = () => {

    d3.playbooks.choroplethMap({
      elementId: 'simple-map',
      dataUrl: './data/nrw_data.csv',
      geoDataUrl: './data/nrw_munis.geojson',
      responsiveSvg: true,
      xCol: 'regionalschluessel',
      yCol: 'bevoelkerungsdichte',
      getId: f => f.properties.RS.substring(1),
      drawExtra: M => {
        const labels = M.data.filter(d => d[M.yCol] > 2000).map(d => {
          const [x, y] = M.path.centroid(d)
          d.x = x
          d.y = y
          return d
        })
        M.g.selectAll('.label')
            .data(labels)
          .enter().append('text')
            .attr('transform', d => 'translate(' + [d.x, d.y] + ')')
            .attr('class', 'label')
            .attr('dx', '.5em')
            .style('fill', 'black')
            .style('font-size', '10px')
            .text(d => d.name)
        M.g.selectAll('.point')
            .data(labels)
          .enter().append('circle')
            .attr('r', 2)
            .style('fill', 'black')
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
      }
    }).render()

    d3.playbooks.choroplethMap({
      elementId: 'superbugs-map',
      cssNamespace: 'superbugs-map',
      dataUrl: './data/e-coli.csv',
      geoDataUrl: './data/europe.topo.json',
      responsiveSvg: true,
      isTopojson: true,
      topojsonLayerName: 'europe_clipped',
      getId: f => f.properties.iso_a2,
      yExtent: [0, 64],
    }).render().infobox({
      element: '#superbugs-map__infobox',
      template: `
        <h3>{name}</h3>
        <p class="infobox__data">{display_value}</p>
        <h4>Escherichia coli vs cephalosporins</h4>
        <p class="infobox__subtitle">Resistance to 3rd generation cephalosporins in percent.
        Of all infections with this bacterium, this percentage was resistant to this antibiotic.</p>
        <p class="infobox__eudata">EU: 12 %</p>
        <p class="infobox__annotation">ECDC Surveillance report 2014, except Poland (2013)</p>
      `
    }).selector({
      element: '#superbugs-map__selector',
      getLabel: f => f.name
    }).legend({
      element: '#superbugs-map__legend',
      wrapperTemplate: '<ul name="legend">{body}</ul>',
      itemTemplate: '<li style="background-color:{color}">{label} %</li>'
    })

  }

  // wait for `d3-playbooks-riot-components`
  setTimeout(renderMaps, 100)

}
