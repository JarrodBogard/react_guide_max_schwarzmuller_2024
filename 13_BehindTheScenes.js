// Section 13: A Look Behind The Scenes Of React & Optimization Techniques

// Lesson #185 How React Really Works

// React is a JavaScript library for building user interfaces. React is all about components. React uses components to build user interfaces, and React embraces this component concept. It uses components to effectively compose user interfaces and to update user interfaces.

// ReactDOM is the "interface" to the web for React. React itself, React.js(framework/library), doesn't understand and is not aware of the web(internet) or browser(real DOM). React knows how to work with, build, and manage components, but it doesn't care whether those components contain actual HTML elements that can be rendered to the internet browser via the real DOM. That matters to ReactDOM which ultimately needs to bring real HTML elements to the screen.
//      - React is just a library that manages components, manages state, and manages different component's states and figures/finds out how components might need to change, based on user input and effects - the differences which might have occurred in relation to a previous state of a component compared to the current state. React hands all that information regarding what changed and what should be visible on the screen - no matter what screen that is - off to the "interface" it's working with, which is ReactDOM.
//      - ReactDOM is responsible for working with the real DOM, which is part of the browser. Therefore, ReactDOM is responsible for bringing something onto the screen, which the user is then able to see.

// Summary: React.js is concernced with components, props(data passed to components to make components configurable and to enable parent-child component communication), state(internal data inside of a component), and context(component-wide data).
//      - Whenever props, state, or context change, components that use these concepts/tools are updated by React, and React checks whether this component now wants to draw something new onto the screen. If that should be the case, React will send that info to ReactDOM so that ReactDOM is able to bring that new/updated output(virtual DOM), with updated components, onto the user's screen/browser(real DOM).

// React uses a concept called the virtual DOM. Using this concept, React determines how the component tree is built. Also, each and every component in a React app has a sub tree, which is the JSX code returned by that component. This virtual DOM concept helps React determine how the component tree currently looks and is structured, and what it should look like after a state update, for example. This virtual DOM information is handed off to ReactDOM, which is made aware of the differences between the previous virtual DOM and the updated/current virtual DOM (virtual DOM and the real DOM???). As a result, the ReactDOM will then manipulate the real DOM to match the updated virtual DOM, that virtual snapshot React derived for the component tree(s).

// React revaluates/re-executes a function component whenever (props???), state, or a context of a component, changes. However, revaluating a React component is not the same as re-rendering the real DOM.
//      - Just because a function component is re-executed, by React, does not mean that the respective part of the actual, real DOM is re-rendered or re-evaluated. It is important to differentiate between the React component part(virtual DOM) and the real DOM.

// Summary: React components are re-evaluated whenever props, state, or context, changes. The real DOM on the other hand is only updated in the places where it needs to be changed, based on the differences React derives between the previous state(snapshot) of a component and its current state(snapshot), after the state or context has been updated/changed - differences between the previous VDOM and the current VDOM are what cause the real DOM to update and re-render, and only then. The real DOM is not changed all the time. It's changed rarely and only when needed. This is important for performance, because making a virtual comparison between the previous state and the current state is fairly inexpensive, in terms of performance. Reaching out to the real DOM, that's rendered in the browser, is expensive from a performance perspective, because working with the real DOM just turns out to be a performance intensive task.
//      - That's why React is structured to work this way - performing virtual comparisons between the virtual DOM states(snapshots), past and present/current, and only passing the changes/differences between the previous snapshot and the current snapshot to the real DOM. It does this virtual DOM "diffing", finding out the difference between two snapshots, and only updates the real DOM when there are differences.

// Lesson #186 Component Updates In Action

// IMPORTANT: Only the elements that are changed/updated between VDOM snapshots are re-rendered in the real DOM.

// Lesson #187 A Closer Look At Child Component Re-Evaluation

// The component where the state is managed, where the state/context/props are created and updated, is the component which will be re-evaluated and re-executed.

// For example, if the app function component is re-executed because its state changed/updated, then that means its return statement, and therefore its subsequent JSX code/elements, is also re-executed. The elements within the return statement of a function component, specifically the JSX elements(components), work just like function calls on JS functions. Therefore, any child components of the app function component will also be re-executed when the app component re-evaluates - child components are also re-executed and re-evaluated since they are a part of the parent component's function body. If the parent component function runs again then the child component functions also run again. It doesn't even matter if they have props on them. It's just the fact that the parent component changed and re-rendered.
//      - Changes in props might lead to actual changes on the real DOM, but for the function to be re-evaluated it's enough that the parent component was re-evaluated.

// Summary: If a component is re-executed all its child components will also be re-executed and re-evaluated as will their children and so on.

// Lesson #188 Preventing Unnecessary Re-Evaluations with React.memo()

// React.memo(SomeComponent) allows for optimizing functional components. It tells React that for this component(e.g. SomeComponent), which it gets as an argument, React should look at the props passed to SomeComponent and check the new value for all those props, compare it to the previous value those props had, and only if the value of a prop changed, the component should be re-executed and re-evaluated. Otherwise, the component is not re-rendered.

// This optimization comes at a cost. In the example above, the memo method tells React that whenever the app component changes, it should go to the SomeComoponent and compare the new prop values to the previous prop values. Therefore React needs to do two things: 1) It needs to store the previous prop values, 2) and it needs to make that comparison between the new and previous values. That has its own performance cost. Therefore, it greatly depends on the component the memo method is being applied to whether it's worth it or not, because its trading the performance cost of re-evaluating the component for the performance cost of comparing props.
//      - This depends on the number of props, the complexity of the component, and the number of child components the component has.
//      - React.memo can be a great tool if there is a huge component tree with a lot of child components, and the component in question is at a high level on the component tree.
//              - In this scenario, it can help avoid unnecessary re-render cycles for an entire branch of the component tree.
//      - On the other hand, if it's a component where the associated prop values are going to change with nearly every re-evaluation of the parent component anyways, then React.memo doesn't make sense to use, because if the result is that the component should re-render regularly, then it is more efficient to forego that extra comparison of the prop values and just re-render.
//      - For small apps, for small component trees, and so on, it may not be worth it to add memo.
//      - For larger apps where entire branches can be cut off from unnecessary re-evaluations it may be worth adding it.
//      - Don't wrap every component with React.memo. Instead, pick key parts in the component tree which allows for cutting off entire branches of unnecessary re-renders, to improve peformance.

// When a parent component re-renders why do components using React.memo() sometimes re-execute when it appears the props do not change?

// Answer:  React components are just standard functions in the end, and they execute/re-execute like normal JavaScript functions do, except that this execution is controlled by React, and re-executions are largley(exclusively???) depenedent on state changes - i.e. the main difference between JS functions and React functions are that React functions are handled by the React framework - this includes the use of state and state updating functions, which affect the function components rendering cycle. It still executes like a normal function in the end.

// If a function, or any other reference data type, is being passed as a prop to a child component, a brand new function is being passed each time the parent function component re-renders. This is because functions in JS are just objects, and objects are reference data types - no two objects, even if they contain identical values are equivalent.
//      - Two function objects, even if they have the same content, are never equal in JavaScript when compared using a comparison operator, and therefore, React.memo finds out that the value changed just because of how JavaScript works.
//      - React.memo() essentially uses a ("strict"???) comparison operator to check props for changes, so if the prop is a reference data type like an object, array, or function, then this ("strict"???) comparison returns false, and the child function component is re-executed/re-evaluated - i.e. it is a new function for every render or every execution cycle of the parent function component, because ulitmately the function(object) is just being stored in a normal constant, which is being recreated on each render/re-render of the parent component and passed to the child component as a prop.
//      - The opposite holds true for primitive values passed as props. These will return true for the ("strict"???) comparison operator even though they are recreated each time the parent component re-renders - i.e. false === false is true -> therefore there is no re-render of the child component using React.memo(), whereas {1, 2, 3,} === {1, 2, 3} is false.

// Lesson #189 Preventing Function Re-Creation with useCallback()

// Use Callback is a hook that allows for storing functions (and other reference data types???) across component executions so that React will save the function(object) and not recreate it with every execution - i.e. the function(object) is stored in the same place in memory and therefore it is the same exact object every time the comparison is made by React.memo(), e.g. {1, 2, 3} === {1, 2, 3} is true.
//      - The useCallback hook can save/store a function(object) in React's internal storage and will always reuse that same function(object) when the component function executes.
//      - useCallback requires a dependency array as a second argument, much like useEffect.

// Lesson #190 useCallback() and its Dependencies

// In JavaScript, functions are closures, which means they "close over" the values within their environment(curly braces). When implementing a useCallback hook, the function(object) that is wrapped by the useCallback is created and stored, along with any values(state) contained within the function. This occurs on the initial(first) function component render/evaluation, and the function(object) is stored within React's (internal memory/storage???).
//      - Therefore, the associated values(state) within the function environment are also stored and will not be updated, within the function itself, unless the value is listed as a dependency within the dependency array. That is why the dependency array for the useCallback hook is so important.
//              - If any of the associated values(state variables) within the function(object), stored in the useCallback hook, are changed/updated those changes/updates will not be reflected within the function(object) itself unless the function is recreated, and it cannot be recreated unless the useCallback hook is triggered by a value(value change of a value) listed in the dependency array. Therefore list any associated values(state) that could change in the dependency array.

// Lesson #192 A Closer Look At State & Components

// State is a crucial concept in React. Ultimately, everything comes down to state when it comes to re-rendering components and changing what's on the screen/browser. Therefore, components and their interaction with state, is really a core aspect of React. It is worth noting that both are managed by React. The component concept comes from the React library and state, which is attached to components, is managed via the useState(and useReducer???) Hook. If state is updated within a component that will trigger a re-render of the component. That's how the interaction between components and state is handled by React.
//      - One of the most common forms of managing state is to implement the useState Hook. This hook allows for automatically creating and attaching a piece of state to a component. The component in which the useState hook is called/executed is the component to which that piece of state is attached.
//      - As part of the management process of state, React ensures that useState, and the value which is passed as a default value to useState, is only used once - upon initialization.
//              - The first time the component is rendered is when the useState Hook creates the state variable and attaches it to the component, with the default value being used/set as the initial state value for that piece of state, but only on the first render - i.e. React initializes the state variable with the default value. For subsequent function component re-renders, when useState is being called(state updating function execution), the piece of state that was previously initialized and created is not recreated - it is NOT a new state that is being created and replacing the old state. Instead, React recognizes that it already has a state variable for the component, and it instead updates that state as needed(when it changes) when the function component is re-rendered, due to some state changing most likely, and therefore React will only perform state management and updating on that piece of state. It will never reinitialize the state unless the component is totally removed/detached from the DOM. As long as a component stays attached to the DOM, state is only updated after that first initialization.

// Lesson #193 Understanding State Scheduling & Batching

// Scheduling //

// React "schedules" state changes. It does not process them immediately. That is why it is important to use the function form of the state updating function when updating the state variable is dependent on the previous state snapshot.
//      - Multiple state changes for a single state variable can be scheduled before the state changes are actually made. Using the function form of the state updating function ensures they are processed in order and the latest state change is the one that the state variable reflects, once the component re-renders based on those state changes - the component does not re-render until the scheduled state change has been executed and the state variable has been updated. Therefore, if multiple state changes for a state variable have been scheduled prior to the re-rendering of the component in question this can lead to inaccurate previous state snapshots being used for the latest state update, if the function form of the state updating function is not used to update the state variable. (This is because the component does not re-render until the scheduled state changes have been executed, and if there are multiple state changes scheduled then the state updating function could be using the incorrect previous state snapshot because the component has not re-rendered and there are multiple state changes scheduled to occur.)

// Implementing useEffect is very similar to implementing the function form of the state updating function. This is because just like using the function form for updating a state based on a previous state snapshot, useEffect, because of its dependency mechanism, ensures that the effect will re-execute every time a state or a value, which is a dependency, changes. Therefore it can't miss outstanding state changes because it will rerun the effect for every time the function component is re-rendered - it will always rerun the effect and therefore will guarantee the latest state when the appropriate values(state variables) are included in the dependency array.

// These are simply two different patterns for dealing with one and the same problem depending on what is trying to be accomplished.

// Batching //

// If there are two state updating functions being called within the same function statement, the same synchronous code snippet, without a promise or different code blocks separating them, where nothing in between would cause a time delay, React will batch those state updates together in one long synchronous process - i.e. for a function that executes start to end without any callbacks or promises in between, React will take all the state updates that are produced by that function and it will batch them together into one state update - i.e. React would schedule a single state change/update with multiple pieces of state batched together.

// Lesson #194 Optimizing with useMemo()

// useMemo is for storing(memorizing) data. useCallback is for storing(memorizing) functions.
//      - Memorize data if it would be performance-intensive to recalculate something based on it.
//      - If data is stored with useMemo, it occupies memory. This storing functionality also takes up performance.
//      - Think sorting data for use cases.
