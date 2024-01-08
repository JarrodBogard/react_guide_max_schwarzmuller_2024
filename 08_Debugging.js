// Section 8: Debugging React Apps

// Lesson #108 Working with Breakpoints

// Open the source tab in the inspector tabs to find the src code of the React app(sometimes in the src folder or webpack folder).
//      - Add a breakpoint by clicking next to the line of code. This is the line of code where the code will pause execution.
//              - Use the "step into next function call" button to move through the code line by line, use the "step over next function call" button to complete the current function call, and click the "resume script execution" button to complete the current code execution of the file.

// Lesson #115 Handling Events

// When passing an anonymous function as a prop/attribute to an event handler(onClick, onChange, onSubmit, etc.), within a JSX element(input, button, etc.), pass the "event" object as a param through the anonymous function so that the associated function handler that the anonymous function calls has access to the event object and its values - e.g. onChange={(event) => functionHandler(event)}, or onChange={(event) => functionHandler(event.target.value)}, or onChange={(event) => functionHandler(otherParams/Values, event.target.value)}

// Lesson #116 Managing State

// Writing variables/functions above/outside of the function component will prevent them from being recreated every time the function component executes/re-renders.

// Lesson #117 Lifting the State Up
