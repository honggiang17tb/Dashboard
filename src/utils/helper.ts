import { toast,Slide } from 'react-toastify'

export const clone = (input: any) => {
  return JSON.parse(JSON.stringify(input))
}

export const alertSuccess = (content: string) => {
  toast.success(content, {
    position: 'top-right',
    autoClose: 3000,
    theme: 'colored',
    transition: Slide,
  });
}

export const alertError = (content: string) => {
  toast.error(content, {
    position: 'top-right',
    autoClose: 3000,
    theme: 'colored',
    transition: Slide,
  });
}
export const alertCode401 = (content: string) => {
  toast.info(content, {
    position: 'top-right',
    autoClose: 3000,
    theme: 'colored',
    transition: Slide,
  });
}

