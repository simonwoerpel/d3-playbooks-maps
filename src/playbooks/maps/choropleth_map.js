import getChoroplethColor from '../../utils/colors/get_choropleth_color.js'
import {schemeYlOrRd} from 'd3-scale-chromatic'

export default {
  plays: {
    getColorFunc: getChoroplethColor
  },
  defaults: {
    color: schemeYlOrRd[9]
  }
}
