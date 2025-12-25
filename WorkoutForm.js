import React, { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'


const WorkoutForm = () => {
    const {dispatch} = useWorkoutsContext()
    const [title, setTitle] = useState("")
    const [load, setLoad] = useState("")
    const [reps, setReps] = useState("")
    const [error, setError] = useState("")
    const [ emptyFields , setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const workout = { title, load, reps }

        const response = await fetch('/api/workouts/', {
            method: 'Post',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json();

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)

        }
        else {
            setError(null);
            setTitle('');
            setLoad('');
            setReps('');
            setEmptyFields([])
            console.log('New workout added :', json)
            dispatch({type:'CREATE_WORKOUT', payload:json})
        }

    }
    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3> Add A New Workout</h3>

            <label>Exercise Title :</label>

            <input type='text' value={title} onChange={(e) => setTitle
                (e.target.value)
            } className={emptyFields.includes('title') ? 'error' : ''}>

            </input>

            <label>Load (in kg's) :</label>

            <input type='number' value={load} onChange={(e) => setLoad
                (e.target.value)
            }className={emptyFields.includes('load') ? 'error' : ''}>

            </input>

            <label>No. of Exercises :</label>

            <input type='number' value={reps} onChange={(e) => setReps
                (e.target.value)
            }className={emptyFields.includes('reps') ? 'error' : ''}>

            </input>

            <button>Add Workout</button>

            {error && <div className="error">{error}</div>}

        </form>
    )
}

export default WorkoutForm
