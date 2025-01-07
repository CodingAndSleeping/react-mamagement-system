import axios from './index'

export const getMenu = params => {
  return axios.request({
    url: '/permission/getMenu',
    method: 'post',
    data: params,
  })
}

export const getData = params => {
  return axios.request({
    url: '/home/getData',
    method: 'post',
    data: params,
  })
}

export const getUser = params => {
  return axios.request({
    url: '/user/getUser',
    method: 'get',
    params,
  })
}

export const addUser = params => {
  return axios.request({
    url: '/user/add',
    method: 'post',
    data: params,
  })
}

export const deleteUser = id => {
  return axios.request({
    url: '/user/del',
    method: 'get',
    params: {
      id,
    },
  })
}

export const updateUser = params => {
  return axios.request({
    url: '/user/edit',
    method: 'post',
    data: params,
  })
}
