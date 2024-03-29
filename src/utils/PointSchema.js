const moongose = require("mongoose");

const PointSchema = moongose.Schema({
    type:{
        type:String,
        enum:['Point'],
        required:true,
    },
    coordinates:{
        type:[Number],
        required:true
    }
});

module.exports = PointSchema;