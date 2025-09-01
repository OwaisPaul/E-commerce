// importing Route and Routes from the React router library
import { Route, Routes } from "react-router-dom";
// import the HomePage
import HomePage from "./pages/HomePage"

const App = () => {
  return (
   <div>
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
   </div>
  )
}

export default App;