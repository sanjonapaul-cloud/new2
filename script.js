document.getElementById('generate-btn').addEventListener('click', generateArrangement);

function generateArrangement() {
    const studentsInput = document.getElementById('students');
    const rowsInput = document.getElementById('rows');
    const colsInput = document.getElementById('cols');
    const capacityInput = document.getElementById('room-capacity');
    const seatingContainer = document.getElementById('seating-container');
    const messageElement = document.getElementById('message');

    // 1. Get Input Values
    const totalStudents = parseInt(studentsInput.value);
    const rows = parseInt(rowsInput.value);
    const cols = parseInt(colsInput.value);
    const roomCapacity = parseInt(capacityInput.value);

    // Basic Validation
    if (isNaN(totalStudents) || isNaN(rows) || isNaN(cols) || isNaN(roomCapacity) ||
        totalStudents <= 0 || rows <= 0 || cols <= 0 || roomCapacity <= 0) {
        messageElement.textContent = "Please enter valid positive numbers for all fields.";
        seatingContainer.innerHTML = '';
        return;
    }

    // Capacity Check
    const maxSeatsInRoom = rows * cols;
    if (roomCapacity > maxSeatsInRoom) {
        messageElement.textContent = `Room capacity (${roomCapacity}) exceeds physical seats (${maxSeatsInRoom}). Using physical seats.`;
    }
    const effectiveCapacity = Math.min(roomCapacity, maxSeatsInRoom);

    // 2. Calculate Rooms Needed
    const roomsNeeded = Math.ceil(totalStudents / effectiveCapacity);

    // 3. Clear previous output
    seatingContainer.innerHTML = '';
    messageElement.textContent = `Arranging ${totalStudents} students into ${roomsNeeded} room(s).`;

    // 4. Seating Logic (Simple Sequential Placement)
    let studentIdCounter = 1001; // Start Student ID from 1001

    for (let i = 1; i <= roomsNeeded; i++) {
        const roomDiv = document.createElement('div');
        roomDiv.className = 'room';
        roomDiv.innerHTML = `<h3>Room ${i} (Capacity: ${effectiveCapacity})</h3>`;

        const gridDiv = document.createElement('div');
        gridDiv.className = 'seating-grid';
        // Set CSS Grid template columns based on user input
        gridDiv.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

        let seatsFilledInRoom = 0;

        // Iterate through all possible seats in the grid (rows * cols)
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const seatDiv = document.createElement('div');
                seatDiv.className = 'seat';

                // Check if seat is within capacity AND if we still have students
                if (seatsFilledInRoom < effectiveCapacity && studentIdCounter <= (totalStudents + 1000)) {
                    // This is where a proper logic would assign a real student ID
                    const studentId = `S${studentIdCounter}`;
                    
                    // Basic "Skip a seat" logic for social distancing (alternate seats)
                    // If (r+c) is even, assign a student, else leave empty for distancing
                    // This is a VERY simplified example of a rule
                    if ((r + c) % 2 === 0 && studentIdCounter <= (totalStudents + 1000)) {
                         seatDiv.textContent = studentId;
                         studentIdCounter++;
                         seatsFilledInRoom++;
                    } else {
                        // Assign the student to the next available seat, ignoring the skip logic for simplicity
                        // and prioritizing filling the room up to capacity.
                        // For a real-world scenario, you'd use a more robust assignment algorithm.
                        seatDiv.textContent = studentId;
                        studentIdCounter++;
                        seatsFilledInRoom++;
                    }
                   
                } else {
                    // Empty Seat (either over capacity or out of total students)
                    seatDiv.className = 'seat empty-seat';
                    seatDiv.textContent = '-';
                }
                
                gridDiv.appendChild(seatDiv);
            }
        }
        
        roomDiv.appendChild(gridDiv);
        seatingContainer.appendChild(roomDiv);
    }
}