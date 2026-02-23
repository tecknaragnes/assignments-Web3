const response = await fetch("participants.json");
const participants = await response.json(); //fetch av deltagarna
console.log(participants);