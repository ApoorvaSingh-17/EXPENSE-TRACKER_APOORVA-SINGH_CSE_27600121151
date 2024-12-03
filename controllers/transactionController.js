import transactions from "../models/transactionModel.js";
import moment from "moment";

const getAllTransaction = async (req, res) => {
  try{
    const { frequency, selectedDate, type } = req.body;
    //Fetch transaction based on frequency
  const transaction = await transactions.find({
    ...(frequency !== 'custom' ? {
      date:{
      $gt: moment().subtract(Number(frequency), 'd').toDate(),
    },
   } : {
      date: {
        $gte: selectedDate[0],
        $lte : selectedDate[1]
      }
     }),
    userid:req.body.userid,
    ...(type !== "all" && { type }),
  });
  res.status(200).json(transaction);
  } catch(error) {
    console.log(error)
    res.status(500).json(error)

  }
}

const calculateMonthlySavings = async (req, res) => {
  try {
    const { userid } = req.body;

    // Get the start and end dates for the current month
    const startOfMonth = moment().startOf("month").toDate();
    const endOfMonth = moment().endOf("month").toDate();

    // Fetch transactions for the current month
    const monthlyTransactions = await transactions.find({
      userid,
      date: { $gte: startOfMonth, $lte: endOfMonth },
    });

    // Calculate total income and expenses
    const totalIncome = monthlyTransactions.filter((txn) => txn.type === "income").reduce((sum, txn) => sum + txn.amount, 0);

    const totalExpenses = monthlyTransactions.filter((txn) => txn.type === "expense").reduce((sum, txn) => sum + txn.amount, 0);

    
    const monthlySavings = totalIncome - totalExpenses;

    res.status(200).json({ success: true, monthlySavings,totalIncome,totalExpenses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const editTransaction = async (req,res) => {
  try{
await transactions.findOneAndUpdate({_id: req.body.transactionId},
  req.body.payload
);
const updatedTransaction = await transactions.findById(req.body.transactionId);
res.status(200). json(updatedTransaction);
  }catch(error) {
    console.log(error);
    res.status(500).json(error);
  }
}

const deleteTransaction = async (req, res) => {
 try{
  await transactions.findByIdAndDelete({_id:req.body.transactionId});
  res.status(200).send("Deleted Successfully!!")
 }catch(error) {
  console.log(error);
  res.status(500).json(error);
 }
}

const addTransactions = async (req, res) => {
  try {
    const newTransaction = new transactions(req.body);
    await newTransaction.save();
    const savedTransaction = await transactions.findById(newTransaction._id);
    res.status(201).json(savedTransaction);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export { getAllTransaction, calculateMonthlySavings ,addTransactions, editTransaction, deleteTransaction }