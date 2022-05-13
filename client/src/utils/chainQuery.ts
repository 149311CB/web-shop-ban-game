export function chainQueries(
  url: string,
  params: { [k: string]: number | string }
) {
  const query = Object.entries(params).reduce(
    (prev, [key, val]) => prev + `&${key}=${val}`,
    ""
  );
  return url + "?" + query;
}
