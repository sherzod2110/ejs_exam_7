import { Router } from "express";
import { deleteCourse, deleteGroup, getAdmin, getCourse, postCourse, deleteTeacher, postTeacher, getAdminStudent, postAdminStudent, deleteStudent, getXisobot, getTeacherr } from "../controller/admin.js";
import { getLogin, login } from "../controller/auth.js";
import { getGroupStudent, getStudent2, getTeacher, postHometask } from "../controller/teacher.js";
import { postGroup } from "../controller/admin.js";
import { getStudent } from "../controller/student.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { verifyRole } from "../middlewares/verifyRole.js";
import { loginChecker } from "../middlewares/loginChecker.js";


const router = Router()

export default router
  .get('/', loginChecker, getLogin)
  .post('/auth/login', login)
  .get('/admins', verifyToken, verifyRole('Admin'), getAdmin)
  .get('/admin/teacher', verifyToken, verifyRole('Admin'), getTeacherr)
  .get('/courses', verifyToken, verifyRole('Admin'), getCourse)
  .get('/admin/student', verifyToken,verifyRole('Admin'), getAdminStudent)
  .get('/xisobot',verifyToken, verifyRole('Admin'), getXisobot)
  .get('/personal/teacher', verifyToken, verifyRole('Teacher'), getTeacher)
  .get('/student/group', getStudent2)
  .get('/personal/student', verifyToken, verifyRole('Student'), getStudent)
  .post('/admins', verifyToken, verifyRole('Admin'), postGroup)
  .post('/courses', verifyToken,verifyRole('Admin'), postCourse)                      
  .post('/admin/teacher', verifyToken, verifyRole('Admin'), postTeacher)
  .post('/admin/student', verifyToken, verifyRole('Admin'), postAdminStudent)
  .post('/admin/group-delete', verifyToken, verifyRole('Admin'), deleteGroup)
  .post('/admin/course-delete', verifyToken, verifyRole('Admin'), deleteCourse)
  .post('/admin/teacher-delete', verifyToken, verifyRole('Admin'), deleteTeacher)
  .post('/admin/student-delete', verifyToken, verifyRole('Admin'), deleteStudent)
  .post('/personal/teacher', verifyToken, verifyRole('Teacher'), postHometask)
  .get('/student/group', verifyToken, verifyRole('Teacher'), getStudent2)
  .get('/group/student/:id', verifyToken, verifyRole('Teacher'), getGroupStudent)



