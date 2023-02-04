const express = require("express");
const cors = require("cors");
const webpush = require("web-push");
// Middlewares
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Constantes
const pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/eUFT_xb1ndI:APA91bGFKvuy7_69IjiqjmQZZCIgTa0-luIBPCzkwNohXciAYo334uNQ79vK4L_7f9J_qJkHRnMhyq4u1_6DGDG97EdercQIrnRG5DBZJmpLKkSpheKvosj_TElimGBVpMd92CCsz-zE",
  expirationTime: null,
  keys: {
    p256dh:
      "BP-cGK-QGhwlRTagNoSponYQhfO4_XgVmCP7z9Wa0SnAkxJ6ozCKdo3lOq-ffoVP1H_gRw2P1WfhtgoOM7zzwh0",
    auth: "holHIHlWK3iWbRDMmzZQtQ",
  },
};

const vapidKeys = {
  publicKey:
    "BFF-HvrnSvAbp_Gn0EW1Uv4Fjkq4VJ-UCPBWwSUrD_ovRA3h27NQhRzI4oiGj6kicT-MP1S74CJW4mQo-uwZtT4",
  privateKey: "U7PPcpKQ1biJK5Atpj-PHAGfslBzN2axP0Tn_eJY3yM",
};

webpush.setVapidDetails(
  "mailto:example@gmail.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// Routes
app.get("/", async (req, res) => {
  try {
    // res.sendStatus(200).json();
    const payload = JSON.stringify({
      title: "Titulo de notificacion",
      message: "Mensaje de la notificacion",
    });
    await webpush.sendNotification(pushSubscription, payload);
    await res.send("Enviado");
  } catch (e) {
    console.log(e);
  }
});

app.post("/subscription", (req, res) => {
  console.log(req.body);
  res.sendStatus(200).json();
});

app.post("/formulario", async (req, res) => {
  const { title, descripcion } = req.body;
  const payload = JSON.stringify({
    title,
    message: descripcion,
  });
  await webpush.sendNotification(pushSubscription, payload);
  await res.send("Enviado");
});

app.listen(8000, () => console.log("Server listening on port 8000"));
