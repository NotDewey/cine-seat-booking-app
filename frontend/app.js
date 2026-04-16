const API_URL = "http://localhost:3000";

const movieSelect = document.getElementById("movieSelect");
const seatMap = document.getElementById("seatMap");
const reserveBtn = document.getElementById("reserveBtn");
const reservationList = document.getElementById("reservationList");
const nameInput = document.getElementById("name");

const seats = [
  "A1","A2","A3","A4","A5",
  "B1","B2","B3","B4","B5",
  "C1","C2","C3","C4","C5",
  "D1","D2","D3","D4","D5",
  "E1","E2","E3","E4","E5"
];

let selectedSeats = [];
let occupiedSeats = [];

async function loadMovies() {
  const res = await fetch(`${API_URL}/movies`);
  const movies = await res.json();

  movieSelect.innerHTML = "";
  movies.forEach(movie => {
    const option = document.createElement("option");
    option.value = movie.title;
    option.textContent = movie.title;
    movieSelect.appendChild(option);
  });
}

function renderSeats() {
  seatMap.innerHTML = "";

  seats.forEach(seat => {
    const seatDiv = document.createElement("div");
    seatDiv.classList.add("seat");
    seatDiv.textContent = seat;

    if (occupiedSeats.includes(seat)) {
      seatDiv.classList.add("occupied");
    }

    if (selectedSeats.includes(seat)) {
      seatDiv.classList.add("selected");
    }

    seatDiv.addEventListener("click", () => {
      if (occupiedSeats.includes(seat)) return;

      if (selectedSeats.includes(seat)) {
        selectedSeats = selectedSeats.filter(s => s !== seat);
      } else {
        selectedSeats.push(seat);
      }

      renderSeats();
    });

    seatMap.appendChild(seatDiv);
  });
}

async function loadReservations() {
  const selectedMovie = movieSelect.value;
  const res = await fetch(`${API_URL}/reservations?movie=${encodeURIComponent(selectedMovie)}`);
  const reservations = await res.json();

  reservationList.innerHTML = "";
  occupiedSeats = [];

  reservations.forEach(reservation => {
    const li = document.createElement("li");
    li.textContent = `${reservation.name} reserved seats: ${reservation.seats.join(", ")}`;
    reservationList.appendChild(li);

    occupiedSeats.push(...reservation.seats);
  });

  renderSeats();
}

async function reserveSeats() {
  const name = nameInput.value.trim();

  if (!name || selectedSeats.length === 0) {
    alert("Enter your name and select at least one seat.");
    return;
  }

  const res = await fetch(`${API_URL}/reservations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      movie: movieSelect.value,
      seats: selectedSeats
    })
  });

  if (!res.ok) {
    alert("Reservation failed.");
    return;
  }

  nameInput.value = "";
  selectedSeats = [];
  await loadReservations();
}

reserveBtn.addEventListener("click", reserveSeats);

async function init() {
  await loadMovies();
  await loadReservations();
}

movieSelect.addEventListener("change", () => {
  selectedSeats = [];
  loadReservations();
});

init();