# Chapter 1: Application Routing

Welcome to your first chapter on building the `Internship-Projects` e-commerce website! In this chapter, we'll explore **Application Routing** — the GPS system for your web app.

---

## Why Routing Matters

Routing allows your website to:

- Have different **URLs** for different parts of the site.
- Display the correct content when a specific address is visited.
- Create smooth, app-like navigation without reloading the page.

Without routing, your website would be one big, messy page.

---

## Key Concepts

Think of your site as a city:

1. **Routes (Addresses)** — URL paths like `/`, `/cart`, `/detail`.
2. **Components (Buildings)** — Pages shown at those addresses.
3. **Navigation Links (Roads)** — Paths that take users to different pages.

---

## Setting Up Routing

We use [`react-router-dom`](https://reactrouter.com/) for routing.

**Example: `src/main.jsx`**

```jsx
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';
import App from './App';
import Shop from './components/Shop/Shop';
import ProductDetail from './components/Shop/ProductDetail';
import Cart from './components/Cart/Cart';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Shop />} />
      <Route path="detail" element={<ProductDetail />} />
      <Route path="cart" element={<Cart />} />
    </Route>
  )
);

<RouterProvider router={router} />;
```

---

## Where Components Render

In `App.jsx`, the `<Outlet>` is where route content appears:

```jsx
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

export default function App() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
```

---

## Navigation Links

We use `Link` and `NavLink` to navigate between pages:

```jsx
import { NavLink, Link } from 'react-router-dom';

<Link to="/">Home</Link>
<NavLink to="/cart" className={({ isActive }) => isActive ? 'active' : ''}>Cart</NavLink>
```

`NavLink` helps style active links.

---

## How It Works (Simplified)

1. User clicks a link.
2. URL changes without reloading the page.
3. Router matches the new URL to a route.
4. Matched component renders in `<Outlet>`.
5. Page updates instantly.

---

## Conclusion

Routing is the backbone of navigation in your React app. It maps URLs to components and ensures a consistent layout while swapping main content. Next, we’ll cover **Product Display & Detail Components** to bring our store to life.
