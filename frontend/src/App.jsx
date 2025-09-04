// importing Route and Routes from the React router library
import { Route, Routes } from "react-router-dom";
// import the HomePage
import HomePage from "./pages/HomePage"
import AddProductPage from "./pages/AddProductPage";
import UpdateProductPage from "./pages/UpdateProductPage";

const App = () => {
  return (
   <div>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<AddProductPage />} />
      <Route path="/update/:id" element={<UpdateProductPage />} />
    </Routes>
   </div>
  )
}

export default App;