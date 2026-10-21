import { useContext, createContext, useEffect, useState } from "react";
import axios from 'axios';
import AddRoomForm from "../components/AddRoomForm";
// import { addRoom } from "../../../server/controllers/HotelRoomController";

export const HotelContext = createContext();
const DATABASEURI = "http://srv2:27017/217171743_2026";

export const HotelProvider = ({ children }) => {
  const [rooms, setrooms] = useState([]);
  const [editingRoom, setEditingRoom] = useState(null)

  useEffect(() => {
    axios.get(DATABASEURI)
      .then(res => setrooms(res.data))
      .catch(err => console.log(err));
  }, []);

  const AddRoom = async (form) => {
    try {
      const newRoom = await axios.post(DATABASEURI, [form])
      setrooms([...rooms, newRoom.data])
    }
    catch (e) {
      alert(e)
    }
  }
  const updateRoom = async (data) => {
    try {
      const response = await axios.put(DATABASEURI, data);

      setrooms(rooms.map(room => room._id === data._id ? data : room));

      console.log("החדר עודכן בהצלחה!");
    }
    catch (e) {
      alert("שגיאה בעדכון החדר: " + e.message);
    }
  }
  const deleteRoom = async (id) => {
    try {
      const newRoom = await axios.delete(DATABASEURI, { data: { id: id } })
      setrooms(rooms.filter(room => room._id !== id))
    }
    catch (e) {
      alert(e)
    }
  }



  return (
    <HotelContext.Provider
      value={{ rooms, setrooms, AddRoom, updateRoom, deleteRoom }}
    >
      {children}
    </HotelContext.Provider>
  );
}
export const useHotel = () => {
  return useContext(HotelContext)
}
