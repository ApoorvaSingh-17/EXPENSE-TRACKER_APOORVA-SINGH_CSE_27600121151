import transactions from "../models/transactionModel.js";
import moment from "moment";

const getAllTransaction = async (req, res) => {
  try{
    const { frequency, selectedDate, type } = req.body;
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

export { getAllTransaction, addTransactions, editTransaction, deleteTransaction }