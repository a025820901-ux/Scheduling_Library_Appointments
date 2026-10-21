import { useHotel } from "../provider/HotelProvider"
import { Link } from "react-router-dom"
import RoomCard from "./RoomCard"
const RoomsList = () => {
  const { rooms } = useHotel()
  return (
    <>
      <div className="roomlist" > {rooms.map((room) => (
        <RoomCard key={room._id} data={room}> </RoomCard>
      )

      )}
      </div>
      <Link to="/form"><h1>+ הוספת חדר חדש</h1></Link>

    </>
  )
}
export default RoomsList