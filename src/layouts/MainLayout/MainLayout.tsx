import React, { Children } from 'react'
import Header from '../Header'
import Footer from '../Footer'

interface props {
  children?: React.ReactNode
}

export default function MainLayout({children}:props) {
  return (
    <div>
      <Header />
        {children}
      <Footer />
    </div>
  )
}
