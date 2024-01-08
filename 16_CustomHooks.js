// Section 16: Building Custom React Hooks

// Lesson #220 What are "Custom Hooks"?

// Custom hooks are just regular functions which can contain stateful logic. Build custom hooks to outsource stateful logic into reusable functions. Unlike regular functions, custom hooks can use other React hooks, including other custom hooks. Therefore, they can leverage React state managed with useState or useReducer, and also employ other hooks like useEffect and so on.
//      - With custom hooks, outsource repetitive stateful logic being used in different components, into a custom hook function, which can then be used inside various components of a React app.
//      - Custom hooks must follow the same rules as standard React Hooks.
//              - One reason is because most custom hooks use React Hooks in their logic/code, and React Hooks have specific places they can and cannot be used.

// Lesson #221 Creating a Custom React Hook Function

// Custom hooks MUST start with "use" in their function name - e.g. useHook.
//      - This informs React that it is a Hook, and React will then be able to provide warnings if the Hook is being used incorrectly.

// Lesson #222 Using Custom Hooks

// For every component where the custom hook is used/called, the custom hook is re-executed just like standard React Hooks, and every component instance then receives its own state. It's the stateful logic which is shared between components and each component receives its own piece of state based on that logic.

// Custom Hooks should return the value that components need access to whether that's a string, number, object, array, etc.
//      - Therefore, the value that the Custom Hook returns can be set to a const variable when it is called in a React component - e.g. const counter = useCounter().

// Lesson #223 Configuring Custom Hooks

// Custom Hooks can be configured to accept parameters to make them more configurable and reusable.

// Lesson #228 Using The Custom Hook In More Components

// (The bind method can be used to pre-configure a function/method call. Bind is a default JavaScript method, which can be used on any function object to pre-configure that function execution.
//      - The first argument passed to bind allows for setting the "this" keyword in the "to-be-executed" function, which does not matter in some/many cases. Hence, it can be set to null. The second argument passed to bind will be the first argument received by the "to-be-executed" function - e.g. someFunction.bind(null, functionArgument)
//  - Any subsequent arguments that are received by the "to-be-executed" function can be passed in their respective order, or they will simply be appended to the preconfigured function call???).
