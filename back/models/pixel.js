const mongoose   = require('mongoose'),
      timestamps = require('mongoose-timestamp')

Schema = mongoose.Schema;

UserSchema = require('./user.js')

const PixelSchema = new mongoose.Schema({
    pixelID: String,
    posX: Number,
    posY: Number,
    currentColor: String,
    currentOwner: String,
    pastOwners: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    pastColors: [String],
    lastChanged: String
}, { collection: 'pixels' })

PixelSchema.plugin(timestamps)

module.exports = exports = mongoose.model('Pixel', UserSchema)