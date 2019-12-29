/*
 * @Author: wangzai 
 * @Date: 2019-12-26 15:40:00 
 * @Last Modified by: wenxt
 * @Last Modified time: 2019-12-29 15:31:01
 */

import axios from '@/utils/axios';
/** 
 * 通过id删除求职者信息
 * @param {Object} param {id:''} 
*/

// get /EmploymentJobhunter/findAllWithJobhAndEmpl 

export function findAllEmploymentJobhunterWithJobhAndEmpl(param) {
    return axios.get('/EmploymentJobhunter/findAllWithJobhAndEmpl', param);
}


