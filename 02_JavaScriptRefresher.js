// Section 2: JavaScript Refresher

// Lesson #15 Adding JavaScript To A Page & How React Projects Differ

// JavaScript can be executed in many environments:

// 1. Browser - via websites/internet browser
// 2. Local machine - using Node.js or Deno
// 3. Mobile devices - using Capacitor or React Native to build JS apps

// Adding JS to a website:

// 1. Between script tags - inefficient, not ideal.
// 2. Import js files via the script tag as a source(src) - most useful and efficient.
//      - add the "defer" attribute to the script tag to ensure the js file will only be executed after the rest of the HTML file has been read and parsed. Alternatively, add the script tag to the end of the body section in the HTML file.

// Note: Add a "type" attribute with the "module" keyword to the script tag to access additional import/export functionality/syntax for the js script files.
//      - This attribute, type = "module", makes sure the js script(file) is treated as a js module. This will unlock the import/export syntax, which allows multiple js script files to connect and share their respective code with each other.

// Important: React projects almost always use a build process, which as part of that build process, injects these script tags into the HTML code for you.

// Lesson #16 React Projects Use a Build Process

// The code you write(in its current state) is not the code that gets executed in the browser.
//      - The code is transformed before it's handed off to the browser.

// This code transformation is done via the "react-scripts" library/package.
//      - The react scripts package provides a bunch of tools that take the code and transform it, behind the scenes, before it's then injected into the browser.
//              - To be precise, before it's then injected with the help of a script tag into the HTML file.

// The script tag element(s) are generated and injected into the HTML file automatically, behind the scenes, by the "build process" that's running in the background in React.

// It's the development server which is watching the source code behind the scenes, which is then also transforming that source code behind the scenes, which is then adjusting the HTML file to contain the script element(s) that then loads that transformed source code. The transformed source code is then executed on the page.

// Why use such a build process?
// Why does the code need to be transformed?

// Two main reasons:

// 1. Raw unprocessed React code won't execute in the browser, because React code uses special JSX syntax.
//      - JSX code/syntax, simply put, is HTML-like code written in JavaScript files.
//              -Out of the box, this would not work because this is not a standard JavaScript feature.
//      - To enable JSX syntax, which is crucial in React apps, the code must be transformed via a build process. This allows you to use JSX syntax while writing code, but then have it transformed to something JavaScript can interpret before the code gets executed in the browser.

// 2. The code would not be optimized for production, it would not be "minified", etc. Minification simply means that, for example, names of variables or functions are shortened to reduce the amount of JavaScript code that's served to the user. It is code that's highly optimized to be as short and small as possible to reduce the amount of code that has to be downloaded by the website visitor.

// Note: NodeJS is not just used to install packages with the NPM command or to create projects with the NPX command. It's also used, behind the scenes, by/with these tools/packages/libraries that are used by/in the React build process.
//      - NodeJS is also needed and used, behind the scenes, to make sure that your React code gets transformed.

// Lesson #17 "import" & "export"

// In React apps, like in most advanced JavaScript projects, it is considered a best practice to split your code across multiple files to keep it maintainable and manageable.
//      - That's exactly what is done with the help of the "import" and "export" keywords.

// File extensions are only required for js projects since they do not have a build process automatically, like React. React will add the file extensions to the code during the build process.

// On the same note, the type="module" attribute required for script tags in a js project, to allow access to the import/export syntax/feature, are not required in React projects. This is because during the build process, React will actually take all of the imports/exports and basically merge all these separate files into one big file, or a bunch of big files, which are then imported with the old school syntax in their correct order into the HTML file, on execution.
//      - This is also done to make sure code executes in browsers that don't natively support the import/export syntax, and also so that the browser doesn't have to download dozens of small JavaScript files, but instead just a couple of bigger files, which is typically more efficient.

// Besides exporting with help of the import/export keywords in front of a variable or function, you can also create a so-called default export by adding the default keyword - i.e. export default. In this case, you must not create a variable or assign a name. Instead, just export the value as is - i.e. export the value without a name.
//      - By adding the "default" keyword after the "export" keyword, we are saying that this should be the default element/object/value that's exported by this particular file.
//              - That's why it's very important that you must only have one default export per file.
//              - On the other hand, with just the "export" syntax without "default", you can export as many elements/values as you want from the file. Simply place the "export" keyword in front of the element(s) (stored in a variable???).
//              - With the default keyword added, directly export a value with only one default export per file.

// With a default export, import it without curly braces around the name of the variable. Just assign any variable name of your choice.
//      - Since the value that's being imported as a default doesn't have a variable name assigned to it in the file it's being exported from, you can assign it any variable name you choose in the file where you want to import.
//              - You must assign it a variable name, and then you still define the path to the file from where it is being imported - its path of origin, e.g. import { apiKey } from "./util.js"

// NOTE: You can also "export default" a function or variable that was created before. But, you can't "export default" let/const ... in a single line of code as it is being defined/created.

// NOTE: Group export variables/functions from a js file together by importing them as a JS object using the "* as" syntax - i.e. import * as utils from "./utils.js" -> console.log(utils.objectName)
//      - This also provides access to a default export by using "default" after the dot notation - i.e. utils.default

// SIDE NOTE: The "as" keyword can also be used to assign aliases(alternative variable names) in the import file - i.e. import { apiKey as key} from "utils.js" -> console.log(key)
//      - Essentially, renaming an exported variable in the import file.

// Lesson #18 Revisiting Variables & Values

// Variable Rules:

// 1. Must not contain whitespace or special characters(except for "$" and "_").
// 2. May contain numbers but must not start with a number.
// 3. Must not clash with reserved keywords.
// 4. Should use camelCasing.
// 5. Should describe what the "thing" it identifies contains or does.

// Lesson #20 Revisiting Functions & Parameters

// Functions must only have one return statement at most. Functions without a "return" implicitly return "undefined".

// Lesson #21 Arrow Functions

// Useful for creating anonymous functions - i.e. () =>
//      - However, we can create anonymous functions using the "function" keyword if exporting them as defaults - i.e. export default function () {}
//      - Alternatively, use export default () => {}

// Lesson #22 More on the Arrow Function Syntax

// Notes on Arrow Function Syntax:

// When working with Arrow Functions, you have a couple of "syntax shortcuts" available.

// 1) Omitting parameter list parentheses - if your arrow functions take exactly one parameter, you may omit the wrapping parentheses around the parameters.
//      - e.g. userName => { ... }
//      - If your function takes no parameters, parentheses must not be omitted.
//      - If your function takes more than one parameter, you also must not omit parentheses.

// 2) Omitting function body curly braces - If your arrow function contains no other logic but a return statement, you may omit the curly braces and the return keyword.
//      - e.g. number => number * 3;

// 3) Special case: Just returning an object - If you go for the shorter alternative explained in 2) and you're trying to return a JavaScript object, you may end up with the following, invalid code: number => { age: number }; // trying to return an object
//      - This code would be invalid because JavaScript treats the curly braces as function body wrappers (not as code that creates a JS object).
//      - To "tell" JavaScript that an object should be created (and returned) instead, the code would need to be adjusted like this: number => ({ age: number }); // wrapping the object in extra parentheses
//      - By wrapping the object and its curly braces with an extra pair of parentheses, JavaScript understands that the curly braces are not there to define a function body but instead to create an object. Hence that object then gets returned.

// Lesson #23 Revisiting Objects & Classes

// If a function is nested inside of an object it is typically referred to as a method.
//      - e.g. functionName() {}
//      - note that we eliminate the function keyword and just have a function name.

// Lesson #24 Arrays & Array Methods like map()

// The idea behind an array, put simply, is that you can create a list of values. Where object literals allow you to group values together with key-value pairs, the idea behind arrays is to have just values, which are stored in a certain order and which can be accessed by their index position in the list.
//      - Arrays are a very common data type in JavaScript because it turns out that you quite often need to store a list of values.
//      - Arrays can contain any kind of values/data.

// Map Method:
//      - Does not edit/modify the original array. Creates a copy of the original and makes any specified changes to the copy only.
//      - Use it to transform any element(data type) into any other kind of element(data type).
//      - e.g. const newArr = [1, 2, 3].map(item => ({val: item}))

// Lesson #25 Destructuring

// With arrays, we can choose the variable names when we destructure - e.g. const [firstName, lastName] = ["first", "last"]
// With objects, we must use the property name as the variable names -

// For array structuring, variable names are up to you because the elements are pulled out by index position. For the object, they are pulled out by property name. Therefore you have to use the same property name when pulling out the respective property's value.
//      - You could assign an alias by using a colon after the variable/property name and then defining your alias name on the right side of that colon - e.g const {name: firstName, age} = { name: "first", age: 25}
//          - When creating an object, with the curly braces on the right side of the equal sign, the colons are used to separate the key(property name)/value pairs. When using curly braces on the left side of the equal sign, for destructuring, the colon is instead used for separating the property/value that's pulled out of the object from the alias name that you are assigning to it.

// Lesson #26 Destructuring in Function Parameter Lists

// The destructuring syntax can also be used in function parameter lists.

// For example, if a function accepts a parameter that will contain an object it can be destructured to "pull out" the object properties and make them available as locally scoped variables (i.e., variables only available inside the function body).

// Example:

// function storeOrder(order) {
//   localStorage.setItem('id', order.id);
//   localStorage.setItem('currency', order.currency);
// }

// Instead of accessing the order properties via the "dot notation" inside the storeOrder function body, you could use destructuring like this:

// function storeOrder({id, currency}) { // destructuring
//   localStorage.setItem('id', id);
//   localStorage.setItem('currency', currency);
// }

// The destructuring syntax is the same as before just without creating a constant or variable manually.

// Instead, id and currency are "pulled out" of the incoming object (i.e., the object passed as an argument to storeOrder).

// It's very important to understand, that storeOrder still only takes one parameter in this example! It does not accept two parameters. Instead, it's one single parameter - an object which then just is destructured internally.

// The function would still be called like this:

// storeOrder({id: 5, currency: 'USD', amount: 15.99}); // one argument / value!

// Lesson #28 Revisiting Control Structures

// The "if" statement is called a control structure because it controls which code gets executed.

// Lesson #29 Manipulating the DOM - Not With React!

// Being able to reach out to a website and read and manipulate the DOM at runtime, is a strength of JavaScript, but it is also something we don't do when using React, because React will do it for us. This is because React code(JSX) is written in a declarative way.

// Lesson #30 Using Functions as Values

// Arrow functions never accept a name in front of them. They always are created in an anonymous way, but we can make them non-anonymous by then storing them in a constant or a variable that has a specified name - e.g. () => {} vs. const functionName = () => {}
//    arrow function | arrow function stored in a const variable

// When passing a function into another function, you are passing it as a value - setTimeout(<function-name>, 1000).
//      - Simply pass the function name as a parameter, without using the invocation parentheses.
//              - If you were to pass the function with invocation parentheses it would execute the passed function immediately, at the point in time when the function it was passed into is read by the browser/JS engine. In that case, it would not be the function that is being passed as an argument/value but rather its return value(if it has one) that is being passed into the other function as an argument.
//              - If the intent is to execute the function, passed as an argument, at some point in the future, this would not be useful.
//              - That's why you must omit the invocation parentheses so that you don't execute the function right away, and you instead pass the function as a value.

// Lesson #32 Reference vs Primitive Values

// Strings, numbers, Booleans are primitive data types.
//      - Their current values cannot be edited. However, they can be overwritten to store new values.

// Objects and Arrays are reference data types.
//      - There values can be mutated. There current value can be maintained and changed/edited/modified instead of overriding it completely.

// Summary: Simply put, an object/array variable doesn't store the value itself, but instead the address of that value in memory. The array/object is stored somewhere in memory, and it's the address of that place in memory that's stored in the constant variable that holds the array/object. When requested, JavaScript will reach out to that address in memory, open the value in that address, and add/delete/modify/mutate the existing array in memory, with the changes you request. Therefore, the array in memory changes, the address that is stored in the variable does not.

// With primitive values, you could instead say that the string itself is stored in the variable. This is technically not 100% correct, but you can think of it like this for simplicity.

// Technically, const does not mean that the value can't be edited, but that the variable can't be overwritten.
//      - When using const, I can't use the equal sign operator to assign a new value. That won't work. However, you can store objects in a constant and take advantage of the fact that those objects are accessed by reference, by address, to manipulate those values in memory by using that address.
