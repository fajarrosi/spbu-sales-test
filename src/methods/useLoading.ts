import { Loading } from 'quasar'

const showLoading = () => {
  Loading.show({
      message: 'Data sedang diproses, Mohon tunggu...',
      boxClass: 'bg-grey-2 text-grey-9',
      spinnerColor: 'primary'
  })
}

const hideLoading = () => {
  Loading.hide()
}

export {
  showLoading, hideLoading
}