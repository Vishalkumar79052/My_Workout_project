const Workout = require('../models/workoutmodel');
const mongoose = require('mongoose');

exports.getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });

    if (!workouts)
        return res.status(400).json({ error: "No entries found" })
    res.status(200).json(workouts);
}

exports.getWorkout = async (req, res) => {
    const { id } = req.params;
    // const workout = await Workout.find({_id:id});

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "No such workout " })
    }

    if (!workout)
        return res.status(400).json({ error: "No such workout " })
    res.status(200).json(workout)
}


exports.createWorkout = async (req, res) => {
    const { title, load, reps } = req.body;

    let emptyFields = [];
    if(!title){
        emptyFields.push('title')
    } 
    else if(!load){
        emptyFields.push('load')
    }
    else if(!reps){
        emptyFields.push('reps')
    }

    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill out all the fields',
            emptyFields
        })
    } 

    try {
        const workout = await Workout.create({ title, load, reps })
        res.status(200).json(workout)

    } catch (error) {
        res.status(400).json({ error: error.message })

    }
}

exports.deleteWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "No such workout " })
    }
    const workout = await Workout.findOneAndDelete({ _id: id })

    if (!workout) {
        return res.status(400).json({ error: "No such workout to deleted" })
    }
    res.status(200).json(workout)
}


exports.updateWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "No such workout " })
    }
    const workout = await Workout.findOneAndUpdate(
        {
            _id: id
        },
          {
            ...req.body  
        })

    if (!workout) {
        return res.status(400).json({ error: "No such workout to update" })
    }
    res.status(200).json(workout)
}


// module.exports = {
//     createWorkout
// }