// Section 12: Practice Project: Building A Food Order App

// Lesson #166 Adding a "Header" Component

// Two ways to add an image to a React project:
// 1) For a local image, download the image file into an assets folder, within the src folder of the React app, and import that image into the appropriate components. Then assign the imported image to the "src" attribute on an img tag/element.
// 2) For an image externally located on a server, assign the "url" of that image to the "src" attribute on an img tag/element.

// Lesson #170 Adding a Form

// Pass all key/value pairs of a specific object on the props object to a JSX element/component, within a function component, by using the spread operator and dot notation - to specify which nested object - on the props object inside of curly braces on the opening tag of the JSX element/component that will use those props(key/value pairs) - e.g. <input {...props.input} />
//      - For the above example, all key/value pairs on the input object within the props object will be passed down to the input element - e.g. if type="text" and value="someValue" are passed to an Input component, then both of those key/value pairs would passed through props into the input tag within the reusable Input function component file, when using the spread operator within the input tag as in the example above(i.e. {...props.input}).
//      - (This can be applied to the entire props object or to a specific prop within the object - like in the example above - by using dot notation and specifiying which of the props is to be used???).
//      - This will make reusable components(UI components) highly configurable.

///////////////////// Is this above explanation accurate or is it ONLY specific properties on the props object that can be passed to a JSX element/component in this way??? /////////////////////

// Lesson #174 Managing Cart & Modal State

// Manage state where it is relevant and makes the most sense.

// Lesson #175 Adding a Cart Context

// It is the "value" prop on the "context provider" component that contains and manages the dynamic state it is passed, not the "context" file itself, where the context is created/instantiated. These can both be placed in the same file, or separate files, depending on preference.

// Lesson #177 Adding a Cart Reducer

// Use the "concat" method, instead of the "push" method, with the useReducer hook to maintain the immutability of the state object(s).
//      - Concat adds to a new array, where push adds to the existing array - push mutates the existing array(state) and concat does not.
//              - It's important to update state in an immutable way, which simply means don't edit old state snapshots because that would mean that existing data in memory gets edited without React knowing or being aware of it. Instead, generate a brand new state object, which is returned - concat generates this brand new array instead of editing the old array in memory.
