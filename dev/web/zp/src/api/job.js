/*
 * @Author: wangzai 
 * @Date: 2019-12-26 15:40:00 
 * @Last Modified by: wangzai
 * @Last Modified time: 2019-12-27 16:44:47
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
  /** 
   * 查找所有求职者信息
  */
//  /Jobhunter/findAll 

//  export function findAllJobhunter() {
//   return axios.get('/Jobhunter/findAll');
// }

// /**
//  * 通过学历查找求职者信息
//  * @param {Object} param {education:''}
//  */
// export function findJobhunterByEducation(param) {
//   return axios.get('/Jobhunter/findByEducation', {
//     params: param
//   });
// }

// // get /Jobhunter/findByGender 
// /**
//  * 通过性别查找求职者信息
//  * @param {Object} param {gender:''}
//  */
// export function findJobhunterByGender(param) {
//   return axios.get('/Jobhunter/findByGender', {
//     params: param
//   });
// }

// // get /Jobhunter/findById 
// /**
//  * 通过id查找求职者信息
//  * @param {Object} param {id:''}
//  */
// export function findJobhunterById(param) {
//   return axios.get('/Jobhunter/findById', {
//     params: param
//   });
// }

// // get /Jobhunter/findByTelephone 
// /**
//  * 通过手机号码查找求职者信息
//  * @param {Object} param {telephone:''}
//  */
// export function findJobhunterByTelephone(param) {
//   return axios.get('/Jobhunter/findByTelephone', {
//     params: param
//   });
// }


// /**
//  * 通过用户名查找求职者信息
//  * @param {Object} param {username:''}
//  */
// export function findJobhunterByUsername(param) {
//   return axios.get('/Jobhunter/findByUsername', {
//     params: param
//   });
// }
