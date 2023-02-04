import React, { useState } from "react";
import { withServiceWorkerUpdater } from "@3m1/service-worker-updater";
import axios from "axios";

const Form = (props) => {
  const { newServiceWorkerDetected, onLoadNewServiceWorkerAccept } = props;

  const [tarea, setTarea] = useState({ title: "", descripcion: "" });

  async function completeTask(e) {
    e.preventDefault();
    await axios.post("http://localhost:8000/formulario", tarea);
  }

  return (
    <div>
      {newServiceWorkerDetected && (
        <div style={{ backgroundColor: "red", marginBottom: "28" }}>
          <h3>Nueva actualizacion ¿Quieres actualizar ?</h3>
          <button onClick={onLoadNewServiceWorkerAccept}>Actualizar</button>
        </div>
      )}
      <form onSubmit={(e) => completeTask(e)}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            onChange={(e) => {
              setTarea({ ...tarea, [e.target.name]: e.target.value });
            }}
          />
        </div>
        <div>
          <label>Descripcion</label>
          <input
            type="text"
            name="descripcion"
            onChange={(e) => {
              setTarea({ ...tarea, [e.target.name]: e.target.value });
            }}
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default withServiceWorkerUpdater(Form);
