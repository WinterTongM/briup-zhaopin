/*
 * @Author: wangzai 
 * @Date: 2019-12-26 15:40:00 
 * @Last Modified by: wenxt
 * @Last Modified time: 2019-12-30 01:02:00
 */

import axios from '@/utils/axios';


export function findAllEmploymentJobhunterWithJobhAndEmpl(param) {
    return axios.get('/EmploymentJobhunter/findAllWithJobhAndEmpl', param);
}


