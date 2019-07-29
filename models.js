const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const phoneNumber = new Schema({
    telephone_number: {
        type: Number,
        required: true,
        unique: true,
      },
    sms_message: {
        type: String,
        required: true,
    }
});
const PhoneModel = mongoose.model("phone", phoneNumber);

module.exports = phoneNumber;