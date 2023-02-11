import { read, write } from "../utils/FS.js";
import { ErrorHandler } from "../exceptions/ErrorHandler.js";

const t = new Date();
const date = ("0" + t.getDate()).slice(-2);
const month = ("0" + (t.getMonth() + 1)).slice(-2);
const year = t.getFullYear();

const time = `${date}/${month}/${year}`;

export const getAdmin = async (req, res, next) => {
  try {
    const allGroups = await read("groups.json");
    const allCourses = await read("courses.json");
    const allTeachers = await read("users.model.json")?.filter(
      (e) => e.role == "teacher"
    );
    res.render("admin.ejs", {
      time: time,
      courses: allCourses,
      teachers: allTeachers,
      allGroups,
    });
  } catch (err) {
    res.sendStatus(500);
  }
};

export const postGroup = async (req, res, next) => {
  try {
    const { groupName, courseName, teacherName } = req.body;

    const allGroups = await read("groups.json");

    allGroups.push({
      id: allGroups.at(-1)?.id + 1 || 1,
      groupName,
      courseName,
      teacherName,
    });

    const newGroup = await write("groups.json", allGroups);

    res.redirect("/admins");
  } catch (err) {
    res.sendStatus(500);
  }
};

export const postCourse = async (req, res, next) => {
  try {
    const { courseName, description, price } = req.body;

    const allCourses = await read("courses.json");

    allCourses.push({
      id: allCourses.at(-1)?.id + 1 || 1,
      courseName,
      description,
      price,
    });

    const newCourse = await write("courses.json", allCourses);

    res.redirect("/courses");
  } catch (err) {
    res.sendStatus(500);
  }
};

export const deleteGroup = (req, res, next) => {
  try {
    const { id } = req.body;

    const allGroups = read("groups.json");
    const foundGroup = allGroups.findIndex((e) => e.id == id);

    allGroups.splice(foundGroup, 1);

    write("groups.json", allGroups);

    res.redirect("/admins");
  } catch (err) {
    res.sendStatus(500);
  }
};

export const getCourse = async (req, res, next) => {
  try {
    const allCourses = await read("courses.json");
    res.render("courses.ejs", { time: time, courses: allCourses });
  } catch (err) {
    res.sendStatus(500);
  }
};

export const deleteCourse = (req, res) => {
  try {
    const { id } = req.body;

    const allGroups = read("courses.json");
    const foundGroup = allGroups.findIndex((e) => e.id == id);

    allGroups.splice(foundGroup, 1);

    write("courses.json", allGroups);

    res.redirect("/courses");
  } catch (err) {
    res.sendStatus(500);
  }
};

export const postTeacher = async (req, res, next) => {
  try {
    const { userName, teacherYunalish, tel, password, vaqti } = req.body;

    const allTeachers = await read("users.model.json");

    allTeachers.push({
      id: allTeachers.at(-1)?.id + 1 || 1,
      userName,
      password,
      vaqti,
      role: "teacher",
      tel,
      teacherYunalish,
    });

    const newTeacher = await write("users.model.json", allTeachers);

    res.redirect("/admin/teacher");
  } catch (err) {
    res.sendStatus(500);
  }
};

export const deleteTeacher = async (req, res, next) => {
  try {
    const { id } = req.body;

    const allTeachers = await read("users.model.json");
    const foundTeacher = allTeachers.findIndex((e) => e.id == id);

    allTeachers.splice(foundTeacher, 1);

    await write("users.model.json", allTeachers);

    res.redirect("/admin/teacher");
  } catch (err) {
    res.sendStatus(500);
  }
};

export const getTeacherr = async (req, res, next) => {
  try {
    const allTeachers = await read("users.model.json")?.filter(
      (e) => e.role == "teacher"
    );

    res.render("teacher.ejs", { time: time, teacher: allTeachers });
  } catch (err) {
    res.sendStatus(500);
  }
};

export const getAdminStudent = async (req, res, next) => {
  try {
    const allGroup = await read("groups.json");

    const allStudent = await read("users.model.json")?.filter(
      (e) => e.role == "student"
    );
    console.log(allStudent);

    res.render("student.ejs", { time: time, student: allStudent, allGroup });
  } catch (err) {
    res.sendStatus(500);
  }
};

export const postAdminStudent = async (req, res, next) => {
  try {
    const { userName, guruhi, tel, password } = req.body;

    const allStudent = await read("users.model.json");

    allStudent.push({
      id: allStudent.at(-1)?.id + 1 || 1,
      userName,
      password,
      role: "student",
      tel,
      guruhi,
    });

    const newStudent = await write("users.model.json", allStudent);

    res.redirect("/admin/student");
  } catch (err) {
    res.sendStatus(500);
  }
};

export const deleteStudent = async (req, res, next) => {
  try {
    const { id } = req.body;

    const allStudent = await read("users.model.json");
    const foundStudent = allStudent.findIndex((e) => e.id == id);

    allStudent.splice(foundStudent, 1);

    await write("users.model.json", allStudent);

    res.redirect("/admin/student");
  } catch (err) {
    res.sendStatus(500);
  }
};

export const getXisobot = async (req, res, next) => {
  try {
    const allUsers = await read("users.model.json")?.filter(
      (e) => e.role == "student"
    );
    const allTeacher = await read("users.model.json")?.filter(
      (e) => e.role == "teacher"
    );
    const allGroups = await read("groups.json");
    const allCourses = await read("courses.json");

    res.render("xisobot.ejs", {
      time: time,
      user: allUsers,
      teacher: allTeacher,
      group: allGroups,
      allCourses,
    });
  } catch (err) {
    res.sendStatus(500);
  }
};
