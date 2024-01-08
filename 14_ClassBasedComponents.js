// Section 14: An Alternative Way Of Building Components: Class-based Components

// Lesson #197 What & Why

// Functional Components //

// Functional components are regular JavaScript functions which return some renderable results, typically JSX.

// Class-based Components //

// Class-based components exist because they were required in the past, prior to React 16.8, specifically, when dealing with state and side effects - before using React 16.8, class-based components were required to manage state, side effects, and component life cycles.
//      - Prior to React 16.8, state could not be managed in functional components, nor could side effects.
//      - Class-based components use the render() method to define component outputs(VDOM) - (the code written within) the render method informs React of what should be rendered to the UI/browser much like the return statement/template(React.createElement()) in functional(function) components. A return statement is also required in order to render the content of the component - return the code/content that should be rendered by the class-based component.
//              - "Render" is a reserved keyword in React for class-based components.
//      - React 16.8 introduced React Hooks for functional components.
//              - The React Hook functions for functional components, bring features to functional components, which were previously reserved for class-based components.

// Lesson #198 Adding a First Class-based Component

// The "extends" keyword allows classes to inherit (methods???) from other classes, in JS. This functionality extends to React class-based components as well.
//      - The "Component" class is defined/provided by React - it is found within the React library.
//              -  The Component class adds important functionality to make class-components work/function as React components. It also adds a couple of important properties, one of which is the "props" property, which can be accessed with the "this" keyword - i.e. this.props.
//                      - This functionality is only possible because of "extends Component" being added to a class-component.

// Lesson #199 Working with State & Events

// Initialize, define, and update state in class-based components.

// 1) To define state, use the constructor function/method. The constructor method is automatically called whenever the class is instantiated, which happens when React encounters a class being used as a component in a JSX code.

// 2) Inside the constructor, initialize state by accessing this.state and setting it equal to an object - i.e. this.state = {}
//          - IMPORTANT: With class-based components, state is always an object, and as a property of the constructor method, it MUST be named "state".
//                  - Within the state object, there can be other nested objects/arrays - basically, any data type, primitive or reference, can be used within the state object for managing different pieces of state.
//          - With functional components, state can be anything. It can be a boolean, string, number, object, array, etc. It's flexible. It can be anything.
//          - With class-based components, all the state slices/pieces are grouped together inside the state object within a single class-based component, and this is not an optional choice. With functional components there can be multiple separated/independent state slices/pieces, so multiple UseState calls within a single function component.
//                  - It is also still an option to create just one state object and group them together, but that is optional with functional components.

// 3) this.setState() is used to update state within the class-based component.
//      - "setState" is a reserved keyword, and this.setState() is a method provided by the "Component" object/class in the React library, which allows for updating state.
//              - this.setState() takes an object, and this object contains the new state that is to be set on the previously instantiated state object. Very importantly, it won't override the old state, but instead React will merge the object being passed to this.setState({...newState...})with the existing state.
//                      - Existing state that is not updated via the state updating function, this.setState(), will be kept. It will be "spread" into the updated state object - it will be copied/merged into the updated state, because this.setState does not override the old state.
//              - With the React Hook useState, which is used to manage state in function components, when the state updating function is called, the old state slice is always overridden by the new state slice that is passed to the state updating function - the old state is not merged into the updated state slice by React, unless the logic for that is explicitly written into the state updating function code.
//                      - This could be done by having pieces of state inside of a state object and spreading the existing state, that is not being updated by the state updating function, into the updated state object. With class-based components and setState, React automatically merges the existing state with the new/updated state slice/object.

// NOTE: Helper variables(const/let/var???) can be defined in the render method.

// IMPROTANT: In order to make sure that "this" keyword for the this.setState method refers to the surrounding class, which it doesn't by default, attach "bind(this)" to the element where the eventListener is set in the JSX code in the render method return statement. This will ensure the same context/value for "this" keyword set on the element and the this.setState method in the class - ensures the "this" on the JSX element eventListener is referring to the same "this" in the class' this.setState method.
//      - Optionally, bind the state updating method in the constructor method, instead of the eventListener in the render method - e.g. constructor() {...code... this.onClick = this.onClick.bind(this)}
//      - e.g. <button onClick={this.toggleHandler.bind(this)}>Click</button>
//      - Alternatively, convert the method to an arrow function so that the method will use the parent "this" instead of the locally scoped "this", which occurs with the standard function declaration syntax.
//      - This is NOT required for functional components, because "this" keyword is not being used, since it is a function and not a class.

// IMPORTANT: When adding the constructor to a class and extending another class, call super within the constructor. This calls the constructor of the super class, which is being extended and inherited from - e.g. class SomeClass extends AnotherClass { constructor() { super() ...code...}}

// Lesson #200 The Component Lifecycle (Class-based Components Only!)

// React components have a concept called the component life cycle, and class-based components use component life cycle methods to manage certain code executions within that life cycle, e.g. when a component mounts or dismounts from the DOM. This is similar to how the useEffect hook for functional components handles side effects and the life cycle of the function component - in class-based components, side effects and the life cycle of the component cannot be handled via the useEffect hook. They can only use component life cycle methods.
//      - There are specific methods that can be added to class-based components to run code at different points in the life cycle of a component and manage side effects. These are called component life cycle methods, and they can run code at different points within that life cycle.

// The most important life cycle method that can be added to class-based components is the componentDidMount() method which is provided by the built-in Component class in the React library that can be extended to class-based components.
//      - Other live cycle methods that can be added include componentDidUpdate() and componentWillUnmount(). There are some others, but they are not as important. The three methods listed above are by far the most important.

// 1) componentDidMount() will be called/executed when the component initially mounts to the DOM - when it was first evaluated and now rendered to the DOM. useEffect equivalent is the following: useEffect(() => {...code...},[])
//      - Note that there are no dependencies in the useEffect hook.
// 2) componentDidUpdate() is called once a component was updated - when state is updated/changed and the component is re-evaluated and re-rendered. This is the useEffect equivalent to the following: useEffect(() => {...code...}, [someDependencies])
//      - Note that there are dependencies in the useEffect hook.
//      - A useEffect with dependencies is re-executed whenever the component re-rendered, if dependencies changed. That is why componentDidDpdate() is basically the equivalent to useEffect with some dependencies.
// 3) componentWillUnmount() is called right before the component is removed from the DOM. This is the useEffect equivalent to the follwoing: useEffect(() => {...code... return () => {...cleanup code...}}, [someDependencies])
//      - Note the clean up function that is returned in the return statement of the useEffect hook function.
//              - That cleanup function is called right before the useEffect function is re-executed(before all re-executions) and also when the component is about to be removed from the DOM.

// Lesson #201 Lifecycle Methods In Action

// prevProps and prevState are parameters of the componentDidUpdate() method, which can be used to perform if/else statement checks for state changes to components - these checks are essentially the same as using dependencies in useEffect hook dependency arrays. Without them, the potential for infinite loops are possible.

// Lesson #202 Class-based Components & Context

// With useContext, it is possible to listen to multiple context in the same component by calling useContext multiple times and pointing at different contexts. This will not be possible with class-based components, because only one context can be connected to a single class-based component at any time - this is done by adding a static property, which means using the "static" (reserved) keyword followed by the property name "contextType" and assigning it the appropriate/necessary context(value) that has been created and imported from a separate context file.
//      - A class-based component can only be connected to one context.
//      - There can only be one static contextType property per class-based component, so if there are two contexts which should be connected to the same component, this would not be an option.

// Lesson #204 Introducing Error Boundaries

// "throw new Error" is a JavaScript method. By executing this line, JS is generating an error and the error bubbles up the call stack until it is handled, but if it's not handled anywhere, this will crash the application. It's common to use errors, not as a bad thing, but simply as a way of transporting the information that something went wrong from place A to place B within an application. In JavaScript, it is common to use a try/catch block for these types of scenarios - "try" code, which might fail, and "catch" potential errors when that code executes to then handle that error and run alternative code.
//      - React is a JS framework, but if an error is generated inside of a component, and it can't be handled in that component, try/catch cannot be used, because that only works in places where regular JavaScript statements are written - JSX code cannot be wrapped in try/catch blocks.
//              - In these scenarios, build and utilize an error boundary.

// NOTE: The componentDidCatch lifecycle method can be added to any class-based component, and whenever it is added to a class-based component, it makes that class-based component an error boundary.
//      - This lifecycle method will be triggered whenever one of the child components throws an error or generates an error.
//      - Wrap the error boundary component around components which should be "protected" by that component - wrap it around any components that might throw errors which need to be handled.
//              - it can wrap more than one component at a time.
