const express=require("express")
const router=express.Router()
const Queue=require("../Models/Queue")
const queueController=require("../Controllers/QueueController")
router.use(express.json())


router.get("/",queueController.getAllQueues)
router.get("/:id",queueController.getQueueById)
router.post("/",queueController.createQueue)
router.put("/:id",queueController.updateQueue)
router.delete("/:id",queueController.deleteQueue)

module.exports=router