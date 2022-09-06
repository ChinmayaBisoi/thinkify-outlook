export const checkEmpty = (field: any) =>
  field !== null && field !== "" && field !== undefined;
export const getQueryObj = (obj: any) => {
  const res = Object.keys(obj).map((c) => {
    if (checkEmpty(obj[c])) {
      return { [c]: obj[c] };
    }
  });
  return res.reduce((a, c) => (c !== undefined ? { ...a, ...c } : a), {});
};
