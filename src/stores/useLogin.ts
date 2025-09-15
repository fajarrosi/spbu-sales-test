import { defineStore } from 'pinia';
import { ref } from 'vue';
import { printContent } from 'src/methods/usePrint';
interface userToken {
  access: string;
  refresh: string;
}

interface userModel {
  user_id: number;
  user_name: string;
  user_fullname: string;
  is_admin: boolean;
  email: string;
  lang_id: number;
  mobile_no: string;
  whatsapp: string;
  cust_id: string;
  emp_id: number;
  parent_cust_id: string;
  token: userToken;
  image_url: number;
  skin_name: number;
  distributor_id: string;
}

interface userToken {
  access: string;
  refresh: string;
}

export const useLogin = defineStore('login', () => {
  const showReport = ref(false);
  async function setUser(payload: userModel) {
    localStorage.setItem('token', payload.token.access);
    localStorage.setItem('fullname', payload.user_fullname);
    localStorage.setItem('cust_id', payload.cust_id);
    localStorage.setItem('distributor_id', payload.distributor_id);
 
  }


  function deleteUser() {
    return new Promise((resolve) => {
      localStorage.setItem('token', '');
      localStorage.setItem('fullname', '');
      localStorage.setItem('cust_id', '');
      resolve('OK');
    });
  }

  const getToken = () => {
    return localStorage.getItem('token') ?? '';
  };

  const getFullname = () => {
    // return localStorage.getItem('fullname') ?? 'Admin';
    return  'Admin';
  };

  const getHeaderPrint = () => {
    return JSON.parse(localStorage.getItem('headerPrint') ?? '{}') ?? {};
  };

  const isPrincipal = () => (localStorage.getItem('distributor_id') == '0' ? true : false);

  const printing = () => {
    showReport.value = true;
    setTimeout(() => {
      printContent('report');
      showReport.value = false;
    }, 1);
  };



  return {
    setUser,
    deleteUser,
    getToken,
    getFullname,
    getHeaderPrint,
    showReport,
    isPrincipal,
  };
});
