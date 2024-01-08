// Section 6: Rendering Lists & Conditional Content

// lesson #88. Understanding "Keys"

// React has a special concept when it comes to rendering lists of data, keys. A concept which exists to ensure that React is able to update and render lists of data efficiently, without performance losses or bugs.

// Keys:

//  When adding new items in React, WITHOUT keys, React renders the new item as the last item in the list of elements and updates ALL items and replaces their content, such that, it matches the order of the items in the array that the new item was added to.
//      - This is happening because, to React, ALL the items/elements in the array look similar(no differentiator), and React only notices that the array changed - that it's now longer than before. Hence, it simply renders an additional element and it adds that at the end of the list in the (array and/or HTML???), then it simply "walks through"/traverses all the items/elements and updates the content inside of every item/element to match the order of the array content once again, including the new items placement at the beginning of the array. The final result is correct, but from a performance perspective, this is not ideal because all items are "visited"/traversed and updated, and it can even lead to bugs/error(potential state management issues due to overriding of state/data???).

// Solution:

// React, by default, has no other way of processing updates/changes to lists. It simply checks the length of the array and then has a look at the number of items that were already rendered. The individual items all look similar to React so it can't know where a new item should be added or anything of that nature. That's the reason for the "key" warning inside the console, because there is an option that can be added which allows React to keep track of where a new item should be added. Simply add a special "key" prop where the data(array/list of items) is being output(the function component which contains the JSX code with the map function for the respective array/list of items).
//      - "key" props can be added to any element inside of any function component, which includes other custom components - e.g. <li key={someID}>, <Component key={someID} />
//              - Add "keys" to custom components and built-in HTML elements alike.
//      - "keys" help React identify individual elements inside of lists(arrays).
//      - The "key" value can be anything but is typically some type of randomly generated id. It can also be a combination of attributes associated with the elements in the list that, when combined together, provide a unique identifier for each element in the list.
//      - It is possible to use the second argument offered by the map function, which is an automatically managed index, though using the index is discouraged, because bugs can still occur. This is because the index for a given item is always the same and not directly attached to the content of the item.
//      - The ID of an element is different, since every element in a list has its own unique ID provided within its content/data(directly attached to the element) - this is standard when working with data from databases although some lists may not provide or have unique IDs in their elements.
//      - In reality, it turns out that in most scenarios there will be some unique ID provided by the elements within a list.
//              - Typically, when rendering data, it is coming from a database. In databases, it is standard to have unique IDs with individual pieces of data(elements within lists). In that case, finding some unique identifier is no problem - any primitive value can be used as a unique identifier (numbers or strings or both).

// Summary: With "keys", React is now able to uniquely identify all the items/elements, and it's therefore aware, not just of how long the array is, but also aware of the elements' position in the list(array) - where each individual element should be placed without having to traverse the entire array every time a new element is added to the list - and it's able to update the list more efficiently.

// IMPORTANT: Always add a "key" when mapping out lists of items in React.

// Lesson #89 Outputting Conditional Content

// Only ternary expressions are allowed within JSX code.
//      - "if" statements and "for" loops are not permitted or recognized by JSX in React - only expressions can be computed in JSX code.
//      - Use the ternary operator for conditional rendering of a component and/or its elements.
//      - Add multiple expressions using short-circuiting for an even more compact approach to writing expressions, for conditional rendering in JSX.
//              e.g. {list.length > 0 && <Component />, or {Component}}
//              e.g. {!list.length ? (<p>Some message</p>) : (<Component /> or {Component})}
//                      - NOTE: The parentheses around the component/element to be displayed, within the JSX ternary/short-circuit expression, are not required.

// Alternative Approach: Store JSX code/content in JS variables, within the function component, outside/above (of) the return template, and then inject them into the return template based on a conditional - not limited to using JSX code only if it is being returned, also use it as a value, which is stored in a variable.
//      -  JSX code is usable anywhere that values are being used in the function component - it is itself a value.
//              e.g. let displayedContent = <p>Some message</p>
//            if(content.length > 0) displayedContent = content
//           return (...{content}...)

// Lesson #90 Adding Conditional Return Statements

// When adding a conditional return above the existing return statement/template, using an "if" statement, inside the function component, the return keyword must be used in the "if" statement output/return statements in order to render the alternative UI/display component, based on the condition.
//      e.g. if(condition) return <AlternativeComponent} />, or <div>...content...</div>, etc.
//              - Again, using parentheses around the return template content/components/elements is optional, as long as there is a parent element for the return statement/template - i.e. return (<Component />) -- return <Component /> -- return <div><main></main><Component /><div></div></div> <-- all acceptable.

// Lesson #92 Adding Dynamic Styles

// In React, the style attribute needs a JS object as a value.
//      - e.g. <div style={{cssProperty: value}}>content</div>
//      - For this JS object, the "key" names in the JS object represent the CSS property names, and the "values" represent the values of their respective CSS properties.
//      - Note that the style attribute requires the first set of curly braces so that it can receive JSX code - i.e. a dynamic and/or computed input, in this instance a JS object(the second set of curly braces), which will be computed dynamically based/depending on user input.

// IMPORTANT: When setting a CSS style via the style attribute in a React function component/element, if the CSS style property name has a dash in it, quotes are required around the property name, because it would otherwise be an invalid property name. Alternatively, use the camel case version of the property name to target CSS property names.
//      e.g. style={{"background-color": "yellow"}} / style={{backgroundColor: "blue"}} / style={{height: dynamicHeightVariable}}
