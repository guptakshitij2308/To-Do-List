import React, { useState } from "react";

import AddForm from "./components/AddForm";
// import ToDo from "./components/ToDo";
import UpdateForm from "./components/UpdateForm";

import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faPen,
  faTasks,
  faTrashCan,
  faFaceLaughWink,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import { faLaughWink } from "@fortawesome/free-solid-svg-icons";

function App() {
  // Tasks (ToDo List ) State
  const [toDo, setToDo] = useState([
    // { id: 1, title: "Task 1", status: false },
    // { id: 2, title: " Task 2", status: false },
  ]);

  // Temp State
  const [newTask, setNewTask] = useState("");
  const [updateData, setUpdateData] = useState("");

  // Add new Task
  ///////-------////////////
  const addTask = () => {
    //
    if (newTask) {
      let num = toDo.length + 1;
      let newEntry = { id: num, title: newTask, status: false };
      setToDo([...toDo, newEntry]);
      setNewTask("");
    }
  };

  // Delete Task
  ///////-------////////////

  const deleteTask = (id) => {
    //
    let newTasks = toDo.filter((task) => task.id !== id);
    setToDo(newTasks);
  };

  // Mark task as done
  ///////-------////////////

  const markDone = (id) => {
    //
    let newTask = toDo.map((task) => {
      if (id === task.id) {
        return { ...task, status: !task.status };
      }
      return task;
    });
    setToDo(newTask);
  };

  // Cancel Update
  ///////-------////////////

  const cancelUpdate = () => {
    //
    setUpdateData("");
  };

  // Change Yask for update
  ///////-------////////////

  const changeTask = (e) => {
    //
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status,
    };
    setUpdateData(newEntry);
  };

  // Update Task
  ///////-------////////////
  const updateTask = () => {
    let filterRecords = [...toDo].filter((task) => task.id !== updateData.id);
    let updatedObject = [...filterRecords, updateData];
    setToDo(updatedObject);
    setUpdateData("");
    //
  };

  return (
    <div className="container App">
      <br />
      <br />
      <h1 className="heading"> My To-Do-List </h1>
      <br />
      <br />
      {updateData && updateData ? (
        <UpdateForm
          updateData={updateData}
          changeTask={changeTask}
          updateTask={updateTask}
          cancelUpdate={cancelUpdate}
        />
      ) : (
        <AddForm newTask={newTask} setNewTask={setNewTask} addTask={addTask} />
      )}

      {/* Display ToDo's */}
      <h4 className="empty">
        {toDo && toDo.length ? "" : "No Tasks to be done... "}
        {toDo && toDo.length ? (
          ""
        ) : (
          <FontAwesomeIcon className="empty-icon" icon={faLaughWink} />
        )}
      </h4>
      {toDo &&
        toDo
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map((task, index) => {
            return (
              <React.Fragment key={task.id}>
                <div className="col taskBg">
                  <div className={task.status ? "done" : ""}>
                    <span className="taskNumber">{index + 1}</span>
                    <span className="taskText">{task.title}</span>
                  </div>
                  <div className="iconsWrap">
                    <span
                      title="Completed / Not Completed"
                      onClick={(e) => markDone(task.id)}
                    >
                      <FontAwesomeIcon icon={faCircleCheck} />
                    </span>
                    {task.status ? null : (
                      <span
                        title="Edit"
                        onClick={() =>
                          setUpdateData({
                            id: task.id,
                            title: task.title,
                            status: task.status,
                          })
                        }
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </span>
                    )}

                    <span title="Delete" onClick={() => deleteTask(task.id)}>
                      <FontAwesomeIcon icon={faTrashCan} />
                    </span>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
    </div>
  );
}

export default App;
