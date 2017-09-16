const mongoose   = require('mongoose'),
      timestamps = require('mongoose-timestamp')
      
Schema = mongoose.Schema;

PixelSchema = require('./pixel.js')

const UserSchema = new mongoose.Schema({
	userID: String,
	accountCreated: String,
	currentPixels: [{ type: Schema.Types.ObjectId, ref: 'Pixel' }],
	numberPixelsChanged: Number,
	colorCounts: {
		red: Number,
		green: Number,
        blue: Number,
        orange: Number,
        yellow: Number,
        pink: Number,
        black: Number,
        white: Number,
        purple: Number
	}
}, { collection: 'users' })

UserSchema.plugin(timestamps)

module.exports = exports = mongoose.model('User', UserSchema)