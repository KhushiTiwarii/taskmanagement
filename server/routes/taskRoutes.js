const express = require('express');
const { createTask, updateTask, deleteTask, getTasks, taskSummaryReport } = require('../controllers/taskController');
const { protect, admin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/')
    .post(protect, createTask)
    .get(protect, getTasks);

router.route('/:id')
    .put(protect, updateTask)
    .delete(protect, deleteTask);

router.get('/report', protect, admin, taskSummaryReport);

module.exports = router;

