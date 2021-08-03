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

export function stamptoDateValue(timeStamp) {
  // converts timestamp to a date format for date input
  const dateObj = new Date(timeStamp);
  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const date = dateObj.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${date}`;
}

export function dateValueToStamp(dateValue) {
  return new Date(dateValue).getTime();
}
