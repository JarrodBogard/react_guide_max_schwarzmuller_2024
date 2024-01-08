// Section 11: Advanced: Handling Side Effects, Using Reducers & Using the Context API

// Lesson #143 What are "Side Effects" & Introducing useEffect

// Side effects are typically referred to as "effects" in React.

// The components in a React app, the React app as a whole, and especially the React library itself has one main job.

// Main purpose of React: To render the UI, to "react" to user input and events, and to re-render the UI when necessary:
//  - Evaluate and render JSX code in the DOM.
//  - Manage state and props to make sure that every component has the data it needs and that the user input is reflected/output accordingly and correctly to the React App and DOM.
//  - React to user inputs and events.
//  - Re-evaluate components and their JSX code upon state and prop changes and manipulate the real DOM as needed.

// Side effects(effects) are everything else that might be happening in an application that is not directly concerned with evaluating and rendering elements to the UI, in a function component.
//      - e.g an HTTP request, storing data in local storage on the browser, timers, intervals, etc.
//      - These tasks are not directly related to rendering elements to the UI.
//              - Sending requests and handling potential errors, and so on, is not something that React focuses on - React is focused on rendering the UI and updating the UI when state changes.
//              - While sending requests might result in something being rendered to the UI, the actions of sending requests, handling potential errors, and so on is not the focus of React.
//              - These types of indirect tasks occur outside of the normal (function) component evaluation/execution/rendering - outside of the normal function component protocols/procedures. It is not the purpose of the function component, in a React app, to worry or handle these indirect tasks, atleast not directly themselves. The component's purpose is to render content to the UI.
//                      - If trying to handle these indirect tasks - fetching data from a third-party API, sending HTTP requests, etc - via a function component, directly, the task/request would be sent(executed) only when the function component is rendered/re-rendered(executed) - i.e. whenever the component is rendered, or when the state of the component changes and is re-rendered.
//              - Keep in mind, if in response to an indirect task, like an HTTP request, eventually some piece of state changes, that would create an infinite loop, because it would send the request whenever the function renders/re-renders, and in response to the request it would change some state, which triggers the function again and again. Therefore, such side effects should not go directly into function components, but indirectly through useEffect hooks that are used in function components.
//          - The useEffect hook is simply another built-in hook in React, another function, which is run inside of the function component, that will do something "special" to indirect tasks, like HTTP requests and third-party API calls.
//                  - The useEffect hook is called with two arguments/params. The first argument is an anonymous function that should be executed after every component evaluation/render/execution if the specified dependencies change(d).
//                          - The specified dependencies are the second argument/param that is passed to the useEffect hook - that's an array of dependencies.
//                                  - Whenever a dependency changes, the first argument - the anonymous function - will re-execute/re-run. Therefore, within that first function, any "side effect"/"effect" code can be written/used, and that code will then only execute when the specified dependencies change. The "side effect" code will not be executed just because of a component render/re-render - ONLY when the dependencies change.

// Indirect tasks: Tasks that must execute outside of the normal component evaluation and render cycle - especially since they might block/delay rendering (e.g. HTTP request).

// Lesson #144 Using the useEffect() Hook

// IMPORTANT: The useEffect hook only executes its function after the function component execution/render/re-render is completed - it will not execute after every component evaluation/render either. The dependencies must change in order for there to be a useEffect hook execution.
//      - When the component function renders/runs the first time, because the app is loaded/started, then the dependencies are considered to have changed, and therefore the useEffect hook will execute the "side effect" code within its anonymous function. Thereafter, on all subsequent component re-renders, the code will only execute if the specified dependencies have changed.
//      - Setting no dependencies - empty array - the useEffect hook will only run/execute on the first/initial render of the function component.

// NOTE: Data fetching is a type of side effect. It's not directly related to the UI. In order to run this data fetching "side effect" efficiently, use the useEffect hook in function components. This will prevent the issue of having an infinite loop inside of the function component, and to make sure that the code, which potentially could be performance intensive, does not execute/run for every component re-render cycle but only when needed - only when dependencies change.

// Lesson #

// The useEffect hook is not just useful for running/executing logic (code) when a component is created/rendered for the first time, but it's equally useful and common to use it to rerun/re-execute logic when certain data, typically some state or some props, changed.
//      - useEffect handles side effects and often side effects are http requests and so on. However, it's also a side effect if useEffect listens to every keystroke in an input field for a username/password, for example, and saves that entered data, and the desired effect is to trigger another action in response to those entries - i.e checking and updating the validity of a form, in response to a keystroke in an email or password field, that is also something considered to be a side effect. It's a side effect of the user entering data.

// Summary: The useEffect hook helps handle code that should be executed in response to an event occurring (element or piece of state changing/updating). That could be a component loading/rendering. It could be a piece of state changing/updating. It could be any type of event. Whenever there is an action that should be executed in response to some other action, that is a side effect.

// Lesson #146 What to add & Not to add as Dependencies

// Dependency Exceptions:

// It's not necessary to add state updating functions. React guarantees that those functions never change, therefore don't add them as dependencies - its allowed but not necessary.

// It's not necessary to add "built-in" APIs or functions like fetch(), localStorage, etc - functions and features built-into the browser and hence available globally. These browser APIs and global functions are not related to the React component render cycle and they also never change.

// It's not necessary to add variables or functions defined OUTSIDE of function components (e.g. a helper function created in a separate file). Such functions or variables are not created inside of a function component and therefore changing them won't affect the components (components won't be re-evaluated if such variables or functions change and vice-versa).

// Summary: Add all "things" used in the effect function if those "things" could change because the component (or some parent component) re-rendered. That's why variables or state defined in component functions, and props or functions defined in component functions, have to be added as dependencies.

// Lesson #147 Using the useEffect Cleanup Function

// Debouncing is a technique, a type of event, where the app/browser waits for the user input to pause for a specified amount of time before executing code.
//      - e.g. A username/password input form, where once the user stops typing inside the form/input for a specified amount of time(e.g. 500ms) some code is executed to check the validity of the user entry.

// Within the useEffect hook function, which is the first argument of the useEffect hook, there is an option to create a "cleanup" function. This is done by adding a return function at the end of the first argument(function) - an anonymous arrow function, but it could also be a named function. This is called a "cleanup" function.
//      - This will run as a cleanup process before useEffect executes the useEffect function the next time - whenever the useEffect function is executed, the "cleanup" funtion will run/execute before it does, clearing out the previous useEffect function execution, except for the very first time on component mount. In addition, the cleanup function will run whenever the component the useEffect hook was created/instantiated in unmounts from the DOM - (whenever the component is reused???).
//              - The cleanup function runs before every (new) "side effect" function execution and before the component is removed/unmounted. It does not run before the first "side effect"(useEffect) function execution. But thereafter, it will run before every (next) "side effect" function execution.
//                      - e.g. SetTimeout returns an identifier for a set timer. Use this identifier to clear the timer with the built-in clearTimeout function, which is built into the browser. Call clearTimeout and pass the identifier of the timer to it. This will ensure that whenever the cleanup function runs, the timer that was set before the cleanup function ran is cleared and a new timer is set.

// NOTE: When sending an HTTP request inside of a useEffect hook, to ensure it will only be sent to the server once, instead of dozens of times, add the "cleanup" function via the return statement in the first argument(function) of the useEffect hook.

// Lesson #148 useEffect Summary

// The useEffect hook function runs after the component render cycle, depending on which dependencies are added to the dependency array in the second argument. Not before it and not during it, but after it. This includes the first time when the component mounts.
//      - This hook function also has a nested "cleanup" function, which is returned by the hook function via the return statement, and runs/executes before the hook function as a whole runs/executes, but NOT before the first time it runs/executes - the "cleanup" function also runs/executes when the component unmounts.

// Lesson #149 Introducing useReducer & Reducers In General

// useReducer is a more powerful state management tool compared to useState, and it is useful for more complex state - e.g. managing multiple interlinked/interconnected pieces of state.

// In instances where a piece of state depends on the (prevState(snapshot)???)most current/updated version of another piece of state, errors/issues can occur - this is because of how React schedules state updates. These types of scenarios are great use cases for useReducer.
//      - useReducer is a great option when there are pieces of state that belong together, and/or if there are state updates that depend on other state.

// Summary: It is not good practice to have state updating functions dependent on other pieces of state. There can be errors where the other piece of state it is relying on has not been updated in time, because of how React schedules state updates. Therefore, in those rare instances, the state updating function would update its own piece of state based on the other outdated piece of state - unable to use the prevState snapshot to fix this issue because it is not this specific state updating function's previous piece of state that is needed, but a different piece of state that is not accessible from this specific state updating function.

// When state becomes more complex, bigger, and combines multiple related states, or when updating a state depends on another state, useReducer can be useful.

// Lesson #150 Using the useReducer() Hook

// const [state, dispatchFn] = useReducer(reducerFn, initState, initFn);

// useReducer breakdown:

// useReducer, just like useState, always returns an array with exactly two values - i.e. const [state, dispatchFn]. Therefore, use array destructuring as with useState to pull out these values and store them in separate constants. The two values are the latest state snapshot(state), because it is a state management mechanism like useState, and the state updating function(dispatchFn) that allows for updating that state snapshot, similar to useState, though the state updating function will work differently. Instead of just setting a new state value, it will dispatch an "action", and that "action" will be consumed by the first argument passed to the useReducer, a so-called reducer function(reducerFn). This is a function which gets the latest state snapshot automatically, because this function will be called by React, and it gets the "action" that was dispatched.
//      - React will call this reducer function whenever a new "action" is dispatched - the reducerFn gets the last state snapshot managed by React, and the "action" that was dispatched, which triggered the reducer function execution in the first place.
// The reducer function does one more important thing. It should return a new updated state, similar to the useState hook, but an extended version of that, because of the "action". In addition, useReducer can set some initial state(initState) and also an initial function(initFn) that should execute to set the initial state in case the initial state is a bit more complex - e.g. the result of an HTTP requests or anything like that.

// NOTE: The reducer function could/should be created outside of the component function, because the reducer function will not require any data that's generated inside of the component function - the reducer function can be created outside of the scope of the component function because it doesn't need to interact with anything defined inside of the component function.
//      - All of the data which will be required and used inside of the reducer function will be passed into the reducer function when it's executed by React, automatically.

// The reducer function(reducerFn) is passed an action as its argument. This action is typically an object which contains a field/property that holds some identifier. It is convention to name the field/property "type". It's also convention to use a string with all caps for naming the identifier value for the "type" field/property. The next field/property is a "payload" for this action. It's not required to create/add a payload property, but it is standard practice to have this payload property within the action, along with its associated value that can/will be used to update the associated piece of state, for example.
//       - An action is passed to the reducer function, typically in the form of an object, with a property named "type" that holds an identifer - all caps - which describes the action, and a "payload" property, which contains a value that will be used to update a piece of state, for example, based on the associated action type.

// Lesson #151 useReducer & useEffect

// IMPORTANT: useEffect only runs after state updates occur, which means a state updating function inside of a useEffect, that is using other state snapshots to update its state, is acceptable as the other state snapshots are guaranteed to have their most current/updated version of state.

// To isolate a "side effect" of a property within a (state) object simply use object destructuring, outside of the useEffect hook, and place the destructured property into the dependency array, instead of the entire object. This way the useEffect hook will only execute when the state of the destructured property is changed/updated and not when other properties within the object are changed/updated - avoid unnecessary useEffect executions.
//      - This technique also applies to other items like props. Instead of passing the entire props object as a dependency, destructure the props object and only place the necessary props object properties in the dependency array of the useEffect hook.

// Lesson #152 Adding Nested Properties As Dependencies To useEffect

// Note: The key point is NOT that destructuring is used but that specific properties are passed as dependencies instead of the entire object.

// Alternative structure for array dependencies associated with an object:

// useEffect(() => {
//   // code that only uses someProperty ...
// }, [someObject.someProperty]);

// But avoid this code:

// useEffect(() => {
//   // code that only uses someProperty ...
// }, [someObject]);
// Why?

// Because now the effect function would re-execute whenever ANY property of someObject changes - not just the one property (someProperty in the above example) the effect might depend on.

// Lesson #153 useReducer vs useState for State Management

// useState is the main state management tool. Typically, start with useState and often it's all that is needed. It's great for independent pieces of state and data. It's great for simple state values. It's great if state updates are easy and limited to a few kinds of updates. If there are only a few different cases that will change a state, and especially if there isn't an object being used for a piece of state or anything of that nature, stick with useState.

// On the other hand, if there is an object being used as state variable, or when dealing with more complex state that might have many different cases that cause a state change/update, useReducer might be useful. useReducer is great if "more power" is needed to manage state for a component/app. "More power" simply means a reducer function can be implemented that can contain more complex state updating logic, where React guarantees the useReducer will be working with the latest state snapshot. The complex logic can also be pulled out of the function component body and placed in a separate reducer function - allowing for restructuring of code into a cleaner, easier to read format. (useReducer is also helpful when dealing with related data, with data that is made up of related pieces of state - different cases, different actions that can change a state (object)???).

// Lesson #154 Introducing React Context (Context API)

// React Context is useful for situations in a React app where a lot of data are being passed through many different components via props.
//      - It is quite common that data/state is passed to components through props, but it's a problem if that data/state is being forwarded through multiple components - basically just leveraging props to forward data to another component.

// Summary: React Context is a component-wide, "behind the scenes", state storage, built into React. It allows for triggering an action in the component-wide state storage, that will then directly pass the requested (current/updated) piece of state to the component that needs it, without building a long prop chain between components - React Context allows for solving this problem in an elegant way.

// Lesson #155 Using the React Context API

// "Providing" Context is always the first step in using React Context.
//      - "Providing" means that all the components that need to be able to tap into a specific context are wrapped by that context object/component via JSX code syntax, which allows them to access it, and eventually "consume" it, in the next step.
//      - Any component that's not wrapped will not be able to listen to that context.
//      - The context itself is an object, but stored in that context object is a property(which contains a component???) called "Provider". It is accessed and used as a component via JSX syntax and dot notation. This allows other components to tap into - have access to - that context, by wrapping the other components in the Provider component - e.g. <AuthContext.Provider><OtherComponent/></AuthContext.Provider>
//              - The children components that are wrapped by the Context, and their descendant components, will have access to the context.

// "Consuming" the Context, or listening to the Context, is the second part of using React Context.
//      - There are two options for "consuming" the context:
//          1. By using the Consumer property(which contains a component) which is a property on the Context object, or 2. by creating a React Hook.
//      - The consumer takes a "children" prop wrapped in curly braces. The Consumer component then wraps the JSX elements that it will be "listening" to for changes.

// Summary: When creating a context via React.createContext(), a context object is created, in which a default context is taken/implemented/used - the default context can be a string, number, object, array, etc - i.e. React.createContext({isLoggedIn: false}) or React.createContext("This is the app state")
//      - "Context" simply refers to the app-wide or component-wide state.
//      - Once the context has been instantiated via React.createContext, a context object is created which contains context components - i.e. const AuthContext = React.createContext({isLoggedIn: false}) -> AuthContext is an object, which contains context components(Provider and Consumer).

// Once the context object has been created, there are two steps to using it in the React app:
//  1. "Providing" the context - Wrap the app components that will need access to that specific context/state - i.e. Wrapped components tap into the context being provided so that they have access to it, and can eventually "consume" it, in the next step.
//      - "Providing" means that all the app components that should be able to tap into that context are wrapped by it, in JSX code.
//      - To wrap the components with a context, simply use JSX code and dot notation on the context object to access the "Provider" property, which contains a component that allows app components to tap into the context and have access to it - i.e. <AuthContext.Provider><OtherComponent /></AuthContext.Provider>
//              - All "Other Components" and their descendant(children/nested) components will have access to the context that is wrapping them.
//  2. Consuming the context - Wrap the return statements of the function components that will need to "listen" to the specific context/state that they have access to - i.e. "listen" for changes to (and update the state of???) the associated context provider that is wrapping the app/function components directly, or indirectly via a parent component.
//      - Any function component that needs the current state(up-to-date data) from the associated context, to update and render its content, will need to be wrapped in the "Consumer" component so that it can "listen" or "consume" the context/state/data.
//              - The "Consumer" component takes a child, which is an anonymous function. The anonymous function takes an argument, which is the respective context's data located in the context(store) file, where the context was instantiated. Within the anonymous function's statement, return the JSX code(elements) of the function component that requires access to the context data. All of the JSX code(elements) within the anonymous function's statement, of the Consumer component, now has access to that context data.
//                      - The associated default value of the context data, in the context file, will only be "consumed" by the wrapped JSX code(elements) if a Provider component wrapper is NOT being used to wrap the components. Otherwise, a default value for the context data must be placed on the Provider component wrapper - therefore, technically a Provider is not needed -> technically the Provider is not needed if the instantiated context object, in the context file, contains a default value for the context, but in reality, the reason context is being used is so that context/state data/values can be updated/changed (dynamically???) - and those changes can be reflected in the DOM (dynamically???) without using a prop chain - and that will ONLY be possible WITH a Provider.
//                              - Pass the Provider component a "value" prop, which is provided by React Context. Pass the "value" prop an object. Within that object, pass the context state(data) that will be consumed by the JSX code/elements wrapped in the Consumer component - the context data in the value prop can be linked to any app/component state(useState) variables, which will then update the context when that state variable is updated/modified/changed -> to be specific, the "value" object on the Provider component, will update the associated context state(data) to reflect changes anytime a (property/value???) within the value object is updated/changed/modified within the app, thus providing the updated context data, in real-time, to any elements "listening"/"consuming" that context - Alt explanation: The value object will be updated by React whenever one of its properties/values is updated/changed, and subsequently the context will be updated as well -> the context object will be updated, which will then be passed to all components "consuming" the context.
//                      - e.g. { return ( <AuthContext.Consumer>{(ctx) => { return (<li></li>) }} </AuthContext.Consumer> )}
// Secondary, and preferred option for consuming context, is to listen via a custom React Hook.

// IMPORTANT: The context, which is passed to the consuming/listening JSX elements, is (typically/always???) an object - a context object, (which can be accessed via dot notation).

// Lesson #157 Making Context Dynamic

// Any data type can be passed down through React Context to "consumer" elements - i.e. strings, numbers, objects, functions.

// Summary: Use an app-wide, or component-wide, context object to manage state and any functions that update state, instead of props, which will prevent the need for prop chains, which can be cumbersome.

// Lesson #159 React Context Limitations

// Use props for configuration of elements and their events, and use context for state management across components or possibly across the entire app.

// React Context is not optimized for high frequency changes - state changes every second or multiple times per second.

// React Context should not be used to replace all component communications and props. Props are still vital and important for component configuration.

// Lesson #160 Learning the "Rules of Hooks"

// Two rules for using hooks:

// 1. Only call React Hooks in React functions.
//      - That includes React function components and also custom React Hooks.

// 2. Only call React Hooks at the top level of React function components or custom React Hook functions.
//      - Don't call React Hooks in nested functions or in any block statements.

// 2b. Always add everything referred to inside of useEffect as a dependency, unless there is a good reason not to do that.
//      - This rule includes the function components associated state and props - all the data that is inside a function component, which is also being used inside a useEffect function (within that component), needs to go into the dependency array.
//      - Exceptions: State updating functions are guaranteed by React to never change. Therefore, they don't need to be added as dependencies.

// Lesson #162 Diving into "Forward Refs"

// Note: Function components cannot be given/passed refs, because "ref" is a reserved word for the useRef Hook, which is used on built-in DOM elements.

// NOTE: In addition to a "props" argument, function components can also receive a "ref" argument, if a ref has been set on the function component via its parent component - i.e. if a "ref" prop is set/passed on a function component, via its parent component, that "ref" can be accessed inside the function component via a second argument, a "ref" argument.
//              - e.g. Within the parent component's return template -> ....code....<ChildComponent ref={inputRef} randomProp={somePropValue} /> ...within the child function component file -> const ChildComponent = (props, ref) => {}
//      - In order to enable the "ref" argument on the function component, the function component must be exported in a special way via the forwardRef method found on the "React" library. To do this, pass the function component, starting after the function assignment, into React.forwardRef() - i.e. const SomeComponent = React.forwardRef((props, ref) => {...code...logic...JSX...})
//      - IMPORTANT: The only refs that will be accessible to the component are the values/functions/etc that are placed in the return object of the useImperativeHandle Hook's function - the second argument of the useImperativeHandle Hook.

// Summary: With the useImperativeHandle Hook and forwardRef method, expose functionalities from a React Component to its parent Component to then use/trigger the Component's functionalities in the parent Component via refs.
