import './App.css';
import React ,{useEffect, useState} from "react";
import Background from "./Background"


function App() {
  const [count, setCount] = useState(false);
  return (
    <Background/>
  );
}

export default App;
