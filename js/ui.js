function resetForm() {
    location.reload();
}

//takes functions from firebaseDB.js to be used here. 
import {
  addGuest,
  getGuest,
  updateGuest,
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
async function updateRSVP(id, key, name, responseVar, response) {
  console.log(`Guest name: ${name}`);
  console.log(`Original Response: ${responseVar}`);
  console.log(`New Response: ${response}`);
  console.log(`Firebase ID: ${id}`);

  const updateData = {
    [`${key}Response`]: response
  };

  try {
    await updateGuest(id, updateData);
    alert(`You've indicated that ${name} is ${response}! You can change your answer until 11:59pm on June 18.`);
    getPersonalData();
  } catch (err) {
    console.error("Error updating RSVP:", err);
  }
};

async function checkResponseYes(id, key, name, responseVar) {
  console.log("User selected yes")
  const response = "going";
  updateRSVP(id, key, name, responseVar, response);
}

// Update RSVP response
async function checkResponseNo(id, key, name, responseVar) {
  console.log("User selected no")
  const response = "not going";
  updateRSVP(id, key, name, responseVar, response);
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
        { key: "name1", name: guest.name1, responseVar: guest.name1Response },
        { key: "name2", name: guest.name2, responseVar: guest.name2Response },
        { key: "name3", name: guest.name3, responseVar: guest.name3Response },
        { key: "name4", name: guest.name4, responseVar: guest.name4Response },
        { key: "name5", name: guest.name5, responseVar: guest.name5Response },
        { key: "name6", name: guest.name6, responseVar: guest.name6Response }
      ];
      
      names.forEach(({key, name, responseVar}) => {
        //lets these variables work in bigger scope
        let li;
        let yesButton;
        let noButton;

        if(name) { //Filters out blank name inputs
          //Creates a list item
          li = document.createElement("li");
          li.innerHTML = `${name} (Status: ${responseVar})<br>`;

          //yes button
          yesButton = document.createElement("button");
          yesButton.classList.add("yes-btn");
          yesButton.innerHTML = '<i>RSVP Yes</i>';
          yesButton.addEventListener("click", async () => {
            await checkResponseYes(guest.id, key, name, responseVar); //triggers update functionality 
          })
          li.appendChild(yesButton); //puts button inside li
          
          //no button
          noButton = document.createElement("button");
          noButton.classList.add("no-btn");
          noButton.innerHTML = '<i>RSVP No</i>';
          noButton.addEventListener("click", async () => {
            await checkResponseNo(guest.id, key, name, responseVar); //triggers update functionality 
          })
          li.appendChild(noButton); //puts buttons inside li
          rsvpName.appendChild(li); //buttons now inside li -> goes into ul
        };
      });
      console.log(names);
    }
  });

  //ID found flag 
  if (!found) {
      rsvpName.textContent = "RSVP not found. Check code and retry, or contact Levi for support."
    }
}
//------------------------------------------------

const params = new URLSearchParams(window.location.search);
const code = params.get("code");

if (code) {
  document.getElementById("idInput").value = code;
}






window.resetForm = resetForm;
window.createGuest = createGuest;
window.getPersonalData = getPersonalData;
