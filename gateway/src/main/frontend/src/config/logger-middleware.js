/* eslint-disable import/no-anonymous-default-export */
/* eslint no-console: off */
export default () => (next) => (action) => {
  if (process.env.NODE_ENV === 'development') {
    const {
      type, payload, meta, error,
    } = action;

    console.groupCollapsed(type);
    console.log('Payload:', payload);
    if (error) {
      console.log('Error:', error);
    }
    console.log('Meta:', meta);
    console.groupEnd();
  }

  return next(action);
};
