/*
 * make some stuff public for addons to hook into
 */

// polyfills
import './utils/polyfills/object_assign.js'
import './utils/polyfills/is_array.js'

import baseTemplate from './playbooks/template.js'
import maps from './playbooks/maps/available_maps.js'
import map from './map.js'
import getPublics from './playbooks/get_publics.js'

// init
// // FIXME: currently, `d3-playbooks-maps` is currently only standalone

d3.playbooks = {}
d3.playbooks.TEMPLATE = baseTemplate
maps.baseChart = maps.baseMap
d3.playbooks.CHARTS = maps
d3.playbooks.PUBLIC_METHODS = getPublics()

const overrides = {}

// set app-wide defaults
d3.playbooks.defaults = opts => {
  overrides.baseMap = opts
}

// add new map type as function
d3.playbooks.addMap = (name, {defaults, plays}) => {

  overrides[name] = {}

  d3.playbooks[name] = options => {
    // merge opts
    const opts = Object.assign({},
      d3.playbooks.CHARTS.baseChart.defaults,  // base defaults
      defaults,                                // chart type defaults
      overrides.baseMap,                       // global overrides
      overrides[name],                         // chart type overrides
      options                                  // concrete opts
    )
    // merge plays
    plays = Object.assign({}, d3.playbooks.CHARTS.baseChart.plays, plays)
    const template = d3.playbooks.TEMPLATE
    return map({opts, template, plays})
  }

  // add setter method for override defaults
  // for given map type
  d3.playbooks[name].defaults = opts => {
    overrides[name] = opts
  }
}

// add concrete map types
for (let name in maps) {
  d3.playbooks.addMap(name, maps[name])
}
