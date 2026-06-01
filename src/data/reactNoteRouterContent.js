export const REACT_ROUTER_NOTE_CONTENT = `React Router
React Router is a library used in React to manage client-side routing by mapping URL paths to components without reloading the page.

Client-Side Routing: Enables navigation without full page reloads.
URL Mapping: Connects URL paths to specific components.
Dynamic Navigation: Allows seamless switching between views.
Improved Performance: Updates only required components instead of the whole page.

Note:-
Declarative routes cannot work by themselves.
They need a router provider like BrowserRouter.
Because React Router also provides other router types:

BrowserRouter
HashRouter
MemoryRouter

Example:



Types of Routers in React
React provides several types of routers that serve different purposes. The main routers in React are

Browser Router (<BrowserRouter>)
BrowserRouter is a powerful and commonly used router in React applications, and it’s ideal for web applications that require clean, SEO-friendly URLs and rely on server-side routing.


BrowserRouter is a component provided by React Router to enable client-side routing using the HTML5 history API, allowing navigation without full page reloads. It also updates the browser URL dynamically while preserving the application state during view changes.

Client-side navigation: Handles routing in the browser using the HTML5 history API, avoiding full page reloads.
State-preserving URL updates: Changes the browser URL during navigation while keeping the app state intact.
Enables Routing: BrowserRouter wraps the application, allowing URL-based navigation without page reloads.
Defines Routes: Routes contain Route components, mapping paths (/, /about) to specific React components.

Features of BrowserRouter
Real URL Updates: Reflects navigation in the browser's address bar using the HTML5 History API (pushState / replaceState).
Back & Forward Support: Native browser history buttons work out of the box for seamless navigation.
Deep Linking: Users can bookmark, share, or directly access any route via its URL.
SEO-Friendly: Clean, readable URLs (e.g., /products/123) are indexable by search engines.
Server-Side Rendering Ready: Pairs well with SSR frameworks like Next.js for full-stack React apps.


Hash Router (<HashRouter>)
Memory Router (<MemoryRouter>)
Static Router (<StaticRouter>)
Native Router (<NativeRouter>)`;
