// Section 3: React Basics and Working With Components

// Lesson #37 What Are Components? And Why Is React All About Them?

// Why is React all about components?
// Because all user interfaces in the end are made up of components.

// What is a component?
// Reusable building blocks in a user interface.
//      - Components are, in the end, just a combination of HTML code, CSS code for styling, and possibly JavaScript code for some logic.
//      - You don't have to reuse a component to make it a component. It's just one of its traits that it is reusable.
// Components, or individual building blocks, are combined to build a user interface.
//      - Components can be as granular as required.
//              - Components can be broken down into smaller and smaller components if desired.
//      - In the end, all user interfaces can be split up into components - into containers, buttons, input elements, and items, which are being output to the browser.
//              - All user interfaces, on all kinds of web applications, can be split up into components.

// Summary: React is all about components. Build individual components and then instructing React, in a delcarative way, how to compose them together into a final user interface.

// React embraces this concept of components because of the reusability aspect and because it allows us to separate our concerns.

// Both concepts are important concepts in programming in general. Having reusable building blocks helps us avoid repetition, and in programming in general, it is good if we don't repeat ourselves. Having a separation of concerns helps with keeping the code base small and manageable.
//      - Instead of having one large file which holds all the HTML code and all the JavaScript logic for the entire user interface, using small separated units(components), where every component has one clear concern, one focus, one specific task it focuses on. These small pieces of code that are split across multiple files then are easy to manage and maintain.

// This concept of componentization is not unique to React. Instead, by taking a step back from React and thinking about programming in general, for any programming language, and no matter what is being built, programmers tend to work with functions, and splitting code up into multiple small functions, which then may call each other, to outsource logic into a function, to separate concerns, and to be able to execute the same code multiple times if needed. React just picks up this concept of functions, and of separating code across functions, and translates it to the front end web application world where entire user interfaces are built by splitting code up into multiple components, which can then be mixed and matched as needed.

// Lesson #38 React Code Is Written In A "Declarative Way"!

// How is a Component Built?

// Starting Note: In the end, user interfaces are about HTML, CSS and JavaScript. Therefore all components are about combining HTML, CSS and JavaScript. With React, when we build components, we are combining these elements: HTML, CSS and JavaScript. Then, after we build the components, we combine all of the components together to build the entire user interface.
//      - React is all about building these components, that are both reactive and reusable, and combining them together.

// NOTE: React uses something which is called a declarative approach for building these components. With React, that basically means you will always define the desired end state, the target state(s) depending on different conditions and it's then React's job to figure out which elements on the actual webpage might need to be added or removed or updated.
//      - As the programmer, you do not write concrete DOM updating instructions on your own as you would be doing with just Vanilla JavaScript. Instead, with React and React components, you just define the target end states, and under which conditions which state should be used, and then React will do all of the rest under the hood. You could say that, in the end, we just build our own custom HTML Elements and combine them together for building a user interface.

// Lesson #41 Analyzing a Standard React Project

// The index.js file is actually the first code file that will be executed whenever the homepage of a React app is loaded.
//      - Index.js is the first file in a React app to execute.
//      - To be technical, it's a transformed version of that code - optimization and compression is occurring behind-the-scenes with the help of React Scripts and other tools.

// NOTE: Notice the ReactDOM import at the top of the index.js file. This ReactDOM object, along with the React object, form the React library, which is used to build React applications - in general, these two dependencies/packages are what allow us to write React code and JSX syntax to build React applications, also React Scripts help with optimization and compression of files.
//      - See the two React dependencies, react and react-dom. While techincally, these are two separate packages, think of them as the React library - it's split across two packages with different responsibilities, but in the end, ReactDOM and React, these two dependencies together form the React library. Therefore, whenever we import something from React, or from ReactDOM, they're basically both all about React, and we're using React features in the index.js file as noted by the ReactDOM import at the top of the file.
//              - This simply makes a feature exposed by the React(DOM) library available inside of the index.js file because that's how modern JavaScript works in general.

// The ReactDOM library is imported into index.js to then call a method on it, the createRoot method. This creates the main entry point of the overall user interface you build with React - that's the idea behind createRoot. This method tells React where the React application, the user interface, should be placed in the web page that is loaded. That takes us to one other file, the index.html file in the public folder. While rarely used when creating React apps, it holds one very important file, the index.html file. This is the single HTML file in the entire React Directory/App, which is loaded by the browser.
//              - It is basically the only HTML file that is being used by the React application. This is why React apps are called single page applications(SPAs) - it has a single HTML file and all subsequent changes on the user interface, on the web page, will be handled by React. It's this single HTML file that is the entry point, the place where the React-driven user interface will be rendered.
//              - In this index.html file, there is a regular HTML document structure, and in the body there is a div with the id "root". That's a regular div, which actually doesn't hold any content, but that's the div where we want to attach, or inject, our React-driven user interface.

// NOTE: Omit the ".js" syntax on imported third-party libraries/packages and JS files.
//      - It is a local app file if we have it starts with a relative path "./"
//      - "./" means in the same folder, "../" means in a folder above the level of the current folder.

// NOTE: Modern React components are built using HTML code inside of JS files/functions(JSX syntax) - JSX stand for JavaScript XML, because HTML in the end is XML.

// Lesson #43 How React Works

// The declarative approach - React:

// With React, we define the desired target state, and React is then responsible for generating and running the actual DOM instructions, which updates what's visible on the screen.

// The imperative approach - JS:

// Giving clear and precise step-by-step instructions on what JavaScript and the browser should be doing.
//      - This works, but it can be cumbersome for complex user interfaces, with dozens or hundreds of elements, which also might be changing and appearing and disappearing regularly.

// Lesson #44 Building Our First Custom Component

// Best practice: Place new components into new files, so that you have one file per component.

// NOTE: App.js is a special kind of component - not regarding its code, but regarding its role in the application. It will be our so-called, "root" component, which means it's the main component being rendered in the starting file, index.js. All the components will either be nested inside of App.js or nested inside of other components, which then in turn again, are nested somewhere else.
//      - With React, we build a "component tree"; the main app component at the top, and then below that, any other kind of custom HTML elements(components), which in the end, hold other pieces of the user interface.
//              - Big applications can result in quite big component trees, where only the top most component is rendered directly into the HTML page, with help of the ReactDOM render method.

// Best practice: Place components in a separate components file, and name each component using snakecase - e.g. NewComponent.js

// NOTE: A Component in React is just a JavaScript function.
//      - A special kind of function, in that it returns JSX code, but other than that, it's just a JavaScript function.
//      - Components are just JS functions which return HTML code.

// IMPORTANT: When inserting a custom component/element into an application,

// The key difference between custom components/elements and "built-in" HTML elements is that the custom elements must start with an uppercase character - custom components must start with an uppercase character when using JSX syntax, so that React is able to detect that it is a custom component/element.
//      - This is because the simple rule which React applies is that elements which start with a lowercase character are "built-in" HTML elements - it will look for them as "built-in" elements. Whereas elements starting with an uppercase character are custom elements defined by the developer. Therefore, we use the same name of the custom component imported at the top of the file to name the custom HTML element/component we nest within the JS function component that contains the JSX syntax, because that is how the connection is established to imported components from other files.

// Summary: Create a component, which is just a JS function returning some HTML code, then export it. Ultimately, import the component into the file where it is to be used so that, within the JSX code, it can be inserted just like an HTML element, except starting with an uppercase character.

// Lesson #45 Writing More Complex JSX Code

// RULE: Inside of a component there must only be one root element per return statement, or per JSX code snippet, you could say.
//      - Also, wrap the entire return statement inside of parentheses so as to signal to React that this is all one code snippet/return statement.

// Lesson #46 Adding Basic CSS Styling

// Typically, the CSS styles for a given component are placed in their own CSS file next to the component in the component folder.
// To make the overall build process aware of a CSS file for a given component we must import that specific CSS file at the top of the component file, like we do for importing other components, libraries, packages, etc.
//      - e.g. import from "./<fileName>.css"

// To add CSS styles to the contents of a component, use "className" in place of "class" to add class attributes to the JSX elements.
//      - This is because "class" is a reserved keyword in JS - technically, "class" still works, but we should use "className".

// Lesson #47 Outputting Dynamic Data & Working with Expressions in JSX

// Write pure Javascript code, without using JSX syntax, in a function component, above the return statement, and then insert that code into the return statement via JSX syntax - this is very common in React apps.
//      - The return statement contains the custom HTML elements that are displayed in the user-interface. The JSX syntax allows for inserting dynamic JS code into these custom HTML elements that is reactive to a user's input or a state change initiated by the user or other server-side input or eventListener.
//      - Use single, opening and closing brackets to insert/inject/run dynamic JS code/expressions inside of a custom HTML element in a React component - this is basic JSX syntax.
//      - e.g. <div>{JSvariable.name}</div>, <div>{Math.random()}</div>

// Lesson #48 Passing Data via "props"

// We can make our components reusable by using parameters and a concept called "props" in React.
//      - Props are the "attributes" of your custom HTML elements(components)
//              - Props stands for properties.
//      - Components can't just use data stored in other components. The parent component must pass down the stored data, as props, to the child component to allow them to access that data.
//      - Pass this data, via props, by adding a custom attribute/prop(name the prop) to the child component from the parent component function/file, where the data lives, and then pass in the respective data(variable/function/value/etc) you wish to pass to the child component.
//      - On the parent component file, inside the parent component functions return statement...<ChildComponent attributeName={data/function/variable/etc} />
// The child component can then access this data via props, by adding the props keyword to its parameters and then using dot notation to clarify which piece of data it would like to insert into the custom HTML element(component), or destructure the passed prop by adding the name of the attribute that was passed between opening and closing curly braces within the child components parameters.
//      - e.g. On child component file, inside the child component function...function ChildComponent(props) {...<li>{props.attributeName}</li>, or function ChildComponent({attributeName}) {...<li>{attributeName}</li>

// NOTE: React will ensure that we get one parameter in every component which we use as a component, and that one parameter will be an object which holds all of the passed attributes as properties, hence the name props for the overall concept.
//      - The component receives key/value pairs from the props object.
//      - This props parameter can be given a custom name(name it whatever you want). The standard is to name it "props".

// Make components truly reusable and configurable by using this props concept, which is one of the key concepts React has to offer. You'll use props all the time.

// Lesson #49 Alternative Ways of Passing & Receiving / Handling "props"

// Instead of passing individual elements of an object as props, pass the entire object as a prop, which the child component can then use as needed.
//      - e.g. before: title={el.title} desc={el.desc} date={el.date}
//             after: el={el} -> props.el.title, props.el.desc, props.el.date

// Both approaches are fine: pass a single prop, which contains the entire object, or multiple props, which contain the individual values.

// Exclusive to the child component receiving the prop:

// Object destructuring inside the parameter list.
//      - e.g. function ChildComponent({title, desc, date}) -> {title}, {desc}, {date} - we no longer have to include the dot notation as we have pulled the individual values out of the props object that was passed to the child component via destructuring.
//      - This is standard JavaScript syntax for using object destructuring right in the function parameter list.

// Lesson #50 Adding "normal" JavaScript Logic to Components

// We want to make sure that we can pass data into our components to make them configurable and reusable.
//      - We can pass dynamic data into props or hardcode the data we pass into props - e.g. title={el.title}, title="titleName"

// Lesson #52 The Concept of "Composition" ("children props")

// Generally, this approach of building a user interface from smaller building blocks is called composition.

// What if we wanted to create a component which actually just serves as a shell around any kind of other content?

// Sometimes you want a component where you don't configure everything through props but where instead you're able to pass content between the opening and closing tags of that component.

// We could focus on surrounding container divs, where multiple components have the same styles, and therefore have duplicate css code, and extract the styles they have in common into a separate component. Such a component could be named after the type of styles that are being implemented on the components such as: Card.js, Box.js, BackDrop.js, etc.
//      - Referring to Card.js, the term card typically means some kind of container with rounded corners, drop shadows, etc.
//      - Once we create a Card.js component, and place all the same(duplicate) styles used across different components in their own Card.css file, we can wrap all of the components that use those styles with this Card.js "shell" component - improving the readability and simplicity of the application's code.
//      - Think of it as a "shell" or "wrapper" component, a reusable wrapper component - a type of Higher-Order Component(HOC).

// To make the Card Component work as a component shell/wrapper, Card.js must have a props parameter. However, it will not be configured to work with attributes but instead it will use one special prop which is built into React, which every component receives, but isn't available unless set explicitly within the component, props.children.
//      - To output/use props.children, it must be placed, using JSX syntax, between the opening and closing tags of its return statement parent div, inside of the component function.
//      - "Children" is a reserved name. The value of this special prop will always be the content between the opening and closing tags of the custom shell/wrapper component, that is what will be available on props.children inside of the Card component file.
//      However, for this example, it must be configured to include any className attributes not included in the Card.css file, all of the default HTML components css classes, which are not included in the custom components styles, Card.css.
//      - The custom Card.js "shell" or "wrapper" component will only support the attributes you explicitly set/tell it to support. To set it to include all of the additional classNames that exist on HTML elements between the opening and closing tags of the Card Component, make a separate "classes" variable above the return statement inside the Card function and assign to it the value of the current class name on the parent div in the return statement(in this example the class name is "card") of the Card function in the Card component file, with a white space after, "card " + props.className - i.e. const classes = "card " + props.className.
//      - Now, anything we receive as a className from outside the Card component file is added to the string stored in the "classes" variable that was previously defined, and any value set on the prop.className is added to this string of different class names, which is then finally dynamically set, using JSX syntax, on the parent div of the return statement, inside of the Card function within the Card file - i.e. return <div className={classes}>{props.children}</div>

// Best Use Cases:

// Modals, alerts, tabs, etc.
//      - Anywhere that code duplication is likely.

// Summary:

// Whenever you combine components, you are using composition. An especially important part of composition is the props.children feature, which allows you to also create wrapper components, which is a special type of component,which can be very helpful for simplifying and improving code.

// Lesson #53 A First Summary

// React uses components and props to create applications via a delcarative approach. In the end, what ends up on the screen are just default HTML elements.
//      - Custom components are not really HTML elements, which end up on the screen, you just use them in React code(JSX) to make writing applications easy and simple. What ends up on the screen are just the HTML elements because, ultimately, every custom component, either uses these built-in HTML elements, or it uses another component, which at some point, if you drill into the components deeply enough, will end up using these built-in elements.
//      - JSX isn't supported by the browser. JSX is just syntactic sugar.

// Lesson #54 A Closer Look At JSX

// In all modern React project setups, which are created by "create-react-app", the React library no longer needs to be imported. That is all handled behind-the-scenes.
//      - In the past, in older React projects, React needed to be imported in all React component files - in all files where JSX syntax is used.
//      - The React library no longer needs to be imported at the top of every React component file because that is being taken care of behind-the-scenes by modern React project setups.
//      - This React import was needed in the past because JSX code is just syntactic sugar. Under the hood, JSX code is actually transformed into methods that are then called on the React object.

// Using JSX in modern-day React projects, is the same as writing the following code -> React.createElement(), which takes 3 arguments.
//      - As shown, createElement is a method found on the imported React object.
//      - Modern-day React(JSX syntax) -> return ( content )

// The first argument is the element which should be created, e.g. <div> - if it's a built-in HTML element, just pass in a string with the name of that element, like "div".

// The second argument is an object that configures the element from the first argument. Specifically, an object which sets all the attributes of this element. If no attributes, then pass an empty object.

// The third argument is the content between the opening and closing div tags. It's not just a third argument, because it can have an infinitely long list of "arguments", which are the different content pieces between the opening and closing tags.

// Example Code:

// return React.createElement(
//     "div",
//     {},
//     React.createElement("h2", {}, "content"),
//     React.createElement(ComponentName, {key:value})
// )

// This example shows why it was necessary to import React from "React" in all component files, in the past, because this is the under-the-hood code, which gets created "automatically" when using JSX.

// Now, in more modern project setups, this React import can be omitted because the project setup is able to make that transformation without the import being added.

// This is why a parent "wrapper" element, usually a div element, is necessary in the return statement, because in the createElement method, you always create one element, which then may have more child(ren) elements. That's the reason for the single wrapper root JSX element(typically a div) which we always need.
