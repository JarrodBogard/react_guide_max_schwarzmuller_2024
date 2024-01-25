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
