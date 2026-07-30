// const express = require("express");

// const app = express();

// const PORT = 3000;

// app.get("/health", (req, res) => {
//     res.json({
//         service: "orders-api",
//         status: "UP"
//     });
// });

// app.get("/orders", (req, res) => {
//     res.json([
//         {
//             id: 1,
//             product: "Laptop",
//             quantity: 2
//         },
//         {
//             id: 2,
//             product: "Mouse",
//             quantity: 5
//         }
//     ]);
// });

// app.listen(PORT, () => {
//     console.log(`Orders API running on ${PORT}`);
// });

const app = require('./server');

app.listen(3000, () => {
    console.log('Server running on port 3000');
});