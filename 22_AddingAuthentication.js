// Lesson 487. How Authentication Works

// 1) Users should be authenticated for restricted/protected resources. Auth is needed if content should be protected.
//      a. Step 1: users send a request including user credentials to the backend (i.e. login process).
//      b. Step 2: the backend validates the user if the credentials are valid. Otherwise, it returns an error.
//      c. Step 3: if validated, the server sends the user a response with permission to access the protected routes.
// 2) There are two ways to authenticate users:
//      a. Option 1: Server-side sessions are used to authenticate users for tightly coupled (full-stack) applications.
//          i. tightly coupled apps are apps where the front and back ends are closely related and used together.
//          ii. the server creates and stores a unique identifier on the backend and then sends a copy of that identifier via the response to the user on the frontend.
//          iii. the user then sends that unique id with any future requests to the server, which checks the unique id for validation before allowing permissions for protected resources to that user.
//          iiii. the backend must store information about the client (unique id), which is why this option works for tightly coupled applications.
//      b.  Option 2: Authentication tokens are used where the frontend and backend are decoupled or loosely coupled.
//          i. Decoupled applications are apps where the backend works entirely separate from the frontend and only handles incoming requests from the client-side. It does not register/monitor client-side routing actions or user interactions. The backend server simply provides routes/resources that the client-side app requests.
//          ii. Most React apps are SPAs served by a server thats decoupled from the backend. The backend server is different from the server serving the frontend app.
//          iii. Because of the decoupling, the backend server does not store any information about the client-side/user, and therefore server-side sessions would not be ideal/usable.
//          iiii. Instead, the backend validates the users credentials (e.g. email/password) and then generates an authentication token ("permission" token) by creating an encrypted string using a special (private) 'key' that only that specific backend server possesses, and it sends that auth token in its response to the client/user on the frontend. The token is NOT stored on the backend.
//              1. The encyrpted string for the token is generated using an algorithm, other (client???) info, and the private 'key'.
//          iiiii. All future requests sent by the client to the backend server include the auth token, and only that specific backend server has the necessary 'key' to authenticate/validate/verify (i.e. decrypt/unencrypt) that auth token. Once the token has been authenticated/validated (verified) the backend server provides the client with access to the protected resources/routes it requested.
//              1. The backend server VERIFIES the auth token sent in the client-side request using the private 'key' it used to generate that same token. Without the 'key', the token cannot be verified.

// Lesson 468. Working with Query Parameters

// 1. A query (search) parameter is a param that is appended to the URL following a question mark and is assigned a value following an equal sign (e.g. url.com/somePath?someQuery=someValue).
//      a. They add additional selectivity to a link/path.
//      b. They can be used to determine how a component should be rendered.
//          i. They can be used to link to a component in a specific mode/rendering, based on the query (i.e. same page/component but alternate renderings to the browser) (e.g. login/signup form).
//          ii. Ideal for directing users to a specific "page" based on the user input (e.g. login user or create user -> different form rendering depending on user input).
// 2. useSearchParams() is a react-router-hook used for accessing query params inside of React components.
//      a. The naming of the hook comes from the fact that these query params are classified as search parameters.
//      b. useSearchParams can use array destructuring - just like the useState hook from the react library - to access its two arguments.
//          i. The first argument is an object which provides the current/active value/state of the search parameters (e.g. const [searchParams] = useSearchParams()).
//          ii. The second argument is a function for updating the value/state of the search parameters - very similar to useState Hook's setState function (e.g. const [searchParams, setSearchParams] = useSearchParams()).
//      c. The first argument contains a 'get' method which can be used to access the value of any given query param passed to it (e.g. searchParams.get("mode")).
//          i. The value can be stored in a variable (e.g. const mode = searchParams.get("mode")), or used for "if" checks (e.g. conditional rendering).
//          ii. This functionality can be used, for example, to identify which query param "mode" is active, and/or to toggle different modes, to render the current component appropriately in the browser (e.g. <Link to={`?mode=${isLogin ? "signup" : "login")}`}>... -> display signup form or login form depending on which one is the active mode)

// Lesson 469. Implementing the Auth Action

// 1. Form data submitted via the React Router Form component can be accessed on the request object inside action functions.
//      a. Execute the formData() function on the request object and store the returned data object in a variable (e.g. const data = await request.formData()).
//          i. REMEMBER: Use the 'await' keyword before the execution of the formData() method on the request object.
//      b. Execute the get() method on the data object to access a specific property stored on the data object.
//          i. Pass the name of a specific property as an argument to the get() method (e.g. data.get("email")).
//              1. NOTE: Pass the argument as a string (e.g. "email", "password", etc).
// 2. Store any of the given props on the data object in a separate object, configured as needed, for form submission to the backend.
// 3. To access and use search (query) params in fetch requests: 1) create a new url object using the URL constructor, 2) pass the url prop on the request object as an argument to the URL constructor, 3) access the searchParams prop via dot notation, on the newly instantiated url object, 4) store the searchParams object in a variable (e.g. const searchParams = new URL(request.url).searchParams).
//      a. NOTE: Hooks cannot be accessed/used outside of React components. Therefore, the query (search) params cannot be accessed using the useSearchParams hook in the action function.
//      b. As mentioned before, access specific search/query params on the searchParams object via the get() method (e.g. searchParams.get("mode")), and store the returned value in a variable (e.g. const mode = searchParams.get("mode")).
//          i. NOTE: Pass the query param as a string value to the get() method.
// 4. If users attempt to submit forms on an incorrect path, provide error handling inside the action function with help of 'if' checks and 'throw json({message: "...message..."}, {status: statusCode})' response objects.
//      a. This type of error handling will trigger the nearest errorElement or errorBoundary inside the router when an error occurs.
//      b. NOTE: status code 422 is "user validation/authentication errors (e.g. invalid user input, unauthorized access, etc.)".
//      c. NOTE: status code 401 is "forbidden access error (e.g. invalid credentials.)".
// 5. For error handling inside components, such as returning error messages to the browser for invalid inputs/credentials, simply return the entire response object from the error "if" check, instead of 'throwing' an error response object using the json() function or Response/Error constructors (e.g. return response vs. throw Error(), throw Response(), throw json()).
// 6. Manage the auth token returned in the response object from the backend (server), and redirect the user to their homepage.
// 7. REMEMBER: Add the action function to the route definition it is associated with.

// Lesson 470. Validating User Input & Outputting Validation Errors

// 1. Import the useActionData() function from react-router-dom to assist in error handling with form submissions.
// 2. Instantiate the useActionData() function, which creates a data object from the associated/closest action function data.
// 3. Store the data object returned by the useActionData() function in a variable (e.g. const data = useActionData()).
// 4. Depending on the format of the server-side response object, access the error(s) prop on the data object.
// 5. Iterate through the errors object values via the Object.value() function.
//      a. Map the errors to an <li>, for example.
// 6. Display the errors in the component using short circuits (e.g. {data && data.errors && (<ul>{Object.values(data.errors).map(error => (<li key={error}>{error}</li>))}</ul>)})

// Lesson 472. Attaching Auth Tokens to Outgoing Requests

// 1. To utilize auth tokens on outgoing requests, they must first be stored during the initial login/signup request action function.
//      a. Auth tokens are sent to the user from the server-side, in the initial response object, when the user has been authenticated.
// 2. The tokens can be stored in multiple ways. Once of the most common ways is to use the local storage object from the browser API.
//      a. Execute the json() method on the response object and store the returned data object in a variable (e.g. const responseData = await response.json()). REMEMBER: Use the 'await' keyword before response.json().
//      b. Extract the token from the data object's token property and store it in a variable (e.g. const token = responseData.token).
// 3. Store the auth token via local storage by accessing the localStorage object in the browser.
//      a. Execute the setItem() method on the localStorage object and include two arguments: 1) a name/id for the item (token) to be stored in local storage, 2) and the actual token, via the token variable, previously extracted from the response data object (e.g. localStorage.setItem("token", token)).
//          i. The first argument should be a string value and is commonly defined as "token" for the token id.
//          ii. The second argument is the token variable which contains the actual token value.
// 4. Commonly, the auth token will be accessed via a getAuthToken() function stored in a separate util(s) folder in a file named 'auth.js', although this is not required/mandatory.
//      a. The getAuthToken function extracts the token from the localStorage object via the getItem() method.
//          i. The name/id of the token is passed to the getItem() method and the returned value (token) is stored in a variable (e.g. const token = localStorage.getItem("token")). The token value is then returned by the function on execution.
//          ii. When executed, the function returns the token as its value.
//      b. The getAuthToken() function can be imported into any file that requires the token for a fetch request.
//          i. Once imported, the getAuthToken() function can be executed and the token return value stored in a variable (e.g. const token = getAuthToken())
//          ii. The token variable can be inserted into the fetch request headers as a bearer token on the authorization key (e.g. headers: {Authorization: "Bearer " + token}). The token variable is set as the value of the "Authorization" header, following the prefix of "Bearer "
//          iii. IMPORTANT: The space following "Bearer " is necessary for the server-side to parse the token correctly.

// IMPORTANT: Commonly, loaders are executed by React Router Links and NavLinks, and actions are executed by React Router Form submissions. However, this is because action functions in React Router only intercept and execute POST/PATCH/PUT/DELETE requests, and not GET requests. Form submissions are by default GET request, unless explicitly set to another method, which is why loaders can use and process form submissions. This is very similar to loaders processing a fetch request via navigation to a page from a Link click, (except that the form can provide search params to the loader, whereas a Link cannot???).

// Lesson 473. Adding User Logout
// 1. Use auth tokens to conditionally render login/logout buttons along with any other protected routes.
//      a. Use the browser's localStorage prop to "get" the stored auth token via the 'getItem' method (e.g. const token = localStorage.getItem("token"))
//          i. If the auth token is not available, restrict access to protected routes and vice versa if it is available.
//      b. Use the 'removeItem' method to log a user out when a logout button is clicked (e.g. logout -> localStorage.removeItem("token"))
//          i. Utilize React Router by creating a separate "Logout" component, which doesn't return a component but an action function.
//          ii. The action function will execute the localStorage.removeItem("token") function and return a 'redirect' route to the home page.
//          iii. The "Logout" component/action should be added to a new route definition, where the 'path' prop is set to 'logout' and the 'action' prop is set to the "Logout" action function, without any 'element' prop being set.
//          iiii. The 'Logout' action function can then be executed via a form submission by wrapping a React Router Form tag/component around a logout button.
//                  1. The Form component 'action' prop should be set to the 'Logout' component/action path, which is 'logout', and the 'method' prop set to 'POST'.
//                      a. The 'method' prop is necessary because actions will only execute on POST/PATCH/PUT/DELETE requests.

// Lesson 474. Updating the UI Based on Auth Status

// 1. Add a root route loader to retrieve the auth token.
//      a. All children routes can access the token data to evaluate whether protected routes should be rendered or not.
// 2. The root route is the best location for the auth loader because all other routes will have access to that loader data via the useRouteLoaderData("id") hook and respective 'id' value.
//      a. Also, the loader will be on the root level, which means the auth data will be re-evaluated/updated whenever a user logs in or out.
//          i. Thus any child routes accessing the auth data will also be updated to reflect any changes to the login status.
// 3. The auth loader function could be a simple helper function, which utilizes the already existing getAuthToken() function that was used in an example above.
//      a. The auth loader function will return the return value of getAuthToken() (i.e. it will return the token value or 'undefined' if the token does not exist) (e.g. export function tokenLoader(){return getAuthToken()}).
// 4. Specifically, assign the auth loader on the root route loader prop.
// 5. Whenever a navigation action occurs, the auth loader on the root route will be re-evaluated and updated.
//      a. For example, when a user logs in or out, and is redirected to the home page, the auth token will be updated and protected routes will be rendered based on the availability of that auth token.
//          i. Since the auth loader is on the root route, any navigation action such as submitting a form or clicking a link will cause the auth loader to re-evaluate and update the auth token (token status).
// 6. Apply an 'id' prop to the root route so that other child components can access the auth data via the useRouteLoader() hook (e.g. id="root").
// 7. Extract the auth/token data via the useRouteLoaderData() hook, with the appropriate 'id' passed as an argument, in the necessary files (e.g. const token = useRouteLoaderData("root")).

// Lesson 375. Important: loader()s must return null or any other value
// IMPORTANT: Loaders must return null or another value.

// Lesson 476. Adding Route Protection

// 1. Ensure that users cannot manually navigate to unauthorized URL paths by applying a loader function to the root path.
//      a. The loader function logic should check for an active auth token.
//      a. By applying the loader to the root path, every time a path/route change occurs, the loader will re-evaluate if the token exists.
//      b. All child/sibling routes are able to apply the same loader and access the loader data to check if a token exists.
//          i. "If" check conditions can be applied to protected routes so that access is denied if the token does not exist.
//      c. Essentially, the root loader is managing a piece of global state, very similar to React Context or Redux.
//      d. NOTE: The "state" is being updated on every path/route change.
// 2. Create a separate loader function that checks for a token, and if that token does not exist, either 'redirect' the user to a different page or throw a user 'validation' error (export const checkAuthLoader(){const token = getAuthToken() if(!token) redirect("/login")}).
//      a. Apply this checkAuthLoader to any protected routes.
//          i. If users attempt to access protected routes manually, they will be redirected or shown an error.

// IMPORTANT: All loader functions need to return a value. Thus, if a loader contains an "if" check, which has the potential to return nothing (no value), set the return value to null at the end of the function (e.g. export const loader = () => { if(conditional) {return redirect("/somePath")} return null}). This is necessary because the useLoaderData() Hook is expecting some value that it can extract and provide to the UI/browser. Without a value, it will result in an error.

// REMEMBER: Links to relative paths are only added to the currently active path. Therefore, they will not remove or change the currently active path but simply append to the end of the current/existing path in the URL. If the currently active path needs to be changed, in order to reach a specific route, then an absolute path should be applied.

// Lesson 377. Adding Automatic Logout

// Solution #1 - Works for projects with a single root layout

// 1. Import useSubmit and useLoaderData (auth/token loader data) into the RootLayout component.
//      a. Instantiate and assign both to respective variables (e.g. const submit = useSubmit(), const token = useLoaderData())
// 2. Import useEffect and set a setTimeout() function inside the useEffect hook.
// 3. The useEffect should simply 'return' if no token exists on the root loader data (e.g. if(!token) return).
// 4. If a token does exist, the setTimeout function will be executed after a specified time (e.g. 1 * 60 * 60 * 1000 -> i.e. 1 hour) (e.g. setTimeout(() => {...code...}, 1 * 60 * 60 * 1000) ).
//      a. Inside the setTimeout function the submit function will be invoked with the first argument set to null (e.g. submit(null, secondArg)).
//      b. The second argument should be an object with an 'action' prop set to the 'Logout' action path (e.g. "/logout"), and a 'method' prop set to 'POST' (e.g. submit(null, {action: '/logout', method: 'POST'}))
// 5. The 'token' and 'submit' variables should be passed to the dependency array on the useEffect hook (e.g. useEffect(() => {if (!token){ return } setTimeout(() => {submit(null, { action: "/logout", method: "POST"}) }, 1 * 60 * 60 * 1000)}, [token, submit]) ).

// ISSUE: The token expiration handled on the frontend by the useEffect setTimeout function can become unsynced from the backend token expiration.

// Lesson 378. Managing the Token Expiration

// Solution #2

// 1. Hard coding the token expiration via the setTimeout function inside the useEffect hook will cause the setTimeout to reset on each re-render.
//      a. As a result, the token expiration on the frontend will decouple with the expiration on the backend.
// 2. Instead, set the token expiration on the action function that logs the user and retrieves the token on login.
//      a. Use the Date object/functions to accomplish this (e.g. const expiration = new Date() -> expiration.setHours(expiration.getHours() + 1) -> localStorage.setItem("expiration", expiration.toISOString())).
// 3. Create a separate loader function to handle the stored expiration date and calculate the existing token duration (e.g. export const getTokenDuration = () => {}).
//      a. Retrieve the stored expiration date (e.g. const storedExpirationDate = localStorage.getItem("expiration")).
//      b. Convert it to a 'Date' object (e.g. const expirationDate = new Date(storedExpirationDate))
//      c. Store the current date in a variable (e.g. const now = new Date())
//      d. Calculate and store the remaining time (i.e. duration in milliseconds) in a variable and return that variable (e.g. const duration = expirationDate.getTime() - now.getTime() -> return duration).
// 4. Use the getTokenDuration() function within the getAuthToken() function to evaluate the remaining token duration, before providing the token to the user (e.g. const tokenDuration = getTokenDuration()).
//      a. Use an 'if' check to evaluate if the token has expired, and if the conditional returns 'true', provide a return value representing this expiration (e.g. if(tokenDuration < 0) {return "EXPIRED"}).
//      b. If the 'if' check evaluates to 'false' return the token (e.g. return token).
//      c. Be sure to add a separate 'if' check, before the toke duration 'if' check, to evaluate if a token exists, and return null if a token does not exist (e.g. if(!token) {return null}).
//          i. All loaders must return a value or null.
//          ii. Additionally, this ensures an incorrect "EXPIRED" value is not returned.
// 5. Import the getTokenDuration() function into the RootLayout file, mentioned in the above example, that is handling the automatic user logout via the useEffect hook and setTimeout function.
//      a. The useEffect should include an additional 'if' check to check if the token is expired (e.g. if(token === "EXPIRED").
//          i. If the condition evaluates true, the user should be logged out (e.g. if(token === "EXPIRED") { submit(null, {action: "/logout", method: "POST"}) return }).
//          ii. If the condition evaluates false, the setTimeout function should be invoked, with the timer set to the token duration variable that is extracted from the getTokenDuration() function, that was imported into the file (e.g. const tokenDuration = getTokenDuration() -> setTimeout(() => { submit(null, {action: "/logout", method: "POST"})}, tokenDuration) ).
