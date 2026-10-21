
const Queue = require("../Models/Queue")


const getAllQueues = async (req, res) => {
    const queues = await Queue.find()
    res.json(queues)
}

const getQueueById = async (req, res) => {
    const { id } = req.params
    const queue = await Queue.findById(id)
    if (!queue) {
        return res.send("queue not found")
    }
    res.json(queue)
}


const createQueue = async (req, res) => {

    const { name, day, hour,type } = req.body
    
    const numericDay = Number(day)
    const numericHour = Number(hour)
    if (!name || !Number.isInteger(numericDay) || numericDay < 1 || numericDay > 5 ||
        !Number.isInteger(numericHour) || numericHour < 8 || numericHour > 22 ||
        !['Borrow', 'Read'].includes(type)) {
        return res.status(400).json({
            message: "Name, a valid type, day (1-5), and hour (8-22) are required."
        })
    }
    const queue = await Queue.create({ name, type, day: numericDay, hour: numericHour })
    res.json(queue)

}

const updateQueue=async (req,res)=>{
    const {id}=req.params

    const {day,hour}=req.body
    const queue=await Queue.findById(id)
    if(!queue){
        return res.send("queue not found")
    }
    queue.day=day
    queue.hour=hour
    const updatedQueue=await queue.save()
    res.json(updatedQueue)
}

const deleteQueue= async(req,res)=>{

    const {id}=req.params

    const queue=await Queue.findById(id)
    if(!queue){
        res.send("queue not found")
    }
    await queue.deleteOne()
    res.send(`queue ${queue.name} deleted`)
}
module.exports={
    getAllQueues,
    deleteQueue,
    updateQueue,
    createQueue,
    getQueueById
}