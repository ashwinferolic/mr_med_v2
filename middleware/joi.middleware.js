const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, {
    errors: { wrap: { label: false } },
  });
  if (error) {
    return res.status(422).json({
      status: res.statusCode,
      error_message: error.details[0].message,
    });
  } else {
    next();
  }
};

module.exports = { validate };
