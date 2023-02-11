import { read, write } from "../utils/FS.js";
// import { ErrorHandler } from '../exceptions/ErrorHandler.js';

const t = new Date();
const date = ("0" + t.getDate()).slice(-2);
const month = ("0" + (t.getMonth() + 1)).slice(-2);
const year = t.getFullYear();

const time = `${date}/${month}/${year}`;

export const getTeacher = async (req, res, next) => {
  try {
    const { userId } = req;
    const foundUser = read("users.model.json")?.filter((e) => e.id == userId);

    const allStudent = await read("users.model.json")?.filter(
      (e) => e.role == "student"
    );

    res.render("personal-teacher.ejs", { time: time, student: foundUser });
  } catch (err) {
    res.sendStatus(500);
  }
};

export const postHometask = async (req, res, next) => {
  try {
    const { hometask } = req.body;

    const allTask = await read("hometask.json");

    allTask.push({ id: allTask.at(-1)?.id + 1 || 1, hometask, task: false });

    const newStudent = await write("hometask.json", allTask);

    res.redirect("/personal/teacher");
  } catch (err) {
    res.sendStatus(500);
  }
};

export const getStudent2 = async (req, res, next) => {
  try {
    const allGroup = await read("groups.json");

    res.render("guruhlar.ejs", { time, allGroup });
  } catch (err) {
    res.sendStatus(500);
  }
};

export const getGroupStudent = async (req, res, next) => {
  try {
    const id = req.params.id;

    const allStudent = await read("users.model.json")?.filter(
      (e) => e.role == "student"
    );
    const allGroup = await read("groups.json");

    const student = allStudent.filter((e) => e.guruhi == id);

    res.render("teacher.group.ejs", { time, allStudent, student });
  } catch (err) {
    res.sendStatus(500);
  }
};
