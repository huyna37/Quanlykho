const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    name: String,
    phone: Number,
    address: String,
    description: String,
    amount: Number,
    status: Boolean,
    createAt: {
        type: Date,
        default: Date.now
    },
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});
schema.index({ createdAt: -1 });

const model = mongoose.model('Bill', schema);

module.exports = model;