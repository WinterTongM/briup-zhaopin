/*
 * @Author: wenxt 
 * @Date: 2019-12-29 08:55:54 
 * @Last Modified by: wenxt
 * @Last Modified time: 2019-12-29 09:04:12
 */
import axios from '@/utils/axios'


export function deleteJobTypeById(param){
    return axios.post('/JobType/deleteById',param);
}

export function findAllJobType(){
    return axios.get('/JobType/findAll');
}

export function findJboTypeById(param){
    return axios.get('/JobType/findById',{params:param});
}

export function saveOrUpdateJobType(param){
    return axios.post('/JobType/saveOrUpdate',param);
}