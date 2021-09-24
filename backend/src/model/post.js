const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/DigitalDiary');

const Post = mongoose.model('Post', {
    UserID : String,
    title: {
        type: String,
        required: true
    },
    category : String,
    image :String,
    content : String,
    review:String
});


module.exports = Post