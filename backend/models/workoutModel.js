const mongoose = require("mongoose")

const Schema = mongoose.Schema

const workoutSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    reps:{
        type:Number,

        required:true
    },
    load:{
        type:Number,
        required:true
    }
},{timestamps:true})

// Workout is the model name (Collection of Workouts will be created )
module.exports = mongoose.model('Workout',workoutSchema)



