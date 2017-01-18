// remove all children of the main `g` element
// and all children of the base `element` that are flagged with a css class named `--delete-on-update`
// prepare for re-drawing (e.g. during resize) with margins
export default ({
  g,
  element,
  margin
}) => {
  element.selectAll('.--delete-on-update').remove()
  g.selectAll('*').remove()
  g.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
}
