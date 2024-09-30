const Task = require('../models/Task');

// Create Task
exports.createTask = async (req, res) => {
    const { title, description, dueDate, status, priority, assignedUser } = req.body;
    try {
        const task = new Task({
            title,
            description,
            dueDate,
            status,
            priority,
            assignedUser,
            createdBy: req.user.id,
        });
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update Task
exports.updateTask = async (req, res) => {
    const { title, description, dueDate, status, priority, assignedUser } = req.body;
    try {
        let task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        task = await Task.findByIdAndUpdate(req.params.id, {
            title, description, dueDate, status, priority, assignedUser
        }, { new: true });

        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete Task
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Check if the user is authorized to delete the task
        if (!req.user.isAdmin && task.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this task' });
        }

        // Delete the task using findByIdAndDelete
        await Task.findByIdAndDelete(req.params.id); // This will automatically remove the document

        res.status(200).json({ message: 'Task removed' });
    } catch (err) {
        console.error(err);  // Log the error for debugging
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};



// Get tasks (pagination & filtering)
exports.getTasks = async (req, res) => {
    const { status, priority, assignedUser } = req.query;
    try {
        const query = {
            ...(status && { status }),
            ...(priority && { priority }),
            ...(assignedUser && { assignedUser }),
        };
        const tasks = await Task.find(query).populate('assignedUser createdBy');
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Task Summary Report
exports.taskSummaryReport = async (req, res) => {
    const { status, user, startDate, endDate } = req.query;
    try {
        const query = {
            ...(status && { status }),
            ...(user && { assignedUser: user }),
            ...(startDate && endDate && { dueDate: { $gte: startDate, $lte: endDate } }),
        };
        const tasks = await Task.find(query).populate('assignedUser');
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};
