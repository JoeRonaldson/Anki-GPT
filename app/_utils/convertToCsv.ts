// Function to convert json to csv file

export function convertToCsv<T extends Record<string, any>>(jsonObj: T[]): string {
  // Check if there is data
  if (jsonObj.length === 0) {
    return '';
  }

  // Fetch the keys (column headers)
  const keys = Object.keys(jsonObj[0]);
  // Initialise array of lines
  const lines: string[] = [];

  // Add data rows
  jsonObj.forEach((obj) => {
    const line = keys
      .map((key) => {
        if (obj[key] === null || obj[key] === undefined) {
          return '';
        }
        return obj[key].toString();
      })
      .join(';');

    lines.push(line);
  });

  // Combine all lines into a single string
  return lines.join('\n');
}
