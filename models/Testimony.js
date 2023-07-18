const mongoose = require('mongoose');

const TestimonySchema = new mongoose.Schema(
    {
        name : {type: String, required: true, unique: true},
        desc: {type: String, required: true},
        rating: {type: Number, required: true},
        extra: {type: String, required: true},
        image: {type: String, required: true},
    },
    {timestamps: true}
)

module.exports = mongoose.model('Testimony', TestimonySchema);