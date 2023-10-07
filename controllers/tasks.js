const Task = require('../models/task');
const getAllTasks = async(req,res) =>{
    try{
        const tasks =await Task.find({});
        res.status(200).json({success: true,tasks})
    }
    catch(err){
        res.status(500).json({msg:err});
    }
    
};

const createTask = async(req,res) =>{
    try{
        const task = await Task.create(req.body);
        res.status(201).json(task);  
    }
    catch(err){
        res.status(500).json({msg:err});
    }
    
};

const getTask = async(req,res) =>{
    try{
        const singleTask = await Task.findOne({_id:req.params.id});
        if(!singleTask)
        {
            return res.status(404).json({msg:`No task found with id: ${req.params.id}`});
        }
        res.status(200).json(singleTask);
    }
    catch(err){
        res.status(500).json({msg:err})
    }
}


const deleteTask = async(req,res) =>{
    try{
        const {id} = req.params;
        const task = await Task.findOneAndDelete({_id:id});
        if(!task)
        {
            return res.status(400).json({msg:`No task with id: ${id}}`})
        }
        res.status(200).json({task});
    }
    catch(err){
        res.status(500).json({msg:err});
    }
}

const updateTask = async(req,res) =>{
    try{
        const {id} = req.params;
        const task = await Task.findOneAndUpdate({_id:id},req.body,{new:true,runValidators:true});
        res.status(200).json(task);
    }catch(err){
        res.status(500).json({msg:err});
    }
}

module.exports = {getAllTasks,createTask,getTask,updateTask,deleteTask};