const mongoose = require('mongoose');

module.exports = function connDB(url) {
    return mongoose.connect(url);
}