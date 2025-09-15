import { Notify } from 'quasar'

export const successNotify = (message:string) => {
  Notify.create({
    message,
    position: 'top-right',
    type: 'positive',
  })
}

export const errorNotify = (message:string,isHtml= false) => {
  Notify.create({
    message,
    position: 'top-right',
    type: 'negative',
    html:isHtml
  })
}