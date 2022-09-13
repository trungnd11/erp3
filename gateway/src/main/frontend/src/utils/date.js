import moment from "moment";

const format = "DD/MM/YYYY HH:mm";
const DATE_TYPE = "DD/MM/YYYY";

export const formatDateTime = (str) => {
  return str ? moment(str).format(format) : "";
}

export const formatDate = (str) => {
  return str ? moment(str).format(DATE_TYPE) : "";
}