/*
 * @Author: wenxt 
 *福利API
 * @Date: 2019-12-26 10:47:24 
 * @Last Modified by: wenxt
 * @Last Modified time: 2019-12-26 15:05:26
 */

import axios from '@/utils/axios';

export function deleteWelfareById(param){
    return axios.post('/Welfare/deleteById',param);
}

export function findAllWelfare(){
    return axios.get('/Welfare/findAll');
}

export function findWelfareById(param){
    return axios.get('/Welfare/findById',{params:param});
}

export function saveOrUpdateWelfare(param){
    return axios.post('/Welfare/saveOrUpdate',param);
}