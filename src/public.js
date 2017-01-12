/*
 * make some stuff public for addons to hook into
 */
import {fromJS as _} from 'immutable'
import baseTemplate from './playbooks/template.js'
import maps from './playbooks/maps/available_maps.js'
import map from './map.js'
import getPublics from './playbooks/get_publics.js'

// init
// // FIXME
// if (!d3.playbooks) d3.playbooks = {}  // d3-playbooks-maps can be used standalone
// d3.playbooks.MAPS_TEMPLATE = baseTemplate
// d3.playbooks.MAPS = maps
// if (!d3.playbooks.CHARTS) {
//   // FIXME
//   d3.playbooks.CHARTS = maps
//   maps.baseChart = maps.baseMap
//   d3.playbooks.TEMPLATE = baseTemplate
// }
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

  d3.playbooks[name] = opts => {
    // merge opts
    opts = _(d3.playbooks.CHARTS.baseMap.defaults)  // base defaults
      .mergeDeep(defaults)                     // map type defaults
      .mergeDeep(overrides.baseMap)          // global overrides
      .mergeDeep(overrides[name])              // map type overrides
      .mergeDeep(opts)                         // opts
      .toJS()
    // merge plays
    plays = _(d3.playbooks.CHARTS.baseChart.plays).merge(plays)
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
