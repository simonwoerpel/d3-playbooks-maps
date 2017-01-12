// render example map
export default () => {

  const el = document.createElement('script')
  el.async = false
  el.src = './lib/d3-playbooks.riot-components.min.js'
  el.type = 'text/javascript'
  document.body.appendChild(el)

  d3.playbooks.defaults({
    width: 800,
    height: 800,
    color: 'FIXME' // merge deep by immutableJS fills up color arrays if this is shorter than in global defaults
  })

  d3.playbooks.choroplethMap.defaults({
    // FIXME
    // overwrite the color string from above with new array to prevent this immutableJS struggling
    color: ['#fff5f0','#fee0d2','#fcbba1','#fc9272','#fb6a4a','#ef3b2c','#cb181d','#a50f15','#67000d'],
    nullColor: '#eee'
  })

  const renderMap = () => {
    d3.playbooks.choroplethMap({
      elementId: 'europe-e-coli',
      dataUrl: './data/e-coli.csv',
      geoDataUrl: './data/europe.topo.json',
      responsiveSvg: true,
      isTopojson: true,
      topojsonLayerName: 'europe',
      getId: f => f.properties.iso_a2,
    }).render().infobox({
      template: `
        <h3>{name}</h3>
        <p>{value} %</p>
        <h4>Escherichia coli vs cephalosporins</h4>
        <p class="-subtitle">Resistance to 3rd generation cephalosporins in percent.
        Of all infections with this bacterium, this percentage was resistant to this antibiotic.</p>
        <p class="-eudata">EU: 12 %</p>
        <p class="-annotation">ECDC Surveillance report 2014, except Poland (2013)</p>
      `
    })
  }

  setTimeout(renderMap, 100)

}
