const express = require("express")
const router = express.Router()
const {postregisterUser,loginUser, registerUser,postloginUser} = require("../controllers/users")
router.route('/').post(postregisterUser).get(registerUser)
router.route('/login').post(postloginUser).get(loginUser)


module.exports = router