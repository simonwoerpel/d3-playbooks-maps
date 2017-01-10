import fixDimensions from '../setup/fix_dimensions.js'
// compute chart dimensions (for use on resize)
// return whether to perform resize or not (boolean)
// @param {object} chart - chart instance from `chart.js`
export default chart => {
  // const currentWidth = chart.element.node().clientWidth - 10  // FIXME possible scrollbars
  const currentWidth = chart.element.node().clientWidth

  // containerWidth is smaller than origin width
  if (currentWidth < chart._originWidth) {
    chart.width = currentWidth
    chart.height = chart._getHeight(currentWidth)
    fixDimensions(chart) // FIXME ???
    // do resize
    return true

  // wrapper is equal or bigger than origin width
  } else {
    // restore originals
    if (!(chart.containerWidth === chart._originWidth)) {
      chart.width = chart._originWidth
      chart.height = chart._originHeight
      fixDimensions(chart) // FIXME ???
      // resize
      return true

    // don't resize
    } else {
      return false
    }
  }
}
