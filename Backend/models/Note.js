// isme sabhi models hoge database ke 
// Folder name in Capital start

const mongoose = require ('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema ({
    user:{ //jiska jo user id hoga wo apna notes dekh paayegaa
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    tag:{
        type: String,
        default: "General"
    },
    date:{
        type: String,
        default: Date.now
    }
 
})

module.exports = mongoose.model('notes', NotesSchema)