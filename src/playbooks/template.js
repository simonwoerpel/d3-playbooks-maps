import {OrderedMap as _} from 'immutable'

export default _({
  init: _({
    rawData: 'getData',
    geoData: 'getGeoData',
    ready: 'getReady',
    element: 'getChartElement',
    _responsive: 'setUpResponsiveness',
    _updateDimensions: 'updateDimensions',
    breakpoints: 'getBreakpoints',
    _updateBreakpoints: 'updateBreakpoints',
    _updateBreakpointClasses: 'updateBreakpointClasses',
    svg: 'initSvg',
    g: 'initG'
  }),
  setupData: _({
    csvData: 'prepareData',
    features: 'getFeatures',
    data: 'mergeData',
  }),
  setup: _({
    getColor: 'getColorFunc',
  }),
  prepareDraw: _({
    projection: 'getProjection',
    path: 'getPath'
  }),
  draw: _({
    drawedSelection: 'drawData',
    extraDrawedSelections: 'drawExtra'
  }),
  render: [
    'setupData',
    'setup',
    'prepareDraw',
    'draw'
  ],
  resize: [
    'updateBreakpoints',
    'updateBreakpointClasses',
    'updateSvg',
    'resetG',
    'prepareDraw',
    'draw'
  ],
  update: [
    'setup',
    'updateSvg',
    'resetG',
    'prepareDraw',
    'draw'
  ]
})
