const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true // Đảm bảo mọi danh mục có tên
    },
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

const model = mongoose.model('Category', schema);

module.exports = model;