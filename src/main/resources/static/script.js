let editingFarmerId = null;

document
    .getElementById("farmerForm")
    .addEventListener("submit", async function(event) {

    event.preventDefault();

    const name =
    document.getElementById("name").value.trim();

const mobile =
    document.getElementById("mobile").value.trim();

const village =
    document.getElementById("village").value.trim();

if(name === "" || mobile === "" || village === "") {

    document.getElementById("message").innerText =
        "Please fill all fields";

    document.getElementById("message").style.color =
        "red";

    return;
}

if(mobile.length !== 10 || isNaN(mobile)) {

    document.getElementById("message").innerText =
        "Enter valid 10-digit mobile number";

    document.getElementById("message").style.color =
        "red";

    return;
}

    const farmer = {

    name: name,

    mobile: mobile,

    village: village
};

    try {

        let url = "http://localhost:8081/farmers/register";

        let method = "POST";

        // UPDATE MODE
        if (editingFarmerId !== null) {

            url = `http://localhost:8081/farmers/${editingFarmerId}`;

            method = "PUT";
        }

        const response = await fetch(
            url,
            {
                method: method,

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(farmer)
            }
        );

        const data = await response.json();

        console.log(data);

        document.getElementById("message").innerText =
            "Farmer Registered Successfully!";

        document.getElementById("message").style.color =
        "green";

        // RESET FORM
        editingFarmerId = null;

        document.querySelector("button").innerText =
            "Register Farmer";

        document.getElementById("farmerForm").reset();

        loadFarmers();

        document.getElementById("farmerForm").reset();

    } catch(error) {

        console.error(error);

        document.getElementById("message").innerText =
            "Error saving farmer";
    }
});


// LOAD ALL FARMERS
async function loadFarmers() {

    try {

        const response = await fetch(
            "http://localhost:8081/farmers"
        );

        const farmers = await response.json();

        console.log(farmers);

        const tableBody =
            document.getElementById("farmerTableBody");

        tableBody.innerHTML = "";

        farmers.forEach(farmer => {

            tableBody.innerHTML += `
                <tr>

                    <td>${farmer.id}</td>

                    <td>${farmer.name}</td>

                    <td>${farmer.mobile}</td>

                    <td>${farmer.village}</td>

                    <td>

                        <button onclick="editFarmer(
                            ${farmer.id},
                            '${farmer.name}',
                            '${farmer.mobile}',
                            '${farmer.village}'
                        )">
                            Edit
                        </button>

                        <button onclick="deleteFarmer(${farmer.id})">
                            Delete
                        </button>

                    </td>

                </tr>
            `;
        });

    } catch(error) {

        console.error("Error loading farmers:", error);
    }
}


// DELETE FARMER
async function deleteFarmer(id) {

    const confirmDelete =
    confirm("Are you sure you want to delete this farmer?");

if(!confirmDelete) {

    return;
}

    try {

        await fetch(
            `http://localhost:8081/farmers/${id}`,
            {
                method: "DELETE"
            }
        );

        document.getElementById("message").innerText =
    "Farmer Deleted Successfully!";

document.getElementById("message").style.color =
    "red";

        loadFarmers();

    } catch(error) {

        console.error(error);

        alert("Error deleting farmer");
    }
}


// EDIT FARMER
function editFarmer(id, name, mobile, village) {

    editingFarmerId = id;

    document.getElementById("name").value = name;

    document.getElementById("mobile").value = mobile;

    document.getElementById("village").value = village;

    document.querySelector("button").innerText =
        "Update Farmer";
}


// INITIAL LOAD
loadFarmers();

function searchFarmers() {

    const input =
        document.getElementById("searchInput")
        .value
        .toLowerCase();

    const rows =
        document.querySelectorAll("tbody tr");

    rows.forEach(row => {

        const text =
            row.innerText.toLowerCase();

        if(text.includes(input)) {

            row.style.display = "";

        } else {

            row.style.display = "none";
        }
    });
}