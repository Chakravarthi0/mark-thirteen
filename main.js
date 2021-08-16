submit = document.getElementById("submit");

let currDate = document.getElementById("birthDate");

let errDiv = document.getElementById("errorDiv");

let resultRef = document.getElementById("result");

let gif = document.getElementById("gif");

submit.addEventListener("click", () => {
    resultRef.style.display = "none";
    let inputDate = currDate.value;
    console.log(inputDate);

    if (inputDate === "") {
        errDiv.style.display = "block";
    } else {
        gif.style.display = "block";
        errDiv.style.display = "none";
        var listOfDate = inputDate.split('-');

        console.log(listOfDate)
        var date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        };
        findPalis(date);
        // findOnlyNextPalindrome(date);
    }
})

//LOGIC

function reverseStr(str) {
    res = str.split("").reverse().join("");
    return res;
}

function checkPalindrome(str) {
    return str === reverseStr(str);
}

function dateToStr(date) {
    let dateStr = { day: "", month: "", year: "" };

    if (date.day < 10) {
        dateStr.day = "0" + date.day;
    } else {
        dateStr.day = date.day.toString();
    }

    if (date.month < 10) {
        dateStr.month = "0" + date.month;
    } else {
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();

    return dateStr;
}


function getAllDateFormats(date) {
    var dateStr = dateToStr(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}


function checkPalindromeForAllDateFormats(date) {
    let listOfAllDates = getAllDateFormats(date);

    for (let i = 0; i < listOfAllDates.length; i++) {
        if (checkPalindrome(listOfAllDates[i])) {
            console.log(listOfAllDates[i]);
            return true;
        }
    }

    return false;
}

function isLeapYear(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false;
    }
    if (year % 4 === 0) {
        return true;
    }
    return false;
}


function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


    if (month === 2) {

        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        }
        else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    }

    else {

        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }


    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    };
}


function getNextPalindromeDate(date) {
    var ctr = 0;
    var nextDate = getNextDate(date);

    while (1) {
        ctr++;
        var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if (isPalindrome) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [ctr, nextDate];
}


function getPrevDate(date) {
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


    if (day < 1) {
        //leap Year
        if (month === 3) {
            if (isLeapYear(year)) {
                day = 29;
            }
            day = 28;
        }
        //non-leapyr
        else {
            day = daysInMonth[month - 1];
        }
        month--;
    }

    if (month < 1) {
        month = 12;
        year--;
    }

    return {
        day: day,
        month: month,
        year: year
    };
}


function getPrevPalindromeDate(date) {
    var ctr = 0;
    var prevDate = getPrevDate(date);

    while (1) {
        ctr++;
        var isPalindrome = checkPalindromeForAllDateFormats(prevDate);
        if (isPalindrome) {
            break;
        }
        prevDate = getPrevDate(prevDate);
    }
    return [ctr, prevDate];
}


function findPalis(date) {

    if (checkPalindromeForAllDateFormats(date)) {
        resultRef.innerText = "Yay! your birthday is a palindrome!! 🥳🥳";
    }

    else {
        let prev = getPrevPalindromeDate(date);
        let next = getNextPalindromeDate(date);

        console.log(prev);
        console.log(next);

        if (prev[0] < next[0]) {
            resultRef.innerText = `Your birthday is not a palindrome. The closest palindrome date is ${prev[1].day}-${prev[1].month}-${prev[1].year}, you missed it by ${prev[0]} days 😔`
        } else {
            resultRef.innerText = `Your birthday is not a palindrome. The closest palindrome date is ${next[1].day}-${next[1].month}-${next[1].year}, you missed it by ${next[0]} days 😔`
        }
    }
    setTimeout(() => {
        resultRef.style.display = "block";
        gif.style.display = "none";
    }, 4000)
}

function findOnlyNextPalindrome(date) {
    if (checkPalindromeForAllDateFormats(date)) {
        resultRef.innerText = "Yay! your birthday is a palindrome!! 🥳🥳";
    }
    else {
        let next = getNextPalindromeDate(date);
        resultRef.innerText = `Your birthday is not a palindrome. The closest palindrome date is ${next[1].day}-${next[1].month}-${next[1].year}, you missed it by ${next[0]} days 😔`;
    }
    setTimeout(() => {
        resultRef.style.display = "block";
        gif.style.display = "none";
    }, 4000)
}

// findPalis({ day: 3, month: 12, year: 2011 })