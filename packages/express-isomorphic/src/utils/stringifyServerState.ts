export default function stringifyServerState(serverStateObject) {
  let result = '';
  Object.entries(serverStateObject)
    .forEach(([key, value]) => {
      if (key === 'latestHtmlGenerated') {
        try {
          const stringifiedValue = JSON.stringify(value);
          const abbrev = abbreviateIfLong(stringifiedValue);
          result += ` ${key}: ${abbrev}`;
        } catch (err) {
          result += ` ${key}: [circular]`;
        }
      } else if (key === 'state') {
        Object.entries(value as any)
          .forEach(([key2, value2]) => {
            try {
              const stringifiedValue = JSON.stringify(value2);
              const abbrev = abbreviateIfLong(stringifiedValue);
              result += ` store.${key2}: ${abbrev}`;
            } catch (err) {
              result += ` store.${key2}: [circular]`;
            }
          });
      } else {
        try {
          result += ` ${key}: ${JSON.stringify(value)}`;
        } catch (err) {
          result += ` ${key}: [circular]`;
        }
      }
    });
  return result;
}

function abbreviateIfLong(str) {
  return str.length > 180
    ? `${str.slice(0, 180)}...[length: ${str.length}]`
    : str;
}
