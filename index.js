// FUNCTIONALITIES OF THE APPLICATION
// END POINTS
// EXPRESS APPLI
// DB CONN
// SCHEMA DEFINITION AND CREATING MODEL
// adding new expense  --> add expense(post)
// view existing expense --> get expenses(get)
// edit --update(patch)
// deleting expense---delete(delete)
///nandhud

//Database ==expense tracker
//collection=>ExpenseDetails
        // EXPENSE DETAILS
            // -amount(number)
            // -category(string)
            // -date(String)
        //USERDETAILS
            // -username
            // -emailID
            // -password
const express=require('express')
const app=express()
const bodyParser=require('body-parser')
app.use(bodyParser.json())
// importing variable from another file
const {Expense}=require("./schema")
const {User}=require("./schema.js")

//importing mongoose

const mongoose=require('mongoose')

async function connect()
{
    try{
    await mongoose.connect('mongodb+srv://717821f236:4uSoHhWqQeMzm6hj@cluster0.1f6iyvm.mongodb.net/ExpenseTracker?retryWrites=true&w=majority&appName=Cluster0')
    app.listen(8000,function()
{
    console.log("Listening ......")
})
    }
    catch(error)
    {
        console.log(error)
        console.log("couldn't establish DB connection");
    }
}
connect()

app.post("/addexpense",async function(request,response){
    try{
        await Expense.create({
            "amount":request.body.amount,
            "category":request.body.category,
            "date":request.body.date
        })
        response.status(201).json({
            "status":"success",
            "msg":"successsss"
        })
    }
    catch(error)
    {
        response.status(500).json({
            "status":"failure",
            "msg":"not created",
            "error":error
        })
    }
})

//to view existing data
app.get("/get-expense",async function(request,response)
{
    try{
    const expenseDetails=await Expense.find()
    response.status(200).json(expenseDetails)
    }
    catch(error)
    {
        response.status(500).json({
            "status":"failure",
            "msg":"could not fetch data",
            "error":error
        })
    }
})

//params
//delete 
app.delete("/delete-expense/:id",async function(request,response){
    try{
    await Expense.findByIdAndDelete(request.params.id)
    response.status(200).json({
        "status":"success",
        "msg":"entry deleted"
    })
    }
    catch(error)
    {
        response.status(500).json({
            "status":"failed",
            "msg":"couldn't delete entry"
        })
    }
})

app.patch("/update-expense/:id",async function(request,response){
    try{
        await Expense.findByIdAndUpdate(request.params.id,{
            "amount":request.body.amount,
            "category":request.body.category,
            "date":request.body.date
        })
        response.status(200).json({
            "status":"success",
            "message":"entry updated"
        })
    }
    catch(error)
    {
        response.status(500).json({
            "status":"failure",
            "message":"couldn't update data",
            "error":error
        })
    }
})