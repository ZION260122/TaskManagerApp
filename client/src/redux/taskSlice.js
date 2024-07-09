import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'react-toastify';

const initialtask = localStorage.getItem('task')
  ? JSON.parse(localStorage.getItem('task'))
  : null;

const initialState = {
  TaskData: initialtask,
  AllTasks: {},
};

export const taskSlice = createSlice({
  name: 'Task',
  initialState,

  reducers: {
    taskAddedSuccessfully: (state, action) => {
      state.TaskData = action.payload;
    },
    taskAddFailure: (state) => {
      return state;
    },
    getAllTaskSuccess: (state, action) => {
      state.AllTasks = action.payload;
    },
    getAllTaskFailure: (state) => {
      return state;
    },
    editTaskSuccess: (state, action) => {
      state.TaskData = action.payload;
    },
    deleteSuccess: (state, action) => {
      state.TaskData = action.payload;
    },
    deleteFail: (state) => {
      return state;
    },
  },
});

export const {
  taskAddFailure,
  taskAddedSuccessfully,
  getAllTaskFailure,
  getAllTaskSuccess,
  editTaskSuccess,
  deleteFail,
  deleteSuccess
} = taskSlice.actions;

export default taskSlice.reducer;

export const addTask = (task, id) => async (dispatch) => {
  if (!task || !id) {
    console.error('Invalid task or id:', { task, id });
    dispatch(taskAddFailure());
    return;
  }

  const taskData = { task, id };

  try {
    const response = await axios.post('http://localhost:4000/task/add', taskData);
    console.log(response);

    if (response && response.data) {
      localStorage.setItem('task', JSON.stringify(response.data));
      dispatch(taskAddedSuccessfully(response.data));
      toast.success('Task added successfully');
      window.location.reload();
    } else {
      dispatch(taskAddFailure());
    }
  } catch (error) {
    console.error('Error adding task:', error.response?.data || error.message);
    dispatch(taskAddFailure());
  }
};

export const getAllTasks = (token, id) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      id,
    },
  };

  try {
    const response = await axios.get(
      'http://localhost:4000/task/tasks', 
      config
    );
    if (response && response.data) {
      dispatch(getAllTaskSuccess(response.data));
    } else {
      dispatch(getAllTaskFailure());
    }
  } catch (error) {
    console.error('Error fetching tasks:', error.response?.data || error.message);
    dispatch(getAllTaskFailure());
  }
};


export const arrowClick = (item, string) => async () => {
	let taskData = {
		id: item._id,
		status: item.status,
		string,
	};

	try {
		let response = await axios.put(
			`http://localhost:4000/task/${taskData.id}`,
			taskData
		);

		if (response) {
			window.location.reload();
		}
	} catch (error) {
		console.log(error);
	}
};

export const deleteItem = (id) => async(dispatch) => {
  let res = await axios.delete(`http://localhost:4000/task/${id}`)

  if(res) {
    dispatch(deleteSuccess());
    window.location.reload();
  }else {
    dispatch(deleteFail());
  }
}