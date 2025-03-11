import React from 'react'
import List from './list'

const Content = ({items,handleCheck,handleDelete}) => {
  return (
    <>
    {items.length ? (
       <List
         items={items}
         handleCheck={handleCheck}
         handleDelete={handleDelete}
       />
    ):(
      <p> Your List is Empty... </p>
    )}
    </>
  )
}

export default Content
