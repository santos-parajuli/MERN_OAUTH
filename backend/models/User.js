const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const contact = new Schema({
    fullName: {
        type: String,
        required: true
    },
    avatarURL: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

// Create Schema
const UserSchema = new Schema({
    emailAddress: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
    },
    password: {
            type: String,
        },
    accountCreated: {
            type: Date,
        },
    profile: {
        name: {
            type: String,
            required: true,
        },
        avatarURL: String
    },
    loginStrategy: {
        type: String,
        enum: {
            values: ['google','facebook', 'twitter', 'instagram', 'github', 'signin'],
        }
    },
    contacts: {
        friends: [contact],
    },
    accessToken: {
	        type: String,
	    
	}
});


module.exports = User = mongoose.model("users", UserSchema);
