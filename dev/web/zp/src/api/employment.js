/*
 * @Author: LeiHaha 
 * 招聘API
 * @Date: 2019-12-25 09:03:27 
 * @Last Modified by: wangzai
 * @Last Modified time: 2019-12-29 15:20:28
 */
import axios from '@/utils/axios';
/**
 * 通过ID删除招聘信息
 * @param {Object} param {id:''}      //运用该方法需要参数id
 */
export function deleteEmploymentById(param){          
    return axios.post('/Employment/deleteById',param);
}
/**
 * 查找所有招聘信息
 */
export function findAllEmployment(){
    return axios.get('/Employment/findAll');
}
/**
 * 通过城市查找招聘
 * @param {Object} param{city:''} 
 */
export function findEmploymentByCity(param){
    return axios.get('/Employment/findByCity',{params:param});
}
/**
 * 通过id查找招聘
 * @param {Object} param{id:''} 
 */
export function findEmploymentById(param){
    return axios.get('/Employment/findById',{params: param});
}
/**
 * 通过职位查找招聘
 * @param {Object} param{id:''} 
 */
export function findEmploymentByJob(param){
    return axios.get('/Employment/findByJob',{params: param});
}
/**
 * 通过招聘标题查找招聘
 * @param {Object} param{title:''} 
 */
export function findEmploymentByTitle(param){
    return axios.get('/Employment/findByTitle',{params: param});
}
/**
 * 通过福利标题查找招聘
 * @param {Object} param{welfare:''} 
 */
export function findEmploymentByWelfare(param){
    return axios.get('/Employment/findByWelfare',{params: param});
}
/**
 * 通过新增或修改招聘信息
 * @param {Object} param{province:''} 
 */
export function saveEmploymentOrUpdate(param){
    return axios.post('/Employment/saveOrUpdate',param);
}