# School Management System API

This is a backend API for a school management system built with **Node.js**, **Express**, and **Passport.js**. It provides endpoints for managing students, teachers, and managers, including authentication, user management, and grading.

---

## Features

- **Authentication**: Secure login using Passport.js local strategy.
- **User Management**:
  - Students can view their groups, teachers, and grades.
  - Teachers can manage groups, students, and grades.
  - Managers can add/remove teachers, students, and groups.
- **Role-Based Access**: Different routes for students, teachers, and managers.

---

## API Endpoints

### Authentication
- `POST /login` - Login with username and password.

### User Routes
- `GET /profile` - Get user profile.
- `GET /searchGroups` - Search groups by name.
- `PATCH /updateUser` - Update user profile.
- `PATCH /password` - Update user password.
- `DELETE /user` - Delete user account.

### Teacher Routes
- `GET /groups` - Get all groups.
- `GET /groupStudents` - Get students in a specific group.
- `PATCH /gradeStudent/:id` - Grade a student.

### Student Routes
- `GET /studentGroup` - Get the student's group.
- `GET /teacher` - Get the student's teacher.
- `GET /studentsByGroup` - Get all students in a group.
- `GET /grade` - Get the student's grades.

### Manager Routes
- `GET /groups` - Get all groups.
- `POST /teacher` - Add a new teacher.
- `POST /group` - Add a new group.
- `POST /student` - Add a new student.
- `PATCH /studentGroup/:id` - Update a student's group.
- `DELETE /group/:id` - Delete a group.
- `DELETE /student/:id` - Delete a student.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/NorikAleqsanyan/School_Management_System_API.git