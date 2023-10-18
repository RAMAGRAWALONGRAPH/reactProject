const express = require("express")
const multer = require('multer');
const cors = require("cors")

require("./db")
const User = require("./models/user");
const user = require("./models/user");
const app = express();

const PORT = 5000;
app.use(express.json())
app.use(cors())


// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // Define the upload folder
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname); // Define the filename
    },
  });
  
  const upload = multer({ storage });
  
  app.get("/api/login", (req, res) => {
    res.send("hello word");
  });
  
app.get("/api/login", (req, res)=>{

    res.send("hello word")
})
// app.post("/addUserData", async(req, res)=>{
// const {Name, Age} = req.body
//     const user =  new User({Name, Age})
//     await user.save();
//     res.json(user)
// })

app.post("/addUserData", upload.single("profileImage"), async (req, res) => {
   console.log(req.file)
    const { Name, Age } = req.body;
    const profileImage = req.file ? req.file.filename : null; // Get the uploaded filename
    console.log(profileImage)
    const user = new User({ Name, Age, profileImage });
    await user.save();
    res.json(user);
  });

app.get("/getUserData", async(req, res)=>{
  
     const user = await User.find() 
     res.json(user)
    })

    app.delete("/deleteUserData/:id", async(req, res)=>{
      try{
        const user = await User.findByIdAndDelete(req.params.id) 
        if (!user){
            return res.json("user was not found")
        }
        res.json(user)
    }catch(error){
        res.json("error while deleting", error)
    }
       })
    

    //    app.put("/editUserData/:id", async (req, res) => {
    //     const { id } = req.params;
    //     const { Name, Age } = req.body;
    //     try {
    //       const user = await User.findByIdAndUpdate(id, { Name, Age }, { new: true });
      
    //       if (!user) {
    //         return res.status(404).json({ error: 'User not found' });
    //       }
          
    //       res.json(user);
    //     } catch (error) {
    //       res.status(500).json({ error: 'Error while editing the user details', details: error });
    //     }
    //   });
      
    app.put("/editUserData/:id", async(req, res)=>{
        const {id} = req.params;
        const {Name , Age} = req.body;
        try{
        const user = await User.findByIdAndUpdate(id, {Name, Age}, {new: true})
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
          res.json(user)
        }catch(error){
            res.json({"error while editing the user details" : error})
        }
    })


app.listen(PORT, ()=>{
    console.log("app is listen on port 5000")
})