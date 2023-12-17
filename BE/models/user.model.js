const { default: mongoose } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const schema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true, // Đảm bảo không có tên người dùng trùng lặp
        required: true // Đảm bảo mọi user đều có tên người dùng
    },
    password: {
        type: String,
        required: true,
        minLength: 1,
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, "Vui lòng nhập mật khẩu xác thực"],
        validate: {
            validator: function (el) {
                // "this" works only on create and save
                return el === this.password;
            },
            message: "Mật khẩu phải trùng nhau",
        },
        select: false
    },
    role: {
        type: String,
        enum: ['admin', 'user'], // Nếu có các vai trò khác nhau, sử dụng enum để định nghĩa các giá trị hợp lệ
        default: 'user' // Mặc định là user nếu không được chỉ định
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
    }
});
schema.index({ createdAt: -1 });

schema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      return next();
    }
  
    this.password = await bcrypt.hash(this.password, 12);
  
    next();
  });
  schema.pre("findOneAndUpdate", async function (next) {
    try {
      const password = this.getUpdate()?.$set?.password;
  
      if (!password) {
        return next();
      }
  
      const hashedPassword = await bcrypt.hash(password, 12);
  
      this.findOneAndUpdate({}, { password: hashedPassword });
  
      next();
    } catch (error) {
      next(error);
    }
  });
  schema.methods.correctPassword = async function (
    typedPassword,
    originalPassword
  ) {
    return await bcrypt.compare(typedPassword, originalPassword);
  };

const model = mongoose.model('User', schema);


module.exports = model;