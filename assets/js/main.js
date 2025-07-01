// main.js

let vehicles = [];

document.addEventListener('DOMContentLoaded', () => {
  loadVehicles();

  const form = document.getElementById("vehicleForm");
  form.onsubmit = async (e) => {
    e.preventDefault();

    const data = {
      id: document.getElementById("vehicleId").value,
      regNo: document.getElementById("regNo").value,
      type: document.getElementById("type").value,
      brand: document.getElementById("brand").value,
      model: document.getElementById("model").value,
      owner: document.getElementById("owner").value,
      insuranceExpiry: document.getElementById("insuranceExpiry").value,
      pucExpiry: document.getElementById("pucExpiry").value
    };

    if (data.id) {
      await updateVehicle(data);
    } else {
      await addVehicle(data);
    }

    closeVehicleForm();
    await loadVehicles();
  };
});

async function loadVehicles() {
  vehicles = await fetchVehicles();
  const table = document.getElementById("vehicleTable").getElementsByTagName("tbody")[0];
  table.innerHTML = '';

  vehicles.forEach(vehicle => {
    const row = table.insertRow();
    row.innerHTML = `
      <td>${vehicle.regNo}</td>
      <td>${vehicle.type}</td>
      <td>${vehicle.brand}</td>
      <td>${vehicle.model}</td>
      <td>${vehicle.owner}</td>
      <td id="ins-${vehicle.id}">${formatDate(vehicle.insuranceExpiry)}</td>
      <td id="puc-${vehicle.id}">${formatDate(vehicle.pucExpiry)}</td>
      <td>
        <button onclick='editVehicle("${vehicle.id}")'>✏️</button>
        <button onclick='deleteVehicleConfirm("${vehicle.id}")'>🗑️</button>
      </td>
    `;
  });

  setupReminders(vehicles);
}

function showVehicleForm() {
  const form = document.getElementById("vehicleForm");
  form.reset();
  document.getElementById("formTitle").textContent = "Add Vehicle";
  document.getElementById("vehicleId").value = "";
  document.getElementById("vehicleModal").style.display = "flex";
}

function closeVehicleForm() {
  document.getElementById("vehicleModal").style.display = "none";
}

function formatDate(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: '2-digit'
  });
}


function editVehicle(id) {
  const v = vehicles.find(v => v.id === id);
  if (!v) return;

  document.getElementById("formTitle").textContent = "Edit Vehicle";
  document.getElementById("vehicleId").value = v.id;
  document.getElementById("regNo").value = v.regNo;
  document.getElementById("type").value = v.type;
  document.getElementById("brand").value = v.brand;
  document.getElementById("model").value = v.model;
  document.getElementById("owner").value = v.owner;
  document.getElementById("insuranceExpiry").value = v.insuranceExpiry;
  document.getElementById("pucExpiry").value = v.pucExpiry;

  document.getElementById("vehicleModal").style.display = "flex";
}

async function deleteVehicleConfirm(id) {
  if (confirm("Are you sure you want to delete this vehicle?")) {
    await deleteVehicle(id);
    await loadVehicles();
  }
}
