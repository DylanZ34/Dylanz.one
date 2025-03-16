import { Route, Routes } from "react-router-dom";
import MarkdownArticle from "./components/MarkdownArticle";
import ProductShowcase from "./components/ProductShowcase";
import { productList } from "./ProductList";

export default function App() {
  const mdArticles = productList.map((product) => product.learnMore);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-3/4 md:ml-[25%] p-6 md:p-8">
        <Routes>
          <Route index element={<ProductShowcase />} />
          {mdArticles.map((article) => (
            <Route path={article} element={<MarkdownArticle markdownFilePath={`/${article}.md`} />} />
          ))}
        </Routes>
      </div>
    </div>
  )
  }
  
  