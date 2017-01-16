// for use with `d3-playbooks-riot-components`

export default ({
  data,
  yCol,
  getColor
}, {getLabel}) => {
  if (!getLabel) getLabel = q => Math.round(q)
  return getColor.quantiles().map(q => {
    return {
      label: getLabel(q),
      color: getColor(q)
    }
  })
}
