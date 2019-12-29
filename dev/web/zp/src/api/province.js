/*
 * @Author: wenxt 
 * @Date: 2019-12-25 09:03:03 
 * @Last Modified by: wenxt
 * @Last Modified time: 2019-12-28 18:12:10
 */

import axios from '@/utils/axios'

export function deleteProvinceById(param) {
    return axios.post('/Province/deleteById',param);
  }
  
  /* 查找数据 */
  export function findAllProvince() {
    return axios.get('/Province/findAll');
  }
  
  export function findProvinceById(param){
    return axios.get('/Province/findById',{params:param});
  }
  
  
  export function saveOrUpdateProvince(param){
    return axios.post('/Province/saveOrUpdate',param);
  }
