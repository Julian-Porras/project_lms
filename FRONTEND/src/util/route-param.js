export default function ReplaceRouteParams(path, params) {
  let result = path;
  for (const key in params) {
    result = result.replace(`:${key}`, params[key]);
  }
  return result;
}
