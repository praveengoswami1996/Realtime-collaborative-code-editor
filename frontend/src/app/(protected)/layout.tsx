import Header from '@/components/common/Header'
import React from 'react'

const ProtectedPagesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='min-h-screen'>
        <Header />
        {children}
    </div>
  )
}

export default ProtectedPagesLayout