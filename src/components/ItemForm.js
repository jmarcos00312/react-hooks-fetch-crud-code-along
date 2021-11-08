import React, { useState } from "react";
const BASE_URL = "http://localhost:4000/items"

function ItemForm({ onAddItem }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");


  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Name: ", name)
    console.log("Category: ", category)
    const newItem = {
      name: name,
      category: category,
      isInCart: false
    }
    console.log(newItem)

    fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newItem)
    })
      .then(r => r.json())
      .then(addedItem => onAddItem(addedItem))
  }



  return (
    <form className="NewItem" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Category:
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;
