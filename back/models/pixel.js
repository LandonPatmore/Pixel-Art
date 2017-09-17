const mongoose   = require('mongoose'),
      timestamps = require('mongoose-timestamp')

Schema = mongoose.Schema;

UserSchema = require('./user.js')

const PixelSchema = new mongoose.Schema({
    pixelID: String,
    posX: Number,
    posY: Number,
    currentColor: String,
    currentHex: String,
    currentOwner: String,
    pastOwners: [String],
    pastColors: [String],
    lastChanged: String
}, { collection: 'pixels' })

PixelSchema.plugin(timestamps)

module.exports = exports = mongoose.model('Pixel', UserSchema)