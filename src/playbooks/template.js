export default {
  init: {
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
  },
  setupData: {
    csvData: 'prepareData',
    features: 'getFeatures',
    data: 'mergeData',
  },
  setup: {
    xDomain: 'getXDomain',
    yDomain: 'getYDomain',
    getColor: 'getColorFunc',
  },
  prepareDraw: {
    projection: 'getProjection',
    path: 'getPath'
  },
  draw: {
    drawedSelection: 'drawData',
    extraDrawedSelections: 'drawExtra'
  },
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
}
