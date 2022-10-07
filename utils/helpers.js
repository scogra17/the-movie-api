const strToArr = (str) => {
  return JSON.parse(str.replace(/'/g, '"'));
}

const removeQuotes = (str) => {
  return str.replace(/['‘’"“”]/g, '');
}

module.exports = {
  strToArr,
  removeQuotes
};
