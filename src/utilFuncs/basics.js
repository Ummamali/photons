export function truncate(inputString, threshholdLength) {
  return inputString.length <= threshholdLength
    ? inputString
    : inputString.slice(0, threshholdLength - 3) + "...";
}

// for clearing the fields
export function clearFields(fieldReferences) {
  for (const fieldRef of Object.values(fieldReferences)) {
    fieldRef.current.value = "";
  }
}
