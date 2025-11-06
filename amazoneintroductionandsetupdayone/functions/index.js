const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

admin.initializeApp();
const db = admin.firestore();
const FieldValue = admin.firestore.FieldValue;

// Use emulator Firestore when running locally
if (process.env.FUNCTIONS_EMULATOR) {
    db.settings({
        host: "localhost:8080",
        ssl: false,
    });
}

const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Root route for health check
app.get("/", (req, res) => {
    res.status(200).json({ message: "API is running!" });
});

// Payment intent creation route
app.post("/payment/create", async(req, res) => {
    try {
        const total = parseInt(req.query.total);

        if (total > 0) {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: total,
                currency: "usd",
            });

            res.status(201).json({
                clientSecret: paymentIntent.client_secret,
            });
        } else {
            res.status(403).json({
                message: "Total must be greater than 0",
            });
        }
    } catch (error) {
        console.error("Error creating payment:", error);
        res.status(500).json({ error: error.message });
    }
});

exports.api = functions.https.onRequest(app);