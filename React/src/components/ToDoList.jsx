import React, {useState} from "react"
function ToDoList(){
    const[tasks, setTasks] = useState(["Kutyát sétáltatni", "Mosni", "Takarítani"]);
    const[newTask, setNewTask] = useState("");

    function handleInputChange(event){
        setNewTask(event.target.value);

    }

    function AddTask(){

        if(newTask.trim() !== ""){
            setTasks(t => [...t, newTask]);
            setNewTask("");
        }

    }

    function deleteTask(index){

        const updatedTasks = tasks.filter((Element, i) => i !== index);
        setTasks(updatedTasks);

    }
    function moveTaskUp(index){
        if(index > 0){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }

    }

    function moveTaskDown(index){
         if(index < tasks.length){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }

    }
    return(<div className ="to-do-list">
<h1>To-Do-List</h1>
<div>
    <input
    type="text"
    placeholder="Enter a task..."
    value={newTask}
    onChange={handleInputChange}/>
    <button
    className="add-button"
    onClick={AddTask}>
        Hozzáad
    </button>

</div>
<ol>
    {tasks.map((task, index) =>
    <li key={index}>
    <span className="text">{task}</span>
    <button className="delete-button" onClick={() => deleteTask(index)}>Törlés</button> 
    <button className="moveUp-button" onClick={() => moveTaskUp(index)}>Fel</button> 
    <button className="moveDown-button" onClick={() => moveTaskDown(index)}>Le</button> 

    </li>)}
</ol>

    </div>)

}
export default ToDoList