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

// Lesson 488. Project Setup & Route Setup
