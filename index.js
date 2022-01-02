const main = document.querySelector("main");
let employee = {
  fname: "Mathias",
  lname: "Ricci",
  holidays: [
    ["2021-12-21", "2022-01-04"],
    ["2022-04-16", "2022-04-22"],
    ["2022-07-24", "2022-08-15"],
  ],
};

//-----------------------------------------
// Function to display Holidays dates
//-----------------------------------------

showHolidays = () => {
  let mapHolidays = employee.holidays
    .map(
      (leaveDates) =>
        `
        <li>
        <p>From ${dateParserToDisplay(
          leaveDates[0]
        )} until ${dateParserToDisplay(leaveDates[1])}</p>
        </li>
      `
    )
    .join("");
  // Display into main
  main.innerHTML = `
      <h2>${employee.fname} ${employee.lname}</h2>
      <h3>Holidays you booked:</h3>
      <ul id="holidayList">
      </ul>
  `;
  const holidayList = document.getElementById("holidayList");
  holidayList.innerHTML = mapHolidays;
};

//-----------------------------------------
//   Function to display Holidays Booking
//-----------------------------------------

bookHolidays = () => {
  // Display into main
  main.innerHTML = `
  <form id="bookingForm">
  <label for="start">Start date included:</label>      
  <input
  type="date"
  id="startDate"
  min="2022-01-01"
  />
  <br>
  <br>
  <label for="end">End date included:</label>      
  <input
  type="date"
  id="endDate"
  />
  <br>
  <br>
  <p id="dayBooked"></p>
  <br>
  <br>
  <button type="submit">Request</button>
  </form>
  `;
  // Event listener on Button
  const bookingForm = document.getElementById("bookingForm");
  const dayBookedMessage = document.getElementById("dayBooked");
  const startDate = document.getElementById("startDate");
  const endDate = document.getElementById("endDate");
  const today = new Date().toISOString().split("T")[0];

  // Set First date to today
  startDate.value = today;

  // Set Second date to tomorrow
  const tomorrowDate = () => {
    let day = new Date(today);
    day.setDate(day.getDate() + 1);
    let tomorrow = day.toISOString().split("T")[0];
    endDate.value = tomorrow;
  };
  tomorrowDate();

  // Set second date to day after when first date is changed in the future
  startDate.addEventListener("change", (e) => {
    let day = new Date(e.target.value);
    day.setDate(day.getDate() + 1);
    let tomorrow = day.toISOString().split("T")[0];
    endDate.min = tomorrow;
    endDate.value = tomorrow;
  });

  const bookingTotal = () => {
    let date1 = new Date(startDate.value);
    let date2 = new Date(endDate.value);
    let diffTime = Math.abs(date2 - date1);
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    dayBookedMessage.textContent = "Days booked : " + diffDays;
  };
  startDate.addEventListener("change", (e) => {
    bookingTotal();
  });
  endDate.addEventListener("change", (e) => {
    bookingTotal();
  });

  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Check validity of dates and Record dates in employee object
    datesValidation(startDate.value, endDate.value);
    if (datesValidated) {
      employee.holidays.push([startDate.value, endDate.value]);
      showHolidays();
    } else {
      alert("Days already booked");
    }
  });
};

//-----------------------------------------
//         General Functions
//-----------------------------------------

let datesValidated = false;
datesValidation = (startDate, endDate) => {
  // bool overlap = a.start < b.end && b.start < a.end;
  employee.holidays.every((dates) => {
    let aStart = new Date(dates[0]);
    let aEnd = new Date(dates[1]);
    let bStart = new Date(startDate);
    let bEnd = new Date(endDate);
    if (aStart <= bEnd && bStart <= aEnd) {
      console.log("FALSE");
      datesValidated = false;
      return false;
    } else {
      console.log("TRUE");
      datesValidated = true;
      return true;
    }
  });
};

dateParserToDisplay = (string) => {
  let newDate = new Date(string).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return newDate;
};

//-----------------------------------------
//          Function call
//-----------------------------------------

bookHolidays();
