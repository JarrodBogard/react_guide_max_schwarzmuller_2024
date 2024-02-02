// Lesson 381. Deployment Steps

// Step 1: Test: Run manual & automated tests to ensure app integrity.
// Step 2: Optimize: Optimize code for user experience and performance (e.g. 'lazy' loading).
// Step 3: Build: Execute build script that will parse/transform/optimize code for production.
// Step 4: Upload/Deploy: Upload production code to a server (host).
// Step 5: Configure: Configure the server to ensure the app is served securely and as intended.

// Lesson 382. Understanding Lazy Loading

// 1. Lazy loading is where code/files (e.g. components) are loaded, only when necessary/needed.
//      a. If all, or most, code files in an app depend on one another (e.g imports), then all the dependent files must be downloaded/loaded before anything is rendered to the browser.

// Lesson 383. Adding Lazy Loading

// Lazily vs. Eagerly

// Lazily - delays loading component code until it is needed.
// Eagerly - loading component code immediately.

// 1. Remove standard import (e.g. import Page from "./someFile").
//      a. For loader props, replace the loader function value with an anonymous function which returns an import function (e.g. loader: () => import()).
//          i. pass the file path for the loader function as an argument to the import() function (e.g. import("./pathname/etc...")).
//          ii. After passing the pathname of the loader, the executed import function returns a Promise, which should be handled with "then" or "async/await" (e.g. import("./pathname/etc...").then() ).
//          iii. The Promise returns the module/file of the respective loader function (e.g. import("./pathname/etc...").then(module => ...) ).
//          iiii. The loader is then accessed as a prop on that module and executed (e.g. import("./pathname/etc...").then(module => module.loader()) ).
//          iiiii. This ensures the loader is loaded lazily.

//      a. For functional components, the component function is replaced with an anonymous function (e.g. const Component = () => {} ).
//          i. The anonymous function returns an import() function (e.g. const Component = () => import() ).
//          ii. The pathname of the component is passed as an argument to the import() function (e.g. const Component = () => import("pathname") ).
//          iii. The 'lazy' function, provided by React library, wraps the anonymous function to allow React to process the function component import as a component, dynamically (i.e. when needed), without requiring JSX code from the function component import (e.g. const Component = lazy (() => import("pathname")) ).
//          iiii. The component can then be invoked in the file as before function App() { return <Component /> } export default App.
//          iiiii. The Suspense wrapper from the React library will be used to wrap the 'lazy' component and provide a 'fallback' (e.g. function App() { return <Suspense fallback={<p>Loading...</p>}><Component /></Suspense> } ).
//          iiiiii. The 'fallback' prop, is a 'backup component' that will be rendered until the other component is finished loading and ready to render.
//                  1. The 'fallback' will be rendered/displayed until the component finishes loading.
//                  2. This is necessary because the component is loaded dynamically and will be delayed rendering due to lazy loading.

// NOTE: The import() function allows for importing files dynamically (i.e. only when needed).

// IMPORTANT: The import() function yields a Promise, not JSX code, which is why the 'lazy' function provided by the 'react' library needs to wrap any Component imports implementing lazy loading.
//      - A function is only a functional component if it returns valid JSX code.

// IMPORTANT: For loaders, if a searchParam is required to execute the loader function properly, pass the meta object, from the anonymous function, to the loader invocation on the module (e.g. loader: (meta) => import("pathname").then(module => module.loader(meta)) ).
//      - Alternatively, extract the params from the meta object via object destructuring and pass it as an object to the loader e.g. loader:  ({params}) => import("pathname").then(module => module.loader({params}) ).

// Lesson 384. Building the Code For Production

// 1. Development code is for readability (i.e. for programmers/devs). Production code is about minimizing file size for performance (i.e. reducing file size for deployment).
// 2. The script for 'building' the production version of an app is 'npm run build'.
//      a. This script will produce a code bundle with highly optimized and transformed code which is ready to be uploaded.
//      b. This creates a build folder in the app with the optimized code, which will be used for deploying/uploading the app to a server (host).
//          i. The contents of the build folder are used for app deployment.

// Lesson 385. Deployment Example

// 1. A React single page application (SPA) is a 'static' website/app.
//      a. Static means that the application consists entirely of HTML, CSS, and JS files (and mabye some images).
//          i. It should not contain any code that must be executed by/on a server (i.e. There should be no server-side code, only client-side).
//          ii. All code should be parsable and executable by the browser (i.e. the browser APIs).
// 2. A static host is used to host React SPAs.
// 3. Firebase Hosting Steps:
//      a. Login to Firebase and create a new project.
//      b. Navigate to the build tab -> hosting tab -> "Get Started" tab
//      c. Ensure Firebase CLI is downloaded on local machine.
//      d. Login into Google account.
//      e. Connect the new Firebase project to the React SPA on the local machine via the "firebase init" CLI command.
//      f. Configure project:
//          i. Choose hosting option for firebase only.
//          ii. Choose existing project that was just created on Firebase.
//          iii. Type "build" to choose the location of the files to be hosted by Firebase.
//          iiii. Type "y" to choose SPA configuration option.
//          iiiii. Type "no" to reject Github automatic builds/deploys.
//          iiiiii. Type "n" to refuse overriding the existing "build/index.html" file.
//          iiiiiii. Initialization should be complete. The Firebase project and local project are now connected.
//          iiiiiiii. Run "firebase deploy" in the CLI to upload the local project files to Firebase. The project is now being hosted by Firebase.
//          iiiiiiiii. From the Firebase console, add custom domains, etc.
//          iiiiiiiiii. To disable hosting run "firebase hosting:disable" from the CLI.

// Lesson 386. Server-side Routing & Required Configuration

// 1. For a static, single-page application, all application logic is executed in the browser, not on a server.
// 2. If a client attempts to enter a URL path manually for a file path, other than the main website, the server should always return "index.html" so that the browser can execute the request on the client-side.
//      a. Due to the nature of the static SPA, it cannot handle different file requests that are sent from the client-side to different paths.
//          i. The reason being that is is only a single page app, and there is no server-side logic to handle those requests.
//      b. The server should always return the "index.html" file so that the HTML, CSS, and JS files can be executed by the browser.
//          i. In React, most often path routing will be handled by React Router (i.e. if React Router is used in the project to handle routing).
//          ii. The server will receive the request from the client and always return the bundle of React app build files that can manage/execute the request appropriately on the client-side (i.e. in the browser).
//      c. EXAMPLE: No matter what path follows the URL, Firebase hosting will always return index.html to the client, which will in turn cause the browser to request the same JavaScript files, which will ensure that client-side routing is used to manage the request instead of server-side routing.

// NOTE: Whenever a client sends a request to a static hosting site for a webpage (i.e. a URL path), the server response is always the SPA code (i.e. the bundled production (i.e. build) code, which can execute the request appropriately via the entry point of the index.html file).
// NOTE: All static SPAs, evaluate different URL path requests via client-side code provided by the application (e.g. React Router).
// NOTE: By default, the hosting server would look for a fitting file for the request sent to the server for a specific pathname. This default behavior must be overridden to instead send the appropriate SPA files (i.e. HTML, CSS, and JS files -> the access point being the index.html file)
//      - The server will always return the index.html file of the SPA for any clien-side requests.

// IMPORTANT: It's important to ensure that all requests are routed to the client-side in a single page application. Not all hosting sites will automatically configure the SPA appropriately. Thus, in some cases, it is important to research documentation when hosting on a new/different hosting service so that a configuration file can be added to the application to handle/manage/reroute all requests appropriately.
//      - Sometimes it is necessary to manually write a 'redirection' rule to forward all requests to index.html.
