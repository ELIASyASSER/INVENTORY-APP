const express = require("express")
const router = express.Router()
const {postregisterUser,loginUser, registerUser} = require("../controllers/users")

router.route('/signup').get(registerUser).post(postregisterUser)
router.route('/login').get(loginUser)


module.exports = router