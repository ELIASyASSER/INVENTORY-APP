const express = require("express")
const router = express.Router()
const {postregisterUser,loginUser, registerUser,postloginUser} = require("../controllers/users")

router.route('/').get(registerUser).post(postregisterUser)
router.route('/login').get(loginUser).post(postloginUser)


module.exports = router