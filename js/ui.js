function resetForm() {
    location.reload();
}

//takes functions from firebaseDB.js to be used here. 
import {
  addGuest,
  getGuest,
} from "../js/firebaseDB.js"

//------------------------------------------------
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
      guestData[`name${index + 1}`] = name;
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
//------------------------------------------------
//------------------------------------------------
// Load full guest list for admin page
async function getGuestData() {
  const guests = await getGuest();

  const guestList = document.getElementById("guest-list");
  guestList.innerHTML = ""; // Clears previous items

  guests.forEach(guest => {

    const li = document.createElement("li");
    li.textContent = `ID: ${guest.id} | Primary Guest: ${guest.name1}, ${guest.name1Response}`;
    
    guestList.appendChild(li);
    
  });
}
getGuestData();
//------------------------------------------------
//------------------------------------------------
//Update RSVP
async function updateRSVP(id, response) {
  console.log(response);
  console.log(id);
}

async function checkResponseYes(id) {
  console.log("User selected yes")
  const response = true;
  updateRSVP(id, response);
}

// Update RSVP response
async function checkResponseNo(id) {
  console.log("User selected no")
  const response = false;
  updateRSVP(id, response);
}
//------------------------------------------------
//------------------------------------------------
// Loads RSVP for public page
let found
async function getPersonalData() {
  found = false;

  const idInput = document.getElementById("idInput").value;

  const guests = await getGuest();

  const rsvpName = document.getElementById("rsvpName");
  rsvpName.innerHTML = ""; // Clears previous items

  guests.forEach(guest => {
    if (guest.id == idInput) {
      found = true;

      const names = [
        guest.name1,
        guest.name1Response,

        guest.name2,
        guest.name2Response,

        guest.name3,
        guest.name3Response,

        guest.name4,
        guest.name4Response,

        guest.name5,
        guest.name5Response,

        guest.name6,
        guest.name6Response,
      ];
      
      names.forEach((name, index) => {
        //lets these varibales work in bigger scope
        let li;
        let yesButton;
        let noButton;

        if(name) { //Filters out blank name inputs
          //Creates a list item
          li = document.createElement("li");
          li.textContent = `${name}`;

        if (index % 2 === 1) { //checks if index is odd so buttons are only applied to responses
          //yes button
          yesButton = document.createElement("button");
          yesButton.innerHTML = '<i>RSVP Yes</i>';
          yesButton.addEventListener("click", async () => {
            await checkResponseYes(guest.id); //triggers update functionality 
          })
          li.appendChild(yesButton); //puts button inside li
          
          //no button
          noButton = document.createElement("button");
          noButton.innerHTML = '<i>RSVP No</i>';
          noButton.addEventListener("click", async () => {
            await checkResponseNo(guest.id); //triggers update functionality 
          })
          li.appendChild(noButton); //puts buttons inside li

        } else {
          console.log("Are you reading this?");
        }
          rsvpName.appendChild(li); //buttons now inside li -> goes into ul
        };
      });
      console.log(names);
    }
  });

  //ID found flag 
  if (!found) {
      rsvpName.textContent = "RSVP not found. Retry code, or contact Levi for support."
    }
}
//------------------------------------------------

window.resetForm = resetForm;
window.createGuest = createGuest;
window.getPersonalData = getPersonalData;
