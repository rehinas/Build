const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://rehinas:rehi@cluster0.rkmimmv.mongodb.net/emp_app?retryWrites=true&w=majorityserve')
.then(()=>{
    console.log('Connected to MongoDb')
})
.catch((error)=>{
    console.log("ERROR!!! Connection lost",error)
})
