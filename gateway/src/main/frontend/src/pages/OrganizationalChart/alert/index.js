import { toast } from "react-toastify";
import Swal from "sweetalert2";

export const Alert = (title, backgroud, color) => {
  return toast(title, {
    position: "top-right",
    hideProgressBar: true,
    className: `${backgroud} ${color}`,
  });
};

export const SweetAlert = (status, label, time) => {
  return Swal.fire({
    icon: status,
    html: `<p>${label}</p>`,
    showConfirmButton: false,
    timer: time,
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
  });
};

export const SweetAlertComfirm = (
  alertMessage,
  message,
  callback,
  callbackCancel
) => {
  Swal.fire({
    title: alertMessage,
    text: message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, change it!",
  }).then((result) => {
    if (result.isConfirmed) {
      callback();
    } else if (result.isDismissed) {
      callbackCancel();
    }
  });
};

export const ShowImage = (url) => {
  Swal.fire({
    imageUrl: url,
    imageWidth: 500,
    imageHeight: 500,
    imageAlt: "Custom image",
    showConfirmButton: false,
  });
};
