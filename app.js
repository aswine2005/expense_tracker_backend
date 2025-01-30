//put ,1st id
//delete ,2nd id
const express = require('express')
const mongoose = require('mongoose');
const {v4: uuidv4 } = require("uuid");
const cors = require('cors');

const app = express();
// middle man from req to res 
app.use(express.json());
app.use(cors())
// cross resourse orgin sharing . it is used to allow the request from the different domain

mongoose.connect("mongodb+srv://aswin:aswin@cluster0.4bgll.mongodb.net/expenses").then(() => {
    console.log("connected to database...");
});

const expenseSchema = new mongoose.Schema({
    id: {type: String, required: true, unique: true},
    title: {type: String, required: true},
    amount: {type: Number, required: true}
});

const Expenses = mongoose.model("Expenses", expenseSchema);

// GET all expenses
app.get("/api/expenses", async (req, res) => {
    try {
        const expenses = await Expenses.find();
        res.status(200).json(expenses);
    } catch (error) {
        console.error("Fetch error:", error);
        res.status(500).json({ message: "Failed to fetch expenses" });
    }
});

// GET single expense by id
app.get("/api/expenses/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const expense = await Expenses.findOne({ id });
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" }); 
        }
        res.status(200).json(expense);
    } catch (error) {
        console.error("Fetch single error:", error);
        res.status(500).json({ message: "Error in fetching expense" });
    }
});

// PUT update expense
app.put("/api/expenses/:id", async (req, res) => {
    const { id } = req.params;
    const { title, amount } = req.body;

    try {
        const updateExpense = await Expenses.findOneAndUpdate(
            { id: id },
            { title, amount },
            { new: true }
        );

        if (!updateExpense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        res.status(200).json(updateExpense);
    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({ message: "Error in updating expenses", error: error.message });
    }
});

// DELETE expense
app.delete("/api/expenses/:id", async (req, res) => {
    const { id } = req.params;
    console.log("Attempting to delete expense with id:", id);
    
    try {
        const deletedExpense = await Expenses.findOneAndDelete({ id });
        console.log("Delete operation result:", deletedExpense);
        
        if (!deletedExpense) {
            console.log("No expense found with id:", id);
            return res.status(404).json({ message: "Expense not found" });
        }
        
        res.status(200).json({
            message: "Expense deleted successfully",
            deletedExpense
        });
    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ message: "Error in deleting expenses", error: error.message });
    }
});

// POST new expense
app.post("/api/expenses", async (req, res) => {
    try {
        const { title, amount } = req.body;
        const newExpense = new Expenses({
            id: uuidv4(),
            title,
            amount
        });
        
        const savedExpense = await newExpense.save();
        res.status(201).json(savedExpense);
    } catch (error) {
        console.error("Create error:", error);
        res.status(500).json({ message: "Error creating expense", error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
