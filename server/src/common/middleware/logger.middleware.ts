export function logger(req, res, next) {
  const { method, path } = req

  // eslint-disable-next-line no-console
  console.log(`${method} ${path}`)
  next()
}
