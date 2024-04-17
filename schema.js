const mongoose=require("mongoose")

//definig schema
const expenseDetailsSchema=new mongoose.Schema({
    amount:{
        type:Number
    },
    category:{
        type:String
    },
    date:{
        type:String
    }
})

const userDetailsSchema= new mongoose.Schema({
    username:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
})


// creating model
const Expense=mongoose.model('ExpenseDetails',expenseDetailsSchema)

const User=mongoose.model('UserDetails',userDetailsSchema)

module.exports={Expense,User}