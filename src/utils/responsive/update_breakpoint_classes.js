export default ({
  element,
  breakpoint
}) => {
  const {activeClass, inactiveClasses} = breakpoint
  inactiveClasses.map(c => element.classed(c, false))
  element.classed(activeClass, true)
}
