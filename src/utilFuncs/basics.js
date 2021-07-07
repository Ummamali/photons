export function truncate(inputString, threshholdLength) {
  return inputString.length <= threshholdLength
    ? inputString
    : inputString.slice(0, threshholdLength - 3) + "...";
}
