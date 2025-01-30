const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb+srv://aswin:aswin@cluster0.4bgll.mongodb.net/expenses")
  .then(() => console.log("Connected to database..."))
  .catch(error => console.error("Error connecting to database", error));

// Define Expense Schema
const expenseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true }
});

// Create Expense Model
const Expenses = mongoose.model("Expenses", expenseSchema);

// Routes

// GET all expenses
app.get("/api/expenses", async (req, res) => {
  try {
    const expenses = await Expenses.find();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch expenses" });
  }
});

// POST new expense
app.post("/api/expenses", async (req, res) => {
  const { title, amount } = req.body;
  const newExpense = new Expenses({ title, amount });

  try {
    const savedExpense = await newExpense.save();
    res.status(200).json(savedExpense);
  } catch (error) {
    res.status(500).json({ message: "Failed to add expense" });
  }
});

// DELETE expense by id
app.delete("/api/expenses/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // Delete by MongoDB `_id`
    const deletedExpense = await Expenses.findByIdAndDelete(id);

    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting expense", error: error.message });
  }
});

// Start server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
