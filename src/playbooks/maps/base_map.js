import getData from '../../utils/data/loader.js'
import prepareData from '../../utils/data/prepare.js'
import mergeData from '../../utils/data/merge_data.js'
import getReady from '../../utils/init/get_ready.js'
import getChartElement from '../../utils/setup/get_chart_element.js'
import fixDimensions from '../../utils/setup/fix_dimensions.js'
import updateDimensions from '../../utils/responsive/update_dimensions.js'
import getBreakpoints from '../../utils/responsive/get_breakpoints.js'
import setUpResponsiveness from '../../utils/responsive/setup_responsiveness.js'
import initSvg from '../../utils/setup/init_svg.js'
import initG from '../../utils/setup/init_g.js'
import updateSvg from '../../utils/responsive/update_svg.js'
import resetG from '../../utils/draw/reset_g.js'
import getExtentDomain from '../../utils/domains/get_extent_domain.js'
import getOrdinalDomain from '../../utils/domains/get_ordinal_domain.js'
// import getScale from '../../utils/scales/get_scale.js'
// import getAxis from '../../utils/axes/get_axis.js'
// import renderAxis from '../../utils/axes/render_axis.js'
// import renderAxisLabel from '../../utils/axes/render_axis_label.js'
import getColorFunc from '../../utils/colors/get_color.js'
// import getSizeFunc from '../../utils/sizes/get_size.js'
import updateBreakpoints from '../../utils/responsive/update_breakpoints.js'
import updateBreakpointClasses from '../../utils/responsive/update_breakpoint_classes.js'

// geo specific
import getPath from '../../utils/geo/get_path.js'
import getProjection from '../../utils/geo/get_projection.js'
import drawData from '../../utils/geo/draw_map.js'
import getGeoData from '../../utils/geo/get_geo_data.js'


export default {
  plays: {
    getData,
    prepareData,
    getGeoData,
    mergeData,
    getReady,
    getChartElement,
    fixDimensions,
    updateDimensions,
    setUpResponsiveness,
    initSvg,
    initG,
    getXDomain: getOrdinalDomain.bind({col: 'xCol'}),
    getYDomain: getExtentDomain.bind({col: 'yCol'}),
    // getXScale: getScale.bind({axis: 'x'}),
    // getYScale: getScale.bind({axis: 'y'}),
    // getXAxis: getAxis.bind({kind: 'axisBottom', axis: 'x'}),
    // getYAxis: getAxis.bind({kind: 'axisLeft', axis: 'y'}),
    // renderXAxis: renderAxis.bind({cssClasses: 'x axis'}),
    // renderYAxis: renderAxis.bind({axis: 'y', cssClasses: 'y axis'}),
    // renderXLabel: renderAxisLabel.bind({axis: 'x'}),
    // renderYLabel: renderAxisLabel.bind({axis: 'y'}),
    getColorFunc,
    // getSizeFunc: getSizeFunc,
    getBreakpoints,
    updateBreakpoints,
    updateBreakpointClasses,
    updateSvg,
    resetG,

    // geo specific
    getProjection,
    getPath,
    drawData
  },
  defaults: {
    width: 600,
    height: 600,
    cssNamespace: 'd3-playbooks',
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
    // showXAxis: true,
    // showYAxis: true,
    // showXLabel: true,
    // showYLabel: true,
    xCol: 'id',
    yCol: 'value',
    xTransform: d => d,
    yTransform: d => Number(d),
    // xScaleNice: true,
    // yScaleNice: true,
    responsive: true,
    responsiveSvg: false,
    // xTicks: 10,
    // yTicks: 10,
    color: d3.schemeCategory10.slice(3), // FIXME
    nullColor: 'gray',
    filter: false,
    drawExtra: c => {},
    breakpoints: {
      small: 480,
      medium: 768,
      large: 1280
    },

    // geo specific
    isTopojson: false,
    projection: d3.geoMercator(),
    path: d3.geoPath(),
    topojsonLayerName: 'layer',
    topojsonObjectsAccessor: 'objects',
    getFeatures: d => d.geoData.features,
    getValue: f => Number(f.properties.value),
    getId: f => f.properties.id,
    getProps: f => f.properties
  }
}
