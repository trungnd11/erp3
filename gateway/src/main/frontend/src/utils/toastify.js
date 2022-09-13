import { toast } from "react-toastify";

export const showSuccessNotice = (message, hideProgressBar = true) => {
  toast(message, { position: "top-right", hideProgressBar, closeOnClick: false, className: 'bg-success text-white' });
}

export const showWarningNotice = (message, hideProgressBar = true) => {
  toast(message, { position: "top-right", hideProgressBar, closeOnClick: false, className: 'bg-warning text-white' });
}

export const showErrorNotice = (message, hideProgressBar = true) => {
  toast(message, { position: "top-right", hideProgressBar, closeOnClick: false, className: 'bg-danger text-white' });
}