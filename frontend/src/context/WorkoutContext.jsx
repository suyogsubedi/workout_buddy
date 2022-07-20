import { useReducer,createContext } from "react";

// First we need to create a context
export const WorkoutContext= createContext()
// state will containt the previous state
export const workoutsReducer=(state,action)=>{
    switch (action.type) {
        case 'SET_WORKOUTS':
          return { 
            workouts: action.payload 
          }
        case 'CREATE_WORKOUT':
          return { 
            workouts: [action.payload, ...state.workouts] 
          }
        case 'DELETE_WORKOUT':
          return { 
            workouts: state.workouts.filter(w => w._id !== action.payload._id) 
          }
        default:
          return state
      }
    }

// So, that other components can access this context, we need to make a context provider

export const WorkoutContextProvider=({children})=>{

    const [state,dispatch]=useReducer(workoutsReducer,{
        workouts:null
    })

   
    return(
        <WorkoutContext.Provider value={{...state,dispatch}} >
            {children}
        </WorkoutContext.Provider>
    )
}