export default ({
  svg,
  containerWidth,
  containerHeight,
  margin
}) => {
  // update svg dimensions
  svg
    .attr('width', containerWidth)
    .attr('height', containerHeight)
}
