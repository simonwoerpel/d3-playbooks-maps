// playbook functions that should be public on the returned chart instance
const publics = ['render', 'resize', 'update']

export default () => d3.playbooks.PUBLIC_METHODS || publics
