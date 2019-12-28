/*
 * @Author: wenxt 
 *商家API
 * @Date: 2019-12-25 09:04:50 
 * @Last Modified by: wenxt
 * @Last Modified time: 2019-12-27 11:18:46
 */

import axios from '@/utils/axios';
/**
 *通过id删除商家信息
 * @param {Object} param{id:''}
 */
export function deleteBusinessById(param){
    return axios.post('/Business/deleteById',param);
}

/**
 * 查找所有商家信息
 */
export function findAllBusiness(){
    return axios.get('/Business/findAll');
}
/**
 *通过城市查找商家
 * @export
 * @param {Object} param {city:''}
 * @returns
 */
export function findBusinessByCity(param){
    return axios.get('/Business/findByCity',{params:param});
}

/**
 *通过id查找商家信息
 * @export
 * @param {Object} param {id:''}
 * @returns
 */
export function findBusinessById(param){
    return axios.get('/Business/findById',{params:param});
}

/**
 *
 *通过行业查找商家信息
 * @export
 * @param {*} param {industry:''}
 * @returns
 */
export function findBusinessByIndustry(param){
    return axios.get('/Business/findByIndustry',{params:param});
}

/**
 * 通过位置查找商家信息
 * @param {*} param {location:''}
 */
export function findBusinessByLocation(param){
    return axios.get('/Business/findByLocation',{params:param});
}

/**
 * 根据省份查找商家信息
 * @param {*} param {province:''}
 */
export function findBusinessByProvince(param){
    return axios.get('/Business/findByProvince',{params:param});
}

/**
 * 
 * @param {*} param {scale:''}
 */
export function findBusinessByScale(param){
    return axios.get('/Business/findByScale',{params:param});
}

export function saveOrUpdateBusiness(param){
    return axios.post('/Business/saveOrUpdate',param);
}