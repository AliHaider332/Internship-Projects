Welcome back! In [Chapter 2: Product Display & Detail Components](Documentation/Chapter2.md), we learned how to set up our "shop windows" and "product catalogs" to show items. But where do all those product details – the images, prices, descriptions – actually come from? And how do different parts of our website, like the main shop page and individual product detail pages, access the _same_ information without constantly asking for it?

This chapter introduces **"Global Data Context."** Imagine this as our application's central library or a shared bookshelf. Instead of passing books (data) from hand to hand (which we call "prop-drilling" in React, and it can get messy!), we put all the important books on one main shelf. Then, any component that needs a "book" (like product details or customer reviews) can simply walk to the shared shelf and pick it up.

### Why Do We Need a Shared Bookshelf for Our Data? (Motivation)

Think about our e-commerce site:

- The `NewArrival` and `TopSelling` components on the shop page need product information to display.
- The `ProductDetail` page needs the _same_ product information, but in more detail.
- The `Review` section (which appears on both the shop page and product detail page) needs customer review data.
- Even the `Cart` page needs product information to show what's been added.

If we had to fetch this data separately for _every_ component, or pass it down from the very top of our application through many layers of components, our code would become complicated and hard to manage. It's like having to copy a book every time someone wants to read it, instead of having one central library copy.

**Global Data Context** solves this by providing a single, accessible place for important data. Our goal for this chapter is to understand how we set up this "shared bookshelf" to store product information fetched from an online source and static customer reviews, making them available throughout our entire application.

### Key Concepts: The Shared Bookshelf System

To set up our global data context, we'll use a powerful feature in React called the **Context API**. Here are its key parts:

1.  **Context Object (The Bookshelf Type):** This is like defining _what kind_ of shared bookshelf we're creating. It's the blueprint for our data storage.
2.  **`Provider` (The Librarian):** This special component acts as the "librarian" who is responsible for placing the data (our "books") onto the shared bookshelf. Any component wrapped by the Provider will have access to the data.
3.  **`useContext` (The Reader):** This is a special React tool (a "Hook") that allows any component to "read" or "take a book" from the shared bookshelf provided by the `Provider`.

In our project, we have a component called `DataProvider` that plays the role of our main librarian. It fetches product data from an external source and also stores static customer review data.

### Setting Up Our Shared Bookshelf (How to Use It)

Let's see how we implement this central data system.

#### 1. Defining Our Bookshelf Type (`data.js`)

First, we define our `Context` object. This is like creating the type of bookshelf we'll use for our data.

```jsx
// E-commerce/src/ContextContainer/data.js
import { createContext } from 'react';

// We're creating a new context and giving it an empty array as a default value.
// This is our 'DATA' bookshelf blueprint.
export const DATA = createContext([]);
```

**Explanation:**
`createContext([])` creates a `Context` object. We've named it `DATA`. Think of it as telling React, "I'm setting up a shared data area, and by default, it's just an empty space."

#### 2. Our Librarian: Fetching and Providing Data (`DataProvider.jsx`)

Next, we have our `DataProvider` component. This is our "librarian" that fetches the actual product data from an external website (an API) and holds our pre-written customer reviews. It then places all this data onto our `DATA` bookshelf using the `Provider` part of the Context API.

```jsx
// E-commerce/src/ContextContainer/DataProvider.jsx
import React, { useEffect, useState } from 'react';
import { DATA } from './data.js'; // Import our DATA bookshelf blueprint

const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([]); // State to hold fetched products

  // This runs once when the DataProvider first appears
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch product data from a fake online store API
        const res = await fetch(
          'https://dummyjson.com/products/search?q=phone'
        );
        const data = await res.json();
        setProducts(data.products); // Store the products in our state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []); // Empty array means this runs only once on component mount

  // Our static review data (pre-written reviews)
  const reviews = [
    {
      name: 'Ali Raza',
      description: 'The product exceeded my expectations...',
      rating: 4.8,
    },
    {
      name: 'Sara Khan',
      description: 'Amazing value for the price...',
      rating: 4.5,
    },
    // ... many more review objects
  ];

  return (
    // We use DATA.Provider to make 'products' and 'reviews' available
    // to all components wrapped inside DataProvider.
    <DATA.Provider value={{ products, reviews }}>
      {children}{' '}
      {/* 'children' represents all the components inside DataProvider */}
    </DATA.Provider>
  );
};

export default DataProvider;
```

**Explanation:**

- `useState` and `useEffect`: These are React Hooks. `useState` helps `DataProvider` remember the products it fetched. `useEffect` is used to run the `fetchData` function _once_ when the component first loads, so it grabs the product data from the internet.
- `fetch('https://dummyjson.com/products/search?q=phone')`: This line makes a request to a fake online product database to get some sample phone products.
- `reviews`: This is a regular JavaScript array containing our pre-written customer reviews.
- `<DATA.Provider value={{ products, reviews }}>`: This is the crucial part! It tells our `DATA` context: "Hey, put these `products` (from the API) and `reviews` (static data) on the shelf." The `value` prop is where we define _what_ data is made available.
- `{children}`: This allows us to wrap our entire application (or a part of it) with `DataProvider`. All the components inside `DataProvider` (its `children`) will then be able to access the `products` and `reviews`.

#### 3. Putting the Librarian in Charge of Our Whole App (`main.jsx`)

To make sure _all_ our shop's components can access the shared data, we wrap our entire application with the `DataProvider` in `main.jsx`.

```jsx
// E-commerce/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Import our router from Chapter 1
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';
import Shop from './Component/Shop.jsx';
import ProductDetail from './Component/ProductDetail.jsx';
import Cart from './Component/Cart.jsx';
import WholeData from './Component/WholeData.jsx';

// Import Redux store (covered in Chapter 5)
import store from './Store/store.js';
import { Provider } from 'react-redux';

// Import our DataProvider and Context Object
import DataProvider from './ContextContainer/DataProvider.jsx'; // Our librarian
// (No need to import DATA here, as DataProvider handles it)

// ... router setup from Chapter 1 ...

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Step 1: Provide Redux Store (for more complex state, covered later) */}
    <Provider store={store}>
      {/* Step 2: Provide our Global Data Context */}
      <DataProvider>
        {' '}
        {/* All components inside DataProvider can access 'products' and 'reviews' */}
        {/* Step 3: Provide our Application Router */}
        <RouterProvider router={router} />
      </DataProvider>
    </Provider>
  </React.StrictMode>
);
```

**Explanation:**
By placing `<DataProvider>` around `<RouterProvider>`, we ensure that every page and every component rendered by our router (like `Shop`, `ProductDetail`, `Cart`, etc.) will have access to the `products` and `reviews` data provided by `DataProvider`. We also see the `Provider` for Redux here, which will be explained in [Chapter 5: Central State Management (Redux Store)](Documentation/Chapter5.md).

#### 4. Reading from the Bookshelf (`useContext` in Components)

Now, any component that needs the product or review data can simply use the `useContext` Hook to "read" from our `DATA` bookshelf.

**Example 1: Getting Products in `NewArrival.jsx` (Shop Window)**

```jsx
// E-commerce/src/Shop/NewArrival.jsx
import React, { useContext } from 'react';
import { DATA } from '../ContextContainer/data'; // Import our bookshelf blueprint

const NewArrival = () => {
  // Use useContext to get 'products' from the DATA context
  const { products } = useContext(DATA);

  // ... rest of the component uses 'products' to display new arrivals
  if (!products || products.length === 0) {
    return <div>Loading new arrivals...</div>;
  }
  return (
    <div>
      {/* Loop through products and display them */}
      {products.slice(0, 4).map((product) => (
        <div key={product.id}>
          <img src={product.thumbnail} alt={product.title} />
          <h3>{product.title}</h3>
          {/* ... */}
        </div>
      ))}
    </div>
  );
};
export default NewArrival;
```

**Explanation:**
`const { products } = useContext(DATA);` is like going to our `DATA` bookshelf and picking up the "products" book. Now, `NewArrival` can use this `products` array to display the items.

**Example 2: Getting Products in `TopData.jsx` (Product Detail Catalog)**

```jsx
// E-commerce/src/ProductDetails/TopData.jsx
import React, { useContext } from 'react';
import { DATA } from '../ContextContainer/data'; // Import our bookshelf blueprint
import { useSelector } from 'react-redux'; // For getting selected product ID (from Chapter 2 & 5)

const TopData = () => {
  // Get the ID of the product the user clicked (from Redux, covered in Chapter 5)
  const selectedId = useSelector((store) => store.Detail.id);

  // Get ALL products from our DATA context
  const { products } = useContext(DATA);

  // Find the specific product that matches the selected ID
  const product = products.find((item) => item.id === selectedId);

  if (!product) return <div>Product not found or still loading...</div>;

  return (
    <div>
      {/* Display product.title, product.description, etc. */}
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      {/* ... */}
    </div>
  );
};
export default TopData;
```

**Explanation:**
Here, `TopData` also gets all `products` from the `DATA` context. Then, using the `selectedId` (which was saved when the user clicked a product, as we saw in [Chapter 2: Product Display & Detail Components](Documentation/Chapter2.md), and will be discussed in more detail in [Chapter 5: Central State Management (Redux Store)](Documentation/Chapter5.md)), it finds and displays the details for _that specific_ product.

**Example 3: Getting Reviews in `Review.jsx` (Customer Reviews)**

```jsx
// E-commerce/src/ProductDetails/Review.jsx
import React, { useContext } from 'react';
import { DATA } from '../ContextContainer/data'; // Import our bookshelf blueprint

const Review = () => {
  // Get 'reviews' from the DATA context
  const { reviews } = useContext(DATA);

  return (
    <div>
      <h1>Rating & Reviews</h1>
      {/* Loop through reviews and display them */}
      {reviews.map((review, index) => (
        <div key={index}>
          <p>{review.name}</p>
          <p>{review.description}</p>
          {/* ... */}
        </div>
      ))}
    </div>
  );
};
export default Review;
```

**Explanation:**
The `Review` component simply takes the `reviews` array directly from our `DATA` context and uses it to display all the customer feedback.

### Under the Hood: The Shared Data Flow

Let's visualize how the data flows from being fetched to being used by various components:

```mermaid
sequenceDiagram
    participant AppLoad["App Loads (main.jsx)"]
    participant DataProvider["DataProvider (Librarian)"]
    participant ExternalAPI["External API (DummyJSON)"]
    participant DATAContext["DATA Context (Bookshelf)"]
    participant ProductDisplayComponent["Product Display Component (e.g., NewArrival)"]
    participant ProductDetailComponent["Product Detail Component (e.g., TopData)"]
    participant ReviewComponent["Review Component (e.g., Review.jsx)"]

    AppLoad->>DataProvider: 1. Renders DataProvider at app's root
    DataProvider->>ExternalAPI: 2. Fetches product data (using useEffect)
    ExternalAPI-->>DataProvider: 3. Returns product data
    DataProvider->>DATAContext: 4. Puts fetched products and static reviews onto the DATA Context (via DATA.Provider)
    Note over DATAContext: Context now holds { products[], reviews[] }
    DataProvider->>AppLoad: 5. Renders its children (the rest of the app)

    ProductDisplayComponent->>DATAContext: 6. Needs products (uses useContext(DATA))
    DATAContext-->>ProductDisplayComponent: 7. Provides products
    ProductDetailComponent->>DATAContext: 8. Needs products (uses useContext(DATA))
    DATAContext-->>ProductDetailComponent: 9. Provides products
    ReviewComponent->>DATAContext: 10. Needs reviews (uses useContext(DATA))
    DATAContext-->>ReviewComponent: 11. Provides reviews

    ProductDisplayComponent-->>User: Displays products on shop page
    ProductDetailComponent-->>User: Displays product details on detail page
    ReviewComponent-->>User: Displays reviews on relevant pages
```

**Step-by-step Explanation:**

1.  **App Starts:** When our application first loads, `main.jsx` renders the `DataProvider` component.
2.  **Librarian Fetches:** Inside `DataProvider`, an `useEffect` hook runs, initiating a fetch request to the `dummyjson.com` API to get product data.
3.  **Data Ready:** Once the product data arrives, `DataProvider` updates its internal state. It also has the static `reviews` data ready.
4.  **Data on Shelf:** `DataProvider` then uses `<DATA.Provider value={{ products, reviews }}>` to make both the fetched `products` and the static `reviews` available on our `DATA` context (our shared bookshelf).
5.  **App Renders:** `DataProvider` continues to render the rest of our application components.
6.  **Components Read:** Any component that needs this shared data (like `NewArrival`, `TopData`, `Review`, `Cart`, `WholeData`) can then call `useContext(DATA)` to "read" the `products` or `reviews` directly from the `DATA` context. They don't need to know _how_ or _where_ the data was fetched; they just know it's available on the shared shelf.

This system ensures that all necessary components have access to the same, up-to-date data without complicated data passing, making our application much cleaner and easier to manage.

### Conclusion

In this chapter, we've learned about **Global Data Context**, which acts like a central library for our application's data. We explored how React's Context API, specifically `createContext`, `Provider`, and `useContext`, allows us to create a shared `DATA` bookshelf where our `DataProvider` component places both dynamically fetched product information and static review data. By wrapping our entire application with `DataProvider`, we ensure that any component can easily access this data when needed.

This concept is vital for managing data efficiently in larger applications, preventing "prop-drilling" and making our code more organized. In the next chapter, we'll focus specifically on **[User Feedback (Reviews & Ratings)](Documentation/Chapter4.md)**, diving into how reviews are displayed and how users interact with them, building upon our understanding of how review data is made globally available.

---
