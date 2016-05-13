import numeral from 'numeral';

export function formatPercentage(value) {
  return numeral(value).format('0.[00]%');
}

export function formatDecimal(value) {
  return numeral(value).format('0.[00]');
}
