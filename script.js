document.addEventListener("DOMContentLoaded", () => {
    const seats = document.querySelectorAll(".seat.available");
    const bookButton = document.getElementById("book-button");
    const confirmation = document.getElementById("confirmation");

    let selectedSeats = new Set();

    seats.forEach(seat => {
        seat.addEventListener("click", () => {
            const seatId = seat.getAttribute("data-seat");
            if (seat.classList.contains("booked")) {
                return; // Do nothing if seat is already booked
            }

            if (seat.classList.contains("selected")) {
                seat.classList.remove("selected");
                selectedSeats.delete(seatId);
            } else {
                seat.classList.add("selected");
                selectedSeats.add(seatId);
            }
        });
    });

    bookButton.addEventListener("click", () => {
        if (selectedSeats.size === 0) {
            alert("Please select at least one seat to book.");
            return;
        }

        // Confirm booking
        const confirmBooking = confirm(`Are you sure you want to book the following seats?\n${Array.from(selectedSeats).join(", ")}`);
        if (confirmBooking) {
            selectedSeats.forEach(seatId => {
                const seatElement = document.querySelector(`.seat[data-seat="${seatId}"]`);
                if (seatElement) {
                    seatElement.classList.remove("selected");
                    seatElement.classList.add("booked");
                }
            });
            confirmation.textContent = `Successfully booked seats: ${Array.from(selectedSeats).join(", ")}`;
            selectedSeats.clear();
        }
    });
});
