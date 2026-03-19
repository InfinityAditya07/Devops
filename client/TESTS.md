# ShopSmart Tests

There are **88 tests** in total, split into 3 types.

---

## Quick Comparison

| Type | Tool | Where | What it does |
|------|------|--------|--------------|
| Unit | Vitest | `src/__tests__/unit/` | Tests one small piece in isolation |
| Integration | Vitest | `src/__tests__/integration/` | Tests how pieces work together |
| E2E | Playwright | `tests/e2e/` | Opens a real browser and clicks around |

---

## How to Run

```bash
npm test                  # unit + integration
npm run test:unit         # unit only
npm run test:integration  # integration only
npm run test:e2e          # E2E (headless browser)
npm run test:e2e:headed   # E2E (see the browser)
npm run test:all          # everything
```

---

## Unit Tests — 27 tests

Unit tests check one component or function at a time. Nothing talks to the network. Fast.

### Navbar — `src/__tests__/unit/Navbar.unit.test.jsx` (10 tests)

| Test | What it checks |
|------|----------------|
| Renders SHOPSMART logo | The logo text is on the page |
| Logo links to `/` | Clicking the logo goes home |
| About Us link | The link exists and points to `/about` |
| Blog link | The link exists and points to `/blog` |
| FAQ link | The link exists and points to `/faq` |
| Search input | The input is there with placeholder "Clothing" |
| Cart link | Cart icon links to `/cart` |
| Cart badge shows "2" | The badge number is visible |
| Profile link | Profile icon links to `/profile` |
| 6 category pills | All pills (New Arrivals, Sales, Men, Women, Kid's, Brand) are there |

### Hero — `src/__tests__/unit/Hero.unit.test.jsx` (10 tests)

| Test | What it checks |
|------|----------------|
| Main heading | "Unleash Your Style" is on the page |
| Shop Now button | The button is visible |
| 15 Million+ stat | The review count text is there |
| 4 avatar images | 4 user profile pictures load |
| Hero image | Main image has the right alt text |
| Cream Jacket image | Product card image loads |
| Clothes Rack image | Product card image loads |
| Explore now button | The third card button is there |
| 5 brand logos | All 5 brand names are shown |
| "Models wearing" text | The third card text is visible |

### API — `src/__tests__/unit/api.unit.test.js` (7 tests)

These tests fake the network using `vi.fn()` — no real server needed.

| Test | What it checks |
|------|----------------|
| `getProducts()` calls `/api/products` | Right URL is used |
| `getProducts()` returns data | Parses the JSON correctly |
| `getProduct(42)` calls `/api/products/42` | ID is in the URL |
| `getCart()` calls `/api/cart` | Right URL is used |
| `addToCart(item)` sends a POST | Method is POST, body has the item |
| `removeFromCart(7)` sends a DELETE | Method is DELETE, right URL |
| `searchProducts("blue dress")` encodes the query | URL has `?search=blue%20dress` |

---

## Integration Tests — 31 tests

Integration tests check that different parts work together — like a component + router, or a component + API.

### App — `src/__tests__/integration/App.integration.test.jsx` (10 tests)

| Test | What it checks |
|------|----------------|
| Navbar on home | SHOPSMART logo is visible on the home page |
| Hero on home | "Unleash Your Style" heading shows on home |
| About Us link href | Link in navbar points to `/about` |
| Blog link href | Link in navbar points to `/blog` |
| FAQ link href | Link in navbar points to `/faq` |
| Cart link href | Cart icon in navbar points to `/cart` |
| Profile link href | Profile icon in navbar points to `/profile` |
| Collections link href | Clothing pill points to `/collections` |
| Shop Now button | Button is visible on the home page |
| Navbar always present | Navbar is rendered on the page |

### Navbar — `src/__tests__/integration/Navbar.integration.test.jsx` (10 tests)

| Test | What it checks |
|------|----------------|
| About Us href | Link points to `/about` |
| Blog href | Link points to `/blog` |
| Cart href | Cart link points to `/cart` |
| Profile href | Profile link points to `/profile` |
| Search accepts typing | You can type in the search box |
| Clothing pill href | Points to `/collections` |
| New Arrivals href | Points to `/collections` |
| Sales href | Points to `/collections` |
| Cart badge count | Badge "2" is visible |
| Logo inside nav | Logo is inside the `<nav>` element |

### API — `src/__tests__/integration/api.integration.test.jsx` (10 tests)

These use `vi.spyOn()` to fake API calls and test how the component reacts.

| Test | What it checks |
|------|----------------|
| `getCart()` called on mount | Component fetches cart when it loads |
| Cart items appear | Items from the fake API show up in the page |
| Error shows fallback | If API fails, shows "Failed to load cart" |
| Empty cart message | If API returns `[]`, shows "Your cart is empty" |
| `getProducts()` returns data | Resolves with the right products |
| `addToCart()` called with item | Sends the correct item to the API |
| `removeFromCart()` called with id | Sends the right ID to delete |
| `searchProducts()` returns results | Returns filtered product list |
| `getProduct(id)` returns product | Returns the right product by ID |
| 3 cart items render as 3 elements | Correct number of items in the DOM |

---

## E2E Tests — 30 tests

E2E tests open a real browser (Chromium) and act like a user clicking around. They run against the live dev server.

### Homepage — `tests/e2e/homepage.spec.js` (5 tests)

| Test | What it checks |
|------|----------------|
| Hero heading loads | "Unleash Your Style" is visible on load |
| Navbar visible | SHOPSMART logo appears |
| Shop Now button visible | Button is on the page |
| 15 Million+ stat visible | Review count is shown |
| Page has a title | The browser tab title is not blank |

### Navigation — `tests/e2e/navigation.spec.js` (8 tests)

| Test | What it checks |
|------|----------------|
| About Us click | Goes to `/about`, shows "About Us Page" |
| Blog click | Goes to `/blog`, shows "Blog Page" |
| FAQ click | Goes to `/faq`, shows "FAQ Page" |
| Logo click | Goes back to `/` from any page |
| Cart icon click | Goes to `/cart` |
| Profile icon click | Goes to `/profile` |
| Clothing pill click | Goes to `/collections` |
| New Arrivals click | Goes to `/collections` |

### Search — `tests/e2e/search.spec.js` (4 tests)

| Test | What it checks |
|------|----------------|
| Search input is there | Visible with placeholder "Clothing" |
| Typing updates value | Input shows what you typed |
| Special characters work | Handles apostrophes and spaces |
| Clearing input works | Input is empty after clearing |

### Category Pills — `tests/e2e/category-pills.spec.js` (4 tests)

| Test | What it checks |
|------|----------------|
| All 6 pills visible | New Arrivals, Sales, Men, Women, Kid's, Brand all shown |
| Clothing dropdown visible | The main dropdown pill is there |
| Sales pill click | Goes to `/collections` |
| Men pill click | Goes to `/collections` |

### Responsive — `tests/e2e/responsive.spec.js` (4 tests)

| Test | What it checks |
|------|----------------|
| Mobile (375px) | Logo and heading visible on phone screen |
| Tablet (768px) | Logo and heading visible on tablet |
| Desktop (1440px) | Logo and nav links visible on wide screen |
| Cart badge on mobile | Badge is visible at phone size |

### Mocked API — `tests/e2e/api-mock.spec.js` (5 tests)

These use `page.route()` to intercept real API calls and return fake responses.

| Test | What it checks |
|------|----------------|
| Fake products → page loads | Page renders fine with mocked product data |
| Fake cart → cart page loads | `/cart` page opens correctly |
| POST to cart succeeds | Mock returns `{ success: true }` |
| API returns 500 → no crash | App does not break when API fails |
| Cart badge visible | Badge "2" is always shown in the navbar |
