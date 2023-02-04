import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import { withServiceWorkerUpdater } from "@3m1/service-worker-updater";

function App(props) {
  const { newServiceWorkerDetected, onLoadNewServiceWorkerAccept } = props;

  const [first, setFirst] = useState("");
  const [items, setItems] = useState([]);

  function addTask() {
    setItems([...items, first]);
    setFirst("");
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Lista de la compras v8</h1>
        {newServiceWorkerDetected && (
          <div style={{ backgroundColor: "red", marginBottom: "28" }}>
            <h3>Nueva actualizacion ¿Quieres actualizar ?</h3>
            <button onClick={onLoadNewServiceWorkerAccept}>Actualizar</button>
          </div>
        )}
        <input
          value={first}
          onChange={(e) => {
            setFirst(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTask();
            }
          }}
        />
        <button
          type="button"
          onClick={() => {
            addTask();
          }}
        >
          {" "}
          Actualizar
        </button>
        <ul>
          {items.map((item, key) => (
            <li key={key}>{item}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default withServiceWorkerUpdater(App);
