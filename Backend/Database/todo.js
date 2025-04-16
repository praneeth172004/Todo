const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    Date: {
        type: Date,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
}, {
    timestamps: true // adds createdAt and updatedAt
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = {
    Todo
};
