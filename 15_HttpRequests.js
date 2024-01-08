// Section 15: Sending Http Requests (e.g. Connecting to a Database)

// Lesson #207 How To (Not) Connect To A Database

// Connecting a database directly to a browser-side(client-side) application, would expose database credentials in that code.
//      - This is because all JavaScript code running in the browser can be accessed and read, not just by the browser, but also by the users of the client-side website. Normally, this is not a problem, but it will become a problem if all security relevant details in the code were exposed. In addition, directly connecting to a database could also bring other problems like performance issues, but the security problem is the biggest problem of all.
//      - Instead of directly connecting to a database from inside the React code/application, use a backend application running on another machine/server not running in the browser. This backend application can be written with any server-side language(NodejS, PHP, ASP.NET, etc). The backend application will handle direct communication/requests to the database, and the database credentials on the backend application will be safely stored since that backend code can't be viewed by users - React will communicate to the backend server(backend API), which will in turn send the necessary communication/requests to the database, while protecting the database credentials.

// Lesson #209 Our Starting App & Backend

// A backend app(API) is not a database. API stands for application programming interface. It means that within the backend code/app there is a clearly defined interface, with clearly defined rules, on how to achieve certain results and perform certain tasks. When referring to APIs in the context of HTTP requests, it is typically referencing REST or GraphQL APIs, which are basically two different standards for how a server should expose/share its data - different entry points lead to different results.

// Lesson #210 Sending a GET Request

// The Fetch API is built into browsers and it allows for fetching data and also to send data even though the name doesn't imply it - use it to send HTTP requests and work with responses.
//      - Fetch returns a promise, which allows for reacting to the response or any potential errors that might occur.
//              - A "promise" is an object which will eventually yield some data, instead of immediately, because sending an HTTP request is an asynchronous task.
//                      - It doesn't finish immediately. It can take a couple of seconds or milliseconds. It can even fail. Therefore, it can't just continue on to the next line of code and use the result immediately. Instead, the result will be there at some point in the future and that's exactly what promises exist for in JavaScript. To facilitate the use of this asynchronous (promise) object, add/use the "then" (reserved) keyword, which is a built-in JS function/method for the Fetch API. It will be called/executed once a response is received from the initial API call or a previous "then"(promise) function call.
//                              - Write code specific to what should be done with the response once it has been received, within the "then" function via an anonymous function - e.g. fetch("url").then(response => {...code...}).
//                                      - The response argument/parameter associated with the anonymous function is an object which can access different properties of the response that was received - e.g. response.headers, response.status, response.ok, response.body.
//      - Typically, APIs send back data in JSON format. JSON is simply a data format, a very popular one, for exchanging data between servers and UIs. It looks like a JavaScript object, but keys are wrapped between double quotes, and there are a couple of other rules to keep in mind. Also there are no methods, it's just data. The advantage of JSON data is that it's very easy to translate it to JavaScript objects, but there is a translation step, a transformation, which needs to be performed on the JSON data being received from the API, by the UI/browser.
//              - The response object has a built-in method, which will automatically translate this JSON response body to a real JavaScript object, which can be used inside the promise. Simply call json() on the response object, which is a built-in method on the response object - response.json() - and this will now perform the transformation. This transformation also "returns" a promise, and therefore, that promise must be returned - e.g. fetch("url").then(response => { return response.json()}).then(data => {...do something with the data...}) - this built-in json() method on the response object will transform the JSON response body into a JS object.
//                      - As noted in the example, simply add(chain) another then function block, which will then be called once the data transformation is complete. This promise will provide the transformed data, which will contain the parsed JSON object data in a JS object format - access the data on the new JS object using dot notation.

// Lesson #213 Handling Http Errors

// One problem when trying to catch errors with Fetch API is that it doesn't treat error status codes as real errors - it will not throw a technical error if an error status code is sent back (from the server???). Therefore, the problem is that a 400(500???) level error would not result in an actual error from the Fetch API. An error would only occur in a second step if an attempt is made to process/operate/use the response data, which was not received. That's not a good way to handle this situation. Instead, it would be better if a real error is thrown in response to an unsuccessful response status code.
//      - Axios is a third-party library, that also handles(sends) HTTP requests, and it would generate and throw a real error for error status codes.
//              - However, for Fetch API error status codes use the "ok" or "status" properties found on the "response" object to conditionally handle errors inside of a HTTP request - the "ok" property just shows whether or not the request was successful, and the "status" property shows the actual response status code for the request.
// IMPORTANT: Check if the response is ok before trying to parse the response body into JSON, because an invalid response cannot be parsed into a JSON object.
//      - This also depends on the API that is being sent the request. Some APIs also send back JSON data if the request was unsuccessful. Other APIs send back non-JSON data, so therefore, the error needs to be handled before trying to parse data.

// Lesson #214 Using useEffect() For Requests

// UseEffect is great for executing code that should be executed as part of a component's render cycle, but maybe not always when the component re-renders, which is why an empty dependency array is useful in these situations. Otherwise, specify dependencies in the dependency array, that should cause additional executions of the code within the useEffect's function.
//      - Ideally, any fetch function handlers should be added to the dependency array in case some external state, within the fetch function, changes and the fetch needs to be re-executed to reflect those updates/changes to the UI. However, to avoid an infinite loop, be sure to wrap the fetch function in a useCallback hook so that the fetch function is not recreated on every render/re-render.

// Lesson #216 Sending a POST Request

// The fetch API receives a second argument for all other requests that are not GET requests. This second argument is a configuration object, which configures the outgoing request. Set the type of 1) method, 2) the body, 3) and any associated headers.
//      - The method simply defines what type of request is being submitted/sent to the API - i.e. GET, POST, PUT, PATCH, DELETE.
//      - The body is the part of the configuration object which contains the actual data(content/resource) of the request being sent.
//              - The API tyipcally does not accept JS objects from/for the body of the request. Instead, the data(content) placed in the body of the request needs to be converted to JSON format prior to sending the request.
//                      - JSON is typically used for exchanging data(content) between front-end and backend applications. To convert a JavaScript object to JSON, use a utility method which already exists within JavaScript - use the JSON object, which is built into JavaScript, call the stringify method, and pass the JS object(content/data) as an argument - e.g. body: JSON.stringify(jsObject). This basically takes a JavaScript object, array, or other data type, and turns it into JSON format.
//      - Finally, add headers to the configuration object, which is implemented by adding the "headers" key/property and setting an object as its value - set a key inside of the empty object to "Content-Type" and set its value to "application/json" - the headers object contains the "Content-Type" header, and for most backend servers its value is typically set to "application/json" - i.e. headers: {"Content-Type": "application/json"}
//              - Technically, this header is not required by Firebase, it would be able to handle the request even if that header is not set, but a lot of REST APIs might require this extra header, which describes the content that will be sent.
