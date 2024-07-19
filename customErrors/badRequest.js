const customError =require("./customError")
class badRequest extends customError{
    constructor(message) {
        super(message)
        this.statusCode = 400

    }
}

module.exports = badRequest