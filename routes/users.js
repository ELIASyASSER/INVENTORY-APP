const express = require("express")
const {postregisterUser,loginUser, registerUser,postloginUser} = require("../controllers/users")
const router = express.Router()
router.route('/signup').get(registerUser).post(postregisterUser)
router.route('/login').get(loginUser)
const passport = require("passport")

router.route('/')
    .get(registerUser)
    .post(postregisterUser)
router.route('/login')
    .get(loginUser)
    .post(
        // Let passport handle the checking of the username/password and redirect back to login if the authentication fails
        // The authentication logic is specified by the LocalStrategy in app.js
        passport.authenticate("local", { failureRedirect: "/login" }),
        postloginUser
    )


module.exports = router
