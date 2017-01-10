export default function({
  g,
  xAxis,
  yAxis,
  showXAxis,
  showYAxis,
  height,
  width,
  responsive,
  xTicks,
  yTicks,
  _getXTicks,
  _getYTicks
}) {
  const _y = this.axis === 'y'
  const showAxis = _y ? showYAxis : showXAxis

  if (showAxis) {
    const _axis = _y ? yAxis : xAxis

    let ticks
    if (responsive) {
      // adjust ticks to responsiveness
      ticks = _y ? _getYTicks(width) : _getXTicks(width)
    } else {
      ticks = _y ? yTicks : xTicks
    }

    _axis.ticks(ticks)

    const axis = g.append('g')
      .attr('class', this.cssClasses)
      .call(_axis)

    // FIXME
    !_y ? axis.attr('transform', 'translate(0,' + height + ')') : null

    return axis
  }
  return null
}
