const express = require('express');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require("uuid");
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://aswin:aswin@cluster0.4bgll.mongodb.net/expenses")
    .then(() => {
        console.log("connected to database...");
    })
    .catch(error => console.error("Error connecting to database", error));

const expenseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    amount: { type: Number, required: true }
});

const Expenses = mongoose.model("Expenses", expenseSchema);

app.get("/api/expenses", async (req, res) => {
    try {
        const expenses = await Expenses.find();
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch expenses" });
    }
});

app.delete("/api/expenses/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedExpense = await Expenses.findByIdAndDelete(id);

        if (!deletedExpense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error in deleting expense", error: error.message });
    }
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
