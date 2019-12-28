import axios from '@/utils/axios';
/**
 * 通过ID删除商家信息
 * @param {Object} param {id:''}
 */
export  function deleteCustomerServiceById(param) {
    return  axios.post('/CustomerService/deleteById',param);
    
  } 

 

  /**
 * 查找所有商家信息
 * 
 */
export  function findAllCustomerService() {
  return  axios.get('/CustomerService/findAll');
  
} 




 /**
  * 通过城市查找商家信息
  * @param {object} param 
  * {city:''}
  */
 export  function findCustomerServiceByEducation(param) {
  return  axios.get('/CustomerService/findByEducation',{params:param});
  
} 




/**
  * 通过ID查找商家信息
  * @param {object} param 
  * {id:''}
  */
 export  function findCustomerServiceById(param) {
  return  axios.get('/CustomerService/findById',{params:param});
  
} 



 /**
  * 通过行业查找商家信息
  * @param {object} param 
  * {Industry:''}
  */
 export  function findBusinesByGender(param) {
  return  axios.get('/CustomerService/findByGender',{params:param});
  
} 



  /**
  * 通过位置查找商家信息
  * @param {object} param 
  * {Location:''}
  */
 
 export  function findCustomerServiceByUsername(param) {
  return  axios.get('/CustomerService/findByUsername',{params:param});
  
} 


 /**
  * 保存过更改商家信息
  * @param {object} param 
  * {Scale:''}
  */

 export  function saveOrUpdateCustomerService(param) {
  return  axios.post('/CustomerService/saveOrUpdate',param);
  
} 