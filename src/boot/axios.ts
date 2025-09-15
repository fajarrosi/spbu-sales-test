import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import { useLogin } from 'src/stores/useLogin';
import { errorNotify } from 'methods/useNotify';
// import { storeToRefs } from 'pinia';
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const BASE_URL = process.env.BASE_URL
// const BASE_URL = 'http://103.28.219.73:5001'

const api = axios.create({ 
  baseURL: BASE_URL,
});

const scyllaApi = axios.create({ 
  baseURL: BASE_URL,
});

export default boot(({ urlPath,router,store }) => {
  // router.beforeEach((to,from,next) => {
  //   const loginStore = useLogin(store);
  //   const { deleteUser,getToken } = loginStore
  //   scyllaApi.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`
  //   scyllaApi.interceptors.response.use(
  //     (response) => {
  //       return response;
  //     },
  //     (error) => {
  //       if (error.response.status === 401 && !urlPath.startsWith('/login')) {
  //         deleteUser().then(() => {
  //           router.push({ name: 'login' });
  //         });
  //       }else {
  //         const dataError = error.response.data
  //         const errorForm = Object.keys(dataError)
  //         if(errorForm.includes('errors')){
  //           if(typeof dataError.errors == 'string'){ //NOTE - Error berupa string
  //             errorNotify(`${dataError.errors}`)
  //           }else if(dataError.errors instanceof Array) { //NOTE - Error berupa array
  //             const errorFormArray = dataError.errors.map((err:any) => err.message)
  //             errorFormArray.forEach((element:any) => {
  //               errorNotify(`${element}`)
  //             });
  //           }else { //NOTE - Error berupa object
  //             for (const props in dataError.errors) {
  //               errorNotify(`${dataError.errors[props]}`)
  //             }
  //           }
  //         }else {
  //           if(dataError.message){
  //             errorNotify(`${dataError.message}`)
  //             if(dataError.message == 'jwt is expired'){
  //               deleteUser().then(() => {
  //                 router.push({ name: 'login' });
  //               });
  //             }
  //           }
  //         }
  //       }
  //       return Promise.reject(error);
  //     }
  //   )

  //   if (to.matched.some(record => record.meta.requiresAuth) && !getToken()) { // jika belum login redirect ke login
  //     next({ name: 'login' })
  //   }else{
  //     next()
  //   }
  // })
    
  
});

export { api,scyllaApi };
