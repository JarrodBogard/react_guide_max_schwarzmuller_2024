// Lesson 403. Another Look At State In React Apps

// Redux is a state management system for cross-component or app-wide state.
//      - It helps manage state, data that changes and affects an application and what is displayed on the UI, and it does this across multiple components or even a complete app.

// State can be split into three main types: 1)local, 2)cross-component, and 3)app-wide.

// Local state, which is data that changes/updates and affects the UI, belongs to a single component. Typically, involves using useState or useReducer to manage state (data) changes.
//      e.g. storing user input (keystrokes) or a user action (button click (e.g. toggle)) in a state variable.

// Cross-component state is state which affects (is used across) multiple components within an app. Typically, involves implementing useState or useReducer and also involves passing "props" to other components (i.e. prop drilling, prop chaining) to achieve desired functionality within an app.
//      e.g. buttons which open/close a modal overlay.
//      i.e. pass "props" (state variables and/or functions) across multiple components so that these different components can work together and manage state together.

// App-wide state is state that does not just affect multiple components but effectively all components of an application. Typically, prop chaining will not be efficient for this level of state management. React Context is a built in feature in React that makes managing cross-component or application-wide state much more effective. Redux offers the same solution as React Context. However, Redux is more robust and is generally more efficient for larger and more robust applications.
//      e.g. user authentication (once a user logs in, the user's personal features are applied to the UI for that specific user).

// Lesson 404. Redux vs React Context

// React Context has a couple of potential disadvantages.

// Both React Contexts and Redux can be used in the same application.
//      i.e. Use Redux for the general application-wide state and still use React Context for selected multi-component states within the same app.

// 1) One potential disadvantage is that with React Context, the setup for Context can become very complex, and therefore managing state with React Context can become quite messy (cumbersome). This depends on the kind of application being built. For small or medium-sized applications that will very likely not be a problem. For building a large application (enterprise-level), with a lot of components and pieces of state, it can become quite complicated and difficult to use/organize/read.
//      i.e. Large applications can require many different pieces of Context (state) that affect multiple components or the entire app, and therefore a lot of different Context Provider components, which are built for managing each Context (state). This can lead to deeply nested JSX code as a result. It's possible to just use one big Context with one Context Provider component for managing the entire state of an app, but that could lead to a very large and complex Context Provider component, and therefore itself becomes quite difficult to maintain and manage.

// 2) Another potential disadvantage could be performance. Context is useful for low-frequency updates (state changes) but it's not efficient for high-frequency changes. Therefore, Context is not ready to be implemented as a replacement for flux-like state propagation.
//      i.e. Performance can be poor if managing the wrong kinds of state with React Context.

// Summary: For React Context, there is a 1) complex setup and management disadvantage because of the potential for deeply nested JSX code and many different Context Providers, or with one huge Context Provider which is not maintainable. 2) Also, there is the potential performance issues with high-frequency state changes.

// Redux is a flux-like state management library.

// Lesson 405. How Redux Works

// Redux is all about having one central data (state) store in an application. One store for all of the state for the entire application. All cross-component or app-wide state goes into this one store.

// Components set up subscriptions to the store. Once subscribed to the store, whenever the data (state) changes, the store notifies the components, and then the components can get the data (slice) they need, and then they can use it to update the component.

// IMPORTANT: Components NEVER directly manipulate the store data. Components have a subscription to the store data, for receiving state updates/changes, which they use to update their component, but they don't have a data flow in the other direction - atleast NOT directly.

// Instead, reducers are used to update store data (state/slices). The reducer function is responsible for transforming/mutating/updating/changing the store (data). useReducer and the reducer function are not the same thing. The useReducer hook is not the same as a Redux reducer function. Reducer functions in general, are just a general concept in programming.
//      - Reducer functions are functions, which take some input, and then transform/reduce/mutate that input to provide a new output (result). This is a general programming concept, which the useReducer hook and the Redux reducer function take advantage of.

// Summary: A reducer function is responsible for updating the store data (state), and components subscribe to the store so that they can receive those data (slices) updates, which are then used to update the components and ultimately the UI.

// Concept: Actions are the third concept that ties the reducers, store, and components together for the state updating lifecycle of Redux. Actions are dispatched by components. Therefore, components trigger the actions with some event. An action is a simple JavaScript object, which describes the type of operation (action) the reducers should perform. Redux forwards the actions to the reducer, reads the description of the desired operation, and then this operation is performed by the reducer function. The resulting output from the reducer is then used to update the store (state).

// Concept summary: The 1) components dispatch actions, which describe what state updating operations are to be performed (indirectly), 2) the actions are forwarded to the reducer, 3) the reducer function then performs the action (operation described by the action), 4) and then the reducer returns an output (new/updated state, state transformation/mutation), which is used to update the store, which then effectively replaces the existing state in the data (state) store. When the state in the data store is updated, 5) subscribing components are notified so that they can update their components and ultimately the UI.

// Lesson 407. Exploring The Core Redux Concepts
// Node.js allows for running JavaScript outside of the browser.
// Running npm init inside a folder creates a package.json file.
// The package.json file allows for installing third-party packages into the folder.
//      e.g. running npm install Redux will install the Redux package/library into the folder/program.
//              - this will also install a node_modules file which contains Redux and all of its dependencies.

// Theory: The redux store should manage data, and the data which it manages is ultimately determined by the reducer function, because it's the reducer function which will produce new state snapshots. The reducer function produces a new state snapshot whenever it receives an action triggered by/from a component, and it updates the store with that new snapshot.

// When the redux store, and all of its code, is executed for the first time, the reducer will also be executed with a default action, which produces the initial state (data) for the store.

// A reducer function is a standard JavaScript function, but it will it be called by the Redux library and it will then always receive two pieces of input (parameters). It will receive the old (existing) state and the action that was dispatched to it - i.e. the 1) old state and the 2) dispatched action. With those two inputs, the reducer function must return a specific output, which is a new state object.
//      - Therefore, a reducer function should be a pure function, which basically means that the same values for the inputs should always produce exactly the same output every time it executes. There should be no side effects inside of the reducer function.
//              - i.e. A reducer should just be a function that takes the given inputs, which are provided by Redux, and then produces the expected output, a new state object.
//              - Thus, the reducer function will receive the current state object and the action as its arguments/params. It receives these inputs by default, because the reducer will ultimately be executed by the Redux library. Then, the reducer function will return the new state object to the redux store so that the state can be updated to the new state, e.g. const reducerFunc = (state, action) => return { someStateProp: state.currentStatePropValue + update } (new state). Typically, the state default will be set inline within the reducer function, e.g. (state = {someStateProp: defaultValue}, action). State is commonly a JS object, because it generally contains multiple pieces of state and their associated values, but it can be any data type.

// NOTE: When the store is initialized, the state needs to be set to a default/initial value. Otherwise, the state will return undefined, because there is no existing state before initialization.

// The createStore method on the store object needs to know which reducer is responsible for updating the store's state. The reducer function is therefore passed to the createStore method, on the store object, to link the reducer function to the store and vice versa. This relationship will permit the reducer function to peform the action, produce an output (mutate/transform/change/update state) and then supply that output, updated/new state, to the store.

// getState() is a method which is available on the store created with createStore(). It will provide the latest state snapshot after the store was updated last.
//      - getState() is a subscription function which will be triggered whenever the state changes in the store, and the latest state changes will be retrieved, and then applied, to the subscriber component/function calling the getState() method.

// Additionally, in order to make Redux aware of the subscriber function using the getState() method, and to prompt it to execute the subscriber function whenever state changes, the subscriber function should be passed to the subscribe() method found on the store object. Therefore, Redux is aware that the subscribe component/function executing the getState() method needs to be executed and thus updated when the store's state is updated.

// NOTE: The reducer function(s) and the subscriber function(s) are both executed by Redux.

// dispatch() is a method on the store object which dispatches an action. An action is a JavaScript object. It's a JavaScript object with a type property, which acts as an identifier. Typically, the value provided to this identifier (type) is a string, a unique string, so that every action is distinct, and leads to different outputs from the reducer, e.g. store.dispatch({type: "ACTION"})

// Lesson 408. More Redux Basics

// In the reducer function, the action object is provided as the second argument following the current state object. These are the two inputs the reducer function receives. The action object type property can be used/accessed to check for specific types of actions, which result in different outputs and thus different changes/mutations to the state object depending on the action.type provided to the reducer function, e.g. if(action.type === "SOME_ACTION") -> the reducer function will perform the specified action on the state object, thus updating/mutating/transforming the existing state, based on the actions performed by the reducer function, with the resulting output (new state).

// Lesson 409. Preparing a new Project

// The react-redux package is a library which makes connecting React applications to Redux stores and reducers very simple. It will, for example, make it very simple to subscribe components to the Redux store.

// Lesson 411. Providing the Store

// The Redux store is provided at the highest level of the component tree, where the root component is rendered, in the index.js file of the src folder.

// Provider is a component that is included in the react-redux package. The Provider component wraps the root component of the React project. The redux store is then imported and passed (provided as a value) to the built-in store prop included on the Provider component, i.e. <Provider store={store}><App /></Provider>. The React app and all of its components now have app-wide access to the redux store (state).
//      - All child components of the component wrapped with the Provider component have access (subscribe and dispatch) to the store data (state).

// Lesson 412. Using Redux Data in React Components

// useSelector and useStore are custom hooks included with the react-redux package. They both allow components to subscribe and access the store data (state). useSelector is more convenient for component subscriptions as it.
//      - useSelector is more convenient to use than useStore, for component subscriptions, because it allows components to easily select a part of the state managed by the store.
//      - For class-based components, there is a connect function which could be used instead. The connect function can be used as a wrapper around the class-based component to connect that component to the store.
// A function is passed to the useSelector hook. The function passed determines which piece (slice) of data is to be extracted from the store for the component, i.e. The anonymous function passed to useSelector specifies which slice of the store data (state) is to be used/retrieved by the component. The parameter/argument of the function is the state object and then the property on the state object that is to be accessed is returned by the function, i.e. useSelector(state => state.property)
//              - i.e. the function passed to useSelector will be executed by react-redux. It will then pass the redux managed store state as the argument when it executes, and then retrieve the part (slice) of the state which the component needs, as related/defined by the return statement of the function. The useSelector will then have the latest updated state slice provided to it by the return value of the executed function.
// NOTE: For useSelector, react-redux will automatically set up a subscription to the Redux store for the component. Therefore, the component will be updated and will receive the latest state slice automatically whenever that data changes in the Redux store.
//      - Also, if the component unmounts (is removed) from the DOM for whatever reason, react-redux will also automatically clear the subscription. It manages the subscription(s) behind the scenes.

// Lesson 413. Dispatching Actions From Inside Components

// The useDispatch hook is used to dispatch actions to the Redux store. useDispatch() returns a dispatch function which can be stored in a variable and then executed to perform a specified action. When the dispatch function is executed within a component, that action is sent to the reducer/reducer function, which executes the specified action and returns an output, a new state slice, to the redux store and updates the store state.
//      - the dispatch function receives an action object with a type property as its argument, i.e. dispatch({type: "SPECIFIED_ACTION"})

// Lesson 414. Redux with Class-based Components
// The connect() method from the react-redux library is used to connect class-based components to the redux store in an application. Connect can be used on functional components as well, but the custom Redux hooks (useSelector, useStore) are designed for, and more efficient to use, with functional components. Connect is called next to the component being exported, i.e export default connect().... When connect is executed, it will return a new function as a value, and the component is then passed to the return function and executed by the return function, i.e. ...connect()(Component)
//      - The reason for this functionality is that connect is a higher-order Component.
// Before executing and returning a return function, connect takes two arguments. Both arguments are functions.
//      1) The first function is a function that maps Redux state to props, which will be received by the component. Thus, the convention is to name this function mapStateToProps, e.g. const mapStateToProps = state => {return {stateProp: state.stateProp}}.
//              - The function receives the redux state as an argument and returns a JS object as its value. The object contains key/value pairs that the Component can access and the values on the keys can be manually configured to redux state property values, i.e return {someStateProp: state.someStateProp}
//      2) The second argument is another function, which is typically called mapDispatchToProps. It's the equivalent to useDispatch(). It allows for storing the dispatch functions in props, so that the component, has access to the dispatch functions and can execute them, which will then send the specified action to the reducer function and finally the Redux store.
//              - mapDispatchToProps receives the dispatch function as an argument by default (automatically), and just like mapStateToProps, will return an object where the keys are prop names which can then be used in the Component, and the value is another function in which dispatch is called on an action object with an action type property (identifier) and the specific action as the value, i.e. const mapDispatchToProps = (dispatch) => { return {actionPropName: () => dispatch({type: action})} }
//                      - i.e. This ensures that the Component, will have an action/dispatch prop, which holds the dispatch function, which when called will dispatch the appropriate action.
// Connect manages the Component subscription just like useSelector().

// Lesson 415. Attaching Payloads to Actions
// A payload is another property that is commonly added to an action object along with the type property. The payload property makes the action object dynamic. The payload can be set to any specified value that is useful or necessary. The reducer function can then use the action payload to update the state dynamically. Just like "type" is the common property name for the type property in an action object, "payload" is the common name for the payload property (value is another common naming convention). These are just naming conventions and are not required.
//      e.g. action.type: <action>, action.payload = <value>

// Lesson 416. Working with Multiple State Properties

// It's important to include all pieces of state in the initial state object as well as the return object the reducer function outputs. This is because when the reducer function updates the redux store (state) to its latest snapshot, it does not merge the previous state and updated state objects together. Instead, it overrides the previous state object with the new/updated state object. Thus, all properties/slices/pieces of state managed by redux should be included in every state snapshot returned by the reducer function, even if they are not being affected/updated/changed by the submitted action. Otherwise, they will not be included in the latest/newest state object - i.e. simply return the existing state values for state slices that are not being updated per the action provided to the reducer function.

// useSelector can be used multiple times within a Component to retrieve different slices (data) from the redux state.

// Lesson 417. How To Work With Redux State Correctly

// IMPORTANT: The object(s) which are returned in the reducer function - latest state snapshot - will not be merged with the existing state. It will overwrite the existing state.

// IMPORTANT: Never mutate/change the existing state in Redux. Instead, always override it by returning a brand new state object. (Because objects and arrays are reference data types???), NEVER mutate the original/existing state, which is being used inside the reducer function, to update the state. This can lead to bugs, unpredictable behavior and it can make debugging an application harder. The existing state should be immutable and all updates made to state while using Redux should be accomplished by creating a new state object (snapshot).
// NOTE: Utilize the spread operator to copy all existing state, that is not being updated by the reducer, to the new state object (latest snapshot).

// Lesson 418. Redux Challenges & Introducing Redux Toolkit

// 1) Mistyping actions is a common bug/error when implementing Redux. Another common issue is "clashing" action identifiers (duplicates). The size of the state object can be another issue on larger projects. Typically, the larger the project the more state slices that will need to be included in the state object. Accidental changes/mutations to the existing state when updating the state object is another common issue. Redux Toolkit addresses all of these common issues and more.

// Lesson 419. Adding State Slices

// The redux library is included with the @reduxjs/toolkit.
// createSlice and createReducer are both functions provided by the redux toolkit. In particular, createSlice is very powerful.

// The createSlice function takes an object as an argument, i.e. createSlice({})
//      - createSlice is used to create/prepare a slice of the global state object, i.e. createSlice creates a slice of state for the redux store in an application. This allows different slices (pieces of state) to be created separately/independently of each other, in separate files, and then merged together into a global state, i.e. the redux store.

// createSlice steps:
//      1. Every slice requires a name prop to identify the particular piece of state being created, i.e. createSlice({name: "<slice_name>"})
//      2. Setup an initialState prop with an initial state value. The value can be an object or point to a constant that was created to contain the initial state setup, i.e. createSlice({name: "<slice_name>", initialStateConst})
//      3. Add a reducers object (map) which will hold all the the reducers a given slice needs/uses, i.e. createSlice({name: "<slice_name>", initialStateConst}, reducers: {})
//              3a. Add methods with names describing their intended use/functionality i.e. createSlice({name: "<slice_name>", initialStateConst}, reducers: {method1(){}, method2(){}, etc...})
//              3b. Each reducers method automatically receives access to the latest state and action objectsx. These are the two arguments createSlice reducer methods can take/receive, i.e. ...reducers: {method1(state, action){}, method2(state){}, etc...}

// NOTE: The action object has a payload property, which holds the payload value. In redux, the payload prop could be named anything. However, it MUST be named payload for redux toolkit.

// NOTE: if/else statement checks are not required for redux toolkit like they are for redux. This is because redux toolkit will automatically run the correct reducer method depending on which action is triggered in a Component.

// NOTE: State unaffected by a given action does not need to be copied into the new state object as redux toolkit does this behind the scenes automatically. Therefore, it can appear, when writing state update actions in redux toolkit, that the original/existing state is being mutated. However, this is NOT the case. Redux toolkit, and specifically createSlice, prevent existing state from being mutated.
//      - Redux toolkit internally uses another package, called Immer, which will detect the reducer method code, automatically clone the existing state, create a new state object, keep all the state which is not being edited, and override the state which is being edited, in an immutable way, i.e. the existing code is still immutable even though it doesn't look like it, because of Immer. This makes it easy to apply the changes to state that are necessary for a given action without accidentally mutating the existing state.

// Redux vs. Redux Toolkit Example:
// const reducer = (state = initialState, action) => {
//   if (action.type === "SOME_ACTION") {
//     return {
//         stateProp = state.stateProp + action.payload
//     };
//   }
// };

//////////////////////////// vs. ////////////////////////////

// createSlice({
//     name: "slice_name",
//     initialState,
//     reducers: {
//         method(state, action){
//             state.stateProp = state.stateProp + action.payload
//         }
//     }
// })

// Lesson 420. Connecting Redux Toolkit State

// To use the state slice that is generated with the createSlice function, the value returned from executing that function must be stored in a variable, i.e. const someSlice = createSlice({...code...})

// The reducer, which is stored within the state slice variable, can be passed directly to the createStore function, i.e. const store = createStore(someSlice.reducer). However, this is not the best option, because typically there will be multiple state slices that the store will need to manage and with this implementation only the single reducer passed to the createStore can be managed. createStore can only take one argument.

// With redux, there is a combineReducers function that allows createStore (the redux store) to handle more than one reducer at a time.

// configureStore is a function from the redux toolkit library that creates a store and streamlines the process of managing multiple reducers for that store. It makes it easier to merge multiple reducers into a single reducer, i.e. const store = configureStore({reducer: {}})
//      - configureStore receives an object (a configuration object). The configuration object has a reducer prop (exact name). This is spelled singular because even if multiple reducers are being implemented redux and redux toolkit only ever manage a single reducer, which is responsible for the global state (redux store state), i.e. multiple reducers are still merged into a single reducer.
//      - the value for the reducer prop on configureStore can be set to an object to include multiple reducers, or simply set to a single reducer if there is only one.
//      - when implementing multiple reducers, propNames are added for each individual state slice reducer and the values of those props are the associated state slice reducer, i.e. const store = configureStore({reducer: {someProp: someSlice.reducer, anotherProp: anotherSlice.reducer, etc...}})
//              - i.e. Set up any number of reducers with the configureStore function by adding a reducer object, which accepts any number of props/keys and their associated reducer function values. This essentially creates a map of reducers, and this map is then set as a value for the main reducer, i.e. configureStore will merge all the individual reducers into one reducer.

// Lesson 421. Migrating Everything To Redux Toolkit

// createSlice automatically creates unique action identifiers for different reducers (reducer methods). To access the actions on the reducer, use dot notation on the reducer and select the actions prop, i.e. someSlice.actions.
//      - the actions prop on the reducer contains any reducer methods that were setup in the createSlice reducers object on the associated state slice. To access the action methods, use dot notation on the actions prop and select any reducer method that exists within the associated slice's reducers object (see IMPORTANT below), i.e. someSlice.actions.someActionMethod

// NOTE: The action object along with its type, is auto-generated by redux toolkit automatically, when the assocaited reducer method key/prop is called on a slice's actions prop, i.e. someSlice.actions.someActionMethod
//      - Since these action methods create action objects, they are called action creator methods.

// IMPORTANT: It is important to make the following distinction: redux toolkit automatically creates the action method when a reducer method key is selected on the actions prop of a state slice, and when executed/invoked, generates the associated action object with an auto-generated unique 'type' identifier per action.
//      - The reducer method itself is NOT being called directly on the actions prop of the state slice object. Redux toolkit is handling the generation of the action method and subsequent action object with a unique type identifier behind the scenes.

// Summary: (Use the prop/key name of the associated reducer method on the actions prop of a state slice object created with createSlice, to execute an action creator method. An action object for the associated reducer method will be created by the action creator method, and can then dispatch the specified action related to that reducer method???).

// The slice actions can be exported as a variable so that Components can have access to them and execute them where needed, i.e. export const someSliceActions = someSlice.actions
//      - import the actions into the appropriate Components, i.e. import { someSliceActions } from "../store/index"
//              - the Component can now access the reducer methods as keys on the someSliceActions object, i.e. dispatch(someSliceActions.someAction())
//                      - When executed, as shown above in a dispatch function, the associated action creator method creates a full action object with the 'type' set to an automatically created unique action identifier.

// NOTE: Payload data is passed via the action object. This can be passed via an object using key/value pairs or any other data type depending on what is necessary for the application.

// IMPORTANT: When redux toolkit sends the action object to the reducer, it will package the input into an object format with two properties; 1) the unique 'type' identifier, and 2) the payload data ('payload' is an exact word that must be used in the reducer), i.e.{type: "UNIQUE_ACTION_ID", payload: "associated_value"}

// Lesson 422. Working with Multiple Slices
// useSelector always has access to the redux store state. It receives the state as an argument, i.e. useSelector(state)
//      - useSelector can access a specific slice of state via dot notation, i.e. useSelector(state => state.stateSliceReducer.stateSliceProp)
//              - IMPORTANT: Note that useSelector is first accessing state, and then the specific reducer for a given slice of state, and finally the value of a specified property stored in that reducer.
//      - The return value of useSelector is then stored in a variable.

// Lesson 424. Splitting Our Code

// For most apps, it is common to split every slice into its own file. Since, only the slice reducer is needed to merge into the redux store, simply export the reducers from their respective files and import them into the store file (""./store/index"). Merge all of the separate slice reducers into the store 'root' reducer via configureStore.
