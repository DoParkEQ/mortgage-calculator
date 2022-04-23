export const formatNumber = (val: string) => {
  const v = !val ? '0' : val
  return parseFloat(v.split(',').join(''))
}

export const convertToNum = (str: string) => parseFloat(str.split(',').join(''))

export const calculateTotal = (config: Config) => {
  const { price, amortization, rate, totalRequired } = config
  const priceNum = convertToNum(price)
  let newTotalRequired = convertToNum(totalRequired)
  let newDownPayment = Math.round((1 - newTotalRequired / priceNum) * 100)
  if (priceNum < newTotalRequired) {
    newTotalRequired = priceNum
    newDownPayment = 100
  }

  const percentageRate = convertToNum(rate) / 1200
  const lengthOfLoan = 12 * convertToNum(amortization)

  const totalPayment =
    (convertToNum(totalRequired) * percentageRate) /
    (1 - Math.pow(1 + percentageRate, lengthOfLoan * -1))
  return {
    ...config,
    totalPayment: totalPayment.toLocaleString(),
    totalRequired: newTotalRequired.toLocaleString(),
    downPayment: newDownPayment.toString(),
  }
}
