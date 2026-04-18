// Retrieve students from localStorage or initialize empty array
let students = JSON.parse(localStorage.getItem("students")) || [];

// Keeps track of which student is being edited (-1 means add mode)
let editIndex = -1;


const form = document.getElementById("studentForm");
const tableBody = document.querySelector("#studentTable tbody");
const cardContainer = document.getElementById("cardContainer");
const submitBtn = document.getElementById("submitBtn");

// Load existing data when page loads
window.onload = displayStudents;


// Handle form submission (Add / Update)
form.addEventListener("submit", function(e) {
    e.preventDefault(); 

    const name = document.getElementById("name").value.trim();
    const id = document.getElementById("studentId").value.trim();
    const email = document.getElementById("email").value.trim();
    const contact = document.getElementById("contact").value.trim();

    
    
    // ======== VALIDATION ======

    // Validate name (only alphabets and spaces allowed)
    if (!/^[A-Za-z ]+$/.test(name)) {
        alert("Name must contain only letters");
        return;
    }

    // Validate student ID (only numbers allowed)
    if (!/^\d+$/.test(id)) {
        alert("Student ID must be numeric");
        return;
    }

    // Validate contact number (minimum 10 digits)
    if (!/^\d{10,}$/.test(contact)) {
        alert("Contact must be at least 10 digits");
        return;
    }

    
    
    
    
    
    // Create student object
    const student = { name, id, email, contact };

    // ================= ADD / UPDATE LOGIC =================

    if (editIndex === -1) {
     
        students.push(student);
    } else {
       
        students[editIndex] = student;

        // Reset edit mode
        editIndex = -1;

        submitBtn.textContent = "Add Student";
    }

    // Save updated data to localStorage
    localStorage.setItem("students", JSON.stringify(students));

    form.reset();

    
    displayStudents();
});







// ====== DISPLAY FUNCTION =======

function displayStudents() {
    tableBody.innerHTML = "";       
    cardContainer.innerHTML = "";   

   
    students.forEach((student, index) => {

        // -------- TABLE ROW (Desktop View) --------
        const row = `
            <tr>
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td>
                    <!-- Pass index to identify which record to edit/delete -->
                    <button onclick="editStudent(${index})">Edit</button>
                    <button onclick="deleteStudent(${index})">Delete</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;

        // -------- CARD VIEW (Mobile View) --------
        const card = `
            <div class="student-card">
                <p><strong>Name:</strong> ${student.name}</p>
                <p><strong>ID:</strong> ${student.id}</p>
                <p><strong>Email:</strong> ${student.email}</p>
                <p><strong>Contact:</strong> ${student.contact}</p>
                <div class="card-actions">
                    <button onclick="editStudent(${index})">Edit</button>
                    <button onclick="deleteStudent(${index})">Delete</button>
                </div>
            </div>
        `;
        cardContainer.innerHTML += card;
    });
}




// ========= EDIT FUNCTION =========

function editStudent(index) {
    const student = students[index];

    // Populate form fields with selected student data
    document.getElementById("name").value = student.name;
    document.getElementById("studentId").value = student.id;
    document.getElementById("email").value = student.email;
    document.getElementById("contact").value = student.contact;

    // Set edit index so submit knows it's update mode
    editIndex = index;

    submitBtn.textContent = "Update Student";
}




// ====== DELETE FUNCTION ======

function deleteStudent(index) {
   
    students.splice(index, 1);

    // Update localStorage after deletion
    localStorage.setItem("students", JSON.stringify(students));

    displayStudents();
}