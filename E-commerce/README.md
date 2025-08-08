# Tutorial: Internship-Projects

This project is a user-friendly **e-commerce website** designed to showcase and sell products. It provides a _seamless shopping experience_ by displaying products, allowing users to view detailed information, add items to a **shopping cart**, and see customer reviews and ratings. The application efficiently manages its data and user interactions using a combination of shared data context and centralized state management.

## Visual Overview

```mermaid
flowchart TD
    A0["Global Data Context
"]
    A1["Central State Management (Redux Store)
"]
    A2["Application Routing
"]
    A3["Product Display & Detail Components
"]
    A4["Shopping Cart Functionality
"]
    A5["User Feedback (Reviews & Ratings)
"]
    A0 -- "Provides product data" --> A3
    A0 -- "Provides review data" --> A5
    A3 -- "Updates application state" --> A1
    A1 -- "Manages cart state" --> A4
    A4 -- "Retrieves product details" --> A0
    A2 -- "Renders product views" --> A3
    A2 -- "Renders cart view" --> A4
    A1 -- "Provides navigation paths" --> A2
    A5 -- "Displays product ratings" --> A3
```

## Chapters

1. [Application Routing
   ](Documentation/Chapter1.md)
2. [Product Display & Detail Components
   ](Documentation/Chapter2.md)
3. [Global Data Context
   ](Documentation/Chapter3.md)
4. [User Feedback (Reviews & Ratings)
   ](Documentation/Chapter4.md)
5. [Central State Management (Redux Store)
   ](Documentation/Chapter5.md)
6. [Shopping Cart Functionality
   ](Documentation/Chapter6.md)

---
