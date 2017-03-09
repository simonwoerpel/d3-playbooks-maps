// for use with `d3-playbooks-riot-components`

export default ({
  yDomain,
  getColor
}, {getLabel}) => {
  if (!getLabel) getLabel = q => Math.round(q)
  const quantiles = getColor.quantiles()
  const quantileWidth = quantiles[1] - quantiles[0]
  quantiles.push(yDomain[1])
  return quantiles.map(q => {
    return {
      label: getLabel(q),
      color: getColor(q-quantileWidth/2)
    }
  })
}
