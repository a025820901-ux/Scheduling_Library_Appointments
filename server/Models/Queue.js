const mongoose = require("mongoose")

const QueueSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true
    },
    type: {
        type: String,
        enum: ['Borrow', 'Read'],
        default: "Borrow"
    },
    day: {
        type: Number,
        min: 1,
        max: 5,
        require: true

    },
    hour: {
        type: Number,
        min: 8,
        max: 22,
        require: true

    }
}, {
    timestamps: true
})

module.exports=mongoose.model('Queue',QueueSchema)

