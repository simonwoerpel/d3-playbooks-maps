/* transform data for displaying for charts with
 * multiple y values for given x, like `multiLineChart`
 *
 * following this approach:
 * https://stackoverflow.com/questions/8689498/drawing-multiple-lines-in-d3-js
 * */

export default ({
  data,
  xCol,
  yCols
}) => {
  return {
    xValues: data.map(r => r[xCol]),
    yValues: yCols.map(c => data.map(r => r[c]))
  }
}
