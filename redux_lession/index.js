const redux = require('redux');
const createStore = redux.createStore

// An action is an object with a type property
// An action creator is a function that returns an action

// Reducers specify how the app's state changes in response to actions sent to the store
// Reducers is a function that accepts state and action as arguements, 
// and returns the next state of the application. (prevState, action) => newState

// Redux store holds application state, 
// allow access to state via getState(),
// allows state to be updated via dispatch(action)
// allows registers listeners via subscribe(listener)
// handles unregistering of listeners via the function returned by subscribe(listener)


const BUY_CAKE = 'BUY_CAKE' 

function buyCake() {
    return {
        type: BUY_CAKE,
        info: 'First redux action'
    }
}

const initialState = {
    numOfCakes: 10
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case BUY_CAKE: return {
            ...state,
            numOfCakes: state.numOfCakes - 1
        }
        default: return state
    }
}

const store = createStore(reducer)
console.log('Initial state', store.getState())
const unsubscribe = store.subscribe(() => console.log('Updated state', store.getState()))
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
unsubscribe()