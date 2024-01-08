// Section 5: React State and Working with Events

// Lesson #67 Listening to Events & Working with Event Handlers

// On all built-in HTML elements, we have full access to native DOM events which we can listen to.

// For all of the default events, there is a prop equivalent in React, which can be added to a built-in HTML element to listen for the event to occur.
//      - Instead of adding an eventListener as we normally would in JS(imperative approach type), in React, we add an event listener by going to the JSX element we want to add the event to, and adding a special prop/attribute. However, it's not a prop which sets some value, but instead it's a prop which starts with the word "on" - React exposes all of the default JS event listeners as props, which start with "on" - e.g. onClick, onHover, etc. By applying this on a JSX element, it adds an event listener.
//              - The next step is to define what should happen when the respective event occurs. This is done by assigning a value to the event listener - in other words, assigning code which should be executed when the event occurs.
//                      - This is done by using a function. All of the event handler props/attributes receive a function as a value - a function passed as a value which is then executed when the event occurs.
//                      - Typically, we do not write the function inline inside the return statement in the JSX element, because that can become cumbersome. Instead, the event handler function is written inside the function component above the return statement for the JSX element.
//                              - Then the event handler function is passed to the event listener inside the JSX element - pass the name of the function as the value to the event listener, which is essentially just pointing at the event handler function to be executed when the event occurs -> this allows the event listener to point at the event handler function so that it can call the function when the event is triggered.
//                                      - It's important that the function is only pointed to and not executed immediately, which is why parentheses are not added within the JSX element's event listener prop value, because that would cause the event handler function to be triggered/invoked immediately when these lines of code are being parsed, when the JSX code is returned. It would not be executing when the click occurs but when this JSX code is evaluated, and that would be too early - that's why instead we just point at the event handler function -> pass a "function pointer" as a value to the event listener prop/attribute(onClick, onHover, onKeyup, etc.)

// Note: Some events are only available on specific elements.
//      - That is all based on the default DOM behavior of the elements.
//      - If an element supports an event, then that event listener can be added, with React, by adding it as a special prop/attribute beginning with the word "on" followed by the event's name - make sure that the event name starts with a capital character -e.g. onClick.
//              - Next, point at the appropriate event handler function, either defined in line, or defined above the JSX element inside the function component, and React will execute that function when the event occurs.
//                      - It is customary to name the event handler functions by using the name of the type of event, followed by the word handler or in reverse order - e.g. clickHandler, handleClick.
//                              - This naming convention makes it clear that this is a function which is not called/executed by a developer somewhere else in the code, but that it is a function which is attached to an event listener, which will eventually be called by React when that event occurs.

// Lesson #68 How Component Functions Are Executed

// Keep in mind that components are functions. The only special thing about these functions is that they return JSX.
//  - Since it's a function it must be called/invoked.
//          - Notice that you never call the component functions. Instead, you just use these function components to write JSX code with HTML elements. However, under-the-hood, this is almost like a function call - using components, e.g. <Component />.
//                  - By using components in JSX code, it makes React aware of the component functions, and whenever React evaluates/parses/renders/executes the JSX code in a JSX file, it will call/invoke these component functions, and these component functions then return JSX code, which is all the evaluated, up until there is no more JSX code to be evaluated.
//                          - React keeps on calling any component functions it encounters in JSX, then calls any functions that those functions might have returned, so any elements those components might have used in their JSX code, until there are no more functions left - until there is no more component code(JSX) left to evaluate or call. Then it re-evaluates the overall result and translates that into DOM instructions, which renders on the screen. That's how React works. This entire process is started by the index.js file, which typically, is pointing at the the App component.
//                                  - That's the first component function which is being called and that happens when the react app is been loaded on the screen, which happens when the page is been visited. That's how React goes through all the components, executes all the component functions, and draws something on the screen, based on the result of those executions - React goes through all of those steps when the application is initially rendered, but thereafter it's done. It does not repeat. This is where a special concept called "state" comes in to play. State allows React to update and re-render its displayed result when components/elements are changed/updated by events/actions/triggers and need to be re-evaluated -> "state" allows React to re-evalute a component/element when there are changes/updates to a component and allows React to re-render those changes to the screen.

// Lesson #69 Working with "State"

// State is not a React specific concept but it is a key concept in React.

// By default, in React, standard(let/const/var) variables, are not triggering a re-evaluation of code state.
//      - If state changes in a standard JS variable, the code executes, but the overall component function doesn't execute again to update the state changes to the DOM/browser - React does not update the DOM for standard JS variable state changes.
//              - Even if the component did execute and re-render, it would execute the same code, and then any standard JS variables would be re-created and re-initialized to their original values - to the values before the state change occurred. Thus, the desired result would not be achieved.

// The "useState" function is a function provided by the React library. This function allows us to write "special" variables, which define values as "state", where changes to these values should result in the component function being called/executed again, and those value's "state" changes being reflected/updated in the DOM on re-render, which is a key difference in functionality to the standard JS variables, in React.

// React hooks start with the word "use" in their name - e.g. useState, useEffect, etc.
//      - All React hooks must only be called inside of React component functions???.
//              - They can't be called outside of component functions, and they also shouldn't be called in any nested functions within a component function. They must be called directly inside component functions.

// NOTE: With "useState", we basically create a special kind of variable - a variable where changes will result in component functions being invoked/executed again and updates/changes to state being reflected in the re-render of the DOM. We can therefore assign an initial value for this special variable, just as we do for standard JS variables.
//      - useState also returns the current state of the variable and gives access to it. It also returns a function which can then be used/invoked to assign a new value to that variable.
//              - The first element the useState hook returns is a variable that holds the current state value of that variable, and the second element is a function, which can then be called to set a new updated value on the useState variable - resulting in a re-rendering of the application reflecting the updated state from that "state" variable.
//      - IDEA: "state" variable, "useState" variable

// NOTE: The useState hook always returns an array with exactly two elements - [variable, setVariable].
//      - e.g. const [variable, setVariable] = useState(initialState)
//      - The first element is the current state value, and the second element is a function for updating that value.

// IMPORTANT: Calling the useState function does not just assign a new value to its associated "state" variable. The "state" variable is a special variable because it's managed by React somewhere in memory. When this state updating function is called, this "state" variable will not just receive a new value, but the component function in which the state updating function was called, and in which the useState hook was initialized, will be executed again causing a re-render of the DOM with those state changes reflected in the re-render.
//      - We want to call the component function when the state changes. By calling the state updating function, that is happening.
//              - By calling the state updating function, you're telling React that you are assigning a new value to the state variable, and that then also telling React that the component function, in which the useState variable was initialized, should be re-evaluated. Therefore React will  execute the component function again, and also evaluate the JSX code again. Finally, it will reflect any changes which it detects - compared to the last time it evaluated the component function - onto the screen.

// Summary: If a React app has data, which might change, and where changes to that data should be reflected on the user interface, then useState variables are needed, because standard JS variables will not work. With useState variables, however, values can be set and changed, and when they do change, React will re-evaluate the component in which that piece of state was initialized - only that component not any other components.

// Lesson #70 A Closer Look at the "useState" Hook

// UseState initializes some value as a piece of state for the component in which it is being called. More specifically, it initializes it for a specific component instance.
//      - IMPORTANT: It doesn't just initialize a piece of state for a component, it initializes it for a specific component instance.

// is being used four times, right?

// For a given component with a state variable(useState variable/useState Hook), each component instance receives its own separate piece of state from that state variable(useState variable/useState Hook), which is independent of the other state variables(pieces of state) in their respective component instances.

// If there is a single component, which is then called four times inside of another component, a new separate piece of state(state variable) is created, in the exact same way, for each component instance and managed independently by React -- i.e. 4 separate pieces of state for 4 separate component instances).
//      - State is separated on a per component instance basis.
//      - There are separate pieces of state when creating a component more than once.

//  NOTE: In addition, whenever state changes because of an event, it's only the component function, and the specific instance where the component is being used/modified/updated, where React will re-evaluate and re-render.

// Why use const in useState - i.e. const [var, setVar] = useState(value)?

// As the developer, you are not assigning a value with the equal sign - i.e constVar = newValue. That would fail, but that is not how we are assigning a new value when we update a state variable with useState. Instead, the state updating function is being called, and the value is managed somewhere else by React, under-the-hood.
//      - By calling useState we tell React that it should manage the (changing/updating of the) state value for us - this all happens under-the-hood. We just call a function and React assigns the new value - we never explicitly assign a new value with the equal operator. Therefore, using a const variable is absolutely fine.

// How do we get the latest value then?

// The component function is re-executed when the state is updated via the state updating function being invoked/called with a new value passed into the function call - e.g. setState(newValue). Which means the line of code where the setState function is initialized is executed again with the updated state value, and therefore, the updated piece of state(state variable) is fetched from React, which is managing the state for us, and applied to the state variable wherever it is being used inside the component -> this is how the UI updates/re-renders to reflect the state changes.
//      - Basically, we go to React and say, "Hey please give me that latest version of the state variable which you are managing for me." React then provides us the latest state in the useState array, which useState always returns. Which means we always get a brand new snapshot of the updated state when a component function re-executes.

// NOTE: React keeps track of when useState is called in a given component instance for the first time, when it is initialized with the initialState value. However, if a component is then re-executed because of a state change, React will not reinitialize the state. Instead, it will detect that the state had been initialized in the past, and it will just fetch the latest state, which is based on some state update/change, and return the updated state instead.
//      - The initial value is only considered when a component function is being executed for the first time, for a given component instance.

// Lesson #73 Listening to User Input

// We could use onInput, which listens for every keystroke, but there is aslo the onChange event which will also trigger on every keystroke, but the advantage of the onChange event is that we can use that same event for all inputs types - e.g. dropdown menus, etc.

// Lesson #74 Working with Multiple States

// NOTE: e.target.value always returns a string, which is why when using useState to update a state variable based on the e.target.value of an input, the default/initial value of that state should be a string or empty string - e.g. const [input, setInput] = useState("initialValue") or useState("")

// NOTE: Sometimes pieces of state are referred to as state slices, especially when dealing with more than one piece of state.

// Lesson #75 Using One State Instead (And What's Better)

// Condense like pieces of state into a single piece of state by grouping them together using an object - i.e. useState({key:value, key:value, etc.}.
//      - The logic is the same but now it's in one state object, managed as one piece of state, instead of three separate slices.
//              - The difference now is that whenever any of the state within the object is updated, all properties contained within the object will need to be updated.
//                      - All properties must be updated when any single property is updated. Otherwise, those other properties will be dumped/overridden by the updated state object, which would not include those properties, only the property/properties that were updated -- when state is updated, React will not merge the old state with the new state. It will simply replace the old state object with the new one. If the new state object has only a single key/value pair, for example, the old state object, with multiple key/value pairs, will be replaced, and therefore, those other key/value pairs would be lost and only the single key/value pair would remain.

// Lesson #76 Updating State That Depends On The Previous State

// Anytime the updated/current state is dependent on the previous state - i.e. copying unchanged properties from the previous state to be included with the updated state - the state updating function should not be executed/invoked by simplying spreading the previous state properties into the state updating function object, along with the updated properties. The previous and updated state properties(i.e. all state properties managed by the state object in question) should be passed through an anonymous function, which is passed through the state updating function.
//      - Whenever state is updated and is dependent on previous state for copying/including unchanged properties to the new updated state, pass all of the associated state properties for a state object through an anonymous function within the state updating function - e.g. setState(() => {})
//              - The function, which is passed into the setState function, will automatically be executed by React, and it will receive and provide the previous state snapshot(typically named "prevState") for the piece of state which was passed into the state updating function via the anonymous function.
//                      - Next, return the new/updated state object/snapshot - i.e. setState((prevState) => return {
// ...prevState,
// updatedState: value
// }).

// IMPORTANT: Keep in mind that React "schedules" state updates, it doesn't perform them instantly. Theoretically, if a React app's functionaility is causing React to schedule many state updates at the same time, it could result in an outdated/incorrect state snapshot being used to update the state.
//      - With the anonymous function approach, React will guarantee that the state snapshot it provides the setState's inner anonymous function, the previous state parameter/argument(prevState), will always be the latest state snapshot - the most recent previous state - keeping all scheduled state updates in mind.
//              - This is the safer way to ensure that the application is always operating on the latest state snapshot for a given piece of state when the piece of state is dependent on the previous state.
//                      - Use this function syntax whenever a piece of state depends on the previous state - i.e. setState((prevState) => {
//     return {
//         ...prevState,
//         newState: newValue
//     }
// })

// Lesson #78 Handling Form Submission

// There is a default behavior built into the browser and built into forms on webpages.
//      - If a button, specifically with type "submit" is pressed inside of a form, the overall form element will create an event which can be listened to via the onSubmit event. The event listener is placed on the form tag and then some handler function can be executed when the form is submitted.

// Note on submitting forms:

// As part of the default browser behavior, when a form is submitted, the page reloads, because the browser automatically sends a request whenever a form is submitted to the server, which is hosting the webpage.
//      - The desired goal is to handle the form submission with JavaScript and manually collect and combine the submitted data to do something with it.
//      - To disable or prevent the default behavior of reloading the page on submission, use the event object that is provided automatically - the same event object that is provided in the onChange event listener attached to input tags, for example.
//      - Next, call/invoke the prevent default method, which is built into JavaScript - i.e. e.preventDefault().
//              - This method will prevent the default action of the server request being sent by the form submission, and since that request is not sent, the page will not reload. Instead, it stays on the currently loaded page without sending the request. This allows for continued handling of the submission data by JavaScript, manually.

// Lesson #79 Adding Two-Way Binding

// NOTE: To persist data, initialize global variables, with the data, outside/above the function component.

// However, by using state, there is an advantage. With state, implement two-way binding, which simply means that for inputs they won't just listen to changes, but they can also pass a new value back into the input. Which means that it is possible to reset or change the input programmatically.
//      - To do this simply add the "value" attribute to the input tag/element, which is a default attribute to the input element. This will set the internal/default "value" property/attribute, which every input element has, to a (new) value of our choosing - for example, it can now be bound to a piece of state(state variable). Now, the input element isn't just listening for changes IN or TO the input to update the state, but it will also feed the state back into the input so that when the state is changed, the value of the input is changed as well - i.e. <input value={someState}/>.
//              - The advantage to using the value attribute on the input element is that when the form is submitted it now offers the option to reset/clear the state (variable) back to it's initial state -  overriding the user input after the form is submitted, and therefore clearing the input element for new data to be submitted.
//                      - This is another key concept in React. Two-way binding is very useful when working with forms because it allows collection of user input for submission, but then it can also be used to reset or change the input (element).

// Lesson #80 Child-to-Parent Component Communication (Bottom-up)

// Passing data from child to parent:

// On input elements, in particular, there is a default "event" object, that's something the browser gives us by default.
//      - Think about the input element as a component as well. It's not a custom component, but it is a "pre-built" component, (provided to us by React, and translated/rendered as/to the input DOM element???), but it does have a component-like nature in the end. It also receives props/attributes, including "special" props like the onChange prop, for example. Actually, it's just a prop named onChange which takes a function as a value. Then internally the input element adds the event listener. React basically notices when a function value is set on the onChange prop, and adds the event listener on the rendered input element.
//      - This is a pattern that can be replicated for React custom function components as well. "Custom event props", which expect functions as values, allow us to pass a function from a parent component to a child component and then call that function inside of the child component. Then, when that function is called inside the child component, the data collected on the child component is passed to/through that function as a parameter/argument and that's how data is passed from child to parent (in a React app).
//              - It's convention to name the "custom event prop" starting with the word "on", because it's important to make clear that the value for the custom event prop should be a function - a function which will eventually be triggered when something happens inside of the child component - e.g. when a form is submitted inside a form component.
//              - NOTE: You must define the associated handler function inside the function component from where the custom event prop originates - from where the custom event prop is initialized/created.

// NOTE: Props can only be passed from parent to child, we can't skip intermediate components.

// Lesson #81 Lifting The State Up

// As it relates to state, there is no direct connection between two sibling components. Instead, communication is only possible from parent component to child component and from child component to parent component. That is why when fetched/collected state data from one sibling component is needed in a different sibling component it is necessary to utilize the closest parent component, which has access to both involved child/sibling components.
//      - It is possible to store state from a sibling component in the closest involved parent component because it has access to both involved sibling/child components.
//              - This idea is known as lifting state up because we are lifting state from a "lower" child component up to a "higher" parent component to use as needed.
//                      - The state is being lifted up via the props object. When the parent component passes a function, as a value, down to a child component via the props object, that child component can utilize the function, via props, and pass its data/state into the function which is then executed on the parent component, where the function is declared/defined. That parent component can then access that state/data and store it in its own piece of state and insert it into other components that are being rendered/used within its own function component - i.e. pass that state down to another child component or use it in its own component.

// Summary: Lifting state in React is about moving data from a child component to some parent component to either use it there or to then pass it down to some other child component.

// The goal is to lift state up just as high as necessary in the component tree, reaching a (parent) component which has access to both the (child) component(s) that generate(s) data as well as the (child) component(s) that need(s) data.

// Lesson #82 Derived / Computed State (derived/computed values)

// If there is a piece of state that is directly dependent upon another piece of state for its value, don't manage this situation as a separate piece of state. Instead, manage it by simply adding a new JS variable in the component function.
//      - It is not good practice to have separate pieces of state, within the same function component, dependent on one another for their values - it can lead to errors???. It is better to use "computed/derived state", where the JS variable's value will be updated/computed dynamically based on an associated single piece of state.
//              - This computed/derived state approach works with the JS variable because the piece of state that the JS variable is computing its value from causes a re-render of the function component, which will update the state value and concurrently the JS variable computed value, displaying both updates to the UI.

// IMPORTANT: There is a difference between deriving a value for a JS variable from a piece of state and deriving a value for a piece of state from another piece of state, within the same function component. The former is perfectly fine to implement. The latter can cause issues/erros with state variables and is unnecessary/cumbersome.
//      - Dependence by the JS variable on a piece of state is fine, but dependence by a state variable on another state variable, within the same function component, is not okay.
//      - Using derived values, from pieces of state, for JS variables is a more elegant and recommended approach, rather than having multiple pieces of state deriving their values from each other.

// NOTE: A computed value is a value which is derived from a piece of state, and updates/changes when the associated piece of state update/changes.

// Lesson #83 Controlled vs Uncontrolled Components & Stateless vs Stateful Components

// A "controlled" component is whenever two-way binding is used within a component.
//      - It means that a (local???) value which is used in the component is passed on to its parent component, through a props function, which handles the logic of updating/changing a state value/variable with/using the (local???) value passed up to it by the child component, and the set/current (state) value of the state variable is also, in turn, sent (back) from the parent component to the same child component (and used - typically to update the UI reflecting the state change/update). Both the currently set value for the state variable, as well as the function which handles the passed value from the child component, are NOT part of the child component, but are controlled/handled by, or part of, a parent component.
//              - The "controlled" child component is really just a standard function component that (renders something to the UI and) has listeners and/or props attached to it. However, the real logic that is executed on the "controlled" component resides in its parent component, and this setup/approach is what conventionally is referred to as a "controlled" component. Technically there is no difference. It is still a regular component. It's just a special term which basically means that both the (state) value, which it receives and uses in various ways, as well as changes to the value are not handled in the component itself but in a parent component.

// Presentational vs. Stateful components:
// (stateless)   vs. (stateful)
//   (dumb)     vs.  (smart)

// This terminology simply means that in all React apps there will be a couple of components that manage some state and then there will be other components which don't manage any state - presentational or dumb components simply don't have any internal state. It's just there to output some data. In most react applications, there will be more presentational and dumb components than smart or stateful components.
//      - The state is spread out and distributed through props.
