import { useState } from "react";
import { DataList } from "./DataList";

import "./scss/App.scss";


function App() {
  const [showList, setShowList] = useState(false);

  return (
    <>
      <div className="App-container">
        <h1>{showList ? "Usuarios encontrados" : "API Usuarios"}</h1>
        <h2>{showList ? "" : "Preciona el boton para mostrar los usuarios"}</h2>

        <button onClick={() => setShowList(!showList)}>
          {showList ? "Ocultar Usuarios" : "Mostrar Usuarios"}
        </button>

        {showList && <DataList />}
        {!showList && (
          <img className="app-img" 
            src="https://www.gratistodo.com/wp-content/uploads/2016/09/Imagenes-Chistosas-y-graciosas-10-800x1036.jpg" 
            alt="imagen-graciosa" 
          />
        )}

      </div>
    </>
  );
}

export default App;
