const mongoose = require('mongoose')
// const AutoIncrement = require('mongoose-sequence')(mongoose)



const noteSchema = new mongoose.Schema(
    {
        
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        title: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true
        },
        completed: {
            type: Boolean,
            default: false
        },
        clientId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'Client'
        },
        part:{
            type:String,
            
        },
        count:{
            type:Number,
            default:1
        }
    },
    {
        timestamps: true
    },
);


// noteSchema.plugin(AutoIncrement, {
//     inc_field: 'rank',
//     id: 'rank_counter',
//     start_seq: 500
// })

module.exports = mongoose.model('Note', noteSchema)