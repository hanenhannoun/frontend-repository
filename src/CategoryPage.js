import React, { useState, useEffect } from "react";
import CategoryService from "./CategoryService";
import "./CategoryPage.css";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    name: "",
  });
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await CategoryService.getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories :", error);
    }
  };


  const createCategory = async () => {
    try {
      await CategoryService.createCategory(newCategory);
      setNewCategory({ name: "" });
      fetchCategories();
    } catch (error) {
      console.error("Erreur lors de la création de la catégorie :", error);
    }
  };


  const updateCategory = async () => {
    try {
      if (editingCategory) {
        await CategoryService.updateCategory(editingCategory.id, editingCategory);
        setEditingCategory(null); 
        fetchCategories();
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la catégorie :", error);
    }
  };

 
  const deleteCategory = async (id) => {
    try {
      await CategoryService.deleteCategory(id);
      fetchCategories();
    } catch (error) {
      console.error("Erreur lors de la suppression de la catégorie :", error);
    }
  };

  return (
    <div className="category-page">
      <nav className="navbar">
        <h1>Gestion des catégories</h1>
      </nav>

      <div className="category-container">
        <aside className="sidebar">
          <h3>{editingCategory ? "Modifier une catégorie" : "Ajouter une catégorie"}</h3>
          <input
            type="text"
            placeholder="Nom de la catégorie"
            value={editingCategory ? editingCategory.name : newCategory.name}
            onChange={(e) =>
              editingCategory
                ? setEditingCategory({ ...editingCategory, name: e.target.value })
                : setNewCategory({ ...newCategory, name: e.target.value })
            }
          />
          <button onClick={editingCategory ? updateCategory : createCategory}>
            {editingCategory ? "Enregistrer" : "Ajouter"}
          </button>
          {editingCategory && (
            <button onClick={() => setEditingCategory(null)} className="btn-cancel">
              Annuler
            </button>
          )}
        </aside>

        <main className="category-table">
          <h3>Liste des catégories</h3>
          <table>
            <thead>
              <tr>
                <th>Nom de la catégorie</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.name}</td>
                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => setEditingCategory(category)}
                    >
                      Modifier
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => deleteCategory(category.id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
};

export default CategoryPage;
