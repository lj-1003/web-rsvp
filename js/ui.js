function resetForm() {
    location.reload();
}

//takes functions from firebaseDB.js to be used here. 
import {
  addGuest,
  getGuest,
} from "../js/firebaseDB.js"


//Create Guests
async function createGuest() {
  const inputs = [
    document.getElementById("name1Input").value,
    document.getElementById("name2Input").value,
    document.getElementById("name3Input").value,
    document.getElementById("name4Input").value,
    document.getElementById("name5Input").value,
    document.getElementById("name6Input").value,
  ];

  let guestData = {};

  inputs.forEach((name, index) => {
    if (name && name.trim() !== "") {
      guestData[`name${index + 1}Input`] = name;
      guestData[`name${index + 1}Response`] = "Not responded";
    }
  });

  if (!name1Input) {
    alert('Please fill out all required fields!');
    return;
  }

  console.log(guestData);
  const savedGuest = await addGuest(guestData)

  window.location.replace("../pages/admin.html");
}



// Load full guest list for admin page
async function getGuestData() {
  const guests = await getGuest();

  const guestList = document.getElementById("guest-list");
  guestList.innerHTML = ""; // Clears previous items

  guests.forEach(guest => {

    const li = document.createElement("li");
    li.textContent = `ID: ${guest.id}`;

    guestList.appendChild(li);
    
  });
}

getGuestData();

// Loads RSVP for public page
let found
async function getPersonalData() {
  found = false;

  const idInput = document.getElementById("idInput").value;

  const guests = await getGuest();

  const name = document.getElementById("rsvpName");
  const plus = document.getElementById("rsvpPlus");

  name.innerHTML = ""; // Clears previous items
  plus.innerHTML = ""; // Clears previous items

  guests.forEach(guest => {
    if (guest.id == idInput) {
      found = true;
      name.textContent = `Guest 1: ${guest.name1Input}`
    }
  });

  //ID found flag 
  if (!found) {
      name.textContent = "RSVP not found. Retry code, or contact Levi for support."
    }
}

window.resetForm = resetForm;
window.createGuest = createGuest;
window.getPersonalData = getPersonalData;
