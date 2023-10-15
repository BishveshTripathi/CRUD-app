const tableBody = document.getElementById("table-body");
const saveButton = document.getElementById("save-button");
const startDateInput = document.getElementById("start-date-input");
const endDateInput = document.getElementById("end-date-input");
const excludeDatesInput = document.getElementById("exclude-dates-input");
const numberOfLeadsInput = document.getElementById("number-of-leads-input");

saveButton.addEventListener("click", () => {
  const startDate = startDateInput.value || "N/A";
  const endDate = endDateInput.value || "N/A";
  const excludedDates = excludeDatesInput.value || "N/A";
  const numDays = calculateNumDays(startDate, endDate, excludedDates);
  const leadCount = numberOfLeadsInput.value || "N/A";
  const expectedDRR =
    leadCount !== "N/A" && numDays !== "N/A"
      ? (leadCount / numDays).toFixed(2)
      : "N/A";
  const lastUpdated = new Date().toLocaleString();

  const newRow = tableBody.insertRow(0);
  newRow.insertCell(0).innerHTML =
    '<button class="delete-button" onclick="deleteRow(this)">Delete</button>';
  newRow.insertCell(1).textContent = new Date().getTime();
  newRow.insertCell(2).textContent = startDate;
  newRow.insertCell(3).textContent = endDate;
  newRow.insertCell(4).textContent = getMonthYear(startDate);
  newRow.insertCell(5).textContent = excludedDates;
  newRow.insertCell(6).textContent = numDays;
  newRow.insertCell(7).textContent = leadCount;
  newRow.insertCell(8).textContent = expectedDRR;
  newRow.insertCell(9).textContent = lastUpdated;
});

function calculateNumDays(startDate, endDate, excludedDates) {
  if (startDate === "N/A" || endDate === "N/A") {
    return "N/A";
  }

  const oneDay = 24 * 60 * 60 * 1000;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const totalDays = Math.round((end - start) / oneDay);

  if (excludedDates === "N/A" || !excludedDates) {
    return totalDays;
  }

  const excludedDatesArray = excludedDates.split(",");
  for (const date of excludedDatesArray) {
    const excludeDate = new Date(date);
    if (!isNaN(excludeDate) && excludeDate >= start && excludeDate <= end) {
      totalDays--;
    }
  }

  return totalDays;
}

function deleteRow(button) {
  const row = button.parentNode.parentNode;
  tableBody.removeChild(row);
}

function getMonthYear(dateString) {
  const date = new Date(dateString);
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  return `${month} ${year}`;
}
