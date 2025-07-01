
// fetchAPI.js
const API_BASE = "https://script.google.com/macros/s/AKfycbxKVgQ3RMfkNsMOIKQGoEjl0fi4EhB1C08v4cJst1mONg65lDqP8ORehtJf9_qV1g3x/exec";

async function fetchVehicles() {
  const res = await fetch(`${API_BASE}?action=getVehicles`);
  return await res.json();
}

async function addVehicle(data) {
  return await fetch(`${API_BASE}?action=addVehicle`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

async function updateVehicle(data) {
  return await fetch(`${API_BASE}?action=updateVehicle`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

async function deleteVehicle(id) {
  return await fetch(`${API_BASE}?action=deleteVehicle&id=${id}`, {
    method: 'DELETE'
  });
}

async function uploadDocument(formData) {
  return await fetch(`${API_BASE}?action=uploadDocument`, {
    method: 'POST',
    body: formData,
  });
}
