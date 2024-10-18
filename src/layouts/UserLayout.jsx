import React from 'react'
import Header from '../component/userHeader'

const UserLayout = ({ children}) => {
  return (
    <div>
        <Header />
        {children}
    </div>
  )
}

export default UserLayout