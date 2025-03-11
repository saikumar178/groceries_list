import React from 'react'
import LineItem from './LineItem'

const List = ({items,handleCheck,handleDelete}) => {
  return (
    <>
     <ul>
      {items.map((items)=>(
        <LineItem
          key={items.id}
           items={items}
           handleCheck={handleCheck}
           handleDelete={handleDelete}
        />
      ))}
    </ul>
    </>
  )
}

export default List
