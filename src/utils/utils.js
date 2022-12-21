import BigNumber from 'bignumber.js'

export function formatBigNumber(value, decimals = 18) {
  return value ? value.div(new BigNumber(10).pow(decimals)) : new BigNumber(0);
}

export function formatedPercent(value) {
  if (value.gt(1000)) {
    return `${value.div(1000).toFormat(2)}k`
  } else {
    return value.toFormat(2);
  }
}