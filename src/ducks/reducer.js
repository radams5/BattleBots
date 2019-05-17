const initialState = { 
 
}

const UPDATE_DUMMY_ARR = 'UPDATE_DUMMY_ARR'



export function updateDummyArr(botsArr){
  return {
    type: UPDATE_DUMMY_ARR,
    payload: botsArr
  }  
}


export default function reducer( state = initialState, action){
  const {type, payload} = action
  switch(type){
    case UPDATE_DUMMY_ARR: {
      return{...state, dummyArr: payload}}
 
    default:
      return state
    }
  }