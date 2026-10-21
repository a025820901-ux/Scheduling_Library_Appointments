import { useHotel } from "../provider/HotelProvider"
const RoomCard = ({ data }) => {
   const { updateRoom, deleteRoom } = useHotel()
   console.log(data.isAvailable)
   return (
      <>
         <div className="roomscontainer">
            <p>מספר חדר: {data.roomNumber}</p>
            <p>סוג: {data.type}</p>
            <p>מחיר: {data.price}</p>
            <div>{data.isAvailable ? "זמין" : "לא זמין"}</div>
            <button onClick={() => updateRoom({ ...data, isAvailable: !data.isAvailable })}>update Room</button>
            <button onClick={() => deleteRoom(data._id)}>delete</button>
         </div>


      </>
   )

}
export default RoomCard