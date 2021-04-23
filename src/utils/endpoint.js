
const api = process.env.VUE_APP_API
const port = process.env.VUE_APP_PORT

export const endpoint = 'http://' + api + ':' + port + '/';
export const wsendpoint = 'ws://' + api + ':' + port + '/';
