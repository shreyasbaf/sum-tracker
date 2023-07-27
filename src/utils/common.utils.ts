export const getQueryFromUrl = (url: string) => {
  const urlObj = new URL(url);
  const query: Record<string, any> = {};
  urlObj.searchParams.forEach(function (val, key) {
    query[key] = val;
  });

  return query;
};

export const pluralize = (num: number, word: string, plural = word + "s") =>
  [1, -1].includes(Number(num)) ? word : plural;
