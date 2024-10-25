import CardNews from "./page/CardNews";
import CategoryNews from "./page/CategoryNews";

function App() {
  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="mt-5 text-3xl font-bold text-blue-600">News Night</h1>
      <CategoryNews />
      <CardNews />
    </div>
  );
}

export default App;
