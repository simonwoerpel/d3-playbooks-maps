// fix dimensions: use given width / height as overall sizes without margins
export default chart => {
  const {
    height,
    width,
    margin
  } = chart
  chart.containerWidth = width
  chart.containerHeight = height
  chart.height = height - margin.top - margin.bottom
  chart.width = width - margin.left - margin.right
}
