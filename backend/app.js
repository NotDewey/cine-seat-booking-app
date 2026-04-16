const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// 📄 ruta de logs
const logPath = path.join(__dirname, "logs", "app.log");

// 🧠 función para escribir logs
function writeLog(level, message) {
  const now = new Date().toISOString().replace("T", " ").split(".")[0];
  const logMessage = `[${now}] ${level}: ${message}\n`;
  fs.appendFileSync(logPath, logMessage);
}

// 🎬 películas fake
const movies = [
  { id: 1, title: "Dune: Part Two" },
  { id: 2, title: "Spider-Man: Across the Spider-Verse" },
  { id: 3, title: "Minecraft Movie" }
];

// 🏥 health check
app.get("/health", (req, res) => {
  writeLog("INFO", "Health check executed");
  res.json({ status: "ok" });
});

// 🎬 obtener películas
app.get("/movies", (req, res) => {
  writeLog("INFO", "Movies requested");
  res.json(movies);
});

// 🎟️ reservas (temporal en memoria)
let reservations = [];

// crear reserva
app.post("/reservations", (req, res) => {
  const { name, seats } = req.body;

  if (!name || !seats) {
    writeLog("ERROR", "Invalid reservation request");
    return res.status(400).json({ error: "Datos incompletos" });
  }

  const newReservation = {
    id: Date.now(),
    name,
    seats,
    createdAt: new Date()
  };

  reservations.push(newReservation);

  writeLog("INFO", `Reservation created by ${name} for seats ${seats.join(",")}`);

  res.json(newReservation);
});

// obtener reservas
app.get("/reservations", (req, res) => {
  writeLog("INFO", "Reservations requested");
  res.json(reservations);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  writeLog("INFO", `Server started on port ${PORT}`);
});