/*
 * @Author: wenxt 
 * @Date: 2019-12-25 11:26:52 
 * @Last Modified by: wenxt
 * @Last Modified time: 2019-12-29 09:04:14
 */

import axios from '@/utils/axios'

export function deleteCityById(param) {
  return axios.post('/City/deleteById',param);
}

/* 查找数据 */
export function findAllCity() {
  return axios.get('/City/findAll');
}

/**
 *通过id查找商家信息
 * @export
 * @param {Object} param {id:''}
 * @returns
 */
export function findCityById(param){
  return axios.get('/City/findById',{params:param});
}


export function findCityByProvinceId(param){
  return axios.get('/City/findByProvinceId',{params:param});
}

export function saveOrUpdateCity(param){
  return axios.post('/City/saveOrUpdate',param);
}

//传参数
// export function findAllCity(param) {
//   return axios.get('/City/findAll',{params:param});
// }
// export function findAllCity(param) {
//   return axios.post('/City/findAll',param);
// }