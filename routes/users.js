const express = require("express")
const router = express.Router()
const {registerUser,loginUser} = require("../controllers/users")

router.route('/register').post(registerUser).get(registerUser)
router.route('/login').post(loginUser).get(loginUser)


module.exports = router