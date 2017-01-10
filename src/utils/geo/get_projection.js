export default ({
  width,
  height,
  geoData,
  projection
}) => projection.fitSize([width, height], geoData)
