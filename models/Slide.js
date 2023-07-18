const mongoose = require('mongoose');

const SlideSchema = new mongoose.Schema(
    {
        title : {type: String, required: true, unique: true},
        desc : {type: String, required: true},
        url: {type: String, required: true},
        image: {type: String, required: true},
        userId: {type: String, required: true},
        

    },
    {timestamps: true}
)

module.exports = mongoose.model('Slide', SlideSchema);