import React from 'react'
import {FaTrashAlt} from 'react-icons/fa'

const LineItem = ({items,handleCheck,handleDelete}) => {
  return (
    <div>
      <li className="items">
          <input 
             type="checkbox"
             checked={items.checked}
             onChange={()=>handleCheck(items.id)}
             />
             <label
                style={(items.checked)?{textDecoration:'line-through'}:null}
                onDoubleClick={()=>handleCheck(items.id)}
             >{items.item}</label>
             <FaTrashAlt  
                  onClick={()=>handleDelete(items.id)}
                  role="button" 
                  tabIndex="0"
                  aria-label={`Delete ${items.items}`}
              />
        </li>
    </div>
  )
}

export default LineItem
