export const formatChar = (str?: string, limit = 10): string => {
  if (!str) {
    return '';
  }
  if (limit === 0) {
    return str;
  }
  if (str.length <= limit) {
    return str;
  }
  const strArr = str.split(' ');
  const newStr: string[] = [];
  strArr.reduce((acc, cur) => {
    if (acc + cur.length <= limit) {
      newStr.push(cur);
    }
    return acc + cur.length;
  }, 0);
  return newStr.join(' ') + '...';
};
