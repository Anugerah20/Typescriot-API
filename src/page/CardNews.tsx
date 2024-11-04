import axios from "axios";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useCategory } from "@/context/CategoryContext";

interface Articles {
  id: string;
  name: string;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

const CardNews: React.FC = () => {
  const [articles, setArticles] = useState<Articles[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { category } = useCategory();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${
            import.meta.env.VITE_API_NEWS
          }`
        );
        setArticles(response.data.articles);
      } catch (error) {
        console.log("Error fetching news sources:", error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch article by category
    if (category) {
      fetchArticle();
    }

    fetchArticle();
  }, [category]);

  // Proccess Loading
  if (loading) {
    return (
      <div className="max-w-7xl min-h-screen grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 my-10 lg:mx-0 md:mx-10 mx-10">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="flex flex-col space-y-3">
            <Skeleton className="w-full h-48 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[350px]" />
              <Skeleton className="h-4 w-[250px]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-7xl min-h-screen grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 my-10 lg:mx-0 md:mx-10 mx-10">
      {articles.map((article, index) => (
        <div key={index} className="border border-gray-300 rounded">
          <div className="relative">
            {article.urlToImage ? (
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-48 object-cover brightness-75"
              />
            ) : (
              <img
                src="https://placehold.co/200x200"
                alt="Placeholder"
                className="w-full h-48 object-cover brightness-75"
              />
            )}
            <h1 className="text-md font-bold absolute bottom-1 left-0 mx-2 text-white">
              {article.title}
            </h1>
          </div>
          <div className="m-3">
            <span className="text-md font-medium text-gray-900 mt-3">
              Author : {article.author}
            </span>
            <p className="text-sm text-gray-500 mt-3">{article.description}</p>
            <a
              href={article.url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 underline font-bold mt-4"
            >
              Read more
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardNews;
