/* eslint-disable import/prefer-default-export */
export function isEmpty(str) {
  return (!str || /^\s*$/.test(str));
}
