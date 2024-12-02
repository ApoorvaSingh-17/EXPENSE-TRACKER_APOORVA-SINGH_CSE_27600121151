import express from "express";
import { addTransactions, getAllTransaction, editTransaction, deleteTransaction } from "../controllers/transactionController.js";


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

export default router;