import axios from 'axios'

const config = {
  dev: '/api',
  pro: '',
}

const baseUrl = import.meta.env.MODE === 'development' ? config.dev : config.pro

class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      header: {},
    }
    return config
  }

  interceptors(instance) {
    instance.interceptors.request.use(
      config => config,
      error => Promise.reject(error)
    )
    instance.interceptors.response.use(
      response => response.data,
      error => Promise.reject(error)
    )
  }

  request(options) {
    const instance = axios.create()
    options = {
      ...this.getInsideConfig(),
      ...options,
    }
    this.interceptors(instance)
    return instance(options)
  }
}

export default new HttpRequest(baseUrl)
