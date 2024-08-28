import React, { createContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EditCategoryPage } from '../../Pages/AllPages';
import HeaderPageSection from '../../Components/HeaderPageSection';

export const CategoryDataContext = createContext();

const EditCategoryLayout = () => {
  const [allCategoriesData, setAllCategoriesData] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [categoryEdit, setCategoryEdit] = useState(null);
  const { categoryId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategoriesData = () => {
      const storedCategories = JSON.parse(localStorage.getItem('Categories'));
      if (storedCategories) {
        setAllCategoriesData(storedCategories);
        setAllCategories(storedCategories.categories); // Corrected line
      }
    };
    fetchCategoriesData(); // Renamed function to avoid shadowing
  }, []);

  useEffect(() => {
    if (allCategories.length > 0 && categoryId) {
      const filteredCategory = allCategories.find(
        (category) => category.id === parseInt(categoryId)
      );
      setCategoryEdit(filteredCategory);
    }
  }, [allCategories, categoryId]);

  console.log('allCategoriesData', allCategoriesData); // Logging the whole array
  // console.log('allCategories', allCategories);
  console.log('CategoryEdit', categoryEdit);

  const handleGoBack = () => {
    navigate(-1, { replace: true });
  };

  return (
    <>
      <HeaderPageSection handleClick={handleGoBack} name="Edit Category" />
      <CategoryDataContext.Provider value={categoryEdit}>
        <EditCategoryPage />
      </CategoryDataContext.Provider>

    </>
  );
};

export default EditCategoryLayout;
