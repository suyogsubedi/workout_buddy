const Workout = require("../models/workoutModel")
const mongoose=require('mongoose')

// Get All Workouts
const getWorkouts = async(req,res)=>{
    const workout = await Workout.find({}).sort({createdAt:-1})
    res.status(200).json(workout)
}

// Get Single Workouts
const getWorkout = async(req,res)=>{
    const {id}= req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Workout Not Found"})
    }
    const workout = await Workout.findById(id)
    if(!workout){
        return res.status(404).json({error:"No Such Workout Found"})
    }
    res.status(200).json(workout)
    
}

// Create a new workout
const createWorkout =async(req,res)=>{
    // Add doc to db
    const {title,load,reps}=req.body

    // Error handling
    let emptyFields=[]
    if(!title){
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push("load")
    }
    if(!reps){
        emptyFields.push("reps")
    }
    if(emptyFields.length>0){
        return res.status(400).json({error:"Please fill all the fields",emptyFields})
    }
    try{
      const workout = await Workout.create({title,load,reps})
      res.status(200).json(workout)

    }catch(err){
      res.status(400).json({error:err.message})
    }
}

// Delete a workout
const deleteWorkout = async(req,res)=>{
    const {id}= req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Workout Not Found"})
    }
    // In mongodb id is referenced as _id
    const workout = await Workout.findOneAndDelete({_id:id})
    if(!workout){
        return res.status(400).json({error:"No Such Workout Found"})
    }
    res.status(200).json(workout)

}

// Update workout
const updateWorkout = async(req,res)=>{
    const {id}= req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Workout Not Found"})
    }
    // In mongodb id is referenced as _id
    const workout = await Workout.findOneAndUpdate({_id:id},{
        // get everything from the body
        ...req.body
    })

    if(!workout){
        return res.status(400).json({error:"No Such Workout Found"})
    }
    res.status(200).json(workout)
 
}

module.exports={
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout,
}