const moongose = require("mongoose");
const PointSchema = require("../utils/PointSchema");

const Delegacia = moongose.Schema({
    id:Number,
    name:String,
    email:String,
    password:String,
    location:{
        type:PointSchema,
        index:'2dsphere'
    },
    active:Boolean
});

module.exports = moongose.model('Delegacia', Delegacia);