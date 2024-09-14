const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const errors = require('../utils/errors/error');
const { JWT_SECRET_KEY } = process.env;
const router = express.Router();
const validator = require('../validators/validator');
const { signupSchema, loginSchema } = require('../validators/schema/user-schema')


// signup route
router.post('/signup', async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    await validator.validateSchema(req.body, signupSchema );

    if (await User.findOne({ email })) throw new errors.DuplicateData();

    const encodedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: encodedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    next(error);
  }
});


//login route
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    await validator.validateSchema(req.body, loginSchema );

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) throw new errors.AuthenticationError('Invalid user credentials')
    const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ token });

  } catch (error) {
    next(error);
  }
});

module.exports = router;