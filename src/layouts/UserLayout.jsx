import React from 'react'
import Header from '../component/userHeader'
import { Navigate } from 'react-router-dom';
import Footer from '../component/footer';

const UserLayout = ({ children}) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <div>
        <Header />
        <main className='min-h-screen'>{children}</main>
        <Footer />
    </div>
  )
}

export default UserLayout