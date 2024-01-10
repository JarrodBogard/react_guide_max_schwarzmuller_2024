// Lesson 427. Redux & Side Effects (and Asynchronous Code)

// Reducer functions must be pure, side-effect free, and synchronous.
//      - In the case of the Redux reducer, the reducer function should take some input - the old state and the action - and then produce some output. This concept doesn't just apply to redux reducer functions, but also the reducer function passed to useReducer (the react hook). It has nothing to do with redux. It is a general reducer concept that a reducer function is a pure, side effect free, synchronous function, that takes some input and produces the same output, for that same input, everytime, i.e. for the same input, it will always produce the same output, without any side effects, and without any asynchronous code that blocks/inhibits it from executing and returning the output. No side effects or async code can be in a reducer function of any kind.

// Where should side effects and async code go?

// There are two options:

// 1) Place them directly into Components via useEffect, and then only dispatch an action to the reducer once that side effect/async code is done executing and returns a value from the react hook.
// 2) Write custom action creator functions not provided by redux/redux toolkit. For these custom action creators, redux actually has a solution that allows for running side effects and asynchronous tasks, as part of the action creators, without changing the reducer function.

// IMPORTANT: The reducer function must stay side effect and async free.

// Lesson 428. Refresher / Practice: Part 1/2

// REMEMBER: Action creator methods on the actions prop of state slices must be executed in order to generate and return action objects to the associated state slice reducer for the subsequently associated reducer method to be executed.
//      Alt definition: Action creator methods on the actions prop of state slices must be executed in order to generate and return action objects to the associated reducer method, on a given state slice's reducers object, for it to be executed.

// IMPORTANT: It is the action object that is returned from executing the action creator method, on the actions prop of the state slice, that is dispatched to the reducer to perform the given action.

// IMPORTANT: The useSelector function receives a function as an argument. The function (argument) receives the redux state automatically because it is executed by react redux. Therefore, when useSelector is executed it returns the redux state slice (data/prop/value) that is specified in the return statement of the function (argument) passed to useSelector, i.e. useSelector(state => state.someStateReducer.someStateProp)
//      - The return value of useSelector should be stored in an aptly named variable for use within the given Component, i.e. const someVariable = useSelector(state => state.someStateReducer.someStateProp)

// Lesson 429. Refresher / Practice: Part 2/2

// NOTE: Components can be placed (nested) inside of map functions when iterating over data (items/elements/etc). The data can then be accessed and inserted into the Components as props. This can be done directly inside the return template of a another Component, or stored in a variable above the return template, which is then inserted into the return template.

// IMPORTANT: A Component can be kept undifferentiated by maintaining neutral prop names. The Component can then be placed inside other Components and the appropriate props related to a given Component can be passed to the undifferentiated Component, keeping in mind the undifferentiated prop names of the nested Component.

// Lesson 431. Redux & Async Code

// Reducers cannot accept async code or side effects. In React, only Components or action creators can handle async code and side effects for redux.

// Lesson 432. Frontend Code vs Backend Code

// Server-side code can be added to Firebase. There is a service called "Functions" which allows for adding code on the Firebase backend. This server-side code can be triggered for incoming requests and would allow for transforming/mutating data on the backend. Thus, it is possible to integrate Firebase with code from the front-end.

// When using a serverless database, like Firebase, and simply using it to store incoming data, the front-end application needs to format the data appropriatly so that the data is thus stored appropriately on the backend. Therefore, a lot more code/work will be required on the front-end with this type of application (serveless backend with minimal setup).
//      - This makes building out frontend apps more difficult, when using state management tools, because reducer functions cannot handle async/side effect code such as HTTP requests.

// Lesson 433. Where To Put Our Logic

// Prefer reducers over Components or action creators for managing state of side-effect free and synchronous code.
// Prefer action creators over Components for managing state of asynchronous code and side-effects (Never use reducers).

// Lesso 434. Using useEffect with Redux

// Handling async code and side-effects.
// Option 1: Update redux store using reducers, then update the database/backend/server with the latest state update via useEffect in Components, e.g. Bring useEffect into the root component of the app and listen for changes to state slices being made by redux. Then, execute HTTP requests inside of the useEffect whenever changes to state slices occur, i.e. GET, POST, PUT, PATCH, DELETE.
//      - The state slices will be retreived with the useSelector hook from react-redux library. They will then be included as dependencies in the dependency array on the useEffect hook inside the Component. For a scenario where a list/table of data is being updated/changed, sending a PUT request would be ideal. Especially, when working with Firebase as a backend.
//              - For PUT requests, the new data will not be added to a list/table of data, but will override the existing list/table of data, within the database, which is ideal for updating a list/table of data, e.g. adding/removing items to/from a shopping cart. The existing cart will be overridden with the incoming/updated/latest shopping cart data.
// IMPORTANT: Based on the above steps, thus far, the useEffect will run every time the app is loaded (mounted) and thus update the data to an empty list/table.

// Thought: Data transformation/mutation logic - reducer. Side-effect logic - Component or action creator

// Lesson 436. Handling Http States & Feedback with Redux

// NOTE: Async functions return a promise (then, catch, etc).
// NOTE: react-redux ensures dispatch is a function that will never change.
// NOTE: Define variables outside of Component functions to prevent them from changing and so as not to re-initialize them when the Component re-renders. Instead they are defined and assigned only once, when the file is initialized/parsed for the first time (application start).

// Lesson 437. Using an Action Creator Thunk

// Action creators are automatically generated by Redux toolkit. When executed, they create the action objects which are then dispatched to the reducers in redux toolkit.

// Custom action creators can be written to create "thunks".

// What is a thunk?

// A thunk is a function that delays an action until later, until something else is finished.

// An action creator can be writte as a thunk, which would be an action creator that does not immediately return the action object, but instead returns another function which eventually returns the action (object). The reason being that some other code needs to execute first before dispatching the actual action object.
//      - The action creator function does not return the action object itself. It returns another function which eventually returns the action object.

// Thunk action creators are typically written inside of the associated state slice (createSlice) file. Importantly, they are written below, and outside of, the createSlice function/object.

// Redux toolkit creates these action creators automatically for all the reducer methods. Every method in the reducers object receives an action creator, which is executed by implementing the reducer method name on the actions prop of the associated state slice. For simple action creators, that do not have async code or side effects, redux toolkit generates these automatically.
//      - Essentially, the reducer methods stored in the reducers object on the state slice, are made available and stored on the actions prop of that same state slice (action creators).

// These action creators can be customized to return another function instead of an action object directly.
//      - For aysnc code and side effects ("thunk" action creators), the return function should take the dispatch function/keyword as an argument and the return statement should dispatch the action to be performed.
//          - i.e. const someFunc = sliceData => { return (dispatch) => { dispatch()} }
//              - before calling the dispatch function, perform any asynchronous code or side effects, within the return statement, because it has not yet reached the reducer, i.e. the code is not running in the reducer, but outside of before the reducer is executed, because it's a separate standalone JavaScript function.
//      - NOTE: The return function can be turned into an async function.

// When using Redux toolkit, if it evaluates that an action creator is dispatching a function, instead of returning an action object, it will return a function. Redux will execute that return function, and with that function, it will include/provide the dispatch function as an argument, automatically. Thus, in the executed return function, dispatch can be executed again to return an action object, eventually (after performing async code), because there is a common pattern in redux where action creators can execute async code and side effects, i.e. a flow of steps to process side-effects and async code within redux (redux toolkit).
//      - When using Redux toolkit, it is prepared for action creators that return functions and provides those return functions with the dispatch function as an argument to be used accordingly.
//              - Thought: Use a function, that returns another function, as an action (action creator/ action creator method). This is a built-in feature of Redux when using Redux toolkit.

// Lesson 438. Getting Started with Fetching Data

// For "thunk" action creators, when there are multiple actions or actions are making the slice file too large, simply move the actions to their own separate "actions" file.

// When using fetch api and try/catch blocks for http requests, place the fetch request in its own nested function within the return function of the "thunk" action creator.

// NOTE: The return function from the "thunk" action creator can be converted to async/await.

// IMPORTANT: When using Firebase, "POST"ing data will turn the incoming data into a list of objects. "PUT"ing data will keep the same format of the incoming data in the Firebase database.
//      - With "PUT", Firebase receives the incoming data in the format it is sent and stores it in that same format.

// Lesson 439. Finalizing the Fetching Logic

// Options for preventing re-renders:
// 1#: add a "changed" prop to the state slices initialState and set it to a value of 'false'. Update the prop to 'true', within the reducer methods, as needed/required depending on the functionality of the app. Then, add 'if' checks in the components, where this logic is needed, to allow or prevent side-effects/re-renders (useEffect calls, etc.)
//      - When using Firebase on the backend, if the entire state slice is being uploaded to the database, the "changed" prop will be included. To prevent this, use either dot notation or object destructuring on the state slice in the http "POST"/"PUT" request, and only upload the props that need to be stored in the database, leaving off the "changed" prop.

// Lesson 441. Summary

// Use reducers for data transformations and only put side-effects or async code into Components or action creators.
