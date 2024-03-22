import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { client } from "./config";
import NotFound from "./NotFound";
import Dashboard from "./page/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={`${client}`} element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
