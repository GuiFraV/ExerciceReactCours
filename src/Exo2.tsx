import React, { useEffect, useState } from "react";

interface Item {
  id: number;
  name: string;
  quantity: number;
  category: string;
  isImportant: boolean;
}

interface Category {
  id: number;
  name: string;
}

const AdvancedShoppingList: React.FC = () => {
  const [itemName, setItemName] = useState<string>("");
  const [itemQuantity, setItemQuantity] = useState<number>(1);
  const [itemCategory, setItemCategory] = useState<string>("");
  const [shoppingList, setShoppingList] = useState<Item[]>([]);
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "Fruits et Légumes" },
    { id: 2, name: "Produits laitiers" },
    { id: 3, name: "Boulangerie" },
  ]);
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("");

  // TODO: Implémenter la fonction pour ajouter un nouvel article
  const addItem = () => {
    if (itemName.trim() !== "" && itemQuantity > 0 && itemCategory) {
      setShoppingList((prevItem) => [
        ...prevItem,
        {
          id: shoppingList.length + 1,
          name: itemName,
          quantity: itemQuantity,
          category: itemCategory,
          isImportant: false,
        },
      ]);
      setItemName("");
      setItemQuantity(1);
      setItemCategory("");
    }
  };

  // TODO: Implémenter la fonction pour supprimer un article
  const deleteItem = (id: number) => {
    setShoppingList((prevShoppingList) =>
      prevShoppingList.filter((item) => item.id !== id)
    );
  };

  // TODO: Implémenter la fonction pour modifier la quantité d'un article (augmenter ou diminuer)
  const AddOrMinusItemQuantity = (id: number, value: string) => {
    setShoppingList((prevShoppingList) =>
      prevShoppingList.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                value === "+"
                  ? item.quantity + 1
                  : item.quantity > 0
                  ? item.quantity - 1
                  : item.quantity,
            }
          : item
      )
    );
  };

  // TODO: Implémenter la fonction pour ajouter une nouvelle catégorie
  const addCategory = () => {
    if (newCategoryName.trim() !== "") {
      const categoryExists = categories.some(
        (category) =>
          category.name.toLowerCase() === newCategoryName.toLowerCase()
      );

      if (!categoryExists) {
        setCategories((prevCategories) => [
          ...prevCategories,
          { id: prevCategories.length + 1, name: newCategoryName },
        ]);
        setNewCategoryName("");
      } else {
        alert("Category already exists!");
      }
    }
  };

  // TODO: Implémenter la fonction pour marquer un article comme important
  const isImportant = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation();
    setShoppingList((prevShoppingList) =>
      prevShoppingList.map((item) =>
        item.id === id ? { ...item, isImportant: !item.isImportant } : item
      )
    );
    console.log(shoppingList);
  };

  // TODO: Implémenter la fonction pour trier les articles (par nom, quantité ou importance)
  const handleFilterCategory = (value: string) => {
    setFilterCategory(value);
  };

  const classifyShoppingList = [...shoppingList].sort((a, b) => {
    if (filterCategory === "name") {
      return a.name.localeCompare(b.name);
    } else if (filterCategory === "quantity") {
      return b.quantity - a.quantity;
    } else if (filterCategory === "important") {
      return b.isImportant === a.isImportant ? 0 : b.isImportant ? 1 : -1;
    } else {
      return 0;
    }
  });

  return (
    <div>
      <h1>Liste de Courses Avancée</h1>

      {/* Formulaire d'ajout d'article */}
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
        <select
          value={itemCategory}
          onChange={(e) => setItemCategory(e.target.value)}
        >
          <option value="">Sélectionner une catégorie</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <button onClick={addItem}>Ajouter l'article</button>
      </div>

      {/* Formulaire d'ajout de catégorie */}
      <div>
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="Nouvelle catégorie"
        />
        <button onClick={addCategory}>Ajouter la catégorie</button>
      </div>

      {/* Filtres et tri */}
      <div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">Toutes les catégories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <button onClick={() => handleFilterCategory("name")}>
          Trier par nom
        </button>
        <button onClick={() => handleFilterCategory("quantity")}>
          Trier par quantité
        </button>
        <button onClick={() => handleFilterCategory("important")}>
          Trier par importance
        </button>
      </div>

      {/* Liste des articles */}
      <ul>
        {classifyShoppingList.map((item) => (
          <li key={item.id}>
            {item.name} (Quantité: {item.quantity}) - {item.category}
            {item.isImportant ? "★" : "☆"}
            <button onClick={() => AddOrMinusItemQuantity(item.id, "+")}>
              +
            </button>
            <button onClick={() => AddOrMinusItemQuantity(item.id, "-")}>
              -
            </button>
            <button onClick={() => deleteItem(item.id)}>Supprimer</button>
            <button onClick={(e) => isImportant(e, item.id)}>
              Marquer comme important
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdvancedShoppingList;
