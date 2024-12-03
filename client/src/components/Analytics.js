import React from 'react';
import { Progress } from 'antd';
import { useState, useEffect } from 'react';
import { message } from 'antd';
import axios from 'axios';


const Analytics = ({ allTransaction }) => {

    const [monthlySavings, setMonthlySavings] = useState(0);
    const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [monthlyExpense, setMonthlyExpense] = useState(0);

  // Fetch Monthly Savings
  const fetchMonthlySavings = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const res = await axios.post('/transactions/getMonthlySavings-transaction', {
        userid: user._id,
      });
      setMonthlySavings(res.data.monthlySavings);
      setMonthlyIncome(res.data.totalIncome);
      setMonthlyExpense(res.data.totalExpenses);
    } catch (error) {
      console.error(error);
      message.error('Failed to fetch monthly savings');
    }
  };

  useEffect(() => {
    fetchMonthlySavings();
  }, []);


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
                 TOTAL TRANSACTIONS : {totalTransaction}   
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
                 TOTAL TURNOVER :  ₹ {totalTurnover}   
                </div>
                <div className='card-body'>
                    <h5 className='text-success'>Income : ₹ {totalIncomeTurnover}</h5>
                    <h5 className='text-danger'>Expense : ₹ {totalExpenseTurnover} </h5>
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

        <div className="col-md-4">
          <div className="card">
            <div>
              <h5 className='card-header'>MONTHLY SAVINGS</h5>
            </div>
            <div className="card-body">
            <h6>Total Income: ₹ {monthlyIncome}</h6>
              <h6>Total Expense: ₹ {monthlyExpense}</h6>
              <h3 className={monthlySavings >= 0 ? 'text-success' : 'text-danger'}>
              SAVINGS: ₹ {monthlySavings}
              </h3>
              <p>
                {monthlySavings >= 0
                  ? 'You are saving well this month!'
                  : 'You are overspending this month!'}
              </p>
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
