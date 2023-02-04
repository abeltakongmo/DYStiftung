
const check = require('yup')

module.exports = check.object().shape({
    email: check.string().required().email(),
    password: check.string().required().min(8),
    confirmpassword: check.string().oneOf([check.ref('password'), null], 'Confirm Password must match the enter password'),
})

