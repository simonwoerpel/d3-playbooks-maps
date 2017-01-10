// const {scaleLinear, scaleOrdinal, scaleBand, scaleTime, scaleLog} = d3
const scales = {
  scaleLinear: d3.scaleLinear,
  scaleOrdinal: d3.scaleOrdinal,
  scaleLog: d3.scaleLog,
  scaleBand: d3.scaleBand,
  scaleTime: d3.scaleTime
}

export default function({
  height,
  width,
  xDomain,
  yDomain,
  xScaleNice,
  yScaleNice
}) {
  const _scale = scales[this.kind] || d3.scaleLinear
  const _y = this.axis === 'y'
  const range = _y ? [height, 0] : [0, width]
  const domain = _y ? yDomain : xDomain
  const nice = _y ? yScaleNice : xScaleNice
  const scale = _scale()
    .domain(domain)
    .range(range)

  return nice && (scale.hasOwnProperty('nice')) ? scale.nice() : scale
}
