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
// FIXME: refactor library bundling in general

if (!d3.playbooks) {
  d3.playbooks = {}
}

d3.playbooks.PUBLIC_METHODS = getPublics()

const _maps = {
  TEMPLATE: baseTemplate,
  MAPS: {baseMap: maps.baseMap},
}

const overrides = {}

// set app-wide defaults
_maps.defaults = opts => {
  overrides.baseMap = opts
}

// add new map type as function
_maps.addMap = (name, {defaults, plays}) => {

  overrides[name] = {}

  d3.playbooks[name] = options => {
    // merge opts
    const opts = Object.assign({},
      d3.playbooks.maps.MAPS.baseMap.defaults, // base defaults
      defaults,                                // chart type defaults
      overrides.baseMap,                       // global overrides
      overrides[name],                         // chart type overrides
      options                                  // concrete opts
    )
    // merge plays
    plays = Object.assign({}, d3.playbooks.maps.MAPS.baseMap.plays, plays)
    const template = d3.playbooks.maps.TEMPLATE
    return map({opts, template, plays})
  }

  // add setter method for override defaults
  // for given map type
  d3.playbooks[name].defaults = opts => {
    overrides[name] = opts
  }
}


d3.playbooks.maps = _maps

// add concrete map types
for (let name in maps) {
  d3.playbooks.maps.addMap(
    name,
    maps[name],
    maps.baseMap,
    d3.playbooks.maps.TEMPLATE)
}
