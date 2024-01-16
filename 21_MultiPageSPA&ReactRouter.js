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

And now to get access to the data returned

by the loader function for this page,

we can import "use loader data" from React-router-dom.

This is a special hook which we can execute

to get access to the closest loader data,



And events here will really be

that data returned by that loader.

Now since I'm using a single weight,

technically this loader function will return a promise.

Any data returned in that function will be wrapped

by a promise, that's how a single weight works.

But React Router will actually check

if a promise is returned and automatically get

the resolved data from that promise for you.

So you don't need to worry about

whether you are returning a promise here or not,

you will always get the final data that would be yielded

by the promise with help of use loader data.

And therefore now it's this events object,

this array of events, which we can pass as a value

to this events prop on events list.

And we got this all due to the code we wrote in this loader.

And of course that's much less code than what we had before,

and it's also not part of the component function,

which makes the component function way leaner

and easier to reason about. Of course,

// Lesson 462. More loader() Data Usage

But there technically is no difference

between page components and other components,

so therefore we can use it here as well.