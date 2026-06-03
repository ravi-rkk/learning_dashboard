/** React.js stack notes — exact user content, fixed sequence */
import { REACT_HOOKS_NOTE_CONTENT } from './reactNoteHooksContent.js';
import { REACT_ROUTER_NOTE_CONTENT } from './reactNoteRouterContent.js';

export const REACT_NOTES = [
  {
    id: 'fs1',
    stack: 'react',
    topic: 'what is react?',
    tags: ['React', 'Library', 'SPA'],
    status: 'Complete',
    preview: 'React is a powerful JavaScript library for building fast, scalable front-end applications.',
    content: `React is a powerful JavaScript library for building fast, scalable front-end applications. Created by Facebook, it's known for its component-based structure, single-page applications (SPAs), and virtual DOM, enabling efficient UI updates and a seamless user experience.it is also used to build dynamic and interactive user interfaces.`,
    updatedAt: '2 days ago',
  },
  {
    id: 'fs2',
    stack: 'react',
    topic: 'why react is popular/why we use react in todays?',
    tags: ['React', 'Virtual DOM', 'Popular'],
    status: 'Complete',
    preview: 'Before React, front-end development struggled with manual DOM manipulation and complex state.',
    content: `Before React, front-end development struggled with:

- **Manual DOM Manipulation:** Traditional JavaScript directly modified the DOM, slowing down the performance.
- **Complex State Management:** Maintaining UI state became messy and hard to debug.
- **Tight Coupling in Frameworks:** Frameworks like Angular introduced complex two-way data binding that made code harder to manage.

React solved these issues with a modern and modular approach.

## Core Features

- **Virtual DOM:** React updates only the changed parts of the DOM, resulting in faster rendering.
- **One-Way Data Binding:** Ensures predictable and easy to debug data flow.
- **Component-Based Architecture:** Breaks UI into reusable pieces, improving the code reusability and scalability.`,
    updatedAt: '3 days ago',
  },
  {
    id: 'fs3',
    stack: 'react',
    topic: 'How react working?',
    tags: ['Virtual DOM', 'Reconciliation'],
    status: 'Complete',
    preview: 'React operates by creating an in-memory virtual DOM rather than directly manipulating the browser’s DOM.',
    content: `React operates by creating an in-memory virtual DOM rather than directly manipulating the browser’s DOM. It performs necessary manipulations within this virtual representation before applying changes to the actual browser DOM.`,
    updatedAt: '4 days ago',
  },
  {
    id: 'fs4',
    stack: 'react',
    topic: 'How DOM Working explain?',
    tags: ['DOM', 'Virtual DOM', 'Reconciliation'],
    status: 'Complete',
    preview: 'Actual DOM and Virtual DOM: React compares previous and new Virtual DOM via reconciliation.',
    content: `## Actual DOM and Virtual DOM

Initially, there is an Actual DOM(Real DOM) containing a div with two child elements: h1 and h2. React maintains a previous Virtual DOM to track the UI state before any updates.

## Detecting Changes

When a change occurs (e.g., adding a new h3 element), React generates a New Virtual DOM. React compares the previous Virtual DOM with the New Virtual DOM using a process called reconciliation.

## Efficient DOM Update

React identifies the differences (this case, the new h3 element). Instead of updating the entire DOM, React updates only the changed part in the New Actual DOM, making the update process more efficient.`,
    updatedAt: '5 days ago',
  },
  {
    id: 'fs5',
    stack: 'react',
    topic: 'what are the feature of the react ?',
    tags: ['JSX', 'Hooks', 'Router', 'State'],
    status: 'Complete',
    preview: 'Below are the few features of React:- Virtual DOM, Component-Based Architecture, JSX...',
    content: `Below are the few features of React:-

- **Virtual DOM:** React uses a Virtual DOM to optimize UI rendering. Instead of updating the entire real DOM directly.
- **Component-Based Architecture:** React follows a component-based approach, where the UI is broken down into reusable components.
- **JSX (JavaScript XML):** React uses JSX, a syntax extension that allows developers to write HTML inside JavaScript.
- **One-Way Data Binding:** React uses one-way data binding, meaning data flows in a single direction from parent components to child components via props. This provides better control over data and helps maintain predictable behavior.
- **State Management:** React manages component state efficiently using the useState hook (for functional components) or this.state (for class components). State allows dynamic updates without reloading the page.
- **React Hooks:** Hooks allow functional components to use state and lifecycle features without needing class components.
- **React Router:** React provides React Router for managing navigation in single-page applications (SPAs). It enables dynamic routing without requiring full-page reloads.`,
    updatedAt: '5 days ago',
  },
  {
    id: 'fs6',
    stack: 'react',
    topic: 'what are the Application of React?',
    tags: ['Web', 'React Native', 'Dashboard'],
    status: 'Complete',
    preview: 'Web Development, Mobile Apps, Enterprise Applications, Dashboards and Data Visualization.',
    content: `- **Web Development:** React is used to build dynamic and responsive web apps like social media, e-commerce, and blogs platforms.
- **Mobile Apps:** React Native helps build iOS and Android apps using a single codebase.
- **Enterprise Applications:** Used for large-scale applications that need highly interactive UIs.
- **Dashboards and Data Visualization:** Ideal for real-time dashboards and data visualization tools due to high performance.`,
    updatedAt: '6 days ago',
  },
  {
    id: 'fs7',
    stack: 'react',
    topic: 'What is the React JS ReactDOM?',
    tags: ['ReactDOM', 'render', 'createPortal'],
    status: 'Complete',
    preview: 'ReactDOM is a core React package that provides DOM-specific methods.',
    content: `React JS ReactDOM:-ReactDOM is a core React package that provides DOM-specific methods to interact with and manipulate the Document Object Model (DOM), enabling efficient rendering and management of web page elements.

## ReactDOM is used for

- **Rendering Components:** Displays React components in the DOM.
- **DOM Manipulation:** Allows efficient DOM updates.
- **Server-Side Rendering:** Supports rendering on both client and server.
- **React & DOM Bridge:** Connects React with the browser’s DOM.

## Function we use in ReactJsDOM

| Function                   | Meaning                           | Status     |
| -------------------------- | --------------------------------- | ---------- |
| \`render()\`                 | Display component                 | Current    |
| \`ReactDOM.render()\`        | Old way to display component      | Old        |
| \`findDOMNode()\`            | Get actual HTML element           | Deprecated |
| \`ReactDOM.findDOMNode()\`   | Same as above                     | Deprecated |
| \`unmountComponentAtNode()\` | Remove component                  | Old        |
| \`createPortal()\`           | Render component elsewhere in DOM | Current    |


## For better understanding

### Real Life Analogy

**Imagine:**
- React = Chef who cooks food.
- ReactDOM = Waiter who serves food to table.
- Browser DOM = Customer table.
- Chef makes food, but waiter delivers it.

**Same:**
React creates UI, ReactDOM displays it in browser.`,
    updatedAt: '1 week ago',
  },
  {
    id: 'fs8',
    stack: 'react',
    topic: 'What is the React JSx?',
    tags: ['JSX', 'Babel', 'createElement'],
    status: 'Complete',
    preview: 'JSX is a powerful syntax extension in React that makes writing and managing UI components easier.',
    content: `What is the React JSx?
JSX is a powerful syntax extension in React that makes writing and managing UI components easier and more readable
It lets developers write HTML-like code directly inside JavaScript.
JSX improves code clarity by combining structure and logic in one place.
It is compiled into regular JavaScript before running in the browser

Example:-const element = <h1>Hello, world!</h1>;
Explations:-
<h1>Hello, world!</h1> is a JSX element, similar to HTML, that represents a heading tag.
JSX is converted into JavaScript, where React uses React.createElement() to create React elements (virtual DOM representations).

Working of jsx
When React processes this JSX code, it converts it into JavaScript using Babel. This JavaScript code creates React elements (virtual DOM), which React then uses to efficiently update the real browser DOM.

[Note: Babel acts as a translator for your React code. It takes modern JavaScript (like JSX) that browsers don't understand directly. Finally, it converts it into older, compatible JavaScript so your application runs everywhere.]

Important point :-
JSX is not directly understood by browsers. So, it gets converted into JavaScript by a tool called Babel. After conversion, the JSX becomes equivalent to React.createElement() calls. After transformation JSX becomes.


uses of jsx:-
Embedding Expressions
Embedding expressions means using JavaScript expressions inside JSX using curly braces {}.

JSX Attributes
JSX attributes are used to pass properties to HTML elements or React components.

Passing Children
Children are components or elements passed between opening and closing component tags and accessed using props.children.

JSX Represents Objects
JSX is syntactic sugar for React.createElement() and gets converted into JavaScript objects internally.



| Concept                | Meaning                                |
| ---------------------- | -------------------------------------- |
| Embedding Expressions  | Using JS inside JSX with \`{}\`          |
| Using Attributes       | Adding properties to JSX tags          |
| Passing Children       | Sending elements inside component tags |
| JSX Represents Objects | JSX converts into JS objects           |`,
    updatedAt: '1 week ago',
  },
  {
    id: 'fs9',
    stack: 'react',
    topic: 'What is rendering Elements?',
    tags: ['render', 'createRoot', 'JSX'],
    status: 'Complete',
    preview: 'React elements are the smallest building blocks of a React application.',
    content: `What is rendering Elements?
React elements are the smallest building blocks of a React application. They are different from DOM elements and they represent a description of what you want to see on the screen.

some more points for the rendering Elements:-

They are plain JavaScript objects describing the UI structure.
Unlike browser DOM elements, React elements are lightweight and immutable.
React uses these elements to build a virtual DOM and then efficiently update the real DOM.
React elements tell React what to render, not how to render it

How it works explain?
When browser runs index.js:

**Step 1:-**React creates a root container
ReactDOM.createRoot(...)

**Step 2:-**React calls:
root.render(<App />);

Step 3:-<App /> component executes
function App() {
   return (
      <div>
         <h1>Welcome to GeeksforGeeks!</h1>
      </div>
   )
}

**Step 4:-**React converts JSX into real HTML

JSX:
<h1>Welcome to GeeksforGeeks!</h1>
becomes:
<h1>Welcome to GeeksforGeeks!</h1>

**Step 5:-**React inserts that HTML into:
<div id="root"></div>
So finally browser sees:
<div id="root">
   <div>
      <h1>Welcome to GeeksforGeeks!</h1>
   </div>
</div>

Very Simple Real-Life Analogy

Think:
App.js = Movie content 🎬
index.js = Projector system 📽️
render() = Showing movie on screen

First:

React reads App
Executes component
Gets JSX
Converts JSX → HTML
Updates browser DOM

Visual Flow
index.js
   ↓
root.render(<App />)
   ↓
App component executes
   ↓
Returns JSX
   ↓
React converts JSX to HTML
   ↓
Browser displays UI`,
    updatedAt: '1 week ago',
  },
  {
    id: 'fs10',
    stack: 'react',
    topic: 'what is lists in React?',
    tags: ['map()', 'key', 'filter', 'reduce'],
    status: 'Complete',
    preview: 'lists are used to render multiple elements dynamically from arrays or objects.',
    content: `what is lists in React?
lists are used to render multiple elements dynamically from arrays or objects, making UI development efficient and reusable. The map() function helps iterate over data and return JSX for repeated elements.

some more point of list
Lists display dynamic data like users, products, or tasks in a structured way.
The map() function iterates over arrays and returns JSX for each item.
A unique key prop helps React efficiently update and re-render elements.
Lists improve code readability, reusability, and overall performance.

note:-
Why key is required in map?
When React re-renders a list, it needs to know which item is which. Without key, if you add or remove an item, React re-renders the entire list. With key, React knows exactly which one changed and only updates that one. Always use a unique stable value — id from the database is perfect.

map is a JavaScript array method that transforms every item in an array into something new and returns a new array of the same length. The original array is never changed. In React we use it to transform data from an API into JSX elements to render on the screen.

what's the difference between map, filter and reduce
All three are non-mutating array methods. map transforms every item — same length in and out. filter removes items that don't pass a condition — shorter array out. reduce collapses the entire array into a single value like a total or a count.

map doesn't mutate the original array — it always returns a brand new array



Importance of the 'key' Prop in React Lists:-
In React lists, the key prop helps the DOM identify which elements are added, changed, or removed, enabling efficient updates and smoother rendering.

Keys help React update only the changed elements instead of re-rendering the entire list.
A unique key prevents unexpected UI behavior and improves performance.

what are the types of list we have?
List with Objects
Conditional Rendering in Lists
List with a Click Event

what is the Reactjs key?
A key serves as a unique identifier in React, helping to track which items in a list have changed, been updated, or removed. It is particularly useful when dynamically creating components or when users modify the list.

Issue with index as keys:-
When we use index as key and add/remove/reorder items in the array, indexes change. During reconciliation React compares old and new lists using keys, and because indexes changed React may mismatch elements and incorrectly update the UI.

How we fix this one ?
We should avoid using index as a key in dynamic lists because indexes can change when items are added, removed, or reordered. This may cause incorrect UI updates during React reconciliation. Instead, we should use unique and stable IDs as keys.`,
    updatedAt: '2 weeks ago',
  },
  {
    id: 'fs11',
    stack: 'react',
    topic: 'what is react components?',
    tags: ['Functional', 'Class', 'Props'],
    status: 'In Progress',
    preview: 'React components are reusable UI units that handle their own logic.',
    content: `what is react components?
React components are reusable UI units that handle their own logic, accept data through props, manage state, and efficiently update only the parts of the UI that change.

what are the type of React Components?
There are two type of react components
Functional components
Functional components are the basic building blocks in React used to create and manage user interface elements
They are simple JavaScript functions that return JSX.
They accept props to pass data and customize components.
They help create reusable and easy-to-maintain UI components.

When a functional component receives input and is rendered, React uses props and updates the virtual DOM to ensure the UI reflects the current state.

Props: Functional components receive input data through props, which are objects containing key-value pairs.
Processing Props: After receiving props, the component processes them and returns a JSX element that defines the component's structure and content.
Virtual DOM: When the component is rendered, React creates a virtual DOM tree that represents the current state of the application.
Re-rendering: If the component's props or state change, React updates the virtual DOM tree accordingly and triggers the component to re-render.


Functional Component with Props:-
Props in React allow functional components to receive data and behave dynamically.

Props are passed from parent components to child components.
They help make components reusable and customizable.
Data in a component changes based on the props it receives.

When to Use ReactJS Functional Components?
Functional components should be used whenever possible because they are simpler, easier to read, test, and maintain. With the introduction of React Hooks, functional components can now handle state and lifecycle features that were previously only available in class components.

State management: Functional components can use the useState Hook to manage state, so class components are no longer required for stateful logic.
Lifecycle methods: Hooks like useEffect can replace lifecycle methods such as componentDidMount, componentDidUpdate, and componentWillUnmount.
Modern best practice: Functional components with Hooks are now the recommended and standard approach in React development.

Passing Props to a ReactJS Functional Component?
1. Passing a Single Prop to a React Functional Component:
2. Destructuring Props

Class Components
Class components are ES6 classes that extend React.Component. They allow state management and lifecycle methods for complex UI logic.

Used for stateful components before Hooks.
Support lifecycle methods for mounting, updating, and unmounting.

Structure of React Class Components
Class Declaration:-The component is declared as a class that extends React.Component. This inheritance gives the class access to React’s methods and properties.

Constructor: The constructor() method is used to initialize the component’s state and bind event handlers. It is optional, but if used, it must call super(props) to initialize the parent Component class.

Render Method: The render() method is the only required method in a class component. It returns JSX, which represents the structure of the UI. Whenever the state or props change, the render() method is re-invoked.

State: Class components can manage their own internal state using the this.state property. The state is mutable and is used to store values that change over time, such as user input or API responses.

Event Handlers: Event handlers are typically methods in the class. They are used to handle user interactions like clicks, form submissions, etc. These methods often use this.setState() to update the component's state.

Props in Class Components: Props allow data to flow from parent components to child components. They are accessible via this.props. Props cannot be changed by the component itself; they are controlled by the parent component.


Difference between

| Functional Component                 | Class Component                       |
| ------------------------------------ | ------------------------------------- |
| Simple JavaScript function           | ES6 class                             |
| Easier and shorter syntax            | More boilerplate code                 |
| Uses Hooks (\`useState\`, \`useEffect\`) | Uses lifecycle methods                |
| Does not use \`this\` keyword          | Uses \`this\` keyword                   |
| Props accessed directly              | Props accessed using \`this.props\`     |
| State handled using Hooks            | State handled using \`this.state\`      |
| State updated using setter function  | State updated using \`this.setState()\` |
| Better readability                   | More complex                          |
| Preferred in modern React            | Older React approach                  |
| Better for reusable logic with Hooks | Logic reuse is harder                 |
| Faster to write and maintain         | More code to maintain                 |
| No render method required            | Must use \`render()\` method            |
| Mainly used nowadays                 | Rarely used in new projects           |`,
    updatedAt: '2 weeks ago',
  },
  {
    id: 'fs12',
    stack: 'react',
    topic: 'What is the React Lifecycle?',
    tags: ['Mounting', 'Updating', 'Unmounting'],
    status: 'In Progress',
    preview: 'The React component lifecycle describes the different stages a component goes through.',
    content: `What is the React Lifecycle?
The React component lifecycle describes the different stages a component goes through, allowing code to run at specific moments during its existence.

Covers phases like creation, update, and removal of a component.
Helps manage side effects and resources efficiently.
Improves application performance through controlled execution.

Phases of Lifecycle in React Components:-

Mounting: Initializes, renders, and mounts the component (componentDidMount()).
 
Mounting refers to the process of creating and inserting a component into the DOM for the first time in a React application. During mounting, React initializes the component, sets up its internal state (if any), and inserts it into the DOM.

constructor:-Method to initialize state and bind methods. Executed before the component is mounted.
           working:-
           Initializes the component’s state and prepares it for rendering.
           Calls super(props) to enable access to this.props and logs when the                     	   component is created.
 
getDerivedStateFromProps:-Used for updating the state based on props. Executed before every render.
         working:-
         Syncs the component’s state with updated props before rendering.
         Returns a new state object when props change, or null if no update is              	 needed.
render():-Responsible for rendering JSX and updating the DOM.
         working:-
         Returns JSX that defines what should be displayed on the screen.
         Executes during every render phase to update the UI based on current  	  	 state and props.
 
componentDidMount():-This function is invoked right after the component is mounted on the DOM, i.e. this function gets invoked once after the render() function is executed for the first time.

working:-
      Runs once after the component is mounted to the DOM.
      Commonly used for side effects like API calls and initializing data.

Updating: Handles state/prop changes, re-renders, and updates (componentDidUpdate()).
    Updating is the phase where a component re-renders in response to changes in          its state or props, ensuring the UI reflects the latest data.

getDerivedStateFromProps():-getDerivedStateFromProps(props, state) is a static method that is called just before the render() method in both the mounting and updating phase in React. It takes updated props and the current state as arguments.
 
Compares incoming props with the current state to decide if state should be updated
Returns a new state object when synchronization is required, otherwise returns null

setState() Function:-This is not particularly a Lifecycle function and can be invoked explicitly at any instant. This function is used to update the state of a component.
Updates the component’s state explicitly and can be called at any time.
Uses previous state and props to calculate the new state safely.

shouldComponentUpdate():-shouldComponentUpdate() is a React class lifecycle method that controls whether a component re-renders by comparing current and next props or state and returning true or false.
It returns true or false, if false, then render(), componentWillUpdate(), and componentDidUpdate() method does not get invoked.

getSnapshotBeforeUpdate():-The getSnapshotBeforeUpdate() method is invoked just before the DOM is being rendered. It is used to store the previous values of the state after the DOM is updated.

componentDidUpdate():- this function is invoked after the component is rendered, i.e., this function gets invoked once after the render() function is executed after the updation of State or Props.


Unmounting: Cleans up before removal (componentWillUnmount()).
This is the final phase of the lifecycle of the component, which is the phase of unmounting the component from the DOM. The following function is the sole member of this phase.

componentWillUnmount()

This function is invoked before the component is finally unmounted from the DOM, i.e., this function gets invoked once before the component is removed from the page, and this denotes the end of the lifecycle.


Class component Vs Functional component
| Class Components                                                                                    | Functional Components                                                 |
| --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| State initialized using \`constructor()\`                                                             | State managed using \`useState()\`                                      |
| Uses lifecycle methods like \`componentDidMount()\`, \`componentDidUpdate()\`, \`componentWillUnmount()\` | Uses \`useEffect()\` for lifecycle handling                             |
| Updates handled with \`shouldComponentUpdate()\` and \`componentDidUpdate()\`                           | Updates handled using \`useEffect()\` dependency array                  |
| Cleanup done in \`componentWillUnmount()\`                                                            | Cleanup returned from \`useEffect()\`                                   |
| Logic tied to lifecycle methods                                                                     | Uses hooks like \`useState\`, \`useEffect\`, \`useCallback\`, \`useMemo\`     |
| Uses \`this\` keyword                                                                                 | Does not use \`this\` keyword                                           |
| More boilerplate code                                                                               | Cleaner and shorter code                                              |
| Harder to reuse stateful logic                                                                      | Easy to reuse logic with custom hooks                                 |
| Performance optimization using \`PureComponent\` or \`shouldComponentUpdate()\`                         | Performance optimization using \`React.memo\`, \`useMemo\`, \`useCallback\` |
| Lifecycle methods are separated                                                                     | Related logic can stay together inside hooks                          |
| Mainly used in older React projects                                                                 | Preferred in modern React development                                 |
| Requires extending \`React.Component\`                                                                | Simple JavaScript function                                            |
| Example: \`class App extends React.Component\`                                                        | Example: \`function App()\`                                             |
| State accessed using \`this.state\`                                                                   | State accessed directly from hook variables                           |
| State updated using \`this.setState()\`                                                               | State updated using setter function from \`useState()                  |`,
    updatedAt: '2 weeks ago',
  },
  {
    id: 'fs13',
    stack: 'react',
    topic: 'What are the react Hooks?',
    tags: ['useState', 'useEffect', 'useContext', 'useMemo'],
    status: 'Pending',
    preview: 'React Hooks, introduced in React 16.8, enable functional components to use state, lifecycle, and other React features.',
    content: REACT_HOOKS_NOTE_CONTENT,
    updatedAt: '3 weeks ago',
  },
  {
    id: 'fs14',
    stack: 'react',
    topic: 'React Router',
    tags: ['BrowserRouter', 'HashRouter', 'Routes'],
    status: 'Pending',
    preview: 'React Router is a library used in React to manage client-side routing by mapping URL paths to components.',
    content: REACT_ROUTER_NOTE_CONTENT,
    updatedAt: '3 weeks ago',
  },
];
