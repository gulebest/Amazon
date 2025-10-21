import React from 'react'
import Header from '../Header/Header'

function LayOut({ children }) {
  return (
    <div>
      <Header />
      <main>
        {children}
      </main>
    </div>
  )
}

export default LayOut
