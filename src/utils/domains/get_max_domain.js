export default function({
  data,
  xCol,
  yCol
}) {
  const col = this.col === 'y' ? yCol : xCol
  return [this.min, d3.max(data, d => d[col])]
}
