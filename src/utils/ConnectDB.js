import mongoose from "mongoose"



export default async function connectDB(){
    if(mongoose.connections[0].readyState) return
    mongoose.set("strictQuery", false)
    mongoose.connect(`mongodb+srv://monaarm95:13740304@cluster0.pb6g3ps.mongodb.net/?retryWrites=true&w=majority`,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
    console.log("connected to db")
        
    
}