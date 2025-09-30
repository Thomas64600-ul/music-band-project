export function errorHandler(err, req, res, next) {
  console.error("Erreur capturée :", err.stack);

  const statusCode = err.statusCode || 500;
  const message =
    process.env.NODE_ENV === "development"
      ? err.message
      : "Une erreur interne est survenue";

  res.status(statusCode).json({
    success: false,
    error: message,
  });
}
