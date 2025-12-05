import React, { useState } from "react";

function CrudApp() {
    const [input, setInput] = useState("");        // controlled input value
  const [items, setItems] = useState([]);        // list of items (strings)
  const [editIndex, setEditIndex] = useState(null); // index being edited, or null

  // Called when user clicks "Edit" for item at index `i`
  const handleEdit = (i) => {
    setInput(items[i]);       // put the item's current text into the input field
    setEditIndex(i);         // remember which index we're editing (enter edit mode)
  };

  // Called when user clicks Add / Update button
  const handleAddOrUpdate = () => {
    if (input.trim() === "") return; // simple validation: ignore empty input

    if (editIndex !== null) {
      // ----- UPDATE flow -----
      const updated = [...items];     // 1) copy the array (avoid mutating state directly)
      updated[editIndex] = input;     // 2) change the copied array at the edit index
      setItems(updated);              // 3) replace state with the new array (triggers re-render)
      setEditIndex(null);             // 4) exit edit mode
    } else {
      // ----- ADD flow (not editing) -----
      setItems([...items, input]);    // append new item
    }

    setInput("");                     // 5) clear input field (reset UI)
  };

  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleAddOrUpdate}>
        {editIndex !== null ? "Update" : "Add"}
      </button>

      <ul>
        {items.map((it, i) => (
          <li key={i}>
            {it}{" "}
            <button onClick={() => handleEdit(i)}>Edit</button>
            <button onClick={() => setItems(items.filter((_, idx) => idx !== i))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CrudApp;
