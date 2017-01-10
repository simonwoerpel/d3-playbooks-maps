// convert breakpoints into sorted array if needed
export default ({
  breakpoints,
  responsive
}) => {
  return responsive ? Object.keys(breakpoints).map(b => {
    return {
      name: b,
      width: breakpoints[b]
    }
  }).sort((a, b) => a.width - b.width) : breakpoints
}
