now = new Date();
let displayMonth = now.getMonth();
let displayYear = now.getFullYear();
let whatToChange = 'month';
const monthToDisplay = document.getElementById('month-to-display');
monthName = new Array(
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december'
);

function highlightActualDay() {
  //check if exists a day with the same number as today
  //removing a class from a non-existing object returns an error
  const dayOfToday = document.getElementById('day' + now.getDate());
  if (dayOfToday) {
    if (displayYear == now.getFullYear() && displayMonth == now.getMonth())
      dayOfToday.children[0].classList.add('highlight');
    // add highlight to today
    else dayOfToday.children[0].classList.remove('highlight'); //remove highlight from today
  }
}

function highlightActualMonth() {
  let actualMonth =
    document.getElementsByClassName('month-outer')[now.getMonth()];
  if (displayYear == now.getFullYear()) {
    actualMonth.children[0].classList.add('highlight');
  } else actualMonth.children[0].classList.remove('highlight');
}

function highlightActualYear() {
  for (i = 0; i < 12; i++) {
    let getYear = document.getElementsByClassName('year-outer')[i];
    if (
      parseInt(getYear.children[0].children[0].innerHTML) == now.getFullYear()
    ) {
      getYear.children[0].classList.add('highlight');
    } else getYear.children[0].classList.remove('highlight');
  }
}

function displayDecade(year) {
  let lowerYear = year - (year % 10);
  let upperYear = lowerYear + 9;
  return lowerYear + '-' + upperYear;
}

function removeWorkoutDays() {
  for (let i of document.getElementsByClassName('active-day-outer')) {
    i.classList.remove('active');
  }
}

function isLeap(year) {
  return new Date(year, 1, 29).getDate() === 29;
}

function totalDaysMonth(year, month) {
  if (month == 3 || month == 5 || month == 8 || month == 10) return 30;
  else if (month == 1) {
    if (isLeap(year)) return 29;
    else return 28;
  } else return 31;
}

function updateDisplay() {
  const firstDayOfTheMonth = new Date(displayYear, displayMonth, 1);

  document.getElementById('month-to-display').innerHTML =
    monthName[displayMonth] + ' ' + displayYear;

  //Days of the month last displayed
  const dayOne = document.getElementById('day1');
  dayOne.style.marginLeft = '0px'; //remove margin before cloning

  let ActiveDays = document.getElementsByClassName('active-day-outer').length;
  const daysOfTheMonth = totalDaysMonth(displayYear, displayMonth);

  while (document.getElementsByClassName('complement-outer').length) {
    document.getElementsByClassName('complement-outer')[0].remove();
  } //remove the old days before and after to use removeChild below

  while (ActiveDays != daysOfTheMonth) {
    if (ActiveDays < daysOfTheMonth) {
      const clone = dayOne.cloneNode(true);
      clone.id = 'day' + (ActiveDays + 1);
      clone.children[0].children[0].innerHTML = ActiveDays + 1;
      dayOne.parentNode.appendChild(clone);
      ActiveDays += 1;
    } else {
      document
        .getElementsByClassName('days-to-display')[0]
        .removeChild(
          document.getElementsByClassName('days-to-display')[0].lastChild
        );
      ActiveDays -= 1;
    }
  }

  //Days before the actual month - not clickable
  const daysBefore = () => {
    //if (firstDayOfTheMonth.getDay() == 0) return 7;
    //else
    return firstDayOfTheMonth.getDay();
  };

  let yearBefore = displayYear;
  const monthBefore = () => {
    if (displayMonth == 0) {
      yearBefore -= 1;
      return 11;
    } else return displayMonth - 1;
  };

  let idDaysBefore = totalDaysMonth(yearBefore, monthBefore());
  let firstDay = dayOne;

  while (
    idDaysBefore >
    totalDaysMonth(yearBefore, monthBefore()) - daysBefore()
  ) {
    const clone = dayOne.cloneNode(true);
    clone.id = 'day-before' + idDaysBefore;
    clone.setAttribute('class', 'complement-outer');
    clone.children[0].children[0].innerHTML = idDaysBefore;
    firstDay.parentNode.insertBefore(clone, firstDay);
    idDaysBefore -= 1;
    firstDay = document.getElementsByClassName('days-to-display')[0].firstChild;
  }

  //Days after the actual month - not clickable
  const daysAfter = 42 - (daysOfTheMonth + daysBefore());
  //6 rows x 7 columns=42
  let idDaysAfter = 1;
  let lastDay = document.getElementsByClassName('days-to-display')[0].lastChild;

  while (idDaysAfter <= daysAfter) {
    const clone = dayOne.cloneNode(true);
    clone.id = 'day-after' + idDaysAfter;
    clone.setAttribute('class', 'complement-outer');
    clone.children[0].children[0].innerHTML = idDaysAfter;
    lastDay.parentNode.appendChild(clone);
    idDaysAfter += 1;
    lastDay = document.getElementsByClassName('days-to-display')[0].lastChild;
  }

  highlightActualDay();

  return; //updateDisplay return
}

//fill calendar days
updateDisplay();

//fill calendar months
let monthOne = document.getElementById('month-outer1');
monthOne.children[0].children[0].innerHTML = monthName[0].substring(0, 3);

for (let i = 1; i < 12; i++) {
  const clone = monthOne.cloneNode(true);
  clone.id = 'month-outer' + (i + 1);
  document.getElementsByClassName('calendar-months')[0].appendChild(clone);
  document.getElementsByClassName('month-inner')[i].children[0].innerHTML =
    monthName[i].substring(0, 3);
}

//fill calendar years
let yearOne = document.getElementById('year-outer1');
yearOne.children[0].children[0].innerHTML = displayYear - (displayYear % 10);

for (let i = 1; i < 12; i++) {
  const clone = yearOne.cloneNode(true);
  clone.id = 'year-outer' + (i + 1);
  document.getElementsByClassName('calendar-years')[0].appendChild(clone);
  document.getElementsByClassName('year-inner')[i].children[0].innerHTML =
    displayYear - (displayYear % 10) + i;
}

function updateCalendarYears() {
  for (let i = 0; i < 12; i++) {
    document.getElementsByClassName('year-inner')[i].children[0].innerHTML =
      displayYear - (displayYear % 10) + i;
  }
}

//mark what days you went to the gym
let daysOfTheMonth = document.getElementsByClassName('active-day-outer');
for (let i = 0; i < daysOfTheMonth.length; i++) {
  daysOfTheMonth[i].addEventListener('click', () => {
    daysOfTheMonth[i].classList.toggle('active');
  });
}

//previous button
document.getElementById('previous-button').addEventListener('click', () => {
  if (whatToChange == 'month') {
    if (displayMonth == 0) {
      displayYear -= 1;
      displayMonth = 11;
    } else displayMonth -= 1;
    updateDisplay();
  } else if (whatToChange == 'year') {
    displayYear -= 1;
    monthToDisplay.innerHTML = displayYear;
    highlightActualMonth();
  } else if (whatToChange == 'decade') {
    displayYear -= 10;
    monthToDisplay.innerHTML = displayDecade(displayYear);
    updateCalendarYears();
    highlightActualYear();
  }

  removeWorkoutDays(); //remove workout days until the database is not set
});

//next button
document.getElementById('next-button').addEventListener('click', () => {
  if (whatToChange == 'month') {
    if (displayMonth == 11) {
      displayYear += 1;
      displayMonth = 0;
    } else displayMonth += 1;
    updateDisplay();
  } else if (whatToChange == 'year') {
    displayYear += 1;
    monthToDisplay.innerHTML = displayYear;
    highlightActualMonth();
  } else if (whatToChange == 'decade') {
    displayYear += 10;
    monthToDisplay.innerHTML = displayDecade(displayYear);
    updateCalendarYears();
    highlightActualYear();
  }

  removeWorkoutDays(); //remove workout days until the database is not set
});

//First click: display all months of the year
//Second click: display 12 years
monthToDisplay.addEventListener('click', () => {
  if (whatToChange == 'month') {
    whatToChange = 'year';
    document
      .getElementsByClassName('calendar-months')[0]
      .classList.add('active');
    monthToDisplay.innerHTML = displayYear;
    highlightActualMonth();
  } else if (whatToChange == 'year') {
    whatToChange = 'decade';
    document
      .getElementsByClassName('calendar-years')[0]
      .classList.add('active');
    monthToDisplay.innerHTML = displayDecade(displayYear);
    highlightActualYear();
  }
});

//choose what month to display
for (let i = 0; i < 12; i++) {
  document
    .getElementsByClassName('month-outer')
    [i].addEventListener('click', () => {
      displayMonth = i;
      document
        .getElementsByClassName('calendar-months')[0]
        .classList.remove('active');
      whatToChange = 'month';
      updateDisplay();
    });
}

//choose what year to display
for (let i = 0; i < 12; i++) {
  document
    .getElementsByClassName('year-outer')
    [i].addEventListener('click', () => {
      displayYear = parseInt(
        document.getElementsByClassName('year-outer')[i].children[0].children[0]
          .innerHTML
      );
      document
        .getElementsByClassName('calendar-years')[0]
        .classList.remove('active');
      whatToChange = 'year';
      highlightActualMonth();
      monthToDisplay.innerHTML = displayYear;
    });
}
