import { useState } from "react"
import { useHotel } from "../provider/HotelProvider"
import { useNavigate } from "react-router-dom"
const AddRoomForm = () => {
    const nevigate=useNavigate();
    const [form, Setform] = useState({
        roomNumber: "",
        type: "",
        price: "",
        isAvailable: true
    })
    const {AddRoom}=useHotel()
    const handelsubmit=(e)=>{
        e.preventDefault()
        AddRoom(form)
        nevigate("/")
     
    
    console.log("החדר נוסף")
    }
    return <>
        <form onSubmit={handelsubmit}>
            <label>מספר חדר
                <input
                    type="Number"
                    value={form.roomNumber}
                    onChange={(e) => Setform({...form,roomNumber:e.target.value})}
                >
                </input></label>
            <br />
            <br />
            <label>סוג חדר
              <select  value={form.type} onChange={(e) => Setform({...form,type:e.target.value})} name="type">
                        <option value="" >
                        </option>
                        <option value="single" >
                            single
                        </option>
                        <option value="double" >
                            double
                        </option>
                        <option value="suite" >
                            suite
                        </option>
                    </select>
                <br />
            <br />
            </label>
            <label>מחיר
                <input
                type="Number"
                value={form.price}
                onChange={(e)=>Setform({...form, price:Number(e.target.value)})}
                > 
                </input>
                <br />
            <br />
                <label>האם החדר פנוי?
                  <input
                  type="checkbox"
                  checked={form.isAvailable}
                  onChange={(e)=>Setform({...form,isAvailable:e.target.checked})}
                  ></input>
                </label>
            </label>
            <br/>
            <button 
            type="submit"
            >שליחה</button>
        </form>

    </>

}
export default AddRoomForm