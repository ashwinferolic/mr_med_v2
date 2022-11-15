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

const validateList = (schema) => async (req, res, next) => {
  try {
    let data = req.body.data;
    for (let item of data) {
      const { error } = schema.validate(item, {
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
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { validate, validateList };
