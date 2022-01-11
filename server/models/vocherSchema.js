import mongoose from 'mongoose';

var vocherSchema = new mongoose.Schema({
    code: String,
    discount: Number,
    type: String,
    list_game: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game"
    }],
    count: Number,
    create_date: String,
    time_expired: String,
    status: Boolean
}, {
    versionKey: false
})

const Vocher = mongoose.model("Vocher", vocherSchema, "vochers")

export default Vocher
