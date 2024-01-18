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

// Remember, the code that's defined in the loader function executes in the browser, not on some server. Thus, any browser APIs can be used in loader functions. For example, access local storage, cookies, and anything else that can be executed in JavaScript code.

// However, React Hooks like useState cannot be used inside these loader function because those hooks are only available in React components and the loader function is not a React component. That's the only limitation. Any other default browser features can be used in loader functions.

// Lesson 468. Error Handling with Custom Errors

// The response is not okay if it has a 400 or 500 status code. In this case, return a different response or just return a JS object. It doesn't have to be a response object.
//      - In the JS object, simply add an error key and a message. With this, if an error occurs with the fetch request, the loader function will return this JS object (error/message) data package instead of the response object data package returned by the API request on a successful response.
//              - With that, the data object will contain an error prop which can be "if" checked for a truthy value. If it returns 'true', the error message stored on the data object can be rendered to the browser via the component. With that, the error generation and handling code is handled by the loader function where it belongs, arguably. This is one way of handling errors - simply returning a JS object with an error prop that indicates an error and then using that data appropriately

in the component.

Now I'll comment this out though because that's not

how I'll do it here, because there is an alternative.

As an alternative to returning this data here

to the component, we could throw an error.

For this we can construct a new error object

with the built in error constructor,

or we throw any other kind of object as an error.

And here we could then also, for example,

include a message and say, 'could not fetch events'.

Like that.

Now, when an error gets thrown in a loader

something special happens.

React router will simply render the closest error element.

to the Root Route to have a fallback page that would be

displayed in case of 4 0 4 errors.

So if we navigated to paths that aren't supported.

Well, turns out that error element is not just there to

show a fallback page in case of invalid route paths.

That is one use case but not the only one.

Instead, the error element will be shown

to the screen whenever an error is generated

in any route related code, including loaders.

For that of course, error page must be imported.

Then it's added here with error element on that Root path.

With that, this page,

this error page, will be displayed whenever

we basically have any kind of error anywhere

in our routes because even though I'm throwing an error here

in the loader of the events page.

So in this route here, which is a deeply nested route,

errors will bubble up.

We could add error element to this route as well.

And in that case, this error element would be rendered

if this loader threw an error.

But we can also just have this Root level error element

and the error would bubble up until it reaches that route.

// Lesson 469. Extracting Error Data & Throwing Responses

For example, we might want

to differentiate

between 4 0 4 errors

and other errors

like the one we have here

from our loader,

where we actually have an error

message that we might

wanna display instead

of the default error message

I defined here.

So to differentiate between errors

what we can do is instead

of throwing a object,

we can throw a response

by again creating a new response.

And then we can include some data

into that response.

For this, we have

to call JSON stringify

if we want to pass an object

to the response.

And then we could add

a message prop and say

could not fetch events.

And now we can add

this second argument

to the response constructor

and set the status, for example,

to 500 to indicate

that something went wrong

on the back end.

That's just one example.

In this case, it's an incorrect URL,

but we could set this status code.

Now I'm doing this

because you can actually get hold

of the data that's being thrown

as an error inside

of the component that's being rendered

as an error element.

And for that React-Router-Dom

gives you another special hook

which we import from react-router-dom.

And that's the use route error hook.

This gives us an error object

if you want to call it like this.

And the shape

of that object now depends

on whether you threw a response

or any other kind

of object or data.

If you threw a response

as I'm doing it here now,

this error object will include

a status

field.

which actually reflects the status

of the response you threw.

In my case, that would be 500

because that's the status I set here.

If you threw any other kind

of object, like a regular

JavaScript object,

then this error object would already

be that thrown object.

So then there would not

be this special status property.

But that's why you might wanna

throw responses instead

of regular objects

because it does allow you to

include this extra status property,

this extra status field, which helps

with building a generic error

handling component.

Because now an error JS

in this error page,

we can

create our title

and our message

and set these two default values,

but override them

with more fitting values based

on which error we have.

So we could, for example,

have these default values here,

but then we can check

if error dot status is maybe 500,

in which case we might want

to keep the title.

But set the message

to error.data.message.

Now error.data gives us access

to the

data that's included

in this error response

that was thrown.

So, to this object here,

in my case,

And that object has a message

and we can assume

that most objects

that are included

in error responses will

have message properties.

That's why I'm accessing

the data object

of the error response

and then the message property here.

But we could, for example,

also check if the error status

is maybe 4 0 4,

which is the default status set

by React router if you enter

a path that's not supported.

And in that case,

we could set the title

to not found,

and the message

to could not find resource

or page.

And now we can use

these values down here

and set the title

to our title,

which we set conditionally

and also output our message here,

which is set

to different values

based on different status codes.

This

data object here,

actually,

first of all

must be converted back

to an object

because otherwise it's still

JSON,

in JSON format.

So we must use JSON Parse here,

and then access message

on the parse data.

But with that done,

you see I got this error output

in case

of my error due

to me visiting events.

And that's why we might want

to throw responses

in the places where

things go wrong

and add such a

generic error handling page

which is rendered

with help of

an error element added

to the root route.

That's one way of handling errors

and embracing those features

that are built

into React router.