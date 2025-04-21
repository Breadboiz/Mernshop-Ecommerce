export const hasEmptyValue = (obj) => {
    return Object.values(obj).some(
      value =>
        value === '' ||
        value === null ||
        value === undefined ||
        (typeof value === 'string' && value.trim() === '')
    );
  };