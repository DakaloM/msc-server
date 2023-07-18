const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema(
    {
        firstname : {type: String, required: true},
        lastname : {type: String, required: true},
        role : {type: String, required: true},
        about : {type: String, required: true},
        image: {type: String, required: true},

    },
    {timestamps: true}
)

module.exports = mongoose.model('Employee', EmployeeSchema);