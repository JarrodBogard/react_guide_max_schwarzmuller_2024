// Section 7: Styling React Components

// Lesson #97 Setting Dynamic Inline Styles

// Using standard css rules(regular css with regular css selectors), even if they exist in separate css files, and importing them into specific function component files, does not scope them down to those specific files(function component files). They are still (globally???) available to any (component) file within the React application - e.g. if a class name is applied to the className attribute in a JSX element, (anywhere in the project???), it will still apply those styles associated with that particular class, regardless of which css file they are located in.

// The trim() method removes excess whitespace at the beginning or end of an input entry.

// When writing css styles(css properties) inside JSX code, use the JS property name for the css property, which is written in camel case - e.g. borderColor, backgroundColor, etc.
// IMPORTANT: Inline styles, which have the highest priority in css, will override all the css styles in the css files.

// Lesson #98 Setting CSS Classes Dynamically

// A better alternative to inline styles:

// Instead of adding css styles dynamically via inline styling, add a new css property, that resides within a css file, to a parent element, dynamically - the new property could be added depending on a condition, which is set or determined by a piece of state.
//      - A piece of state connected to a conditional, which determines whether or not a css property is added to an element, would change/update based on a user input, for example, and the change in state would result in the conditional either being true or false, which in turn adds or removes the css property on the element.
//              - Depending on the conditional the css property would either be added or removed from the element, which would in turn affect the styling of the parent and child elements in real time.
//              - Use a template literal in the className attribute on JSX elements to implement this process - e.g. <div className={`classOne ${conditional ? "classTwo" : ""}`}>content</div>
//                      - It is possible to add multiple dynamically added classes within the same className attribute.

// NOTE: When writing a css rule, placing css class names next to each other, without spacing between them, sets a requirement on the HTML elements using that rule to have both class names in their class attribute, in order to apply the associated styling of that rule.
//      - css file -- .classOne.classTwo div {styleValues...}

// IMPORTANT:  This process allows for working with css styles and css files only, instead of overriding those styles and files with inline styles.
//      - Dynamically add or remove classes with a simple syntax, and it will be Reacts job to actually add or remove the classes in the DOM.

// Lesson #99 Introducing Styled Components

// As mentioned, regular css files with regular css selectors being imported into component files, does not result in those styles being scoped to those components only - that means if any other element/component, anywhere else in the DOM, has those css selectors attached( to the appropriate element attributes), those styles would target that element as well and would affect its styling.
//      - By default, regular css files, with regular css selectors, are not scoped.

// NOTE: Any and all css selectors are permitted in React applications - i.e. classes, IDs, tags, etc.

// Two Approaches to avoid conflicting/clashing css styles/selectors:

// 1. Styled-Components(package):
//  styled-components is a package that helps build components, which have certain styles attached to them, where the styles only affect the components to which they are attached, and not any other components.
//      - Run npm install --save styled-components, inside of the project folder.

// Note: A tagged template literal - e.g. const Button = styled.button``
//      - Tagged template literals are a default JavaScript feature and not specific to the styled-components package, nor specific to React, which can be used in any JS project.
//      - In the example above, "button" is a method on the "styled" object. "Styled" is an object being importing from the styled-components library, and with that access to the button method is made available.
//              - It's just a "special" kind of method - instead of being a method which is called with parentheses - i.e. styled.button() - it is called by using backticks - i.e. styled.button``, you add these strange - again, this is just a default JS syntax which is supported by JavaScript.
//                      - In the end, it will be executed as a standard JS method, and what is passed between the backticks will be passed into the method, just in a special way that is executed behind the scenes.
//                      - Once the button method is executed, a new button component will be generated based on the value passed into the button method - the executed expression will return a button (component) with the styles provided/specified between the backticks.
//                              - With the backtick syntax, write a multi-line string of css style properties/values across multiple lines without any extra syntax - minor adjustments will need to be made to the standard css rules syntax -- minor adjustments involve removing any css selectors and simply adding the css properties/values.
//                              - Since this is creating a "styled" button component, the css selectors are not required, because the styles are being applied directly to the component and only to this specific component, no others.

// NOTE: There are no places to set up css selector names in the styled-component's html methods like "button". Therefore, css selectors are not included when adding values to the methods, and cannot be applied or used in styled-components.
//      - e.g. Const Button = styled.button`font: 20px; padding: 1px, 2px; color: white;`

// IMPORTANT: The styled package has methods for all HTML elements. It has a "p" method for a paragraph, "h1", "h2", "div" and so on...It's all there.

// IMPORTANT: For pseudo-selectors, place an "&" before the colon followed by the selector - i.e. `... &:focus {outline: none;} &:hover, &:active {background: blue;}`
//      - The same rule applies to nested elements and nested/connected class names - i.e. & label {font-weight: bold; display: block;} & input {display: block; width: 100%} & input:focus {outline: none;} &.classNameOne input {border-color: "purple"} &.classNameTwo label {color: "green"}
//      - the "&" tells the styled component method to target the pseudo-selector, nested elements, or nested/connected class (or id???) names, respectively.

// IMPORTANT: The returned styled component, by default, applies all the props, passed to the button component - still add the onClick prop, for example, still add the "type" attribute to a button component, for example, etc.
//      - (The styled-components package passes on any associated attributes/props with their respective styled component - this is done internally by the styled-component method???).

// These are class names dynamically generated by the styled-components package.

// Summary: What the styled-components pacakage does is it looks at the css styles passed to the styled method. Then it wraps those styles into generated class names where it guarantees that every class name is unique. This prevents any spillover to other components of the React app. It will then add these classes as global CSS, but now since they have unique class names for every styled component, the (css) style setup will never be able to affect another component in the app, because these unique class names are unique per styled component. That's how the styling is applied and that's how styled-components work.

// Lesson #100 Styled Components & Dynamic Props

// Create styled components in the file where there are being used, or create it in a new file to make it more reusable. There can be multiple (styled) components per file. It might make sense to create a styled component in the file it is being used, especially if that file is the only location in the React app it is being used in.
//      - Having one component per file generally is a good rule to keep, but if there is a component that is only getting used by the other component in that file, having both components in the same file can make sense too.

// REMEMBER: The styled components returned by the styled component functions forward/pass all props/attributes set on them to the underlying components. Therefore, they can still receive attributes like className, props, onClick, onChange, etc - a styled component, returned by a styled component function, forward all the props set on it to the underlying component.
//      - e.g. <StyledComponent className="class-one" onClick={handleClick} function={functionHandler} (onChange={props.onAddChange}???)/>
//      - Add props to styled components and utilize those props inside of the backtics of the styled component function, for the css styles, to easily change styles dynamically, by using JS Template Literal expressions(takes an anonymous function), within the styled component function.

// Lesson #102 Using CSS Modules

// CSS Modules is a feature which is only available in projects that are configured to support it, because it needs a code transformation that must be done before the code runs in the browser.
//      - React projects created with "create-react-app" are already configured to support CSS Modules.
//      - If creating a React app, without using "create-react-app", refer to the "css modules" section, of the React documentation, to implement css modules.

// In order to implement css modules in a function component, import "classes" or "styles" from the CSS file - i.e. import styles from "./cssFilename.module.css"
//      - It is also necessary to add ".module" in the name of the css file being imported - i.e. cssFilename.module.css
//              - These changes are a signal to the underlying "compilation" process to transform the code so that css modules work.

// Once the above changes are made to the css files and imports, apply the changes via the className attribute on the function component tag.
//      - Instead of applying a class name via a string, apply something dynamic. Refer to the "styles" import, which is actually an object that contains all of the styles from the associated css file that is being imported - in that styles object, is every class/id/selector/pseudo-selector defined in the associated css file as a property on the styles object. Therefore, just specify which styles are to be applied to the elements in the function component using dot notation - e.g. <Component className={styles.button} />
//              - The result of using css modules in this way is that React takes this code and transforms it and then returns the converted code to the web browser.
//                      - The converted code for the css modules is Component name,underscore,class name within the CSS file, double underscore, some unique hash - e.g class=Component_class__hash23$#

// What using css modules does to the build process, under-the-hood, is it takes the css classes from the css file and basically changes those class names to be unique - that's the core thing it does.
//      - For every component where css modules are implemented, it changes the class names of the classes from the css file that is being imported into unique identifiers.
//              - It generates brand new class names for each class for each component so that duplicates do not occur, preventing errors/cross-over with styles in a React app.
//                      - Expand the head in the rendered Dom to view a list of the newly generated style tags/sheets with the newly generated class names. This css modules concept ensures that the css styles from a css file, imported into a function component, are scoped to that specific function component. It's necessary to use css classes because those classes are then accessible as properties on the imported styles object. That is how the connection is made between the dynamically generated class names, which developers don't see/know in advance, and the function component.
