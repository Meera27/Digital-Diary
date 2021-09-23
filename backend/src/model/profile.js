const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/DigitalDiary');

const Profile = mongoose.model('Profile', {
    username: {
        type: String,
        required: true,
        unique: true
    },

    bio: {
        type: String,
        required: true
    },
    imagePath: { 
        type: String,
         required: true 
        },

    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});


module.exports = Profile