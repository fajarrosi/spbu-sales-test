import { showLoading, hideLoading } from 'methods/useLoading';
import { successNotify } from 'methods/useNotify';
import { success } from 'interface/SuccessResponse';

export const useGeneralFetch = async (callback :Promise<success>, reloadData : VoidCallback,message:string) => {
  showLoading();
  try {
    await callback;
    successNotify(message);
    reloadData();
  } catch (error) {
    console.error('Error occurred:', error);
  } finally {
    hideLoading();
  }
}