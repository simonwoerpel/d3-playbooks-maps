/**
 * return element to which a chart will be applied.
 * if element not in `document`, it will be created
 *
 * @param {string} elementId - id of html element
 * @param {string} cssNamespace
 **/
export default ({
  elementId,
  cssNamespace
}) => {
  let element = d3.select('#'+elementId)
  if (element.empty()) {
    element = d3.select('body')
      .append('div')
    elementId ? element.attr('id', elementId) : null
  }

  return element.append('div')
    .attr('class', cssNamespace + ' ' + cssNamespace + '__wrapper')
}
