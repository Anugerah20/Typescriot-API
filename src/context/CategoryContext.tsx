import { createContext, useContext, useState } from "react";

const CategoryContext = createContext<any>({});

const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [category, setCategory] = useState<string>("");

  const toggleCategory = (selectedCategory: string) => {
    setCategory(selectedCategory);
  };

  return (
    <CategoryContext.Provider value={{ category, toggleCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

const useCategory = () => {
  return useContext(CategoryContext);
};

export { CategoryProvider, useCategory };
