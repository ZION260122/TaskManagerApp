const User = require('../../database/model/user.model');
const Task = require('../../database/model/task.model');

const addTask = async (req, res) => {
  const { task, id } = req.body;

  try {
    if (!task) return res.status(400).send('Please enter the task');
    if (task.length < 5) return res.status(400).send('Add minimum 5 characters');

    const taskDetail = new Task({
      task,
      cretedBy: id,
    });

    await taskDetail.save();
    return res.status(201).send(taskDetail); // Use 201 for resource creation
  } catch (error) {
    return res.status(400).send('Task addition failed');
  }
};

const getAllTasks = async (req, res) => {
  const { id } = req.query;
  try {
    let tasklist = await Task.find({
      cretedBy: id, // Use 'cretedBy' here
    }).limit(20);

    return res.status(200).send(tasklist); // Complete the status and send response
  } catch (error) {
    return res.status(400).send('Failed to get tasks');
  }
};

const editTask = async (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(id, { task }, { new: true });

    if (!updatedTask) return res.status(404).send('Task not found');
    return res.status(200).send(updatedTask);
  } catch (error) {
    return res.status(400).send('Failed to edit task');
  }
};

const statusChange = async (req, res) => {
  const { id, string } = req.body;

  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).send('Task not found');
    }

    if (string === 'right') {
      if (task.status === 'backlog') {
        task.status = 'todo';
        task.save();
        return res.send(task);
      } else if(task.status === "todo"){
        task.status = 'doing';
        task.save();
        return res.send(task);
      } else if(task.status === "doing"){
        task.status = 'done';
        task.save();
        return res.send(task);
      } 
    } else{
      if (task.status === 'done') {
        task.status = 'doing';
        task.save();
        return res.send(task);
      } else if(task.status === "doing"){
        task.status = 'todo';
        task.save();
        return res.send(task);
      } else if(task.status === "todo"){
        task.status = 'backlog';
        task.save();
        return res.send(task);
      } 
    }

  } catch (error) {
    return res.status(400).send('Failed to change task status');
  }
};


const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    let response = await Task.findByIdAndDelete(id);

    return res.status(200).send(response);
  } catch (error) {
    return res.status(400).send('Failed to delete task');
  }
};

module.exports = {
  addTask,
  getAllTasks,
  editTask,
  statusChange,
  deleteTask,
};
