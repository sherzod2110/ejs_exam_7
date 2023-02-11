import { read } from "../utils/FS.js";
// import { ErrorHandler } from '../exceptions/ErrorHandler.js';

const t = new Date();
const date = ("0" + t.getDate()).slice(-2);
const month = ("0" + (t.getMonth() + 1)).slice(-2);
const year = t.getFullYear();

const time = `${date}/${month}/${year}`;

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const d = new Date();
let monthh = months[d.getMonth()];

const today = new Date();
let hour = today.getHours();
const minute = today.getMinutes();
const second = today.getSeconds();
let prepand = hour >= 12 ? " PM " : " AM ";
hour = hour >= 12 ? hour - 12 : hour;
if (hour === 0 && prepand === " PM ") {
  if (minute === 0 && second === 0) {
    hour = 12;
    prepand = " Noon";
  } else {
    hour = 12;
    prepand = " PM";
  }
}
if (hour === 0 && prepand === " AM ") {
  if (minute === 0 && second === 0) {
    hour = 12;
    prepand = " Midnight";
  } else {
    hour = 12;
    prepand = " AM";
  }
}

const time2 = `${hour}${prepand} : ${minute}`;

export const getStudent = (req, res, next) => {
  try {
    const { userId } = req;

    const foundUser = read("users.model.json")?.filter((e) => e.id == userId);
    const allTask = read("hometask.json");

    res.render("personal-student.ejs", {
      time: time,
      student: foundUser,
      allTask,
      monthh,
      month,
      time2,
      date,
    });
  } catch (err) {
    res.sendStatus(500);
  }
};
