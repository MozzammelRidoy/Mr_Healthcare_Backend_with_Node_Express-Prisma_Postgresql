const pick = <T extends Record<string, unknown>, k extends keyof T>(
  obj: T,
  kyes: k[]
): Partial<T> => {
  const finalObj: Partial<T> = {};

  for (const key of kyes) {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      finalObj[key] = obj[key];
    }
  }
  return finalObj;
};

export default pick;
