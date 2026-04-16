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

//crea reserva
app.post("/reservations", (req, res) => {
  const { name, seats, movie } = req.body;

  if (!name || !seats || !movie) {
    writeLog("ERROR", "Invalid reservation request");
    return res.status(400).json({ error: "Datos incompletos" });
  }

  const newReservation = {
    id: Date.now(),
    name,
    movie,
    seats,
    createdAt: new Date()
  };

  reservations.push(newReservation);

  writeLog("INFO", `Reservation created by ${name} for movie ${movie} and seats ${seats.join(",")}`);

  res.json(newReservation);
});

app.get("/reservations", (req, res) => {
  const { movie } = req.query;

  let filteredReservations = reservations;

  if (movie) {
    filteredReservations = reservations.filter(r => r.movie === movie);
  }

  writeLog("INFO", `Reservations requested${movie ? ` for movie ${movie}` : ""}`);
  res.json(filteredReservations);
});

// obtener reservas
app.get("/reservations", (req, res) => {
  writeLog("INFO", "Reservations requested");
  res.json(reservations);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
  writeLog("INFO", `Server started on port ${PORT}`);
});