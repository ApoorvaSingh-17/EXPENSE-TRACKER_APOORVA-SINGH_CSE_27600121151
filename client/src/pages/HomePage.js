import React, { useState, useEffect }  from 'react'
import {DatePicker, Form, Input, message, Modal, Select, Table} from 'antd';
import { UnorderedListOutlined, AreaChartOutlined,EditOutlined,DeleteOutlined} from '@ant-design/icons'
import axios from 'axios';
import Layout from '../components/Layouts/Layout'
import Spinner from '../components/Spinner';
import moment from 'moment';
import Analytics from '../components/Analytics';
const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setShowModal ] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState('all');
  const[viewData, setViewData] = useState('table');
  const [edit, setEdit] = useState(null);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  //table data
  const columns = [
    {
      title:'Date',
      dataIndex:'date',
      render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
    },
    {
      title:'Amount',
      dataIndex:'amount',
      render: (text) => <span> ₹ {(text)}</span>
    },
    {
      title:'Type',
      dataIndex:'type'
    },
    {
      title:'Category',
      dataIndex:'category'
    },
    {
      title:'Reference',
      dataIndex:'reference'
    },
    {
      title:'Description',
      dataIndex:'description'
    },
    {
      title:'Actions',
      render: (text, record) => (
        <div>
          <EditOutlined onClick={() => {
            setEdit(record)
            setShowModal(true)
          }}/>
          <DeleteOutlined  className='mx-2' onClick={() => {handleDelete(record)}}/>
        </div>
      )
    },
    
  ]


  //useEffect hook
  useEffect(() => {
    //get all transaction
  const getAllTransaction = async() => {
    try{
      const user = JSON.parse(localStorage.getItem('user'))
      setLoading(true)
      const res = await axios.post('/transactions/get-transaction', {
        userid: user._id,
        frequency,
        selectedDate,
        type,
      });
       setLoading(false)
       setAllTransaction(res.data)
       setFilteredTransactions(res.data); //set initial data for filtered view
       
       console.log(res.data)
    } catch(error) {
      console.log(error);
      message.error("Fetch Issue With Transaction!!");
    }
  };
    getAllTransaction();
  }, [frequency, selectedDate, type]);

  
  //searching
  useEffect(() => {
    if(searchQuery.trim() === '') {
      setFilteredTransactions(allTransaction);
    } else {
      const filtered = allTransaction.filter((txn) => 
      txn.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTransactions(filtered);
    }
  }, [searchQuery, allTransaction]);

  //delete handler
  const handleDelete = async (record) => {
    try {
      setLoading(true)
      await axios.post("/transactions/delete-transaction", {transactionId:record._id})
      const updatedTransactions = allTransaction.filter((txn) => txn._id !== record._id)
      setAllTransaction(updatedTransactions);
      setFilteredTransactions(updatedTransactions);  //for syncing filtered view
      setLoading(false)
      message.success("Transaction Deleted Successfully !!")
    }catch(error) {
      setLoading(false)
      console.log(error)
      message.error('Unable to delete')
    }
  };


  //form handling
  const handleSubmit= async (values) => {
    try{
       const user = JSON.parse(localStorage.getItem('user'));
       setLoading(true);
       if(edit) {
        const res = await axios.post("/transactions/edit-transaction", {
          payload:{
            ...values,
            userId:user._id
          },
          transactionId : edit._id,
        });
        const updatedTransactions = allTransaction.map((txn) => (txn._id === edit._id ? res.data : txn));
        setAllTransaction(updatedTransactions);
        setFilteredTransactions(updatedTransactions);
        setLoading(false);
        message.success("Transaction Updated Successfully!!");
       }else {
        const res = await axios.post("/transactions/add-transaction", {
          ...values,
          userid: user._id,
         });
         setAllTransaction([...allTransaction, res.data]);
         setFilteredTransactions([...allTransaction, res.data])
         setLoading(false);
       message.success("Transaction Added Successfully!!");
       }
       setShowModal(false);
       setEdit(null);
    } catch(error) {
      setLoading(false);
      message.error("Failed to add Transaction");
    }
  }

  

  return (
    
    <Layout
      onSearch={(value) => setSearchQuery(value)} // Update search query on input change
    >
    {loading && <Spinner />}
      <div className='filters'>
     <div>
      <h6>Select Frequency</h6>
      <Select value={frequency} onChange={(values) => setFrequency(values) }>
      <Select.Option value="7">LAST 1 WEEK</Select.Option>
      <Select.Option value="30">LAST 1 MONTH</Select.Option>
      <Select.Option value="365">LAST 1 YEAR</Select.Option>
      <Select.Option value="custom">CUSTOM</Select.Option>
      </Select>
      {frequency === 'custom' && (
      <RangePicker 
      value={selectedDate} 
      onChange={(values) => setSelectedDate(values)}
      />
      )}
     </div>
     <div>
      <h6>Select Type</h6>
      <Select value={type} onChange={(values) => setType(values) }>
      <Select.Option value="all">ALL</Select.Option>
      <Select.Option value="income">INCOME</Select.Option>
      <Select.Option value="expense">EXPENSE</Select.Option>
     </Select>
      {frequency === 'custom' && (
      <RangePicker 
      value={selectedDate} 
      onChange={(values) => setSelectedDate(values)}
      />
      )}
     </div>
     <div className='switch-icon'>
      <UnorderedListOutlined 
      className={`mx-2 ${ viewData === 'table' ? 'active-icon' : 'inactive-icon'}`} 
      onClick={() => setViewData('table')}
       /> TABULAR
      <AreaChartOutlined 
      className={`mx-2 ${ viewData === 'analytics' ? 'active-icon' : 'inactive-icon'}`}
      onClick={() => setViewData('analytics')} 
      /> ANALYTICS
     </div>
     <div>
      <button className='btn btn-primary'
         onClick={() => setShowModal(true)}> ADD NEW</button>
      </div>
      </div>

      <div className='content'>
      {viewData ==='table' ? 
        (<Table columns={columns} dataSource={filteredTransactions}/>)
        : (<Analytics allTransaction={allTransaction} />)
      }
      </div>
      <Modal 
      title= {edit ? "Edit Transaction" : "Add Transaction" }
       open={showModal}
       onCancel={() => setShowModal(false)}
       footer={null}
       >
       <Form layout='vertical' onFinish={handleSubmit} initialValues={edit }>
        <Form.Item label="Amount" name='amount'>
          <Input type='text'/>
         </Form.Item>
         <Form.Item label="Type" name='type'>
          <Select>
          <Select.Option value ="income">INCOME</Select.Option>
          <Select.Option value ="expense">EXPENSE</Select.Option>
          </Select>
         </Form.Item>
         <Form.Item label="Category" name='category'>
          <Select>
          <Select.Option value ="salary">SALARY</Select.Option>
          <Select.Option value ="tip">TIPS</Select.Option>
          <Select.Option value ="project">PROJECT</Select.Option>
          <Select.Option value ="food">FOOD</Select.Option>
          <Select.Option value ="movie">MOVIE</Select.Option>
          <Select.Option value ="travel">TRAVEL</Select.Option>
          <Select.Option value ="bills">BILLS</Select.Option>
          <Select.Option value ="medical">MEDICAL</Select.Option>
          <Select.Option value ="fees">FEES</Select.Option>
          <Select.Option value ="shopping">SHOPPING</Select.Option>
          <Select.Option value ="tax">TAX</Select.Option>
          <Select.Option value ="others">OTHERS</Select.Option>
          </Select>
         </Form.Item>
         <Form.Item label="Reference" name='reference'>
          <Input type='text'/>
         </Form.Item>
         <Form.Item label="Description" name='description'>
          <Input type='text'/>
         </Form.Item>
         <Form.Item label="Date" name='date'>
          <Input type='date'/>
         </Form.Item>
         <div className='d-flex justify-content-end'>
          <button type="submit" className='btn btn-primary'>
          {" "}
          SAVE
          </button>
         </div>
         
       </Form>
       </Modal>
    </Layout>
  )
}

export default HomePage
