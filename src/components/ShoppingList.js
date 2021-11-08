import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";


const BASE_URL = "http://localhost:4000/items"


function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);


  useEffect(() => {
    fetch(BASE_URL)
      .then(r => r.json())
      .then(items => setItems(items))
  }, [])


  const handleUpdatedItem = (updatedItem) => {
    const updatedItems = items.map((item) => {
      if (item.id === updatedItem.id) {
        return updatedItem
      } else {
        return item

      }
    })
    setItems(updatedItems)
  }

  const handleAddItem = (addedItem) => {
    setItems([...items, addedItem])
    console.log("In shoppingList: ", addedItem)
  }


  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const handleDeleteItem = (deletedItem) => {
    const updatedItems = items.filter(item => item.id !== deletedItem.id)
    setItems(updatedItems)
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item
            key={item.id}
            item={item}
            onUpdate={handleUpdatedItem}
            onDeleteItem={handleDeleteItem}

          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
