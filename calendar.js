/*
 * Student Name: Usama Halow
 * Student ID: 41110532
 * Course: CST8209 - Web Programming I
 * Semester: 1
 * Assignment: Assignment 3: Calendar of Events – Part 3
 * Date Submitted:  4/5/2024
 */


function Calendar(elem) {
    this.elem = elem;
    this.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    this.getMonth = function(monthIndex) {
        switch (monthIndex) {
            case 0:
                return "January";
            case 1:
                return "February";
            case 2:
                return "March";
            case 3:
                return "April";
            case 4:
                return "May";
            case 5:
                return "June";
            case 6:
                return "July";
            case 7:
                return "August";
            case 8:
                return "September";
            case 9:
                return "October";
            case 10:
                return "November";
            case 11:
                return "December";
            default:
                return "Unknown";
        }
    };

    this.getDaysInMonth = function(monthIndex, year) {
        return (typeof monthIndex === 'number' && monthIndex >= 0 && monthIndex <= 11) ? new Date(year, monthIndex + 1, 0).getDate() : -1;
    };

    this.display = function(displayDate = new Date()) {
        this.elem.empty();

        let daysInMonth = this.getDaysInMonth(displayDate.getMonth(), displayDate.getFullYear());
        let days = [];
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(displayDate.getFullYear(), displayDate.getMonth(), i));
        }

        let calTable = $("<table></table>");
        let calHeader = $("<thead></thead>");
        let calBody = $("<tbody></tbody>");

        let prevMonthBtn = $("<button></button>").text('<<').click(() => {
            this.display(new Date(displayDate.getFullYear(), displayDate.getMonth() - 1));
        });
        let prevMonthCell = $("<td></td>").append(prevMonthBtn);

        let nextMonthBtn = $("<button></button>").text('>>').click(() => {
            this.display(new Date(displayDate.getFullYear(), displayDate.getMonth() + 1));
        });
        let nextMonthCell = $("<td></td>").append(nextMonthBtn);

        let monthYearCell = $("<td></td>").attr("colspan", "5");
        let monthYearHeading = $("<h1></h1>").text(this.getMonth(displayDate.getMonth()) + " " + displayDate.getFullYear());
        monthYearCell.append(monthYearHeading);

        let headerRow = $("<tr></tr>").append(prevMonthCell, monthYearCell, nextMonthCell);
        calHeader.append(headerRow);

        let weekdayRow = $("<tr></tr>");
        for (const dayName of this.dayNames) {
            let dayHeader = $("<th></th>").text(dayName);
            weekdayRow.append(dayHeader);
        }
        calHeader.append(weekdayRow);

        let currentRow = $("<tr></tr>");
        for (let i = 0; i < days[0].getDay(); i++) {
            currentRow.append($("<td></td>"));
        }

        for (let i = 0; i < days.length; i++) {
            if (days[i].getDay() === 0 && i !== 0) {
                calBody.append(currentRow);
                currentRow = $("<tr></tr>");
            }
            let dayCell = $("<td></td>").text(days[i].getDate()).addClass("day");
            currentRow.append(dayCell);
        }

        for (let i = days[days.length - 1].getDay() + 1; i < 7; i++) {
            currentRow.append($("<td></td>"));
        }
        calBody.append(currentRow);

        calTable.append(calHeader, calBody);
        this.elem.append(calTable);
    };

    // Function to validate the event form
    function validateEventForm() {
        let eventDate = $("#eventDate").val();
        let eventTitle = $("#eventTitle").val();
        let eventDescription = $("#eventDescription").val();

        if (eventDate === "" || !isValidDate(eventDate)) {
            alert("Please enter a valid date.");
            return false;
        }

        if (eventTitle === "" || eventTitle.length < 3) {
            alert("Event title is required and must be at least 3 characters long.");
            return false;
        }

        return true;
    }

    function isValidDate(dateString) {
        let dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(dateString)) return false;

        let dateParts = dateString.split("-");
        let year = parseInt(dateParts[0]);
        let month = parseInt(dateParts[1]);
        let day = parseInt(dateParts[2]);

        let date = new Date(year, month - 1, day);
        return (date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day);
    }

    // Event handler for form submission
    $("#eventForm").submit(function(event) {
        event.preventDefault(); // Prevent default form submission
        if (validateEventForm()) {
            alert("Form submitted successfully!");
            $("#eventForm")[0].reset();
            addEvent(); // Add event to the events array
            console.log(events); // Output the contents of the events array to the console
        }
    });

    // Event handler for Clear button click
    $("#clearButton").click(function() {
        $("#eventForm")[0].reset(); // Reset the form
    });

    // Function to add event to the events array
    function addEvent() {
        let eventDate = $("#eventDate").val();
        let eventTitle = $("#eventTitle").val();
        let eventDescription = $("#eventDescription").val();

        let eventInfo = {
            date: eventDate,
            title: eventTitle,
            description: eventDescription
        };

        events.push(eventInfo);
    }
}

const cal = new Calendar($("#calendar"));
cal.display();
