// Section 17: Working with Forms & User Input

// Lesson #232 What's So Complex About Forms?

// Invalid inputs should result in input-specific error messages and highlighting problematic inputs. It should also prevent the form from being submitted/saved.

// Valid inputs should result in form submission.

// When should inputs be checked for validity?

// 3 Different Options:

// 1) When the form is submitted as a whole.
//      - Allows user to attempt a valid entry before providing an error message.
//      - Avoids unnecessary warnings, but feedback might be provided late on invalid entries.
// 2) When an input loses focus.
//      - Allows user to attempt a valid entry before providing an error message.
//      - More detailed and responsive feedback per input field within a form, but an invalid state is not known until the entry is complete and the input loses focus.
// 3) On every keystroke.
//      - Direct feedback is provided on every keystroke, but since the initial state of the form will be invalid, there will be warnings and errors before a valid input is even attempted.

// Ideally, a form will contain a combination of the 3 options to provide the best user experience for form/input validation.
//      - Apply keystroke validation only after an input is determined to have an invalid entry.
//              - For an invalid user entry, it provides direct feedback to the user on when they have corrected the entry and entered a valid input.

// Lesson #233 Dealing With Form Submission & Getting User Input Values

// The default behavior by the browser is that if a form is submitted that has a button inside of it, an HTTP request is sent to the server serving the website. The browser does this automatically. Call event.preventDefault() to tell the browser to not perform that default behavior, to not send the HTTP request, and instead do nothing.
//      - It is necessary to add preventDefault to the form submission function in many cases, because if the HTTP request is sent, it would lead to the page being reloaded - the React application would restart and all the current state would be lost.

// Lesson #234 Adding Basic Validation

// It's important to validate inputs on the server-side, because the JS code on the browser can be edited via the source code that can be accessed in the devTools. Therefore it is not reliable to just validate on the client-side - it's just there for providing a good user experience. It's not a security mechanism.

// Lesson #238 Refactoring & Deriving States

// State changes are not processed immediately. They are scheduled for execution by React. Therefore, the latest state update is not yet available within the same function it is being updated inside of - if checking state for an update in the next line of code, within the same function is was updated in, the latest state will not be available.
//      - Intead, use the data source of the state for checking the most recent update.
//      - (Instead, use the state data source for checking the most recent update).

// Lesson #241 Re-Using The Custom Hook

// Validation logic for Hooks(React or Custom) shouldn't be hard-coded. The logic should be generic so as not to limit the Hook to one specific use case or component.
