export default function({
  renderedXAxis,
  renderedYAxis,
  xLabel,
  showXLabel,
  showYLabel,
  yLabel,
  xCol,
  yCol,
  width
}) {
  let _y = this.axis == 'y'
  let axis = _y ? renderedYAxis : renderedXAxis
  let showLabel = _y ? showYLabel : showXLabel

  if (axis && showLabel) {
    let label = _y ? yLabel || yCol : xLabel || xCol
    let _label = axis.append('text')
      .attr('class', 'label')
      .style('text-anchor', 'end')
      .text(label)

    if (_y) {
      _label
        .attr('y', 15)
        .attr('transform', 'rotate(-90)')
    } else {
      _label
        .attr('y', -6)
        .attr('x', width)
    }
  return _label
  }
}
