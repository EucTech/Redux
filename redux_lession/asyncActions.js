// create redux store
const redux = require('redux');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware
const thunkMiddleware = require('redux-thunk').default;
const axios = require('axios');

// Axios use to make request to an API end point
// Redux-thunk is used to define async action creators

// The state will be an object with 3 properties
const initialState = {
  loading: false,
  users: [],
  error: "",
};

// action types
const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};

const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: "",
      };

    case FETCH_USERS_FAILURE:
      return {
        loading: false,
        users: [],
        error: action.payload
      };
  }
};

const fetchUsers = () => {
    return function(dispatch) {
        dispatch(fetchUsersRequest());
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            // response.data ia the array of users
            const users = response.data.map(user => user.id);
            dispatch(fetchUsersSuccess(users));
        })
        .catch(error => {
            // error.message is the error description
            dispatch(fetchUsersFailure(error.message));
        })
    }
}

console.log('applyMiddleware:', applyMiddleware);
const store = createStore(reducer, applyMiddleware(thunkMiddleware))
store.subscribe(() => { console.log(store.getState()) })
store.dispatch(fetchUsers())