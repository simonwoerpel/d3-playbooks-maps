import setupPlaybook from './playbooks/generate.js'

export default ({opts, template, plays}) => {
  const map = () => {}

  // the main object that will hold
  // information and might change over time
  const M = {}

  // set playbook funcs as properties for this map.
  // they could be overwritten via the opts merge below
  for (let [name, attr] of plays) {
    M[name] = attr
  }

  // opts and getter / setter methods for these
  Object.keys(opts).map(name => {
    M[name] = opts[name]
    map[name] = (...val) => {
      if (val.length === 1) {
        M.ready.then(() => M[name] = val[0])
        return map
      } else return M[name]
    }
  })

  setupPlaybook(template, M)

  M.init()

  // load async data
  M.rawData.then(d => M.rawData = d)
  M.geoData.then(d => M.geoData = d)

  // public methods
  d3.playbooks.PUBLIC_METHODS.map(func => {
    map[func] = opts => {
      M.ready.then(() => M[func](opts))
      return map
    }
  })

  return map
}
