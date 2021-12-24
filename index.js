const main = document.querySelector("main");

let employee = {
  fname: "Mathias",
  lname: "Ricci",
  holidays: [
    ["21/12/2021", "04/01/2022"],
    ["16/04/2022", "22/04/2022"],
    ["24/07/2021", "15/08/2022"],
  ],
};

showHolidays = () => {
  let mapHolidays = employee.holidays
    .map(
      (leaveDates) =>
        `
        <li>
        <p>From ${leaveDates[0]} until ${leaveDates[1]}</p>
        </li>
      `
    )
    .join("");
  main.innerHTML = `
      <h2>${employee.fname} ${employee.lname}</h2>
      <h3>Holidays you booked:</h3>
      <ul id="holidayList">
      </ul>
  `;
  const holidayList = document.getElementById("holidayList");
  holidayList.innerHTML = mapHolidays;
};

// showHolidays();

bookHolidays = () => {
  main.innerHTML = `
  <form>
    <div>
      <label for="start">Start date:</label>
      
      <input
        type="date"
        id="startDate"
        name="leave-start"
        value="2021-07-22"
        min="2021-01-01"
        max="2022-12-31"
      />
    </div>
  </form>
  `;
  var leaveStart = document.getElementById("startDate").value;

  console.log(leaveStart);
};

bookHolidays();
