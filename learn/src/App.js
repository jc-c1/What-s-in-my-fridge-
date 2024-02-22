import './App.css';

import { Inventory } from "./components/inventory"
import { AddItem } from "./components/addItem"
import { Auth } from "./components/auth"



function App() {

  return (
    <div className="App">

      <Auth />

      <Inventory />

      <AddItem />

    </div>
  );
}

export default App;
