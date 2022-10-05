const strToArr = (str) => {
  return JSON.parse(str.replace(/'/g, '"'));
}

module.exports = {
  strToArr
};
