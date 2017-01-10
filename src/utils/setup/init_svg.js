// init svg the first time
// @return svg as wrapper svg element (use for resizing if responsive)
export default ({
  element,
  width,
  height,
  containerWidth,
  containerHeight,
  responsiveSvg,
  cssNamespace
}) => {
  const svg = element.append('svg')

  if (responsiveSvg) {
    svg
      //responsive SVG needs these 2 attributes and no width and height attr
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('viewBox', '0 0 ' + width + ' ' + height)
      //class to make it responsive
      .classed('svg-content-responsive', true)
    element.classed('svg-container-responsive', true)
  } else {
    svg
      .attr('width', containerWidth)
      .attr('height', containerHeight)
      .attr('class', cssNamespace + '__svg')
  }
  return svg
}
