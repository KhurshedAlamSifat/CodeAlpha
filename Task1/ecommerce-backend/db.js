const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(":memory:");

db.serialize(() => {
  db.run(`CREATE TABLE products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        image TEXT NOT NULL
    )`);

  const stmt = db.prepare(
    "INSERT INTO products (name, price, image) VALUES (?, ?, ?)"
  );
  stmt.run("Product 1", 89.99, "https://via.placeholder.com/150");
  stmt.run("Product 2", 199.99, "https://via.placeholder.com/150");
  stmt.run("Product 3", 59.99, "https://via.placeholder.com/150");
  stmt.run("Product 4", 39.99, "https://via.placeholder.com/150");
  stmt.run("Laptop Stand", 25.99, "https://via.placeholder.com/150");
  stmt.run("Portable Charger", 15.99, "https://via.placeholder.com/150");
  stmt.run("USB-C Hub", 29.99, "https://via.placeholder.com/150");
  stmt.run("Ergonomic Chair", 299.99, "https://via.placeholder.com/150");
  stmt.run("HD Webcam", 49.99, "https://via.placeholder.com/150");
  stmt.run("Mechanical Keyboard", 79.99, "https://via.placeholder.com/150");
  stmt.finalize(() => {
    console.log("Products have been inserted.");
  });
});

module.exports = db;
