const moongose = require("mongoose");
const PointSchema = require("../utils/PointSchema");

const Delegacia = moongose.Schema({
    id: Number,
    name: String,
    email: String,
    password: String,
    location: {
        type: PointSchema,
        index: '2dsphere'
    },
    active: Boolean,
    accountChecked:{
        type:Boolean,
        select: false
    },
    checkAccounToken: {
        type: String,
        select: false
    },
    passwordResetToken: {
        type: String,
        select: false
    },
    passwordResetExpiresIn: {
        type: Date,
        select: false
    }
});

module.exports = moongose.model('Delegacia', Delegacia);