const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health Check Route
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "ShopSmart Backend is running",
    timestamp: new Date().toISOString(),
  });
});

const path = require("path");

// Serve static frontend files (Vite builds with base: "/shopsmart")
// So assets are at /shopsmart/assets/... — serve them correctly
app.use("/shopsmart", express.static(path.join(__dirname, "../public")));

// Also serve root-level static files (favicon, etc.)
app.use(express.static(path.join(__dirname, "../public")));

// Catch-all route: only send index.html for non-file requests
// This prevents returning HTML when .js/.css assets are missing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = app;
