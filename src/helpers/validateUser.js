function validateUser(req, res, next) {
  const { first_name, last_name, email, age, password, confirmpassword } =
    req.body;

  if (!first_name) {
    return res.json({
      error: 'first_name is required',
    });
  }

  if (!last_name) {
    return res.json({
      error: 'last_name is required',
    });
  }

  if (!email) {
    return res.json({
      error: 'email is required',
    });
  }

  if (!age) {
    return res.json({
      error: 'age is required',
    });
  }

  /* if (!status) {
        return res.json({
          error: "status is required",
        });
    }; */

  if (!password) {
    return res.json({
      error: 'password is required',
    });
  }

  if (confirmpassword) {
    if (password != confirmpassword) {
      return res.json({
        error: 'The keys do not match',
      });
    }
  }

  next();
}

export { validateUser };
