//handle errors
export function handleError(err, res, next) {
  console.error(err)
  res.locals.handleError = err
  next()
}
