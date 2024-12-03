import express from "express";
import { addTransactions, getAllTransaction, editTransaction, deleteTransaction, calculateMonthlySavings } from "../controllers/transactionController.js";


//router object
const router = express.Router()

//routers
//add transaction
router.post('/add-transaction', addTransactions)

//Edit Transaction
router.post('/edit-transaction', editTransaction)

//Delete Transaction
router.post('/delete-transaction', deleteTransaction)

//get Transactions
router.post('/get-transaction', getAllTransaction)

//get Monthly savings
router.post('/getMonthlySavings-transaction', calculateMonthlySavings)

export default router;