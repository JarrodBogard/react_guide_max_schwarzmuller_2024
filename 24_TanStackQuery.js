// Lesson 389. React Query / TanStack Query: What & Why?

// 1. Tanstack Query is a library that helps with sending HTTP requests and keeping the UI in sync with backend data.
// 2. Tanstack Query can vastly simplify code.
//      a. Tanstack comes with many built-in, and advanced features, which can be useful in complex React apps, where building those features manually could be relatively difficult and challenging.

// 3. Features:
//      a. Caching:
//          i. Fetched data is stored in memory.
//          ii. That data can then be reused when needed.
//                  1. Example: When navigating to a different page and then returning to the previous page, the data does not have to be refetched. Instead, the stored data for that page can be pulled from memory, and behind-the-scenes updated data can be fetched.

// Lesson 390. Installing & Using Tanstack Query - And Seeing Why It's Great!

// 1.Import the useQuery() hook from "@tanstack/react-query" to handle http requests.
//      a. useQuery() is capable of handling fetched data, 'loading' state, errors, caching, etc (e.g. import { useQuery } from "@tanstack/react-query").
//      b. useQuery() requires configuration via the "queryFn" prop to configure the http request.
//          i. useQuery() takes an object as an argument (e.g. useQuery({})).
//          ii. The object in the useQuery function receives different prop values that configure the useQuery for a specific purpose.
//          iii. The object in the useQuery function can access different built-in props to configure the useQuery hook appropriately, depending on the desired result (e.g. fetch data, etc).
//          iiii. The "queryFn" prop is a function that must be configured to send an http request.
//          iiiii. useQuery does not come with built-in fetch request logic (i.e. code) like other libraries (e.g. axios.get(), axios.post(), etc).            1. Custom fetch request logic (e.g. a function) must be provided to the queryFn prop in order to execute a fetch request.
//          iiiiii. However, it does come with built-in logic for managing the request (e.g. handles fetched data, errors, caching, etc).
//          iiiiiii. queryFn should be a function that returns a Promise (i.e. async code) (e.g. fetch request, etc).
//      c. useQuery() has a "queryKey" prop which is used as the identifier for the respective useQuery object.
//          i. Every useQuery fetch request (i.e. queryFn) should have a queryKey.
//          ii. The queryKey value is used by Tanstack to store/cache the data fetched by the queryFn fetch function.
//                  1. The queryKey value is used as an identifier for the cached data.
//                  2. It can be used to retrieve the respective cached data for a given fetch request.
//                  3. This allows multiple components to use the cached data for rendering, instead of refetching the same data.
//                  4. This also allows data to be rendered to the browser quicker since the data is already available.
//          iii. This allows the response data from the request to be used again if the same request is made, instead of refetching the data.
//          i. This "queryKey" identifier is set to an array which allows any chosen value passed into the array to function as the "id" value.
//                  1. The array value is stored by Tanstack as the id of the respective cached data for quick and easy access to that data.
//                  2. Any data type and multiple values can be used as the "id" (e.g. queryKey: ["id1", 1, {id: 1}, [1], etc]).
//          ii. This allows TanStack to access cached data by its respective identifier, instead of requiring a refetch.
//      d. The useQuery hook should be stored in a variable.
//          i. This variable holds the useQuery object that has been configured.
//          i. The queryObject can be destructured.
//              1. The data prop on the queryObject contains the response data from the fetch request.
//              2. The isPending prop shows the current state of the request (i.e. is a request pending or not).
//              3. The isError prop is a boolean value which shows/checks whether an error has occurred.
//                  a. This can only return true if error handling has been implemented by the fetch request.
//              4. The error prop is an error object which contains any errors that were thrown by the fetch request.
//                  b. This will only contain an error if error handling has been implemented by the fetch request and an error occurs.
//      e. In order to access the useQuery objects and other TanStack features in components, the QueryClientProvider component and the QueryClient object must be implemented on the routes that require access to the useQuery object data and TanStack features.
//          i. This is accomplished by wrapping the QueryClientProvider around the React Router RouterProvider and passing a newly instantiated QueryClient object to the client prop on the QueryClientProvider.
//              1. All routes should now have access to the fetched data curated by TanStack via the useQuery() hook and any other features.
//              2. (e.g. const queryObj = useQuery({queryKey: ["id"], queryFn: fetchData}) ).
//              3. (e.g. const queryClient = new QueryClient() -> <QueryClientProvider client={queryClient}><RouterProvider></QueryClientProvider>)
//                  a. The QueryClient is a general configuration object that is required by the QueryClientProvider to configure the React App so that it has access to TanStack objects/features/etc within its components.

// Lesson 391. Understanding & Configuring Query Behaviors - Cache & Stale Data

// 1. TanStack automatically (i.e. behind-the-scenes) caches fetched/response data and keeps track of each response data object via its assigned queryKey value (i.e. identifier).
// 2. Whenever a page is navigated to, the respective useQuery() fetch request for that page is executed and the data is cached and stored with its queryKey identifier.
//      a. If that page is navigated to again at a later time, TanStack checks the queryKey of that useQuery() fetch request for that page.
//          i. If the queryKey of the useQuery() fetch request, for that specific page, matches any of the keys of the cached response data objects, it will automatically return the cached data to the client, instead of waiting on a refetch to return the data.
//          ii. The data is still refetched (i.e. a new fetch request is made) to check for any changes/updates to the response data, but it is not used unless updates have occurred.
//          iii. Summary(a): TanStack caches response data from fetch requests and reuses/returns that data whenever it encounters a useQuery execution with the same queryKey.
//          iiii. Summary(b): TanStack will still execute a refetch for that same fetch request to check for updated data.
//          iiiii. Summary(c): If new/updated data is available TanStack will replace any old data with the updated data.
// 3. Additionally, the useQuery() hook has other props that can be assigned to manage refetch and cache clearing functionalities.
//      a. The staleTime prop allows for controlling when the refetch is executed, if a mathcing key is found in the cached data (i.e. if a matching data object is found in the cache via the queryKey identifier).
//          ii. The value for staleTime can be set to a number, which represents the delay in milliseconds, before the refetch is executed (e.g. staleTime: 5000 -> 5 seconds until refetch is executed).
//                  1. The default value for staleTime is 0.
//          iii. If a component is rendered and a matching data object is found in the cache, and then a re-render occurs before the set staleTime is reached, the refetch will not occur (e.g. staleTime: 5000 -> component is rendered and cached data is found -> staleTime starts countdown for refetch -> component re-render occurs before staleTime countdown finishes -> refetch is cancelled).
//                  1. This ensures no unnecessary requests are sent.
//      a. The gcTime (i.e. garbage collection time) prop allows for controlling when the cached data is cleared from the cache, for a given response data object.
//          i. gcTime controls how long the response data in the cache will be kept/stored before clearing it.
//          ii. The default time is 5 minutes.

// NOTE: Images are fetched and potentially cached by the browser, for SPAs. React and Tanstack are not involved in this task.

// Lesson 392. Dynamic Query Functions & Query Keys

// Passing additional data (e.g. search queries) via useQuery to fetch requests:
// 1. Dynamically create the url in the async fetch function to receive additional data from the request.
//      a. Setup the fetch function to receive an additional argument from the useQuery request (e.g. async function fetchData(searchTerm){}).
//      b. Create a url variable that stores the base url and can be updated as needed (e.g. let url = "http://someUrl.com/home...").
//      c. Use an "if" check to conditionally add the additional query data to the url when it evaluates true.
//          i. NOTE: To add queries onto urls add a question mark (?), followed by any chosen name for the query,  followed by an equal sign, followed by the query value (i.e. the additional query data passed via the useQuery to the fetch function) (e.g. if(searchTerm){url += "?search=" + searchTerm} -> url = http://someUrl.com/home?search=queryValue).
//      d. Set the fetch api call to the url variable (e.g. const response = await fetch(url))
// 2. Add the additional query data to the useQuery queryFn with the help of React hooks (e.g. useState, useRef).
//      a. Wrap the queryFn fetch request in an anonymous function, invoke the fetch request, and pass the query data to the fetch request as an argument.
//          i. Commonly, useState/useRef variables are used to capture input data and that variable (i.e. data) is then submitted to the fetch request function (e.g. queryFn: () => fetchData(queryValue)).
//      b. Dynamically set the queryKey for the queryObject.
//          i. One option is to pass an additional object in the queryKey array and set a key/value pair that references the query data (e.g. queryKey: ["pathname", {someProp: queryValue}]).
//                  1. This allows Tanstack to cache and reuse various response data objects for distinct/different queries, utilizing different keys within the same useQuery hook, with the assistance of the useState/useRef query variable.
//                  2. NOTE: The queryKey does not have to be set a specific way. The above option is just one example. Any type of data could be passed to the array.
// 3. IMPORTANT: Updates/changes to useRef (i.e. refs) do not cause components to re-render.
//      a. useState should be used in conjunction with useRef to provide the proper functionality in these types of use cases (e.g. setState(someRef.current.value)).
//          i. Without useState, the useQuery fetch request would not update and re-execute when input data changes.
//          ii. Most commonly, the input data would be captured with useRef (e.g. inputRef = useRef()) via an input tag within a form.
//          iii. The onSubmit function on the form would pass the captured inputRef value to the useState updating function (e.g. function handleSubmit(e){e.preventDefault() setState(inputRef.current.value)}).
//          iiii. This will capture the input query data once the form has been submitted via the useState hook.
//          iiiii. This applies to both queryKey and queryFn props.

// Lesson 393. The Query Configuration Object & Aborting Requests

// 1. useQuery, via the queryFn fetch request, passes additional data (i.e. data object) to the fetch request function by default.
//      a. Technically, Tanstack is attaching/passing this data to the queryFn fetch request function by default.
//      b. The data is an object which has several key/value pairs.
//      c. The four main keys are meta, queryKey, signal, and getSignal which is a function.
//              i. The signal prop is required for aborting the fetch request when, for example, the requested page is navigated away from before the request is finished executing (e.g. signal: AbortSignal -> aborted: false, onabort: null, reason: undefined).
// 2. Thus, the fetch request function actually receives this TanStack data object and it can be used inside the fetch request for additional functionality.
//      a. Commonly, this object is destructured and the signal prop, and any other props that were attached in addition to the default props, can be extracted (e.g. export const fetchData = async({signal, searchQuery, etc...} => {...fetch code...})).
//          i. The signal can be passed to the fetch() function as a second argument via a configuration object.
//          ii. The configuration object has a signal prop which takes the TanStack signal prop/object, in its default format, as its value.
//          iii. The browser can then use this signal (i.e. AbortSignal) internally to abort the fetch request if necessary.
//          iiii. This implementation ensures the fetch request is aborted if TanStack determines it should be.
//          iiiii. Additionally, whatever variable/prop names are given to the queries that are passed via the queryFn fetch request function must be matched in the fetch request function arguments/parameters (e.g useQuery({queryFn: () => fetchData({queryName})}) -> const fetchData = async({queryName}) => {}).
//                      1. Naming of custom props is important and matters when handling custom props in the fetch request function (i.e. var/prop names must match).
//                      2. IMPORTANT: (The queryFn fetch request function should pass these props via an object??? (e.g. as shown above in previous example)).
//                      3. IMPORTANT: (The fetch request function should then handle them via object destructuing???).
//          iiiiii. The signal can be passed via an object to the fetch request via the anonymous function that is wrapping the queryFn fetch request.
//          iiiiiii. The anonymous function has an object which can access the default data sent by/from Tanstack, which can be used to extract the signal and pass it to the fetch request (e.g. queryFn: ({signal}) => fetchData({signal, queryName})).
// 3. Summary: Wrap the queryFn fetch request with an anonymous function to pass any data to the fetch request via an object.
//      a. When implemented, the anonymous function wrapper is what Tanstack is executing, from the queryFn prop, when the useQuery hook is executed for a given queryObj (i.e. useQuery obj).
//      a. Custom data (e.g. query values, etc) and default data from TanStack (e.g. meta, signal, queryKey, etc.) can be configured and sent together to the fetch request function via the queryFn prop (e.g. queryFn: ({signal}) => fetchData({signal, queryName})).
//      b. Alternatively, if the Tanstack default data object does not require any configuration, send the fetch request directly without the anonymous function wrapper.

// Lesson 394. Enabled & Disabled Queries
