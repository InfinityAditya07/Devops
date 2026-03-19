// API layer for ShopSmart — mock-friendly fetch wrapper

const BASE_URL = "/api";

export async function getProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  return res.json();
}

export async function getProduct(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  return res.json();
}

export async function getCart() {
  const res = await fetch(`${BASE_URL}/cart`);
  return res.json();
}

export async function addToCart(item) {
  const res = await fetch(`${BASE_URL}/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  return res.json();
}

export async function removeFromCart(id) {
  const res = await fetch(`${BASE_URL}/cart/${id}`, {
    method: "DELETE",
  });
  return res.json();
}

export async function searchProducts(query) {
  const res = await fetch(
    `${BASE_URL}/products?search=${encodeURIComponent(query)}`,
  );
  return res.json();
}
