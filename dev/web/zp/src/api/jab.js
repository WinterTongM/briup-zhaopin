import axios from '@/utils/axios';



export  function findAllEmpJobWithJobhAndEmpl() {
    return  axios.get('/EmploymentJobhunter/findAllWithJobhAndEmpl');
    
  } 