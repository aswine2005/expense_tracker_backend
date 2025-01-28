//put ,1st id
//delete ,2nd id
const express = require('express')
const mongoose=require('mongoose');
const {v4: uuidv4 } = require("uuid");
const cors = require('cors');

const app=express();
// middle man from req to res 
app.use(express.json());
app.use(cors())
// cross resourse orgin sharing . it is used to allow the request from the different domain

mongoose.connect("mongodb+srv://aswin:aswin@cluster0.4bgll.mongodb.net/expenses").then(() =>{
    console.log("connected to database...");
});

const expenseSchema=new mongoose.Schema({
    id: {type: String, required: true , unique:true},
    title: {type: String, required: true},
    amount: {type: Number, required: true}

});

const Expenses = mongoose.model("Expenses", expenseSchema);

app.get("/api/expenses", async (req,res)=>{
try{
  const expenses = await Expenses.find();
  res.status(200).json(expenses)}
  catch(error){
    res.status(500).json({ messagee: "Failed to fetch expenses"});
  }
});
// get is used to fetch the data
app.get("/api/expenses/:id", async ( req, res) =>{
    try{
        const {id} = req.params
        const expense = await Expenses.findOne({id})
        if(!expense) {
            return res.status(404).json({message: "Expense not found "}); 
        }
        console.log(expense);
        res.status(200).json(expense);
    }
    catch(error) {
        res.status(500).json({ message: "Error in fetching expenses"});
    }
});

// put is use to update the data
app.put("/api/expenses/:id", async (req, res) => {
    const { id } = req.params;
    const { title, amount } = req.body;

    try {
        const updateExpense = await Expenses.findOneAndUpdate(
            { _id: id }, // Adjust field name if necessary
            { title, amount },
            { new: true } // Ensure the updated document is returned
        );

        if (!updateExpense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        res.status(200).json({ message: "Expense updated successfully"});
    } catch (error) {
        res.status(500).json({ message: "Error in updating expenses", error: error.message });
    }
});

//to delect 
app.delete("/api/expenses/:id", async (req, res) => {
    const { id } = req.params;
    try{
        const deletedExpense = await Expenses.findOneAndDelete({id});
        if(!deletedExpense){
            return res.status(404).json({message: "Expense not found"});
        }
        res.status(200).json({message: "Expense deleted successfully"});
    }catch(error){
        res.status(500).json({message: "Error in deleting expenses", error: error.message});
    }
});


app.post("/api/expenses", async (req , res) =>{
    const {title,amount} = req.body;
  

    const newExpense =new Expenses({
       id : uuidv4(),
       // both are same (title: title,) == (title,)
       title: title,
       amount: amount,
        
    });
    const savedExpense = await newExpense.save();
    res.status(200).json(savedExpense)

});

  

app.listen(3000,()=>{
  console.log("Server is running on http://localhost:3000");
});
