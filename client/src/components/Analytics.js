import React from 'react';
import { Progress } from 'antd';


const Analytics = ({ allTransaction }) => {

   //category
   const categories = [
    "salary", 
    "tip", 
    "project", 
    "food", 
    "movie", 
    "travel", 
    "bills", 
    "medical", 
    "fees", 
    "shopping", 
    "tax", 
    "others"  
    ];




    //total transaction
    const totalTransaction = allTransaction.length;
    const totalIncomeTransaction = allTransaction.filter(transaction => transaction.type === 'income')
    const totalExpenseTransaction = allTransaction.filter(transaction => transaction.type === 'expense')
    const totalIncomePercent = (totalIncomeTransaction.length / totalTransaction) * 100
    const totalExpensePercent = (totalExpenseTransaction.length / totalTransaction) * 100
   
   //total turnover
   const totalTurnover = allTransaction.reduce((acc,transaction) => acc + transaction.amount, 0);
   const totalIncomeTurnover = allTransaction.filter(transaction => transaction.type === 'income').reduce((acc, transaction) => acc + transaction.amount, 0)
   const totalExpenseTurnover = allTransaction.filter(transaction => transaction.type === 'expense').reduce((acc, transaction ) => acc + transaction.amount, 0)
   const totaIncomeTurnoverPercent = (totalIncomeTurnover / totalTurnover) * 100
   const totalExpenseTurnoverPercent = (totalExpenseTurnover / totalTurnover) * 100
    return (
    <>
      <div className='row m-3' >
        <div className='col-md-4'>
            <div className='card'>
                <div className='card-header'>
                 Total Transactions : {totalTransaction}   
                </div>
                <div className='card-body'>
                    <h5 className='text-success'>Income : {totalIncomeTransaction.length}</h5>
                    <h5 className='text-danger'>Expense : {totalExpenseTransaction.length} </h5>
                </div>
                <div className='display'>
                <Progress  type= 'circle' strokeColor={'#4caf50'} className='mx-2'
                    percent={totalIncomePercent.toFixed(0)}
                />
                <Progress  type= 'circle' strokeColor={'#ff6f61'} className='mx-2'
                    percent={totalExpensePercent.toFixed(0)}
                    
                />
                </div>
            </div>
        </div>
        <div className='col-md-4'>
            <div className='card'>
                <div className='card-header'>
                 Total Turnover : {totalTurnover}   
                </div>
                <div className='card-body'>
                    <h5 className='text-success'>Income : {totalIncomeTurnover}</h5>
                    <h5 className='text-danger'>Expense : {totalExpenseTurnover} </h5>
                </div>
                <div className='display'>
                <Progress  type= 'circle' strokeColor={'#4caf50'} className='mx-2'
                    percent={totaIncomeTurnoverPercent .toFixed(0)}
                />
                <Progress  type= 'circle' strokeColor={'#ff6f61'} className='mx-2'
                    percent={totalExpenseTurnoverPercent.toFixed(0)}
                    
                />
                </div>
            </div>
        </div>
      </div>
      <div className='row mt-3'>
        <div className='col-md-6'>
            <h4>CategoryWise Income</h4> 
            {
                categories.map(category => {
                    const amount = allTransaction.filter(
                        (transaction) => 
                        transaction.type === 'income' && 
                        transaction.category === category 
                        )
                    .reduce((acc, transaction ) => acc + transaction.amount,0);
                    return (
                        amount > 0 &&
                        <div className='card-category' key={category}>
                            <div>
                            <h5>{category}</h5> 
                            <Progress
                            percent={((amount/totalIncomeTurnover) * 100).toFixed(0)} />
                            </div>
                        </div>
                    )
                })
            }
        </div>
        <div className='col-md-6'>
            <h4>CategoryWise Expense</h4> 
            {
                categories.map(category => {
                    const amount = allTransaction.filter(
                        (transaction) => 
                        transaction.type === 'expense' && 
                        transaction.category === category 
                        )
                    .reduce((acc, transaction ) => acc + transaction.amount,0);
                    return (
                        amount > 0 &&
                        <div className='card-category' key={category}>
                            <div>
                            <h5>{category}</h5> 
                            <Progress
                            percent={((amount/totalExpenseTurnover) * 100).toFixed(0)} />
                            </div>
                        </div>
                    )
                })
            }
        </div>
      </div>
    </>
  )
}

export default Analytics
