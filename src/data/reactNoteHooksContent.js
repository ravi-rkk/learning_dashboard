export const REACT_HOOKS_NOTE_CONTENT = `What are the react Hooks?
React Hooks, introduced in React 16.8, enable functional components to use state, lifecycle, and other React features without relying on class components.

Eliminate the need for class components for state and side-effect management.
Improve code readability and encourage a functional programming style.
Widely adopted in modern React projects for cleaner and more maintainable code.

What are the type of hooks ?
React provides a range of hooks that enable functional components to manage state, side effects, and other core behaviors. Some of the most commonly used React hooks include:
State Hooks:-State hooks like useState and useReducer enable functional components to manage state in a clean, efficient, and modular way.
useState:-The useState hook allows functional components in React to store and manage data that can change over time. It is simple to use and ideal for handling basic state updates within a component.
It lets you add state variables to functional components.
It is best suited for simple and straightforward state updates.
The hook must be imported from React before using it.
Syntax:-  
const [state, setState] = useState(initialState)														state: It is the value of the current state.
setState: It is the function that is used to update the state.
initialState: It is the initial value of the state.
Working of useState()
The useState() hook allows you to add state to functional components in React. It works by:
1. Initialize State: When you call useState(initialValue), it creates a state variable and an updater function.
const [count, setCount] = useState(0);
2. State is Preserved Across Renders: React remembers the state value between re-renders of the component. Each time the component renders, React keeps the latest value of count.
3. State Updates with the Updater Function: When you call setCount(newValue) React updates the state and it re-renders the component to reflect the new state value.
<button onClick={() => setCount(count + 1)}>Increment</button>
4. Triggers Re-render: React will re-render only the component where useState was used, ensuring your UI updates automatically when the state changes.
Implementing the useState hook
Counter using useState							 2. Managing Form Input State
When to Use useState
We should use the useState Hook when:
We need a simple state management solution.
We component has state that changes over time.
The state does not require complex updates or dependencies.
useReducer:The useReducer hook is an alternative to the useState hook that is preferred when you have complex state logic. It is useful when the state transitions depend on previous state values or when you need to handle actions that can update the state differently.
Syntax:
const [state, dispatch] = useReducer(reducer, initialState);
reducer: A function that defines how the state should be updated based on the action. It takes two parameters: the current state and the action.
initialState: The initial value of the state.
State The current state returned from the useReducer hook.
dispatch: A function used to send an action to the reducer to update the state.
Implementing the useReducer hook
   1. Basic Counter using useReducer
   2. Managing Complex State with Multiple Actions
 
When to Use useReducer
The state logic is complex and involves multiple sub-values or requires sophisticated updates.

You need to manage state transitions in a predictable manner (such as when working with forms or handling multiple actions).
You have multiple state variables that depend on each other and need to be updated together.
The logic for updating the state is not just a simple assignment but involves computations, conditions, or complex updates.

Context Hooks
The useContext hook in React allows components to consume values from the React context. React’s context API is primarily designed to pass data down the component tree without manually passing props at every level. useContext is a part of React's hooks system, introduced in React 16.8, that enables functional components to access context values.
Simplifies accessing shared state across components.
Avoids prop drilling by eliminating the need to pass props down multiple levels.
Works seamlessly with React's Context API to provide global state.
Ideal for managing themes, authentication, or user preferences across the app.



Working of useContext
The useContext hook allows to consume values from a React Context, enabling easy access to shared state across multiple components without prop drilling. Here’s how it works:

useContext hook consumes values from a React Context, making them accessible to functional components.
First, create a Context object using React.createContext(), which holds the shared state.
Use useContext to access the context value in any component that needs it, avoiding prop drilling.
When the value of the Context updates, all components consuming that context automatically re-render with the new value.

Implementing the useContext Hook
1. Managing Authentication with useContext
2. Sharing a Theme Across Components
3. Passing Data Between Sibling Components Using Context

Scenarios to Use useContext
We need global state management for themes, authentication, or user preferences.
We want to avoid prop drilling.
We need state sharing between multiple components without a third-party state management library.

| useContext            | Prop Drilling              |
| --------------------- | -------------------------- |
| Shares data directly  | Passes data level by level |
| Good for global state | Good for nearby components |
| Cleaner in large apps | Messy in large apps        |
| Uses \`useContext()\`   | Uses props                 |
| Easy after setup      | Harder as app grows        |
| May re-render more    | More controlled updates    |


Effect Hooks
Effect hooks allow functional components to manage side effects in a structured and efficient manner
useEffect handles common side effects like data fetching and subscriptions.
useLayoutEffect runs synchronously after DOM updates.
useInsertionEffect manages style injections before DOM mutations.
useEffect: The useEffect hook allows functional components to handle side effects and replaces lifecycle methods like componentDidMount and componentDidUpdate.
useEffect(() => { ... }, [dependencies]); runs side effects after rendering.
The effect runs based on changes in the specified dependencies.
useLayoutEffect: useLayoutEffect is used to measure or modify the layout before the browser paints the screen, ensuring smooth visual updates without flickering.
useInsertionEffect: The useInsertionEffect is designed for injecting styles early, especially useful for server-side rendering (SSR) or styling libraries, ensuring styles are in place before the component is rendered visually.

Performance Hook
Performance Hooks in React, like useMemo and useCallback, are used to optimize     performance by avoiding unnecessary re-renders or recalculations.

useMemo Hook:-(learn partical approach)
useMemo optimizes performance by memoizing computed values and recomputing them only when dependencies change.

Memoizes Results: Stores the result of expensive computations.
Dependency-Based Execution: Recomputes only when specified dependencies change.
Improves Performance: Prevents unnecessary recalculations during re-renders.


Applications of useMemo
1. Optimizing Expensive Calculations
2. Preventing Unnecessary Re-renders

Usage of useMemo
use useMemo to optimize performance by memoizing values when needed.

Expensive Calculations: When computations should not run unless dependencies change.
Large Data Sets: When working with heavy data processing.
Stable References: To prevent unnecessary re-renders of child components.
Avoid Overuse: Use only when needed to prevent added complexity and memory overhead.

useCallback:-The useCallback Hook memoizes a function so it is not recreated on every render. It improves performance when passing callbacks to child components.

Returns the same function reference until dependencies change.
Helps prevent unnecessary re-renders.
Useful when working with memoized child components.

Scenario to Use useCallback
You should use useCallback when

Passing functions as props to child components to prevent unnecessary re-renders.
Avoiding unnecessary function re-creations inside useEffect or event handlers.
Ensuring function references remain stable across renders.

| Feature              | useCallback                           | useMemo                               |
|----------------------|----------------------------------------|----------------------------------------|
| Purpose              | Memoizes a function                    | Memoizes a value                       |
| Returns              | Function reference                     | Computed value                         |
| Main Use             | Prevents function recreation           | Prevents expensive recalculations      |
| Syntax               | useCallback(() => {}, [deps])          | useMemo(() => value, [deps])           |
| Re-runs When         | Dependencies change                    | Dependencies change                    |
| Common Use Case      | Passing callbacks to child components  | Optimizing heavy calculations          |
| Example              | handleClick function                   | totalPrice calculation                 |
| Performance Benefit  | Avoids unnecessary re-renders          | Avoids repeated calculations           |


Resource Hooks(useRef)
useRef is a React hook used to store mutable values or access DOM elements without triggering re-renders.

Persists values across renders without affecting the UI.
Commonly used for DOM references and mutable variables.
countRef holds the mutable count value.
useState (forceRender) triggers re-renders to reflect changes in the UI.
When the Increment button is clicked, countRef is updated.
setForceRender forces a re-render to update the UI.
The updated count is displayed in an <h1> tag, not in a prompt.


Custom Hooks:-A custom hook is a JavaScript function that starts with use and internally calls other hooks like useState, useEffect, or useContext. It allows developers to extract reusable logic, keeping components clean and modular.

Steps to Create a Custom Hook
1. Define a Function That Starts with use
2. Use React's Built-in Hooks Inside Your Custom Hook
3. Add Logic Inside useEffect for Side Effects
5. Use the Custom Hook in Components
4. Return Necessary Values



Other Hooks:-React offers additional hooks for specific use cases
useImperativeHandle: useImperativeHandle customizes the instance value exposed by useRef.
useDebugValue: Displays custom labels for hooks in ReactDevTools.`;
