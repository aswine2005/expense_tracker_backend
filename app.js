const express = require('express');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

const app = express();

// Middleware for parsing request body
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb+srv://aswin:aswin@cluster0.4bgll.mongodb.net/expenses").then(() => {
  console.log("connected to database...");
});

// Define schema for expenses
const expenseSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  amount: { type: Number, required: true }
});

const Expenses = mongoose.model("Expenses", expenseSchema);

// Get all expenses
app.get("/api/expenses", async (req, res) => {
  try {
    const expenses = await Expenses.find();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch expenses" });
  }
});

// Get a specific expense by id
app.get("/api/expenses/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expenses.findOne({ id });
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Error in fetching expenses" });
  }
});

// Add a new expense
app.post("/api/expenses", async (req, res) => {
  const { title, amount } = req.body;

  const newExpense = new Expenses({
    id: uuidv4(), // Generate a unique id for the expense
    title,
    amount,
  });

  try {
    const savedExpense = await newExpense.save();
    res.status(200).json(savedExpense);
  } catch (error) {
    res.status(500).json({ message: "Failed to save expense" });
  }
});

// Update an existing expense
app.put("/api/expenses/:id", async (req, res) => {
  const { id } = req.params;
  const { title, amount } = req.body;

  try {
    const updateExpense = await Expenses.findOneAndUpdate(
      { id }, // Use the `id` field for finding the expense
      { title, amount },
      { new: true } // Return the updated document
    );
    if (!updateExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json({ message: "Expense updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error in updating expenses", error: error.message });
  }
});

// Delete an expense by id
app.delete("/api/expenses/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedExpense = await Expenses.findOneAndDelete({ id });
    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error in deleting expenses", error: error.message });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
