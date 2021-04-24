/*
import { log } from "helpers/log_handler";

const timeUntilFirday = () => {
/*   const now = new Date(); // jetzt ab 1970 in ms
  const today = new Date().toDateString(); // das normale datum (als zahl)
  let nextFriday;
  
  if (today < 5) {
    nextFriday = today + (5 - today);
  } else {
    // nextFriday = new Date().getDate() + (5 - today); 
  }

  // let milisToNextFriday = nextFriday.tomilis();
  
  console.log(nextFriday, (5 - today));

  // return 5000; // (now - milisToNextFriday)

  let now = new Date();
  now.setDate(now.getDate() + (5 + (7 - now.getDay())) % 7);

  return now.getTime();
}

const clean = () => {
  setTimeout(() => {
    log("warn", "Clean Handler", "Deleting shit");
  }, timeUntilFirday());
}

module.exports = clean;
*/