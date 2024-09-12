import React, { useState } from "react";

interface Item {
  id: number;
  name: string;
  quantity: number;
}

const ShoppingList: React.FC = () => {
  const [itemName, setItemName] = useState<string>("");
  const [itemQuantity, setItemQuantity] = useState<number>(1);
  const [shoppingList, setShoppingList] = useState<Item[]>([]);

  // TODO: Implémenter la fonction pour ajouter un nouvel article
  const addItem = () => {
    if (itemName.trim() !== "") {
      setShoppingList((prevShoppingList) => [
        ...prevShoppingList,
        { id: Date.now(), name: itemName, quantity: itemQuantity },
      ]);
      setItemQuantity(1);
      setItemName("");
    }
  };

  // TODO: Implémenter la fonction pour supprimer un article
  const deleteItem = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation();
    setShoppingList((prevShoppingList) =>
      prevShoppingList.filter((item) => item.id !== id)
    );
  };

  // TODO: Implémenter la fonction pour augmenter la quantité d'un article
  const addQuantity = (id: number) => {
    setShoppingList((prevShoppingList) =>
      prevShoppingList.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  return (
    <div>
      <h1>Ma Liste de Courses</h1>
      <div>
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Nom de l'article"
        />
        <input
          type="number"
          value={itemQuantity}
          onChange={(e) => setItemQuantity(parseInt(e.target.value))}
          min="1"
        />
        <button onClick={addItem}>Ajouter</button>
      </div>
      <ul>
        {shoppingList.map((item) => (
          <li key={item.id}>
            {item.name} (Quantité: {item.quantity})
            <button onClick={() => addQuantity(item.id)}>+</button>
            <button onClick={(e) => deleteItem(e, item.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingList;
