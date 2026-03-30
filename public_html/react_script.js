const api = "api.php";

document.getElementById("nyeremenyForm").addEventListener("submit", saveNyeremeny);

window.onload = function () {
    fetchNyeremeny();
};

function fetchNyeremeny() {
    document.getElementById("addedit").innerText = "Új nyeremény hozzáadása";

    fetch(api)
        .then(res => res.json())
        .then(data => {
            document.getElementById("message").innerText = data.status;
            let rows = "";

            data.readData.forEach(nyeremeny => {
                rows += `
                <tr>
                    <td>${nyeremeny.id}</td>
                    <td>${nyeremeny.huzasid}</td>
                    <td>${nyeremeny.talalat}</td>
                    <td>${nyeremeny.darab}</td>
                    <td>${nyeremeny.ertek}</td>
                    <td>
                        <button onclick='editNyeremeny(${JSON.stringify(nyeremeny)})'>Edit</button>
                        <button onclick='deleteNyeremeny(${nyeremeny.id})'>Delete</button>
                    </td>
                </tr>`;
            });

            document.getElementById("nyeremenyTable").innerHTML = rows;
        })
        .catch(err => {
            document.getElementById("message").innerText = "Betöltési hiba";
            console.error(err);
        });
}

function saveNyeremeny(e) {
    e.preventDefault();

    const id = document.getElementById("id").value;
    const huzasid = document.getElementById("huzasid").value;
    const talalat = document.getElementById("talalat").value;
    const darab = document.getElementById("darab").value;
    const ertek = document.getElementById("ertek").value;

    const data = {
        id: id,
        huzasid: huzasid,
        talalat: talalat,
        darab: darab,
        ertek: ertek
    };

    const method = id ? "PUT" : "POST";

    fetch(api, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(data => {
            document.getElementById("message").innerText = data.status;
            document.getElementById("nyeremenyForm").reset();
            document.getElementById("id").value = "";
            fetchNyeremeny();
        })
        .catch(err => {
            document.getElementById("message").innerText = "Mentési hiba";
            console.error(err);
        });
}

function editNyeremeny(nyeremeny) {
    document.getElementById("addedit").innerText = "Nyeremény szerkesztése";
    document.getElementById("id").value = nyeremeny.id;
    document.getElementById("huzasid").value = nyeremeny.huzasid;
    document.getElementById("talalat").value = nyeremeny.talalat;
    document.getElementById("darab").value = nyeremeny.darab;
    document.getElementById("ertek").value = nyeremeny.ertek;
}

function deleteNyeremeny(id) {
    if (!confirm("Törli ezt a nyereményt?")) return;

    fetch(api, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id })
    })
        .then(res => res.json())
        .then(data => {
            document.getElementById("message").innerText = data.status;
            fetchNyeremeny();
        })
        .catch(err => {
            document.getElementById("message").innerText = "Törlési hiba";
            console.error(err);
        });
}