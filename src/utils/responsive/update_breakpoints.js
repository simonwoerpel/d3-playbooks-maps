// set breakpoint flags
export default chart => {
  // get css class shorthand
  const _ = name => chart.cssNamespace + '--' + name
  // see `getBreakpoints`
  const active = chart.breakpoints.find(b => chart.width <= b.width).name
  const activeClass = _(active)

  const inactiveClasses = chart.breakpoints
    .filter(b => b.name !== activeClass).map(b => _(b.name))

  // some convenient shorthands for breakpoints
  chart.breakpoints.map(b => chart['is_' + b.name] = b.name === active)

  chart.breakpoint = {
    active,
    activeClass,
    inactiveClasses
  }
}
