// remove all children of the main `g` element
// prepare for re-drawing (e.g. during resize) with margins
export default ({
  g,
  margin
}) => {
  g.selectAll('*').remove()
  g.append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
}
