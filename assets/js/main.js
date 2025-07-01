
// main.js
document.addEventListener('DOMContentLoaded', async () => {
  const table = document.getElementById('vehicleTable');
  const vehicles = await fetchVehicles();

  vehicles.forEach(vehicle => {
    const row = table.insertRow();
    row.innerHTML = `
      <td>${vehicle.regNo}</td>
      <td>${vehicle.type}</td>
      <td>${vehicle.brand}</td>
      <td>${vehicle.model}</td>
      <td>${vehicle.owner}</td>
      <td id="ins-${vehicle.id}">${vehicle.insuranceExpiry}</td>
      <td id="puc-${vehicle.id}">${vehicle.pucExpiry}</td>
    `;
  });

  setupReminders(vehicles);
});
