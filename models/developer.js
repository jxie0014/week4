let mongoose = require('mongoose');

let developerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        firstName:{
            type: String,
            required: true
        },
        lastName:String
        },
    level: {
        type: String,
        required: true
    },
    address: {
        state:String,
        suburb: String,
        street: String,
        unit: Number
    }
});

developerSchema.pre('save',function(){
    this.level=this.level.toUpperCase();
});

module.exports = mongoose.model('Developer', developerSchema);