// Section 18: Practice Project: Adding Http & Forms To The Food Order App

// Lesson #249 Fetching Meals via Http

// Fetch returns a promise since sending a HTTP request is an asynchronous task.

// NOTE: The function passed to useEffect should not return a promise. However, the function passed may return a cleanup function, which runs synchronously - the useEffect function CANNOT be turned into an async function/promise.
//      - Therefore, to use async/await, simply create a new nested function within the useEffect function and store it in a variable, place the fetch data/code inside of the nested function, and then execute the nested function as part of the useEffect.
//              - By doing it that way, the nested "fetch" function can be executed with async/await. Alternatively, use the "then" promise on the "fetch" method without having to create a nested function.

// IMPORTANT: Within an async function, any method/function which returns a promise requires the "await" keyword in front of it - i.e. const fetchData = async () => {const response = await fetch("url") const data = await response.json()}

// The function passed to useEffect should not return a promise. Instead, the function passed to useEffect may return a cleanup function which can be executed. The cleanup function should run synchronously. It should not return a promise or anything asynchronous. Therefore, the function which is passed to useEffect must not be turned into an async function. Instead, if an async function is to be used within useEffect, create it as an inner nested function within the useEffect function and call/invoke that nested function at the end of the useEffect statement (as part of the useEffect function).

// IMPORTANT: The useEffect function cannot be turned into an async function. If async/await is required within the useEffect to fetch some data when a component is rendered, create a nested async/await function within the useEffect function and invoke it at the end of the useEffect.

// Lesson 394. Handling Errors

// Errors associated with try/catch blocks are contained within an error object. The error object is found on the catch portion of the try/catch block. The error object has a property named message (error.message), which stores any error messages that are thrown. This functionality specifically applies to errors that are created using the "Error" constructor used with the "throw new Error" command.

// IMPORTANT: When running http requests inside a useEffect hook, be careful when using try-catch blocks to manage nested async functions inside of the useEffect. Async/await functions always return a promise. If an error is thrown within the promise, that error will cause that promise to reject. This means the try/catch block can't be used to handle the error unless the try/catch is converted to async/await on the nested function call/invocation, but that would require turning the useEffect function into an asynchronous function (async/await), which cannot be done.
// One solution involves putting the error handling into a separate async/await function, just like the http request, which is called/invoked separately in the useEffect, so that there are separate functions, one for sending/receiving http requests/responses and one for error handling.
// The other option, since the nested async function returns a promise, is a "then" or "catch" method added on to the async function call (e.g. asyncFunc().then().catch()). Since its returning a promise, add "then" to handle success cases when the promise fulfills successfully, and add "catch" to handle errors arising within the promise. This is the traditional "promise only" way of handling an error inside of a promise.

// Lesson 395. Adding A Checkout Form
// When dealing with multiple buttons in a single form, apply the "type='button'" to the buttons that should not be responsible for the form submission.

// The function form of the useState state setting/updating function does not need to be implemented when the intention is to override the entire previous/initial state with new data.
