import { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import AddItem from './AddItem';
import SearchItems from './SearchItems';
import apiRequest from './apiRequest';

function App() {
  const API_URL = 'http://localhost:5000/items';

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error('Did not receive expected data');
        const listItems = await response.json();
        setItems(listItems);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(fetchItems, 2000);
    return () => clearTimeout(timer);
  }, []);
  const addItem = async (item) => {
    const myNewItem = { checked: false, item }; 
    setItems([...items, myNewItem]); 

    const postOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(myNewItem),
    };

    try {
        const response = await fetch(API_URL, postOptions);
        if (!response.ok) throw Error("Could not add item");

        const newItem = await response.json(); 
        setItems(prevItems => [...prevItems, newItem]);
    } catch (error) {
        console.error("POST Error:", error);
    }
};


const handleCheck = async (id) => {
    const updatedItems = items.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(updatedItems);

    const itemToUpdate = updatedItems.find(item => item.id === id);
    const updateOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checked: itemToUpdate.checked }),
    };

    try {
        const response = await fetch(`${API_URL}/${id}`, updateOptions);
        if (!response.ok) throw new Error(`Update failed: ${response.status}`);
    } catch (error) {
        console.error("PATCH Error:", error.message);
    }
};

const handleDelete = async (id) => {
  console.log("Deleting ID:", id); 
  console.log("Current items before deleting:", items);

  const deleteOptions = { method: "DELETE" };
  const reqUrl = `${API_URL}/${id}`;

  try {
      const response = await fetch(reqUrl, deleteOptions);
      if (!response.ok) throw new Error(`Delete failed: ${response.status}`);

      setItems(prevItems => prevItems.filter(item => item.id !== id));
      console.log(`Item ${id} deleted successfully.`);
  } catch (error) {
      console.error("Delete Error:", error.message);
  }
};



  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem('');
  };

  return (
    <>
      <Header title="Groceries List" />

      <AddItem newItem={newItem} setNewItem={setNewItem} handleSubmit={handleSubmit} />

      <SearchItems search={search} setSearch={setSearch} />

      <main>
        {isLoading && <div className="spinner"></div>}
        {fetchError && <p style={{ color: 'red' }}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && (
          <Content
            items={items.filter((item) =>
              item.item?.toLowerCase().includes(search.toLowerCase())
            )}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        )}
      </main>

      <Footer length={items.length} />
    </>
  );
}

export default App;
