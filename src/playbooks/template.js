import {OrderedMap as _} from 'immutable'

export default _({
  init: _({
    // rawData: 'getData',
    geoData: 'getGeoData',
    element: 'getChartElement',
    _responsive: 'setUpResponsiveness',
    _updateDimensions: 'updateDimensions',
    breakpoints: 'getBreakpoints',
    _updateBreakpoints: 'updateBreakpoints',
    _updateBreakpointClasses: 'updateBreakpointClasses',
    svg: 'initSvg',
    g: 'initG'
  }),
  setup: _({
    // data: 'prepareData',
    // multiData: 'getMultiData',  // FIXME
    getColor: 'getColorFunc',
    // getSize: 'getSizeFunc',
    // xDomain: 'getXDomain',
    // yDomain: 'getYDomain'
  }),
  prepareDraw: _({
    // xScale: 'getXScale',
    // yScale: 'getYScale',
    // xAxis: 'getXAxis',
    // yAxis: 'getYAxis'
    projection: 'getProjection',
    path: 'getPath'
  }),
  draw: _({
    drawedSelection: 'drawData',
    // renderedXAxis: 'renderXAxis',
    // renderedYAxis: 'renderYAxis',
    // renderedXLabel: 'renderXLabel',
    // renderedYLabel: 'renderYLabel',
    extraDrawedSelections: 'drawExtra'
  }),
  render: [
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
  ]
})
