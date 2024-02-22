import './App.css';

import { Inventory } from "./components/inventory"
import { AddItem } from "./components/addItem"
import { Auth } from "./components/auth"



function App() {

  return (
    <div className="App">

      <Auth />

      <div style={{ display: "flex", alignItems:"center", justifyContent:"space-around"}}>
        <div style = {{maxWidth:"200em"}}><Inventory /></div>
        <div style = {{margin:"10px"}}><AddItem /></div>

        </div>



    </div>
  );
}

export default App;
