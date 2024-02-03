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
//          i. The "queryFn" prop is a function that must be configured to send an http request.
//          ii. useQuery does not come with built-in fetch request logic (i.e. code) like other libraries (e.g. axios.get(), axios.post(), etc).            1. Custom fetch request logic (e.g. a function) must be provided to the queryFn prop in order to execute a fetch request.
//          iii. However, it does come with built-in logic for managing the request (e.g. handles fetched data, errors, caching, etc).
//          iiii. queryFn should be a function that returns a Promise (i.e. async code) (e.g. fetch request, etc).
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
