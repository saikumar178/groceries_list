import { useState,useEffect } from 'react'
import './App.css'
import Header from './Header'
import Content from './Content'
import Footer from './Footer'
import AddItem from './AddItem'
import SearchItems from './SearchItems'

function App() {
  const API_URL='http://localhost:5000/items';

  const[items,setItems]=useState([]);
   const[newItem,setNewItem]=useState('');
   const[search,setSearch]=useState('');
   const[fetchError,setFetchError]=useState(null);

   useEffect(()=>{
    const fetchItems=async()=>{
      try{
        const response=await fetch(API_URL);
        if(!response.ok) throw Error('Did not recieve expected data');
        const listItems=await response.json();
        console.log(listItems);
        setItems(listItems);
        setFetchError(null);
      }catch(err){
        setFetchError(err.message);
      }
    };

    fetchItems();

   },[]);
   
   const addItem=(item)=>{
    const id=items.length?items[items.length-1].id+1:1;
    const myNewItem={id,checked:false,item}
    const listItems =[...items,myNewItem];
    setItems(listItems);
   }
   const handleCheck=(id)=>{
    const listItems = items.map((items)=>items.id == id?{...items,checked:!items.checked}:items);
    setItems(listItems);

}
const handleDelete=(id)=>{
  const listItems= items.filter((items)=>items.id !== id);
  setItems(listItems);
}
const handleSubmit=(e)=>{
  e.preventDefault();
  if(!newItem)return;
  addItem(newItem);
  setNewItem('');
}
  return (
    <>
      <Header title="Grocieries List"/>
     
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
       <SearchItems
        search={search}
        setSearch={setSearch}
      />
      <main>
        {fetchError &&<p style={{color:"red"}}>{`Error:${fetchError}`}</p>}
      {!fetchError &&<Content
        items={items.filter(item=>((item.item).toLowerCase()).includes(search.toLowerCase()))}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
       />}
       </main>
      <Footer
        length={items.length}  
      />
    </>
  )
}

export default App
