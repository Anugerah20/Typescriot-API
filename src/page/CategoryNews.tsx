import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCategory } from "@/context/CategoryContext";

interface Sources {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

const CategoryNews: React.FC = () => {
  const [categoryNews, setCategoryNews] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { toggleCategory } = useCategory();

  useEffect(() => {
    const fetchSource = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines/sources?apiKey=${
            import.meta.env.VITE_API_NEWS
          }`
        );

        // Create category unique
        const categories = response.data.sources.map(
          (source: Sources) => source.category
        );
        const uniqueCategories: string[] = Array.from(new Set(categories));
        setCategoryNews(uniqueCategories);

        console.log("Category unique: ", uniqueCategories);
      } catch (error) {
        console.log("Error fetching news sources:", error);
      }
    };

    fetchSource();
  }, []);

  const handleCategory = (category: string) => {
    setSelectedCategory(category);
    console.log("Selected category:", category);
  };

  return (
    <>
      <ul className="flex flex-wrap justify-center items-center gap-2 mt-5 cursor-pointer">
        {categoryNews.map((category, index) => (
          <li
            className="bg-blue-600 text-white rounded-full w-28 text-center text-sm"
            key={index}
            onClick={() => {
              handleCategory(category);
              toggleCategory(category);
            }}
          >
            {category}
          </li>
        ))}
      </ul>
      {selectedCategory && (
        <div className="text-center mt-5">
          <p className="text-sm">
            Display News for Categories:{" "}
            <span className="text-blue-600 text-sm font-bold">
              {selectedCategory}
            </span>
          </p>
        </div>
      )}
    </>
  );
};

export default CategoryNews;
