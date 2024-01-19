// Lesson 443. Routing: Multiple Pages in Single-Page Applications

// Routing is about having different URL paths load different content on the screen/browser.

// Traditionally, routing would be implemented by simply loading different content via different HTML files with different paths, and that is how a multi-page application would be built, without ReactJS. This approach offers different content for different paths, but the disadvantage is that for each page the content would need to be fetched with an http request. A new http request is sent and a new response is received, which breaks the user flow. It can also introduce lag and slow down the website. It can therefore lead to a suboptimal user experience.

// Single page applications (SPAs) allow for building more complex UIs. With SPAs, send only one initial HTML request. Then, this HTML file, with a bunch of extra JavaScript code (JSX in React), is downloaded, and thereafter the extra JavaScript (JSX) code that runs on the front-end client will adjust/handle what content the user sees on the screen/browser/UI. This is what React does very efficiently.

// To maintain routing in SPAs, add client-side React code that tracks the currently active URL and whenever the URL changes it triggers different content to be dsipalyed on the screen/browser based on that URL change. Instead of loading new HTML files from the backend, add some client-side code that simply watches the URL and then loads a different React component when that URL changes. With that, it is still an SPA, but nonetheless supports different URLs, and therefore routing.
//      - Alt definition: A URL change triggers a content change without actually changing pages or sending a new http request avoiding lag time. It simply "appears" as if the page has changed even though it has not. Only the content being displayed has changed. No new HTML files have been fetched.
//              - Load different content based solely on path changes using React Router.

// Lesson 444. Project Setup & Installing React Router

// The react-router-dom package is part of the React Router tool. It's a library that provides functionality for listening for URL changes in a React app and then changing the UI to display different content based on the URL changes.

// The first step after downloading the library is to define which URLs (routes/paths) are to be supported by the router, and also which components should be loaded for different paths.

// The second step is to activate the router and load the route definitions that have been defined in the first step.

// The third step is to ensure that all components linked to a route/path are built appropriately, which includes providing some means of navigating between the routed pages so that users can move smoothly between the different pages.

// Lesson 445. Defining Routes

// Routes are path/component mappings, i.e. which path links to which component.
// The createBrowserRouter function is a function provided by react-router-dom that allows for defining routes in an app.
//      - this function receives an array of route definition objects. Every object represents one route, i.e. createBrowserRouter([{},{},{},etc]).
//              - add properties to each object to define the route characteristics, i.e. the path name.
//              - the first prop is the path, i.e. path name.
//                      - the path name follows the domain name. "/" is a path name.
//              - the second prop is the element, which specifies which component should be loaded when the router navigates to the associated path. The component should be provided in JSX syntax, i.e. element: <Component />
//              - it is common practice to place all components associated/linked to routes/paths in a separate "pages" folder to differentiate them from other components.
//              - the JSX code provided to the element prop could be any type of JSX element, but typically it is a react component, as shown above.

// createBrowserRouter example: createBrowserRouter([{path: "/", element: <Component />}])

// The returned value of createBrowserRouter() should be stored in a variable, typically named "router".
//      - i.e. const router = createBrowserRouter([{path: "/", element: <Component />}])
// This router variable is used to tell the React app that the defined router should be loaded and thus should render the appropriate pages to the screen/browser.

// The RouterProvider component from the react-router-dom is needed to implement/activate the router. The RouterProvider component can be used/called just like any other JSX component. The RouterProvider has a special router prop that the router variable is passed to, <RouterProvider router={router} />.
//      Alt defintion: The router variable, which stores the paths/routes object, is then passed to the Provider as a prop. The router variable must be passed to the router prop (exact name).
//      - With this, the router is now being rendered/activated to the React app, and thus the UI/browser, via the RouterProvider component. Thus, the router will then track the url, check what the currently active path is, and load the appropriate element/component if the currently active path is supported by the router.

// Lesson 447. Exploring an Alternative Way of Defining Routes

// Lesson 448. Navigating between Pages with Links

// Using anchor tags to navigate between the routed pages is possible, but not suitable for SPAs. This causes the browser to refresh and defeats the purpose of the SPA. The idea is to navigate to different URLs (pages) without refreshing the content on the screen/UI.
//      - This refresh occurs because technically a new request is being sent to the server that is serving the website, i.e. the server will serve back that single HTML page that makes up the SPA, but it will also load all the JavaScript code again, load the entire React application again, and restart the React application. That's a lot of unnecessary work under the hood that can impact performance.
//      - this would also cause loss of any component or app-wide state.
//      - Switching the page by sending a new request is not the way to switch between pages with React/React Router apps.

// The Link component is used instead of the default anchor tag for links in React/React Router apps. Link is another special component that can be imported from react-router-dom.
//      - the 'to' attribute is used in place of the 'href' attribute. The path is assigned to the 'to' attribute.
// What the Link component does, under the hood, is renders/generates an anchor tag/element and then listens for click events on that element, prevents the browser default of sending an http request if the link is clicked, and instead, evaluates the available route definitions provided by the RouterProvider to update the page accordingly and load the appropriate content. It will also change the URL but without sending a new http request. All of these tasks are completed by the Link component without refreshing the page (sending an http request).

// Lesson 449. Layouts & Nested Routes

// Link components must be used inside of the RouterProvider to work properly. Otherwise, the RouterProvider is not aware of the link/path within the Link component and cannot update to the appropriate page/url when a link is clicked inside the Link component.

// To provide access to all/some routes in a router list efficiently, use a root route which acts as a wrapper around the other links/routes, inside the router.
// Implementation steps:
//  1. Create another route (root route) in the router's route defintions with a "path" prop of "/" as a value.
//  2. The "element" prop will store the "layout" wrapper component, that will wrap the other routes, as a value.
//          2a. Create the root route wrapper component.
//          2b. Import and store the root wrapper component in the "element" prop of the route defintion object.
// 3. Create a "children" prop on the root route definition object with an empty array as its value.
//      3a. Choose which other route definition objects (links/routes), within the router, to place inside of the array on the "children" prop. These nested "child" route components are now wrapped by the root route component and thus their accessibility is managed by the root route component setup/layout.
//      3b. The root route defintion acts as a parent route to the nested route defintions, and thus, the root route component determines where the child route components are to be rendered, i.e. the root component is a wrapper for the child components, and therefore manages where the child components are rendered in the application.
// 4. Import the "Outlet" component from "react-router-dom" inside the root route component.
//          4a. Use the "Outlet" component to decide/determine where the "child" routes are rendered in the app. The "Outlet" component essentialy contains/stores the child route component links (route definitions). When clicked, they will navigate to the associated component ("page").
//                  - Commonly, the "Outlet" component is placed in a parent div below a "Navigation" component as a type of header navbar, e.g. return <div><Navigation /><Outlet /></div>

// Different root routes, with different root route components, can be created in a given router. Conditional 'auth' checks can then be used to determine which root route should be used for a given user/account/etc. These are considered path-dependent layout wrappers.

// Lesson 450. Showing Error Pages with errorElement

// The react-router-dom package has an error element property (errorElement), that can be added to route definitions, to define which page should be loaded if an error is created/occurs.

// When a URL is entered that doesn't exist, the react-router-dom package will generate an error, and that error will automatically bubble up to the root route definition.
//      - Therefore, add the errorElement prop to the root route defintion, and store an ErrorPage component as its value in case a URL (path) error occurs.
//              - An error will be generated automatically by the react-router-dom package if a page is visited that doesn't exist.

// Lesson 451. Working with Navigation Links (NavLink)

// To support links (anchor tags) that should show whether they led to the currently active page or not, react-router-dom has an alternative to the Link component, the NavLink component.

// NavLink is used just like Link. It can be used as a replacement for Link, but NavLink has one special behavior. If a className prop is added to it, it's actually different than the regular className prop, which takes a string/object/expression. Instead, it's a prop that takes a function, and that function should/will return the CSS class name that should be added to the anchor tag (NavLink).
//      - The className prop function also automatically receives an object from which an 'isActive' property can be destructured. This object with the 'isActive' property is provided by react-router-dom, and the 'isActive' property stores a boolean value that evalutes 'true' if the link/route is currently active, or 'false' if it is not the currently active link/route. This boolean can be used to conditionally render CSS classes. The inline style prop is also supported by NavLink in the same way. This means that the same function form that works for the className prop also works on the styles prop, for NavLink components, so the 'isActive' boolean value can be used on inline styles when using NavLink components.

// By default, the 'isActive' prop, on the NavLink component in react-router-dom, actually checks whether the path of the currently active route starts with the path of any of the NavLinks (the path specified by it's 'to' prop). The NavLink is considered to be active if the currently active route starts with the path set on the NavLink (link/route), e.g. if the currently active link is www.URL.com/about and there is a NavLink - such as the home page - which has a path ('to' prop) set to "/", it will consider the home page to be active as well as the about page.
//      - This behavior exists so that a link could be treated as active even if the active route is actually a nested child route. That can be useful, but for the home/root page route/link, which starts with, and only has, a path of forward-slash ("/"), it is not useful, because every other route/link starts with a forward-slash ("/") as well. This means that the home/root NavLink would always be considered active, even if it is not. That's why react-router-dom includes another prop on the NavLink component, the 'end' prop, which stores a boolean value (true/false). Setting the 'end' prop to 'true' for a NavLink indicates to react-router-dom/react that that specific Navlink should only be considered active if the currently active route ends with that specific NavLink's path (the path specified by it's 'to' prop) after the URL. For the home/root path/link/page ("/"), it will only be considered active if the domain (URL) is followed by a forward-slash and nothing else. The 'end' prop can be used as needed to prevent certain links from evaluating as active when they in fact are not, or atleast not directly.

// Lesson 452. Navigating Programmatically

// react-router-dom provides another function for navigating imperatively/programmatically by importing the useNavigate hook into a component. The useNavigate hook is executed in a functional component. The return value is a navigate function, which should be stored in a variable. The navigate function can be called inside of eventListeners, etc, to trigger a navigation action - switch to a different route from inside the app code based on an action/event (programmatically).
//      - This type of navigation, for moving to a different page/path in react, is considered programmatic imperative navigation, e.g. form submission, timer expiration, etc.

// Lesson 453. Defining & Using Dynamic Routes

// react-router-dom supports dynamic path segments/dynamic path parameters. Add a parameter to a path - a dynamic path segment - by adding a colon and then a chosen identifier such as id, e.g. url.com/products/:id. The colon is very important. This colon signals to react-router-dom that this part of the path is dynamic. This is so that any value passed to the dynamic path segment will be dynamically placed - encoded into the path - where the placeholder identifier was assigned - via the colon - in the url path. There could be hard coded segments that follow the dynamic portion, if necessary, but the "/:id" segment is dynamic. Any value can be inserted into the dynamic id placeholder following the colon. The placeholder id data could be used to reach out to a backend API and a database to fetch the data for that specific item and display it on the screen. That is a common scenario.

// react-router-dom provides a tool for retreiving the dynamic path value from the dynamic path segment that is setup using an identifier placeholder (following a colon), the useParams hook. This hook returns a params object. This params object is a simple JavaScript object which contains every dynamic path segment defined in the route definitions, as a property, e.g. .../product/:id -> id. The part after the colon, which is the identifier, can be accessed as a property on the params object to retreive the dynamic path value, e.g. const params = useParams() -> params.id will return the dynamic path segment value of .../:id. This is how the dynamic path identifier data, that's encoded in the url path, is retreived. Typically, ids are encoded in a url so that they can be used to make a fetch request to a backend and retreive a specified item's data.

// Lesson 455. Understanding Relative & Absolute Paths

// Absolute paths START with a slash - these leading forward slashes always come after the domain name (URL), e.g. www.domain.com/, www.domain.com/app .If a path starts with a slash, it is an absolute path. Clashing route definitions result when a parent routes path starts with a different absolute path than the child route paths, e.g. parent route path ("/root"), child route paths ("/"), ("/about"), (/product), etc. The nested child route paths don't start with the same absolute path as the parent route.
//      - Absolute paths have a leading forward slash, relative paths do not, e.g. absolute (...com/product), relative (...product/....)
//              - Relative paths do not have a leading forward slash coming before them
// A relative path simply means that these paths are appended after the path of the wrapper parent route, i.e. if a child route has a relative path, then React Router will evaluate the parent route path and append the child path after the parent path, e.g. parent path ("/"), child path ("product/:id"), resulting path ("/product/:id").
// If the desired result is to have child routes appended to a wrapper parent route, then leave the children route paths relative and the parent route path absolute, i.e. parent path ("/"), children paths ("products"), (products/:id), ("about"), resulting paths ("/products"), ("/products/:id"), ("/about").
//                      - It is customary to have an absolute parent path ("/") with relative child paths.
// IMPORTANT: An absolute path is added directly after the domain name and not after the currently active path. By default, relative paths will be added after the currently active route's path. If a link with an absolute path is clicked, the currently active path will be switched to the absolute path. If a link with a relative path is clicked, the relative path will be added to the end of the currently active path, instead of replacing like the absolute path would.

// When using the Link component, there is a 'relative' prop, that can be added and set to either "route" or "path". This prop controls whether the Link component path segment ('to' prop) is added relative to the defined parent absolute path of a given child path, or to the currently active path in the URL. If the 'relative' prop is set to "path", React Router will evaluate the currently active path in the URL and simply remove one segment from that path. The 'relative' prop only works for relative path Link components, e.g. if the Link component "to" prop (path) is set to ".." (meaning go back one path segment), but the parent absolute path of the Link child path is set to something different then the currently active URL path, clicking the Link will cause the currently active URL path to switch to the parent absolute path segment and then add the child path. However, with the 'relative' prop on the Link component set to 'path' it will only remove one path segment from the currently active URL path and add the child path. The relative prop is useful when a Link needs to go back a single path segment and the absolute paths for the relative child Link component are different than the sibling component it needs to go back to. This scenario may be uncommon but if it does arise then this is a solution for that issue.

// Lesson 456. Working with Index Routes

//  The route defintions, defined/created in the createBrowserRouter function, have the option for a special 'index' prop. Adding the 'index' prop and setting its value to "true" will make that route the default route when the parent path is active, i.e. The 'index' prop, on the route defintions, allows for defining the default route that should be loaded if the parent route's path is active. Often, such a default route is useful. This is an alternative to adding an empty path ("") for the default (home) route, i.e. This is typically used for a single route, the home page, of a website/application. This route is also known as the "index" route.

// Lesson 459. Time to Practice: Solution

// The order of route defintions can be deterministic depending on the path names of the routes and if any path name clashes exist within the route definitions array. However, React Router is quite intuitive and normally this is not an issue in most situations.

// A hard-coded path segment can follow a dynamic path segment, e.g. /products/:productId/edit

// Links to the home page of an app/website should always have an abolute path of "/" because they should always take the user back to the home/root page, instead of a relative path that would just be adding the link's path to the end of the currently active path in the URL. This should be applied to any page links that require an absolute path to ensure navigation to the appropriate page (URL). These page links will typically be the ones that are listed in the header/navigation bar.

// React Router provides a useParam function. The useParam function returns properties of the URL parameters. These param property names are determined by the naming of the path identifier following the ":" for a given route definition, i.e. path: "/products/:id" -> const params = useParams() -> params.id would return the respective values of the "id" path identifier, which follows the colon in the path of the route definition, e.g. "/products/3" -> params.id would return 3 as its value because that is the current value/path of the URL param "id" path identifier.

// Lesson 460. Data Fetching with a loader()

// With React Router, version six or higher, all the fetch requests and associated error/loading state can be handled by the react-router-dom via another route definition prop. To implement this, add the "loader" property to the route definition of a given route/page. The "loader' prop is a property that takes a function as a value, and this function will be executed by React Router prior to the route/page being visited. Just before the route - more specifically, the JSX code (component) the route path is pointing to - is rendered, the loader prop function will be triggered and executed by React Router.
//      - It's in this loader function where fetch data can be handled and loaded. When defining a loader function, React Router will automatically take any value returned via that function, for example, the response data, and will make that data available in that page that's being rendered as well as any other components where that data is needed. By returning specific data on the response object via dot notation, the specified data is made available to the given page and any other components that need the data.

// Lesson 461. Using Data From A Loader In The Route Component

// To get access to the data returned by the loader function, for a given page, import the useLoaderData hook from react-router-dom. This hook can be executed to get access to the "closest" loader data. Technically, the loader function will return a promise if the return statement includes an async/await fetch request. Any data returned in that function will be wrapped by a promise, that's how async/await works. But, React Router will actually check if a promise is returned and automatically get the actual data from that promise instead of having to write explicit code in the application to get it, i.e. the necessary data will be returned by the loader function via the use of the useLoaderData hook.

// Lesson 462. More loader() Data Usage

// There is no real difference between page components and other components, so therefore the useLoaderData hook grants access to loader data in nested/child routes/components or siblings, i.e. if a parent route implements the loader function, any of its nested/child routes/components, or siblings, will be able to access the returned data via the useLoaderData hook.
//      - Alt defintion: Access loader data, with help of the useLoaderData hook, in any route/component that is on the same level (sibling), or on a lower level (child), of the route/component where the loader was implemented - the route on which the loader was added, i.e. use useLoaderData() in the element/component that's assigned to a route, and is implementing a loader prop function, AND in all components that might be used inside that element/component - any sibling route's or child route's elements/components.
//      - Be careful not to use useLoaderData on a higher level than where the data is being fetched from. It will not be able to reach the necessary data for a given route/component.
//      - Whatever data is returned by the loader function is the data that will be available to the components to access via the useLoaderData hook.

// Lesson 463. Where Should loader() Code Be Stored?

// Place loader function logic in an associated component file or in its own separate file, NOT in the App.js file where the router is located.

// NOTE: Rename imported named exports in-line using the "as" keyword in the import syntax, e.g. import {function as newFunction} from "./file"
//      - The named exports are imported as props on an export object which is why they must be destructred when imported into a file.
// NOTE: Import a default export and named exports from the same file via the same line of code, e.g. import Component, { function } from "./file"
//      - each file can only have a single default export but multiple named exports. The named exports must be imported by their assigned name, although once imported into a file they can be renamed as noted above, but the default export can be imported via any chosen name since there can only be a single default export per file, i.e. the default export can be assigned a new name when imported by simply assigning a new name on import.

// Lesson 464. When Are loader() Functions Executed?

// The loader for a page will be called right when the page link is clicked and navigation to that page begins, i.e. not after the page component has been rendered, but actually before the component is rendered, which means all of the loader data will be executed and retrieved before the component is rendered.
//      - By default, React Router will actually wait for the data to be fetched - for the loader to be finished executing - before it then renders the page/component with the fetched data from the loader function.
//              - The advantage of this approach is that the data will be reliably fetched and available for the component before it is rendered/(once it is rendered). Therefore, it is not necessary to dispaly a "loading..." state for this component.
//              - The downside is that there is a delay where it looks to the user as if nothing is happening, i.e. it can appear that the page is not being navigated to right away.

// Lesson 465. Reflecting The Current Navigation State in the UI

// The useNavigation hook is a hook provided by React Router that tracks the current state of transition for a route/component; whether currently in an active transition, if data is actively/currently being loaded, or if no active transition is occurring. This hook provides a navigation object when executed, i.e. const navigation = useNavigation().
//      - The navigation object has a couple of properties. The state property is the most important one for now. It's value is a string which is either 'idle', 'loading', or 'submitting'. These values are determined by whether there are any active route transitions, if an active transition is occurring and data is being loaded, or if data is being submitted.
//              - For active transitions/loading, it's important to recognize that the loading indicator won't be added on the page which is being transitioned to, but instead on a page/component, which is already visible on the screen - the one using the navigation object - when the transition is started. That's different compared to rendering components with useEffect and having a separate 'loading' state for that.

// Lesson 466. Returning Responses in loader()s

// One important aspect of a loader function is to understand that it can return any kind of data. It can also return a response object, i.e. in the browser, create a new response object by instantiating the built-in 'Response' constructor function, i.e. const response = new Response().
//      - This is built into the browser and is a modern browser feature. This allows for building custom responses. What's really important to understand at this point is that the loader function code will not execute on a server (back-end). This is still only executing in the browser, even though it's not in a component, it's still in the browser. It is still client-side code, which is very important to understand, i.e. the browser allows for creating a 'Response' because it supports the 'Response' constructor and response object feature. The 'Response' constructor takes any data of any data type as its first argument and then a customizable/configurable JS object can be set as a second argument, e.g. set the status code of the response using the JS object, i.e. {status: 500}.
//      - Whenever a response object is returned via a loader function, the React Router package will automatically extract the data from the response object when using the useLoaderData hook, i.e. the data returned by useLoaderData will be the response data that was part of the response object returned in the loader function - it will parse and return the first argument (the data) automatically.

// Why is this useful since the data can be returned without the response object generated by the 'Response' constructor?

// This feature exists because it's quite common that the loader function on a given route reaches out to some backend with the browser's built-in fetch function (fetch("URL...")), and this fetch function actually returns a promise that resolves to a 'Response' - evaluates and returns a response object.
//      - This built-in browser feature, combined with React Router's support for response objects - and its automatic data extraction feature - simply means that React Router can take the response object and return that via the loader. The data does not need to be manually extracted from the response object using .json(), i.e. it does not require converting the response to json - e.g. response.json() - and then storing the data in a variable that is returned. Instead, return the entire response object, with or without checking whether there is an error within the response, i.e. Simply return the entire response and the useLoaderData hook will then automatically extract the data that's part of the response, without using any json formatting functions. When implementing this approach, be sure to specify the prop on the data (response) object that contains the exact data which needs to be accessed, e.g. const data = useLoaderData() -> const items = data.items

// Lesson 467. Which Kind Of Code Goes Into loader()s?

// Remember, the code that's defined in the loader function executes in the browser, not on some server. Thus, any browser APIs can be used in loader functions. For example, access local storage, access cookies, and perform any other operations that can be executed in JavaScript code.

// However, React Hooks like useState cannot be used inside loader functions because hooks are only available in React components and the loader function is not a React component. That's the only limitation. Any other default browser features can be used in loader functions.

// Lesson 468. Error Handling with Custom Errors

// The response is not okay if it has a 400 or 500 status code. In this case, return a different response object or just return a JS object. It doesn't have to be a response object.
//      - In the JS object, simply add an error key and a message. With this, if an error occurs with the fetch request, the loader function will return this JS object (error/message) data package instead of the response object data package returned by the API request on a successful response, e.g. return new Response(...), or return {isError: true, message: "error message..."}
//              - With that, the data object will contain an error prop which can be "if" checked for a truthy value. If it returns 'true', the message prop, also stored on the data object, and containing the error message, can be rendered to the browser via the component. With that, the error generation and handling code is handled by the loader function where it belongs, arguably. This is one ways of handling errors - simply returning a JS object with an error and message prop that indicates an error has occurred and then using that data as necessary within the component.
//      - Alternatively, the error handling portion of the loader function could instead 'throw' an error instead of returning a JS object with an error and message prop. For this, 'throw' (create) a 'new' error object with the built-in 'Error' constructor, or 'throw' any other kind of JS object as an error, i.e. throw new Error("Error message...") or throw {message: "Error message..."}. With the second option of simply 'throwing' a JS object - instead of an 'Error' constructor - include a message prop with an appropriate error message as the value. Thus, when an error gets 'thrown' in a loader function, React Router will simply render the closest 'errorElement' located in the router's route defintions. This can be applied to any route but it is typically the 'root' route. Therefore, if an error occurs, or a path that does not exists is navigated to, it will display the 'errorElement' instead.
//              - If implementing this 'errorElement' on the 'root' route, be sure to include the navigation bar, if one exists, in the errorElement component so that there is an option to navigate to supported paths like the 'home' page/path.
//              - NOTE: The 'errorElement' is not just there to show a fallback page in case of invalid route paths. That is one use case but not the only one. The 'errorElement' will be shown on the browser whenever an error is generated (thrown) in any route-related code, including loader functions.
//              - The errorElement prop value should be the errorElement component. Thus, the errorElement component will be displayed whenever any kind of error occurs anywhere in the routes. This even applies to deeply nested routes because errors will 'bubble up'. That is why the errorElement can be placed on the 'root' route, because all errors that occur within a route will bubble up until they reach that route which contains the errorElement.

// Lesson 469. Extracting Error Data & Throwing Responses

// To differentiate between 404 errors and other errors from a loader function, instead of throwing an object, throw a response object by creating/constructing a new 'Response' object. This is a common use case, because there will likely be an error message attached to the object, from the loader function, that should be displayed, instead of some default error message from the errorElement component.
//      - Once a new response object has been instantiated, include the data into that response as the first argument - use JSON.stringify() to pass an object to the response as the first argument. Add a message prop to the object with a message string value, which can later be used as an error message in the error component. Then, add the second argument to the response constructor, which is another JS object, which includes a special status prop on it. This status value can be set as required. For example, set the status prop value to 500 to indicate that something went wrong on the back-end (server-side), i.e. throw new Response(JSON.stringify({message: "error message..."}), {status: 300/400/500/etc})
//              - To access the response object data that's being thrown as an error, inside of the error component that's being rendered as an errorElement, react-router-dom provides another hook - the useRouteError hook. This returns an "error" object, i.e. the response object that was thrown as an error by the loader function.
//              - The format of the returned "error" object now depends on whether a response object, or any other kind of object or data type, was thrown as an error in the loader function. If a response object was thrown, as was the case in the example above, the "error" object will include a status field/prop, which reflects the status of the response object thrown in the loader function, i.e. if the status prop was set to 500 in the loader function then it will be 500 in the "error" object returned by the useRouteError hook.
//              - If any other kind of object (JS object) was thrown, then the "error" object would simply be that thrown object. Thus, there would not be a status property. That's why throwing response objects instead of regular JS objects as errors might be a better solution, because they do allow for including the status property/field, which helps with building a generic error handling component.
//              - With the response object approach, the status value can be used with 'if' checks inside of the errorElement component (error component) to determine/set the appropriate title and message that should be displayed to the browser depending on the type of error that occurs, i.e. whatever status value is returned by the 'error' object - retrieved from the response object - can be used in/with 'if' checks, inside of the error component, to assist in setting the appropriate variables like 'title' and 'message' to the necessary values that will be displayed in the UI.
//                      - To access the data object passed as the first argument of the response object in the loader function, now stored on the 'error' object returned by useRouteError in the error component, store the returned 'error' object in a variable and then access the 'data' prop via dot notation. This will access the data object.
//                              - Since it was formatted to JSON in the loader function, it will need to be parsed back into a normal JS ojbect using JSON.parse(). Once the data object has been converted back, any props that had been set on it in the loader function can be accessed via dot notation, i.e. The data object must first be converted back to a JS object because otherwise it's still in JSON format. Use JSON Parse, and then access any props on the object (e.g. 'message' prop), e.g. const error = useRouteError() -> JSON.parse(error.data).someProp
//                      - To access the second argument of the response object, which is the JS object with the 'status' prop, simply access the status via dot notation on the 'error' object, e.g. const error = useRouteError -> error.status
// NOTE: 404 is the default error status set by React Router when a path is entered in the address bar that is not supported.
//      - 404 is a user-side error, 500 is a server-side error.

// Lesson 470. The json() Utility Function

// IMPORTANT: json is a function that can be imported from react-router-dom, e.g. import {json} from react-router-dom. json() is a function that creates a response object that includes data in the json format.
//      - Simply pass the data (data object/first argument) that should be included in the response, e.g. an object with a 'message' prop. No manual json conversion is necessary. Instead, it will be done automatically.
//      - Then, pass the second argument (JS object), e.g. a JS object containing a status prop
//      - Additionally, the data does not have to be parsed from the json format manually. Parsing will now be done by React Router automatically, i.e. Data does not have to be manually converted back into the appropriate JS format. It is done automatically by React Router, e.g. The error component can simply use the data object stored on the error object, const error = useRouteError() -> error.data.someProp
// This is a great simplification and hence it is quite common to use this json function for building responses with less effort.

// IMPORTANT: Simply throw json(...) instead of having to throw new Response(...), to use a response object as an error.

// Example: return json({message: "error message..."}, {status: statusCode})

// Lesson 471. Dynamic Routes & loader()s

// React Router passes an object to the loader function when it executes it. That object contains two important pieces of data (two arguments/parameters): 1) A request property, which contains a request object, and 2) a params property, which contains an object with all the associated route parameters.
//      - The request object could be used to access the URL (extract query parameters, etc), (i.e. user-side data requests???).
//      - The params object allows access to all the route parameter values just like the useParams hook, e.g. the params object allows access to identifier properties (e.g. products/:id) that follow the ":" in a route path, i.e. it allows access to the dynamic segments in paths, for example. Dot notation can be used on the params object to access the dynamic identifier props, e.g. const id = params.id

// If the loader function only needs to return the fetched data, simply return the fetch request without the await keyword. React Router will automatically wait for the promise and then extract the data from the returned Promise, which can then be accessed in the component by the useLoaderData hook. Remember, the loader function still needs to be an 'async' function even though the return fetch is not using the 'await' keyword, because the 'await' is implicit in this instance.

// Just adding a separate loader function to a component file won't do anything. React router will not look for loaders automatically. Instead, register the loader in the route defintiions with the appropriate route(s).

// Lesson 472. The useRouteLoaderData() Hook & Accessing Data From Other Routes

// Nested routes do not just offer the ability to share a layout wrapper and a root/parent route path for children routes. They can also be used to share loader functions. Loader functions can be used only by sibling and child routes, not parent routes.
//      - A route definition does not have to have an element prop, which would offer the abilty to provide/share a wrapper layout component to the nested routes.
//      - Simply set a path, loader, and children props to create a route wrapper that will allow children and sibling routes to access the loader function, without having an element prop set.
//      - This is similar to the method used on nested routes to construct an absolute URL path with the parent route, and the subsequent relative URL paths for the child routes.

//  The useLoaderData hook, used in a component, searches for the closest available loader data, and the highest level at which it looks for that data is the route definition of the route for which the component was loaded, i.e. (the component accessing the loader data evaluates the loader function of its associated route definition???).

// To ensure the proper loader data is used in nested child routes - when the loader data needed is located in the parent route defintion - set the special 'id' (exact name) property in the parent route definition with any chosen identifier value, e.g. id="data-details". Then, instead of using useLoaderData(), use a slightly different hook which is called useRouteLoaderData, which takes a given route 'id' as an argument, e.g. const data = useRouteLoaderData("data-details").
//      - This is the method for getting access to a higher-level loader for a route that doesn't have a loader. Simply use the useRouteLoaderData("id-value") with the id value of the parent route definition, instead of useLoaderData(). With that modification, reuse that loader data across multiple sibling and child routes which all need the same data.

// IMPORTANT: If creating the route wrapper for the purpose of sharing a loader function with the nested children elements, be sure to modify any component already using the loader function data by removing the useLoaderData() hook and replacing it with useRoutLoaderData("id").

// IMPORTANT: For the 'defaultValue' prop in forms, when setting this value dynamically, be sure to check that the dynamic value exists using a ternary operator (or short circuit???) before setting it to that value, e.g. defaultValue={data ? data.name : ""}

// Lesson 474. Working with action() Functions

// In addition to loader functions, route definitions also have a special 'action' prop for action functions. Just like the 'loader' prop, the 'action' prop receives a function as a value. Either an arrow function or a regular function. Both are fine.

// Action functions are typically defined in the component file they are being accessed/used by. Typically, this component is also the element of the route definition the action is assigned to. Like loader functions, actions functions are still only executing on the client-side. Thus, access any browser APIs such as local storage, cookies, fetch requests, etc. They are also capable of async/await.

// React Router makes handling form submissions very easy and it makes extracting data from forms easy as well. First, ensure that all inputs within the form have the 'name' attribute set to unique values, based on the input type, because this attribute will later be used for extracting the data, i.e. all the input tags and textareas should include unique 'name' attributes for differentiation when extracting data from them.

// Second, replace the 'form' element with the special 'Form' component, which is provided by react-router-dom.
//      - Import 'Form' from react-router-dom and then replace the opening and the closing 'form' tags with the 'Form' component.
//      - This 'Form' component will make sure that the browser default of sending a request to the backend will be omitted, but it will take that request that would've been sent and send it to the associated action function. That request will contain all the data that was submitted as part of the 'Form' component. Therefore, add the 'method' property and set it to 'POST' for a data submission request, although, this 'Form' component also supports other http methods like 'DELETE','PATCH', etc.

// IMPORTANT: The request will not be sent to the backend automatically, but instead to the associated action function, and it will include all the form data when implementing the 'Form' component.

// Just like the loader function, the action function has access to the 'request' and 'params' objects, which are arguments/parameters of the action function. To access the data that is captured by React Router and forwarded to the action function via the 'Form' component, use the request object, because the request object contains the form data. To retrieve the form data, execute the formData() method on the request object while using async/await functionality. That will return a data object that includes the form data. On this data object call the 'get' method to access the different input field values that were submitted, e.g. data.get()
//      - The get method receives a string as an argument. For each input tag that was included in the form submission use the get method with the input tag's associated 'name' attribute value as the argument, e.g. data.get("nameAttribute"), i.e. The string argument passed to the get method should be the 'name' attribute of the respective input tags, which act as the unique identifiers of each input field.

// Create a simple JS object and place each extracted piece of form data into its own prop. This is how form data is extracted from the request object in the action function and this new JS data object, which incorporates each extracted piece of form data, is then submitted in the body of a "POST" request to the backend (server-side). Remember to convert the data to JSON format by wrapping it with JSON stringify, e.g. body: JSON.stringify(dataObj). Be sure to add the appropriate headers and submit the stringified data in the body prop of the fetch request object. Finally, the action function should be assigned to the appropriate route definition inside the router for utilization.

// redirect is a react-router-dom function that creates a response object. However, it's a special response object that simply redirects the user to a different page. Now, the heavy lifting is handled behind-the-scenes by React Router. Just specify the path to which the user should be redirected and react-router-dom will take care of the rest, e.g. return redirect("/home").

// Lesson 474. Working with action() Functions (Alt notes):

// React-Router proves advantageous in managing form submissions effectively. It aids in the extraction of data from the form by requiring the inclusion of the 'name' attribute for all inputs (input tags). This attribute is pivotal for subsequent data extraction.

// To fully leverage React-Router, the standard form element/tag is replaced with a special 'Form' component provided by react-router-dom. This involves importing the Form component from react-router-dom and then replacing the opening and closing form tags with the React Router Form component. The React Router Form component ensures that the default browser request to the backend is intercepted/prevented, redirecting it to a specified action function instead. It remains client-side only.

// Additionally, the 'method' property must be added to the Form component, with "POST" for data submission. The Form component supports other http methods like 'DELETE', 'PUT', or 'PATCH'. Notably, the request is not automatically sent to the backend but is directed to the associated action function. The form data is included in this request when utilizing the Form component.

// The request object captured by React Router in the Form component can be accessed through the action function. Just like the loader function, the action function can also access the 'request' and 'params' properties as arguments/parameters passed to the function. By calling the formData() method on the request object, a data object containing the form data is obtained/returned. Using the 'get' method on this data object allows access to the different input field values submitted, based on their 'name' attributes, e.g. const data = request.formData() -> data.get("attributeName").

// The different extracted items/values can be stored/collected in a single JS object for submission to the backend, e.g. const itemDetails = {someProp: data.get("someAttribute"), someOtherProp: data.get("someOtherAttribute"), ...} This extracted form data that is incorporated into a JS object is then converted to JSON using JSON.stringify, and additional headers are added, specifying the 'Content-Type' as 'application/json' for proper handling on the backend. The data is submitted in the body prop of the fetch request object e.g. {headers: {....}, body: JSON.stringify(itemDetails)}

// The action function returns a response after awaiting the completion of the new request to the backend. This response can be examined to extract return data and perform necessary actions. The action function should be imported and assigned to the appropiate route definition for utilization. Typically, after successful form submission, user navigation can be managed by returning 'redirect' in the action function, redirecting the user to a different page based on the specified path, e.g. return redirect("/homepage")

// In summary, React-Router facilitates the efficient handling of form submissions, ensuring proper data extraction and providing a seamless redirection mechanism for enhanced user experience.

// Lesson 475. Submitting Data Programmatically

// In the context of action functions there is an alternative method of triggering/utilizing them. The conventional approach involves utilizing the special Form component provided by React Router, which automatically triggers the action function of the currently active route. This Form component, which is the standard method, can be configured to send the request to a different route by adding the action prop and setting it to the desired path.

// The alternative approach involves using a button and an eventHandler instead of a form for submitting a request to the action function. As it relates to 'delete' requests, if a user chooses to delete an item by using a button 'onClick' event, which triggers an eventHandler function, fisrt, user confirmation should be sought before executing any action. To achieve this, the built-in browser function, window.confirm(), which returns a boolean value, can be utilized, prompting the user with a confirmation dialog, e.g. const proceed = window.confirm("Proceed?"). If confirmation is received and the associated boolean value is stored in a variable, an 'if' check will evaluate the variable truthy and begin implementation of the action, e.g. if(proceed) {submit(...)}. Implementation of the delete request involves using the useSubmit hook from react-router-dom, which provides a submit function that can be stored in a variable for use in the eventHandler function, e.g. const submit = useSubmit(). This submit function takes two arguments: the data to be submitted (automatically wrapped in a formData object) and additional configuration, such as the http method (delete in this case), e.g. submit({...data...}, {method: "delete"}), i.e. All of the above features could be place in a button 'onClick' eventHandler function, i.e. an eventHandler function should trigger when a delete button is clicked by the user. The eventHandler should prompt the user for confirmation to delete the item and if confirmed, submit the request to the action function via the sumbit function from the useSubmit hook.
//      - if no data is needed, the first argument on the submit function can be left with a 'null' value. Along with the 'method' prop on the second argument object, an 'action' prop can be added if the action should be executed on a route path other than the currently active one,  e.g. {submit(null, {method: "DELETE"})}.
//      - Notably, the method type on the fetch request could be dynamically extracted from the submitted form data using the request object provided by React Router in the action function via the 'method' prop. This enables flexibility in handling client-side requests and aligning the method used for the client-side request with the method sent to the backend.

// Summary: The React Router Form component is the standard option for data submission to action functions that handle "POST/PUT/PATCH" requests. The Form component prevents the form data from being submitted to the backend and instead keeps the data client-side and sends it to the action in the request object on the action function, which is one of the two action function parameters (i.e. request, params). IMPORTANT: The Form component stores the input field input data inside a form data object with the differentiating factor for each piece of input data being a unique 'name' attribute/prop applied to the input tag/element.

// The alternative method for data submission is using the useSubmit hook provided by the react-router-dom. When executed, the useSubmit hook generates a submit function which can be stored in a variable. That variable can then be used inside an eventHandler function, which could be triggered in a number of ways, most commonly an onClick event for a button. The submit function takes two arguments, both objects. The first object will be the input data that is to be submitted. This object wrapper mutates the submitted input data into a form data object, just like the Form component does. The second argument object allows for defining props such as the 'method' of the request (e.g. "POST", "PUT", "DELETE", etc) and the 'action' path, if necessary (i.e. if the action function to be used is defined on a different route path than the currently active one). For example, when deleting a data entry, the first argument can be replaced with a 'null' value, since no data is required from the request object, in the action function, for deleting a data entry, and the second argument only needs to include the 'method' prop with a value of 'DELETE', if the action function is associated with the currently active route (route defintion).

// In both scenarios, the request parameter on the action function is an object which can access the form data submitted by the Form component or the submit function. Since it is submitted in formData format, the formData function must be used on the request object to access the data and stored in a variable (e.g. const data = await request.formData()). NOTE: The formData conversion function, on the request object, will require the 'await' keyword to execute properly.

// NOTE: It is helpful for delete handlers, in general, to offer the user a confirmation window via the window command, window.confirm(). The confirmation question can be passed into the confirm method as a string, which will be shown to the user when prompted. The resulting confirmation will return a boolean value. The boolean value can be stored in a variable and used inside the event handler with an 'if' check to allow the deletion to proceed accordingly if it evaluates 'truthy' (e.g. const proceed = window.confirm("Delete data?") -> if(proceed) {...deletion code...}).

// Lesson 476. Updating the UI State Based on the Submission Status

// When executed, the useNavigation hook on react-router-dom returns a navigation object. The navigation object has a state prop which stores the value of the currently active state of the navigation in the browser. It can be used to check if a route transition is or is not occurring (e.g. when a link is clicked for a different route). The resulting state for a route transition is either "idle" or "loading". It can also check if data is being submitted in the browser (e.g. form submission). The resulting state for active data submission is "submitting".

// For a form submission, this "submitting" state can be used to disable buttons and change text to allow the user to know that the request is being process. An "isSubmitting" variable could store the boolean value of an "if" check on the navigation state (e.g. const isSubmitting = navigation.state === "submitting"). This variable can then be used as the "disabled" prop value on a button element, which will disable the button when it is "truthy" (e.g. <button disabled={isSubmitting}>Submit</button). It can also be used to change the text of the button, using a ternary operator between the opening and closing tags of the button (e.g. <button>{isSubmitting ? "Submitting" : "Submit"}</button>)

// Lesson 477. Validating User Input & Outputting Validation Errors

// It is important to have good backend validation. Do not rely on frontend validation as this can be overridden using the devTools in the browser.

// Backend validation errors can be handled on the client-side inside the action function, for example. If a server-side error occurs with data submission, the action function handling the submission fetch request can access the response object status to evaluate the status code of the error that was thrown. The status code can be used in an 'if' check inside the action function to return the response object to the associated components when errors occur.

// The components can access the action response object data via the useActionData hook from react-router-dom. This works very similar to the useLoaderData hook. It allows components to access the data from the closest action function. When executed, the useActionData hook returns a data object containing the response data from the action. This returned data can be stored in a variable (e.g. const actionData = useActionData()).
//      - Note that like the loader function/data, it automatically parses the data from the Promise that was returned by the fetch request, streamlining access to the response data with minimal effort. The variable containing the response data can now access any props that were set on the response from the backend like errors, for example (e.g. actionData.errors). These errors can be used in the components with the help of short-circuits to display any errors that occurred. One option is to employ Object.values(actionData.errors) and map each error to its own list item, for example (e.g. actionData && actionData.errors && <ul>{Object.values(actionData.errors).map(error => (<li key={error}>{error}</li>))}</ul).

// IMPORTANT: This is different than implementing "throw json()" for errorHandling. That approach will result in the errorElement being displayed in the browser. This is commonly used for 404 and 500 erros, which will display an error page. However, when the error involves something like form submission, for example, the goal is to show the user, which errors occurred so they can fix the form, not redirect them to an error page, which would be unhelpful in that scenario. That's why this approach to handling errors is fundamentally different and has its own use case. This approach is very common for validation error responses.

// Lesson 478. Reusing Actions via Request Methods

// Setting a dynamic 'method' prop on a React Router Form component is useful in making action functions dynamic and reusable for different types of fetch request (e.g. using a single action function for "POST" and "PATCH" requests). In this way, the Form component can receive a dynamic 'method' fetch request value that is passed by the linked/associated components which use that Form component. The Form then submits the dynamic method to the associated action function, which can access the request and params objects on its built-in parameters (e.g. export async function({request, params}){...code...}). The method value is stored on the request object and can be accessed via dot notation (e.g. request.method). Thus, the dynamic method value can first be used in the fetch request on the 'method' prop to set the request to the appropriate method (e.g. method: request.method). The request.method can also be used in an 'if' check to set the URL that is passed to the fetch request, making the url dynamic. Within the 'if' check statement, the params object can be used to access the 'id' so that it can be included in the URL, if necessary or when needed (e.g. let url = "someUrl if(request.method === "PATCH") {const id = params.id url = "someURL/" + id}).

// Lesson 479. Behind-the-Scenes Work with useFetcher()

// useFetcher is a React Router hook which returns an object with many different props/tools including a form component, a submit function, a state object, etc. The returned object can be stored in a variable and the associated props/functionalities can be accessed and used as needed via dot notation (e.g. const fetcher = useFetcher() -> fetcher.state, fetcher.submit(), fetcher.form, etc). It can be helpful to destructure the props on the fetcher object variable for ease of use (e.g. const {state, data} = fetcher).

// Specifically, when a shared component or a component that is used in or with multiple components - a React Router Form component in a navigation bar, for example - needs to access a specific action function to submit the form data, the action prop on the Form can be set to the associated route/path of the action function that needs to be used/implemented, because the currently active route may not be the one containing the associated action function required. However, by setting the action prop to a different route/path, other than the currently active one, it will cause the browser to evaluate the change in the currently active path and render the different route/page to the browser, even though this may not be the desired result. The option of setting the action prop on the Form component dynamically is also inadequate as this would require setting the action prop on all the route definitions, which contain/use or are associated with the shared component (e.g. navigation bar), to the specific action function required. This would cause code duplication in the router, and potentially cause clashes with other actions that might be needed in some of those route definitions (i.e. some route definitions may already have an associated action)

// The useFetcher hook is useful in this situation. The Form component stored on the fetcher object can be used in place of the Form component from react-router-dom, and with that the action prop can be set to the desired path without causing the currently active path in the URL to switch/update in the browser/UI. Therefore, the action function, associated with the action prop path value, can be executed without actually causing the browser to update and render that action's route/page.

// IMPORTANT: Executing a Form component, with an action prop that is set to a path that is not the currently active path, will cause the currently active path, in the URL, to update to that different route/path set on the action prop, which in turn causes the browser to update the URL and switch to (render) the different route/page. The action prop on the Form component is only used/needed when the action function that needs to be exectuted, on the form data, is not associated with the currently active route/path.
//      - Setting an action prop would initialize a route transition to the action prop path value.

// Alt defintion:
// Import the useFetcher Hook from react-router-dom. When executed this hook returns an object. This object includes many useful properties and methods. For example, it provides another Form component which is different from the React Router Form component. It also has a submit function which is different from the submit function acquired from the useSubmit hook. What's different about the fetcher Form component is that it can actually trigger an action function from another route/path, but it will not initialize a route transition.Fetcher should be used whenever an action or loader function needs to be triggered/executed without causing navigation to that route/page.
// useFetcher hook is the tool to use when an action or loader, that is associated with another route/path other than the currently active path, needs to be used/executed without transitioning the route/page/url.
// Fetcher also includes properties/tools that help track/determine whether an action or loader that was triggered/executed succeeded. It also provides access to any data returned by that loader or action via a data prop (e.g. fetcher.data). Use object destructuring to pull out any properties for ease of use. The state prop from the fetcher object is similar to the state prop from the navigation object associated with the useNavigation Hook, in that it provides the current state in the form of 'idle', 'loading', or 'submitting' string values. For navigation, these values are meant to be used with route transitions. The state object provided by fetcher shows the state of the action or loader function that was triggered using fetcher.
// useFetcher is perfect for scenarios where some shared component, or a component that's used multiple times on the same page, needs to execute an action function without updating/switching the page/url.
