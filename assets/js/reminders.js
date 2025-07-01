
// reminders.js
function getExpiryColor(dateStr) {
  const today = new Date();
  const expiry = new Date(dateStr);
  const diff = (expiry - today) / (1000 * 3600 * 24);

  if (diff <= 0) return 'status-red';
  if (diff <= 7) return 'status-yellow';
  return 'status-green';
}

function setupReminders(vehicles) {
  vehicles.forEach(vehicle => {
    const color = getExpiryColor(vehicle.insuranceExpiry);
    document.getElementById(`ins-${vehicle.id}`).classList.add(color);

    const pucColor = getExpiryColor(vehicle.pucExpiry);
    document.getElementById(`puc-${vehicle.id}`).classList.add(pucColor);
  });
}
