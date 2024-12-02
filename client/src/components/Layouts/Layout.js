import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = ({children, onSearch}) => {
  return (
    <>
       <Header onSearch={onSearch}/>
       <div className='content'>
         {children}

       </div>
       <Footer />
    </>
  )
}

export default Layout
