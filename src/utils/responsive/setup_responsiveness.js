export default chart => {
  if (chart.responsive && !chart.responsiveSvg) {

    const {
      width,
      height
    } = chart

    // preserve original values
    chart._originWidth = width
    chart._originHeight = height

    // setup height calculation
    const heightRatio = height / width
    const xTicksRatio = chart.xTicks / width
    const yTicksRatio = chart.yTicks / height
    chart._getHeight = width => parseInt(width * heightRatio)

    // show at least two ticks
    chart._getXTicks = width => {
      const ticks = parseInt(width * xTicksRatio)
      return ticks < 2 ? 2 : ticks > chart.xTicks ? chart.xTicks : ticks
    }
    chart._getYTicks = height => {
      const ticks = parseInt(height * yTicksRatio)
      return ticks < 2 ? 2 : ticks > chart.yTicks ? chart.yTicks : ticks
    }

    // add event listener
    window.addEventListener('resize', () => {
      if (chart.updateDimensions(chart)) {
        chart.resize()
      }
    })
  }
}
