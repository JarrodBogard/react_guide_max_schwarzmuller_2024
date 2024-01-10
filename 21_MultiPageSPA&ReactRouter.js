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
