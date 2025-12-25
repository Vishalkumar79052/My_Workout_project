const express = require('express')

const Workout = require('../models/workoutmodel');

const {createWorkout , getWorkouts , 
    getWorkout,deleteWorkout ,updateWorkout} 
    = require('../controllers/workoutController');

const router = express.Router();

router.get('/',getWorkouts);

router.get('/:id',getWorkout);

 router.post('/',createWorkout);
//     // const { title , load , reps }= req.body;

//     // try{
//     //     const workout = await Workout.create({ title , load , reps })
//     //     res.status(200).json(workout)

//     // }catch(error){
//     //     res.status(400).json({error: error.message})

//     // }

//     res.json({
//         msg:'Hii , all the past workouts'
//     })
// });

router.delete('/:id',deleteWorkout);


router.patch('/:id',updateWorkout);

module.exports = router