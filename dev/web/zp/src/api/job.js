/*
 * @Author: wenxt 
 * @Date: 2019-12-29 09:31:40 
 * @Last Modified by: wenxt
 * @Last Modified time: 2019-12-29 09:35:13
 */
import axios from '@/utils/axios'


export function deleteJobById(param){
    return axios.post('/Jobs/deleteById',param);
}

export function findAllJob(){
    return axios.get('/Jobs/findAll');
}

export function findJobById(param){
    return axios.get('/Jobs/findById',{params:param});
}

export function findJobByStatus(param){
    return axios.get('/Jobs/findByStatus',{params:param});
}

export function saveOrUpdateJob(param){
    return axios.post('/Jobs/saveOrUpdate',param);
}