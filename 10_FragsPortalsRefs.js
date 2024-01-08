// Section 10: Diving Deeper: Working with Fragments, Portals & "Refs"

// Lesson #134 JSX Limitations & Workarounds

// There must only be one parent JSX element in the return template of a React component. The reason is actually the same logic that applies to JS functions - JS functions can't return more than one value either. That is important to understand, JSX function code translates into React.createElement() JS code.
//      - Only one React.createElement() call can be returned by the component. Of course, any nested JSX elements inside of that one root React.createElement() could be placed side by side because those children can be added as additional nested arguments to the root createElement function.
//      - This is simply a limitation of Javascript, which is passed onto React as it is a JS framework.

// Options for wrapping JSX elements within a component

// 1. Add a parent <div> wrapper - or any other type of HTML element wrapper <p>, <header>, etc.

// 2. Use a native JavaScript array([]).
//      - This option requires removing curly braces from around the JSX code because it's no longer inside of a JSX environment. Instead it is now inside of a JS array. This can be returned by the function component as an array because React is able to work with arrays of JSX elements - React can process arrays within JSX elements and therefore it could also return an array of JSX elements. However, it will require a key for the parent wrapper element because whenever working with an array in JSX elements React wants a key on every element within the array - no exceptions.
//      - Just as when mapping a list(an array) of data, dynamically, into newly generated JSX elements, React also wants such a key even if the array is a hard-coded list of JSX elements.

// Analysis: The wrapping div option is better than the array option, which is more cumbersome, but generally, with any wrapping element a new problem arises known as "div soup".
//      - This is where the actual DOM that's being rendered in the browser, for the application, has many different nested React Components and all those Components, for various reasons, need wrapping divs or have wrapping Components, which means there will be unnecessary divs being rendered into the actual DOM even though they only exist because of the requirement/limitation of JSX to return a parent element- i.e. a wrapper element with nested children JSX elements.
//              - These wrapper elements don't add any semantic or structural meaning to the app/webpage, and depending on the css style, can break the styling of the app. Even if it doesn't break the styling, it will reduce the app's performance - make it slower because the browser needs to render all the wrapper elements, and React needs to check all those elements, or at least some of those elements, if the content needs to change.
//                      - Rendering unnecessary content is generally never a good idea in programming. Hence, this wrapping div/element approach is okay but not ideal.

// Lesson #135 Creating a Wrapper Component

// When solving the parent wrapper div/element return requirement for React components, the rule/req is not that there must be one root component being rendered to the DOM, but just that there is/must be one root element that is returned by each component - or that is stored in a constant or variable (and returned???).
//      - So by creating a wrapper component, that simply returns props.children, this one root element requirement is met. This option effectively creates a wrapper component that only returns its children(JSX components), that can be nested and adjacent within the parent wrapper. This works because the parent wrapper component only returns one element in its return statement, props.children - this option solves the technical requirement of JavaScript to return a single element/value, without creating unnecessary/useless divs/wrappers. It is a requirement work around.
//              - The content(JSX elements/components) within props.children can be adjacent to each other inside the wrapper component, and that will not be a problem because they are never directly returned in the React code.

// Lesson #136 React Fragments

// The wrapper component above is actually not a component that needs to be built, because it is already built into React as a fragment component, which can be accessed via <React.Fragment>, or by just importing "Fragment" from React.
//      - There is also a shortcut that can be used for some projects -- i.e. <></> -- this is not valid HTML, and it's not necessarily valid JSX in all projects. The project set up needs to support it.
//              -Using the shortcut depends on the project set up because the workflow needs to support it.
//              - Both syntaxes render empty wrappers, which will not render any actual HTML element to the DOM.

// Options:
//      <React.Fragment></React.Fragment>
//      <Fragment></Fragment>
//      <></>

// Lesson #137 Introducing React Portals

// Fragments facilitate writing cleaner code to end up with less unnecessary HTML elements on the final page. React portals are another useful feature, which also help facilitate cleaner code writing.

// For example, take a React component with a nested modal component, which is being rendered in the DOM based on a user interaction. It will technically work as long as the correct styling is applied. It will look like a modal in the DOM, but semantically, and from a clean HTML structure perspective, this is not ideal, because a modal is basically an overlay for the entire page. So logically, it's above everything else, and if it's then nested in some other HTML code in the React app, it might technically work because of styling, but it's not good code structure. It can even lead to real problems with styling, or with accessibility, if the overlay content is nested, because if, for example, a screen reader has to interpret that HTML code, which is being rendered, it might not see this as a general overlay, because the CSS styling won't matter much in this situation. From a semantical perspective, based on the structure of the nested modal code within the overall React app, it's deeply structured into the overall HTML code. To the screen reader, it's not obvious that the modal should be an overlay for all the other content on the page(DOM).
//      - This doesn't just apply to modals but to any type of overlay content - i.e. side drawers, dialogue boxes - so typically for all kinds of overlays or any related overlay components.
//      - It's similar to creating a button by simply styling a div like a button and adding an event listener. It will technically work, but it's not a good practice. It's bad for accessibility. It's bad if a fellow developer has to work with that. It's simply not a good idea.

// Portals are a React concept to fix this problem with modal/overlay content, which shouldn't be deeply nested in a React app when rendered to the DOM/browser.
//      - Use portals to keep the structure the same inside the developement code environment(dev env) of the React app - continue writing components the same way - but render this development structure differently to the real DOM - make sure the DOM interprets the code differently than written in the development environment, for example, render the modal/overlay HTML code (content) somewhere else, above the rest of the app content, rather than as a deeply nested element in the app.

// Summary: Portals allow rendered HTML content to be moved somewhere else from where it is located inside the React code.

// Lesson #138 Working with Portals

// ReactDOM.createPortal() can be used anywhere that would otherwise require JSX code - also wrapped in curly braces.
//      - Use createPortal to "portal", to move, a Component's HTML content somewhere else in the actual DOM that is being rendered. In the React app JSX code structure, within the components, continue working with those components as before.

// Lesson #139 Working with "ref"s

// Refs are a powerful tool that allow for getting access to other DOM elements and working with them.
//      - With refs, set up a connection between a HTML/JSX element, which is being rendered via a React component, and other JavaScript code that processes the data within that element - e.g. a JS function within in a component file that is using the state of a JSX element, within a function component, in its arguments to return a value, such as the updated state of the element to a list or other component.
//              - Connect a ref to a HTML/JSX element by storing a useRef hook in a variable, above the return template in a function component, going to the element in the return template below, and connecting the useRef() hook stored in the variable by adding a special prop, the "ref" prop, on that element - e.g. <input ref={useRefVar} />.
//                      - Just like the "key" prop, the "ref" prop is a built-in prop, which can be added to any HTML/JSX element, because any HTML element can be connected to one of the useRef() references. Very often, "refs" are used for inputs because fetching input data is common and useful in many React apps, but it can be done with any element.

// The ref value is always an object, which has a "current" prop/key and the "current" prop holds the actual value(DOM element) that "ref" is connected with - e.g. for a "ref" attached to an input element, it's the input element which is being stored as a value in the "current" prop/key.
//      - What is actually being stored in the "current" prop/key is the actual DOM node(e.g. <input ref={refVar} />).
//      - The first time React reaches the component file code and renders it to the DOM, it will actually set the values stored inside the "ref" variables to the native DOM elements connected to those "ref" variables, respectively.
//      - The value of the useRef() variable will be an actual DOM element once the component's code is executed and rendered to the DOM - e.g. const refVar = useRef() --> return <input ref={refVar} id="inputVal" /> --> refVar === {current: input#inputVal } -- i.e. a variable named refVar with an object as its value - that object has a "current" prop/key with a value that is an actual DOM element(e.g. an input element)
//  Summary: The "ref" value is always an object, which always has a "current" prop/key, and the "current" prop/key holds, as its value, the actual native DOM element(DOM Node) that the "ref" is connected with/to.
//      - To read an input element's value, stored in a useRef hook variable, use refVar.current.value
//              - This means access to the values stored in a(an) (input) DOM element without having to log every keystroke via a state variable - no need for a useState hook - e.g. just read/output the input value stored in the useRef variable when a submit function is executed via onSubmit.

// IMPORTANT: Rarely use "refs" to manipulate the DOM - only for resetting input values, for instance -- e.g. refVar.current.value = ""
//      - Here it's not really manipulating the DOM, because it's not adding a new element or changing css styling via classes, etc. It is just changing what was entered in the input element.

// For use cases where reading values quickly is necessary, and no values are being changed or manipulated, then state is not needed, because just to use state as a "keylogger" is not a great use of state(useState hook). It's a lot of unnecessary code and work. If the goal is simply reading an elements value then refs are a better option.
//      - Refs are less code but may have cases where manipulating the DOM is required, which should rarely be done. State is definitely cleaner but is more code.

// Lesson #140 Controlled vs Uncontrolled Components

// The approach of using refs to interact with DOM elements, specifically with input elements, also has a special name.These are "uncontrolled components", if the values are accessed with a "ref" - i.e. If using "refs" to access input element values, the input component is considered to be an uncontrolled component. This is because the "internal state", the value which is reflected in the input, is not controlled by React. It is relying on the default (DOM) behavior of the input element/component, where a user is able to enter something and that entered value is reflected (via the input element (value)). Then, the value is just "fetched" with a react feature, useRef, but React does not feed/input that data back into the input element/component. When resetting the input to an empty value, it is not done using any react features. The native DOM element is accessed via the standard DOM API for setting the value of the input DOM node/element. The state of the component is not being controlled with/by React - uncontrolled.

// Summary: Uncontrolled/controlled terminology is typically used with and referring to input and form components. When dealing with these two types of components, they tend to have some "internal state" natively provided by the browser. An input element is configured to take user input, store it, and output/reflect the user input as its value, usually in conjunction to a form element. When working with these components in a React app it is standard practice to connect React state to that native "internal state" of the components.
//      - Controlled components are when the "internal state" of the component is controlled by React via state variables(useState hooks).
