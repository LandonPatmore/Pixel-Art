const mongoose   = require('mongoose'),
      timestamps = require('mongoose-timestamp')
      
Schema = mongoose.Schema;

PixelSchema = require('./pixel.js')

const UserSchema = new mongoose.Schema({
	userID: String,
	accountCreated: String,
	currentPixels: {posX: Number, posY: Number},
	numberPixelsChanged: Number,
	Red: Number,
	Green: Number,
    Blue: Number,
    Orange: Number,
    Yellow: Number,
    Pink: Number,
    Black: Number,
    White: Number,
    Purple: Number,
    disabled: Boolean,
    password: String
}, { collection: 'users' })

UserSchema.plugin(timestamps)

module.exports = exports = mongoose.model('User', UserSchema)