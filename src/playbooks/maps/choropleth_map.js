import getChoroplethColor from '../../utils/colors/get_choropleth_color.js'
import getLegendItems from '../../utils/legend/get_legend_items.js'
import {schemeYlOrRd} from 'd3-scale-chromatic'

export default {
  plays: {
    getColorFunc: getChoroplethColor,
    getLegendItems
  },
  defaults: {
    color: schemeYlOrRd[9]
  }
}
