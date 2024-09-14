const Joi = require('joi');


const signupSchema = Joi.object().keys({
    // name should have alphabets, - , ' and one space between characters only.
    // password should have 1 capital letter, min 8 characters and 1 special character. 
    name: Joi.string().regex(/^[A-Za-z'-]+( [A-Za-z'-]+)*$/).required()         // Ensure the name is required (not null or empty)
    .messages({
        'string.pattern.base': 'Name can only contain alphabets, hyphens (-), and apostrophes (\').',
        'string.empty': 'Name cannot be an empty string.',
        'any.required': 'Name is a required field.'
    }),
    email: Joi.string().email(),
    password: Joi.string().regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>\/?]).{8,}$/).required()
    .messages({
      'string.pattern.base': 'Password must be at least 8 characters long, contain one uppercase letter, and one special character.',
      'string.empty': 'Password cannot be empty.',
      'any.required': 'Password is a required field.'
    })
  });


// password should have 1 capital letter, min 8 characters and 1 special character. 
const loginSchema = Joi.object().keys({
  email: Joi.string().email(),
  password: Joi.string().regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>\/?]).{8,}$/).required()
  .messages({
    'string.pattern.base': 'Password must be at least 8 characters long, contain one uppercase letter, and one special character.',
    'string.empty': 'Password cannot be empty.',
    'any.required': 'Password is a required field.'
  })
});






  module.exports = {
    signupSchema,
    loginSchema
  }