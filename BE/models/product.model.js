const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema({
    name: String,
    description: String,
    priceInput: Number,
    priceOutput: Number,
    amount: Number,
    amountAvailable: Number,
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier'
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
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
schema.index({ name: -1 });

const model = mongoose.model('Product', schema);

module.exports = model;