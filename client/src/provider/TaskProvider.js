import { useContext,createContext, useEffect, useState } from "react";
import axios from 'axios';
import AddTaskForm from "../components/AddTaskForm";
export const TaskContext = createContext();
const DATABASEURI="http://localhost:8870/api/rooms"

export const  TaskProvider=({ children })=> {
  const [Tasks, setTasks] = useState([]);
  const [editingRoom, setEditingRoom] = useState(null)


  useEffect(() => {
    axios.get(DATABASEURI)
      .then(res => setTasks(res.data))
      .catch(err => console.log(err)); 
  }, []);

//   const AddRoom=async(form)=>{
//     try{
//       const newRoom=await axios.post("http://localhost:2026/rooms",{...form})
//       setrooms([...rooms,newRoom.data])
//     }
//     catch(e){
// alert(e)
//     }
//   }
// const updateRoom = async (data) => {
//    try {
//         const response = await axios.put(`http://localhost:2026/rooms/${data._id}`, { ...data });
        
//         setrooms(rooms.map(room => room._id === data._id ? data : room));
        
//         console.log("החדר עודכן בהצלחה!");
//    }
//    catch (e) {
//         alert("שגיאה בעדכון החדר: " + e.message);
//    }
// }
//         const deleteRoom=async(id)=>{
//        try{
//             const newRoom= await axios.delete("http://localhost:2026/rooms", { data: { id: id } })
//            setrooms(rooms.filter(room => room._id !== id))
//        }
//        catch(e){
//          alert(e)
//        }
//     }



  return (
    <TaskContext.Provider
      value={{ Tasks,setTasks }}
    >
      {children}
    </TaskContext.Provider>
  );
}
export const useTask = () => {
    return useContext(TaskContext)
}
