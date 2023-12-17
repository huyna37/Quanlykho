const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema({
    name: String,
    address: String,
    phone: String,
    description: String,
    createAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
    },
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});
schema.index({ createdAt: -1 });

const model = mongoose.model('Supplier', schema);

module.exports = model;