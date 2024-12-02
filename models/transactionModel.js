import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
        userid: {
            type: String,
            required: true, 
        },
        amount: {
            type: Number,
            required: [true, "amount is required"],
        },
        type: {
            type: String,
            required: [true, "type is required"],
        },
        category: {
            type: String,
            required: [true, "category is required"],
        },
        reference: {
            type: String,
        },
        description: {
            type: String,
            required: [true, "Description is required"],
        },
        date: {
           type: Date,
           required: [true, "Date is required"] 
        }
    },{timestamps:true}
)

const transactions = mongoose.model('transactions',transactionSchema);
export default transactions;