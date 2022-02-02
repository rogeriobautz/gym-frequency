console.log(`teste0`);
now = new Date();
let displayMonth = now.getMonth();
let displayYear = now.getFullYear();

function removeActiveDays() {
  for (let i of document.getElementsByClassName('day-outer')) {
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

monthName = new Array(
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro'
);

function updateDisplay() {
  const date = new Date(displayYear, displayMonth, 1);

  document.getElementById('month').innerHTML =
    monthName[displayMonth] + ' de ' + displayYear;

  //Days of the actual month
  const dayOne = document.getElementById('day1');
  dayOne.style.marginLeft = '0px'; //remove margin before cloning

  let allDays = document.getElementsByClassName('day-outer').length;
  const daysOfTheMonth = totalDaysMonth(displayYear, displayMonth);

  while (document.getElementsByClassName('complement-outer').length) {
    document.getElementsByClassName('complement-outer')[0].remove();
  } //remove the old days before and after to use removeChild below

  while (allDays != daysOfTheMonth) {
    if (allDays < daysOfTheMonth) {
      const clone = dayOne.cloneNode(true);
      clone.id = 'day' + (allDays + 1);
      clone.children[0].children[0].innerHTML = allDays + 1;
      dayOne.parentNode.appendChild(clone);
      allDays += 1;
    } else {
      document
        .getElementsByClassName('all-days')[0]
        .removeChild(document.getElementsByClassName('all-days')[0].lastChild);
      allDays -= 1;
    }
  }

  //Days before the actual month - not clickable
  const daysBefore = () => {
    //if (date.getDay() == 0) return 7;
    //else
    return date.getDay();
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
    firstDay = document.getElementsByClassName('all-days')[0].firstChild;
  }

  //Days after the actual month - not clickable
  const daysAfter = 42 - (daysOfTheMonth + daysBefore());
  //6 rows x 7 columns=42
  let idDaysAfter = 1;
  let lastDay = document.getElementsByClassName('all-days')[0].lastChild;

  while (idDaysAfter <= daysAfter) {
    const clone = dayOne.cloneNode(true);
    clone.id = 'day-after' + idDaysAfter;
    clone.setAttribute('class', 'complement-outer');
    clone.children[0].children[0].innerHTML = idDaysAfter;
    lastDay.parentNode.appendChild(clone);
    idDaysAfter += 1;
    lastDay = document.getElementsByClassName('all-days')[0].lastChild;
  }

  //check if exists a day with the same number as today
  //removing a class from a non-existing object returns an error
  const todayHigh = document.getElementById('day' + now.getDate());
  if (todayHigh) {
    if (displayYear == now.getFullYear() && displayMonth == now.getMonth())
      todayHigh.children[0].classList.add('today');
    // add highlight to today
    else todayHigh.children[0].classList.remove('today'); //remove highlight from today
  }
  return; //updateDisplay return
}

updateDisplay(); //Initial date is actual date

let dayMon = document.getElementsByClassName('day-outer');
//active days
for (let i = 0; i < dayMon.length; i++) {
  dayMon[i].addEventListener('click', () => {
    console.log(dayMon[i].children[0].children[0].innerHTML);
    dayMon[i].classList.toggle('active');
  });
}

document.getElementById('previous-button').addEventListener('click', () => {
  //previous month
  if (displayMonth == 0) {
    displayYear -= 1;
    displayMonth = 11;
  } else displayMonth -= 1;
  updateDisplay();
  /* console.log(
    displayMonth + ' - ' + monthName[displayMonth] + ' de ' + displayYear
  ); */
  removeActiveDays(); //remove active days until the database is not set
});

document.getElementById('next-button').addEventListener('click', () => {
  //next month
  if (displayMonth == 11) {
    displayYear += 1;
    displayMonth = 0;
  } else displayMonth += 1;
  updateDisplay();
  /* console.log(
    displayMonth + ' - ' + monthName[displayMonth] + ' de ' + displayYear
  ); */
  removeActiveDays(); //remove active days until the database is not set
});

document.getElementById('month').addEventListener('click', () => {
  //open popup with all months of the year
  console.log('month click');
});
