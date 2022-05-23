import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from './page/login/Login';
// import Register from './page/register/Register';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route exact path="/register" element={<Register />} /> */}
        <Route exact path="/login" element={<Login />} />
        {/* <Route exact path="/" element={<Home />} /> */}
        {/* <Route exact path="/messenger" element={<Messenger />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
