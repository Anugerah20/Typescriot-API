import axios from 'axios';

import React, { useEffect, useState } from 'react';

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
     // const [sources, setSources] = useState<Sources[]>([]);
     const [categoryNews, setCategoryNews] = useState<string[]>([]);

     useEffect(() => {
          const fetchSource = async () => {
               try {
                    const response = await axios.get(`https://newsapi.org/v2/top-headlines/sources?apiKey=${import.meta.env.VITE_API_NEWS}`);
                    // setSources(response.data.sources);
                    // console.log("New Category:", response.data.sources);

                    // Create category unique
                    const categories = response.data.sources.map((source: Sources) => source.category);
                    const uniqueCategories: string[] = Array.from(new Set(categories));
                    setCategoryNews(uniqueCategories);

                    console.log("Category unique: ", uniqueCategories);

               } catch (error) {
                    console.log("Error fetching news sources:", error);
               }
          };

          fetchSource();
     }, []);

     return (
          <>
               <ul className="flex flex-wrap justify-center items-center gap-2 mt-5 cursor-pointer">
                    {categoryNews.map((category, index) => (
                    <li className="bg-blue-600 text-white rounded-full w-32 text-center" key={index}>{category}</li>
                    ))}
               </ul>
          </>
     )
}

export default CategoryNews;
