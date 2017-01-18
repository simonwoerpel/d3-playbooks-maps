import getChoroplethColor from '../../utils/colors/get_choropleth_color.js'
import getLegendItems from '../../utils/legend/get_legend_items.js'

export default {
  plays: {
    getColorFunc: getChoroplethColor,
    getLegendItems
  },
  defaults: {
    color: ['#ffffcc','#ffeda0','#fed976','#feb24c','#fd8d3c','#fc4e2a','#e31a1c','#bd0026','#800026'], // colorbrewer2.org
  }
}
