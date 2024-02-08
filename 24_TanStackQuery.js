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
//      a. User/client input data/queries (e.g. query values, etc) and default data from TanStack (e.g. meta, signal, queryKey, etc.) can be configured and sent together to the fetch request function via the queryFn prop (e.g. queryFn: ({signal}) => fetchData({signal, queryName})).
//          i. Note that the signal object in the above example is accessed by the anonymous function and then passes as an argument to the fetch request function.
//      b. Alternatively, if the Tanstack default data object does not require any configuration for a given useQuery hook, send the fetch request directly without the anonymous function wrapper.

// Lesson 394. Enabled & Disabled Queries

// 1. queryFn has a prop for preventing/disabling useQuery() from executing, and thus, preventing the initial fetch request on queryFn, when a page is navigated to.
//      a. The enabled prop is set to true by default, which means the useQuery will be executed by default, and the initial fetch request will be executed as well.
//          i. This prop can be set to false to prevent a given useQuery() from executing and fetching.
//          ii. Ideally, this value should be based on a conditional value (e.g. enabled: someValue !== undefined).
//                  1. In the above example, if someValue is undefined then the enabled prop will be set to false, and thus, the queryFn will not execute the fetch request.
//                  2. However, if someValue is any value other than undefined, it will return true and execute the queryFn and the associated fetch request.
// 2. isLoading is another prop on the queryObject returned by useQuery().
//      a. isLoading is different from isPending in that isPending evaluates true whenever no response data has been returned by the queryObject (i.e. anytime the object has not returned a data object from the queryFn fetch request (e.g. if the useQuery/queryFn is disabled the queryObject will be pending indefinitely and therefore isPending will evalute true, until it is enabled and returns a response data object)).
//      b. isLoading only evaluates true when a fetch request on the queryFn has been executed and the useQuery() is waiting for response data to be returned (i.e. It will not evaluate true indefinitely, only when data is being actively fetched (e.g. if the useQuery/queryFn is disabled the queryObject will not be loading and therefore isLoading will evaluate false, until the queryFn is enabled and executes a fetch request)).

// Lesson 395. Changing Data with Mutations

// 1. useQuery should only used for GET requests.
// 2. useMutation should be used for all other requests.
//      a. useQuery can be used for other types of requests, but the useMutation() hook is optimized for those requests.
//          i. One such optimization is that useQuery is enabled by default (i.e. executes on navigation or page render), whereas useMutation is only enabled when invocation is requested (e.g. when a form is submitted).
//      b. useMutation() takes a configuration object with props, similar to useQuery().
//          i. The difference is that, instead of queryKey, queryFn, etc, it takes mutationKey, mutationFn, etc.
//          ii. Typically, since useMutation is used for "POST/PUT/PATCH/DELETE" requests, the response data does not need to be cached client-side.
//                  1. This is because its main purpose is to update/change (i.e. mutate) the backend with new data.
//          iii. Therefore, the data prop on the returned mutationObject, and the mutationKey on the configuration object are not required and do not need to be set.
//          iiii. The mutationFn should be set to the appropriate custom fetch request imported from a different file (i.e. "../../util/http.js").
//          iiiii. Once the mutationFn is set correctly, the return value of the useMutation() can be set to a destructured object.
//          iiiiii. From there, the mutate prop should be extracted (i.e. the useMutation() returns an object when invoked and this mutation object that is returned can be destructured, and the necessary props can be extracted (e.g. const {mutate} = useMutation({mutationFn: fetchRequest})).
//          iiiiiii. The mutate prop (i.e. function) on the mutationObject can be applied within the component where needed to execute the appropriate fetch request, when it is invoked.
//          iiiiiiii. Mutate is the function on useMutation() that optimizes the fetch requests for better control over non-GET requests.
//                      1a. Instead of being enabled and invoked on render/navigation, useMutation, with help of the mutate function on the returned mutationObject, allows the mutationFn fetch request to only be executed as needed.
//                      1b. Alt definition: Instead of being enabled and invoked on render/navigation, the mutationFn fetch request is only executed as needed via the mutate function.
//          iiiiiiiii. The user/client input data can be passed to the mutate function and configured as needed (e.g. mutate({someProp: inputData}))
//          iiiiiiiiii. The fetch request function receives the input data passed to the mutate function in the format/configuration in which it is sent by the mutate function.
//          iiiiiiiiiii. The mutationObject, like the queryObject, has isPending, isError, and error props, as well as many others.
//                          1. These can be used to render components differently depending on the state of the fetch request.

// Lesson 397. Acting on Mutation Success & Invalidating Queries

// 1. Simply implementing useNavigate, following a mutate() fetch request (e.g. executing a POST request), is not good practice.
//      a. This would result in navigation to a given page/component regardless of the success of the fetch request (i.e. it will cause navigation to occur even if there is a fetch request error).
//          i. Additionally, it would not initiate a refetch for any data that was added to the navigated page by the POST/PUT/PATCH/DELETE request (i.e. the page that is navigated to would not include/reflect any updates/changes to its rendered data, because the useQuery fetch request would not be re-executed).
// 2. The onSuccess prop on the useMutation hook should be implemented.
//      a. The onSuccess prop is a method which checks if the mutationFn fetch request was successful before executing.
//          i. The onSuccess prop receives an anonymous function.
//          ii. Any code (e.g. navigation, refetches/updates, etc) should be added inside this function.
//              1. This code will not execute until the onSuccess prop confirms the fetch request has been executed successfully.
//          iii. Commonly, navigation and invalidation logic/code should be included in the onSuccess function.
//                  1. The navigation is typically added via the useNavigate() hook provided by React Router.
//                  2. Invalidation logic is code which informs TanStack that its currently cached response data object for a given fetch request is outdated, due to an update/change, and that the cached response data should be updated by initiating a refetch to reflect those changes and update the respective page/component, which renders that data to the UI.
//          iiii. The invalidation code is provided via the invalidation method found on the queryClient object (i.e. the instantiated QueryClient passed to the QueryClientProvider on the client prop (i.e. const queryClient = new QueryClient() -> <QueryClientProvider client={queryClient} />... ).
//                  1. The queryClient var should be placed in a separate file to allow it to be used in both the file which manages the QueryClientProvider and any files which require the invalidation method to be executed in their respective fetch request.
//          iiiii. The invalidation method is called invalidateQueries() and is a prop on the queryClient (e.g. queryClient.invalidateQueries()).
//                  1. To target the specific queries that should be invalidated, the invalidateQueries() method takes an object.
//                  2. The queryKey(s) for the specific query/queries that require invalidation should be included within the object using the same syntax as the queryKey prop on useQuery (i.e. using prop name queryKey followed by an array containing the queryKey value) (e.g. queryClient.invalidateQueries({queryKey: ["someKey"]})).
//                  3. IMPORTANT: The invalidation will apply to all queries that contain/include the queryKey value passed into the array to the invalidateQueries() method (i.e. if two or more queryKey values start with the same key name, even if additional key naming values exist, they will all be invalidated) (e.g. queryKey: ["someValue"] will invalidate ["someValue"], ["someValue" {someProp: someValue}], ["someValue", "someOtherValue"], etc.)
//                      a. Any query with a queryKey containing the same base value will be invalidated and refetched when the page implementing that given query is navigated to.
//                      b. An exact property can be added to the invalidateQueries() object and set to true.
//                          i. This would change the default functionality and only invalidate the query with the queryKey that has the specific key value included in the queryKey array passed to the invalidateQueries() method (e.g. queryClient.invalidateQueries({queryKey: ["someValue"], exact: true}) -> only the query with a queryKey value of "someValue" will be invalidated).

// Lesson 399. A Challenge! The Solution

// Lesson 400. Disabling Automatic Refetching After Invalidations

// 1. The refetchType prop on queryClient.invalidateQueries() configuration object should be included and set to "none" for DELETE requests (e.g. queryClient.invalidateQueries({queryKey: ["events"], refetchType: "none"}) ).
//      a. This will prevent the invalidated queries from refetching immediately.
//      b. Instead, they will only be refetched when they are required/needed (i.e. when their respective pages are navigated to again).
//      c. This prevents fetch errors from occurring for items that are being deleted by a mutate function, since they no longer exist after deletion and cannot be fetched.

// Lesson 404. Optimistic Updating

// 1. Optimistic updates change/mutate/update the UI immediately, without waiting for a response from the backend server.
//      a. This is accomplished by using the cached data to make the updates, instead of waiting on the updated response data from the backend server.
//          i. The updates/changes are applied to the data cache (i.e. the respective cached data object for a given query/mutation) and applied to the UI for a faster (i.e. instant) client-side update.
// 2. If the update (i.e. request) to the backend fails (i.e. the client-side request produces a server error instead of an update to the response data), the optimistic updates to the UI can be "rolled back" to the previous data that was being displayed (i.e. the previous state of the UI can be restored with the old data in the cache).
//      a. That is, the optimistic update that is made to the UI and cached data, instantly, can be undone, and the previously cached data (i.e. old data) can be restored and applied to the UI.
//      b. This keeps the cached data, and subsequently the UI, in sync with the backend (i.e. server/database).
// 3. This is implemented via the help of 3 additional props on the useMutation hook:
//      a. 1) onMutate receives an anonymous function that is executed when the mutate function (i.e. non-GET request function) is executed within a component.
//          i. Importantly, onMutate executes before the mutate function - which sends a request to the backend - has completed execution and produced a response data object from the backend request to the client-side (i.e. onMutate is called at the same time as mutate, but it finishes execution before mutate, because mutate must wait on the fetch request to complete and receive the response data from the backend so that it can return a response data object to the client via the mutationObject).
//          ii. ALT DEFINITION: The onMutate function executes when the mutate function is executed. However, the mutate function must wait on the response from the backend end before providing the client with updated response data. The onMutate does not have to wait on a fetch request response, and thus completes execution before mutate does, which is what allows it to perform optimistic updating.
//          iii. onMutate is the function that updates the cached data to the latest changes and provides instant feedback to the client/UI, without needing to wait on updated response data from the backend.
//          iiii. The queryClient object is used in the onMutate function to select the proper cached data object - via the queryKey - and mutate that cached data to reflect the new updates/changes (e.g. queryClient.setQueryData(["someQueryKey"], newData)).
//                  1. Note that setQueryData takes two arguments: 1) The queryKey of the respective cached data object to be updated, and 2) the updated/mutated data object to replace it with.
//          iiiii. The onMutate function can access the updated data being submitted by the mutate function by receiving the data object as an argument (i.e. TanStack passes the updated data being submitted by the mutate function to the onMutate function as an argument, which can be accessed and used to update the currently cached data (e.g. onMutate: (newDataObj) => { const newItem = newDataObj.item}).
//          iiiiii. It is important to cancel all active queries for the specific cache data that is being updated.
//                      1. This is accomplished via the queryClient cancelQueries method (e.g. queryClient.cancelQueries({queryKey: ["someQueryKey", params.id]})).
//                      2. This ensures any outgoing queries - for the respective queryKey passed to the cancelQueries method - are cancelled.
//                      3. Cancelling the outgoing queries will prevent clashes between query response data and the optimistically updated cache data (i.e. it prevents the backend and frontend data from falling out of sync).
//                      4. IMPORTANT: The cancelQueries method does not cancel useMutation queries, only useQuery (i.e. GET request) queries.
//                      5. cancelQueries should be awaited via async/await syntax, because it returns a promise.
//          iiiiiii. To permit rollbacks, for when fetch requests to the backend fail, the currently cached data should be stored in a variable (e.g. const prevData = queryClient.getQueryData(["someQueryKey"])).
//                      1. This should be done before the update/mutation is made to the cached data in the onMutate function (i.e. before the queryClient.setQueryData()).
//      b. 2) onError handles the rollback when fetch request errors occur on the backend.
//          i. onError is an anonymous function which receives several arguments.
//              1. These arguments provide access to the error, mutation/update data, and the context (e.g. onError: (error, data, context) => {}).
//          ii. The context object/argument can contain the previously cached data when the onMutate function returns it as a value stored in an object (e.g. onMutate: .... return { prevData }).
//          iii. This is because the context object is actually the return object of the onMutate function.
//              1. The context param of the onError function will have access to anything passed in the onMutate return object, because the context param is (essentially???) the onMutate return object.
//              2. The queryClient setQueryData method is used to retrieve and set the previous cached data value for the rollback value (i.e. queryClient.setQueryData(["someQueryKey"], context.prevData))
//              3. Thus, if a mutation fails (i.e. if an error occurs on the fetch request for an update), the optimistic update will be rolled back to this previous data value that was stored via the getQueryData method, in the onMutate function, and then set via the setQueryData method, in the onError function.
//      c. onSettled is the last prop that should be added to the useMutation query for optimistic updates.
//          i. onSettled is an anonymous function which executes once a mutation is complete, regardless of whether the fetch request was successful or not.
//          ii. It simply runs the queryClient invalidateQueries method to ensure that the cache data is in sync with the backend data/database (e.g. queryClient.invalidateQueries({queryKey: "someQueryKey"})).
//              1. The backend data is retrieved to ensure the frontend is in sync with the backend data regarless of what occurs during the mutation.

// Lesson 405. Using the Query Key As Query Function Input

// 1. The queryKey is accessible inside of the queryFn.
//      a. Tanstack passes an object to the queryFn which contains props such as signal and queryKey.
//      b. The queryKey is an array with 1 or more elements stored as the key for a given query.
//          i. Therefore, any queryKey elements can be accessed and passed to the fetch request function wrapped by the queryFn anonymous function (e.g. queryFn: ({signal, queryKey}) => fetchData({signal, queryKey[1]}))
//              1. If the element in the queryKey array is an object, the spread operator can be used to access the element correctly and pass it to the fetch request function (e.g. fetchData({signal, ...queryKey[1]})).

// Lesson 406. React Query & React Router

// 1. The loader and action functions for React Router can access and use the Tanstack queryClient object to perform fetch requests.
//      a. The fetchQuery method on the queryClient object can be used to run GET fetch requests queryClient.fetchQuery({...code...}).
//          i. fetchQuery receives the same configuration object as useQuery.
//          ii. The queryClient.fetchQuery({...}) should be returned by the loader (e.g. return queryClient.fetchQuery({...})).
//          iii. REMEMBER: loaders/actions cannot use hooks because they are regular js functions.
//                  1. They can access the request and params via the request and params objects (e.g. export const loader = ({request, params}) => {})
//      b. TanStack queries can be used in conjunction with React Router loaders/actions. TanStack will still execute refetches and cache data.
//          i. The cached data will be used on re-renders.
//      c. React Router loading and error handling can be used in place of TanStack's.
//      d. For actions, fetchQuery is not required, because the useMutation query is just a wrapper used to wrap a non-GET request and execute in a component where needed.
//          i. Therefore, the non-GET request can simply be invoked inside the action function.
//              1. The fetch request invocation returns a promise which must be awaited (e.g. await fetchData(args...))
//          ii. REMEMBER: formData can be extracted from the request object - provided by the React Router Form component - by accessing the request object formData() method and storing the returned value in a variable (e.g. const formData = await request.formData()).
//              1. This value must be awaited as it returns a promise, as shown in the above example.
//          iii. The formData variable can then be passed to the Object.fromEntries() method to transform the complex formData object into a simple key/value pair object.
//              1. The returned key/value object can be stored in a new variable (e.g. const newFormData = Object.fromEntries(formData))
//              2. The new variable, with the transformed formData, can then be passed to the appropriate fetch request (e.g. await fetchRequest(newFormData)).
//                      a. NOTE: This fetch request execution will return a promise, which must be awaited, as shown in the example above.
//          iiii. The related queries should be invalidated as they were in the useMuation queries (e.g. await queryClient.invalidateQueries(["someQueryKey"])).
//                      1. This should be awaited as it returns a promise.
//          iiiii. Finally, the action function should return an appropriate redirect().
//          iiiiii. The submit function provided by the useSubmit() hook - from React Router - should be used in the appropriate submit handler function to call/invoke the action function, when/where it is needed in the component.
//                      a. The submit function requires two arguments: 1) the data (i.e. form data) to be submitted to the fetch request via the action function, and 2) the method (i.e. POST/PUT/PATCH) (e.g. const submitHandler = (formData) => {submit(formData, {method: "PUT"})} ).
//                          i. For actions, the method must be set to anything other than GET.
//                          ii. Note that the method is stored as a second argument in an object, which could also include an action path, if needed.

// 2. The useNavigation hook - from React Router - can be used to monitor the state of the loader and action functions to conditionally render components (e.g. const {state} = useNavigation() -> if(state === "submitting"){return ( <p>Submitting data...</p> )}).
// 3. The progress tag is a standard HTML element.
// 4. useIsFetching is another hook provided by TanStack.
//      a. It tracks whether TanStack is currently fetching data anywhere in the application(, wherever TanStack queries are being applied/used???).
//          i. useIsFetching can be invoked and stored in a variable (e.g. const fetching = useIsFetching()).
//          ii. useIsFetching returns 0 if TanStack is not currently fetching any data, and a higher number if it is fetching data.

// 5. When setting the staleTime prop on the useQuery hook, cached data is used for rendering, without refetching the data, if the data is less "old" than the staleTime timer amount (e.g. staleTime: 10000 -> if data is less than 10 seconds old it will not refetch.)
//      a. The staleTime timer is reset on each re-render.
