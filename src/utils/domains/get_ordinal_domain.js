export default function({
  data,
  xCol,
  yCol
}) {
  const col = this.col === 'y' ? yCol : xCol
  return data.map(d => d[col])
}
