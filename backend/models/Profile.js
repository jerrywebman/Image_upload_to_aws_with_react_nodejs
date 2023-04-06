var mongoose = require("mongoose");

var profileSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    uploadDate: {
        type: Date,
        default: Date.now,
    },

});

module.exports = mongoose.model("profile", profileSchema);