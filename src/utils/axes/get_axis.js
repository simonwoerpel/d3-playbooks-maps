// const {axisLeft, axisRight, axisTop, axisBottom} = d3
const axes = {
  axisTop: d3.axisTop,
  axisBottom: d3.axisBottom,
  axisRight: d3.axisRight,
  axisLeft: d3.axisLeft
}

export default function({
  xScale,
  yScale
}) {
  let scale = this.axis === 'y' ? yScale : xScale
  let axis = axes[this.kind] || axisBottom
  return axis(scale)
}
