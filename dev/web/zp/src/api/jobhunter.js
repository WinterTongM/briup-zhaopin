/*
 * @Author: Ryan 
 * @Date: 2019-12-25 15:33:43 
 * @Last Modified by: Ryan
 * @Last Modified time: 2019-12-28 15:09:58
 */
/* 查找数据 */

import axios from '@/utils/axios';

export  function findAllJobhunter() {
  return axios.get('/Jobhunter/findAll');
}


/**
 * 通过学历找到所有消息
 * @param {object} param {id：''}
 */
export function findJobhunterByEducation(param){
    return axios.get('/Jobhunter/findByEducation',{params: param});
}

/**
 * 通过性别找到所有消息
 * @param {object} param {id：''}
 */
export function findJobhunterByGender(param){
    return axios.get('/Jobhunter/findByGender',{params: param});
}

/**
 * 通过性别找到所有消息
 * @param {object} param {id：''}
 */
export function deleteJobhunterById(param){
  return axios.post('/Jobhunter/deleteById',param);
}

/**
 * 通过保存或者更新找到所有消息
 * @param {object} param {id：''}
 */
export function saveOrUpdateJobhunter(param){
  return axios.post('/Jobhunter/saveOrUpdate',param);
}