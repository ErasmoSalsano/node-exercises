exports.sum = (...args) => {
  return args.reduce((prev, curr)=> prev + curr, 0)
}

/*
Alternativa per esportare, se al posto di exports.sum avessi usato sum
module.exports = {
  sum
}
 */
