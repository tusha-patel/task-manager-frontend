export const BASE_URL = "https://task-manager-backend-o1n3.onrender.com";


export const API_PATHS = {
    AUTH: {
        REGISTER: "/api/auth/register",//Register a new user (Admin Or member )
        LOGIN: "/api/auth/login",//authenticate user & return jwt token
        GET_PROFILE: "/api/auth/profile", //Get logged-in user details
    },
    USERS: {
        GET_ALL_USERS: "/api/users/", //Get all users (Admin Only)
        GET_USER_BY_ID: (userId) => `/api/users/${userId}`, //Get user By Id
        CREATE_USER: "/api/users/", //Create a new user (Admin only)
        UPDATE_USER: (userId) => `/api/users/${userId}`, //Update user details
        DELETE_USER: (userId) => `/api/users/${userId}` //Delete a user
    },
    TASKS: {
        GET_DASHBOARD_DATA: "/api/tasks/dashboard-data",//Get Dashboard data
        GET_USER_DASHBOARD_DATA: "/api/tasks/user-dashboard-data",//Get user dashboard Data
        GET_ALL_TASKS: "/api/tasks", //Get all task(Admin:all user:only assigned)
        GET_TASK_BY_ID: (taskId) => `/api/tasks/${taskId}`,//Get Task By Id
        CREATE_TASK: "/api/tasks",//Create a new Task (Admin only)
        UPDATE_TASK: (taskId) => `/api/tasks/${taskId}`,//update task details
        DELETE_TASK: (taskId) => `/api/tasks/${taskId}`,//Delete A Task only admin
        UPDATE_TASK_STATUS: (taskId) => `/api/tasks/${taskId}/status`, //Update task status
        UPDATE_TODO_CHECKLIST: (taskId) => `/api/tasks/${taskId}/todo`//Update task Checklist
    },
    REPORT: {
        EXPORT_TASKS: "/api/reports/export/tasks", //Download all tasks as an excel file
        EXPORT_USERS: "/api/reports/export/users" // Download user-task report
    },

    IMAGE: {
        UPLOAD_IMAGE: "/api/auth/upload-image "
    }
}




