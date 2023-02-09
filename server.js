var express = require("express")
var app = express()

var cors = require('cors')
let projectCollection;
app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

//mongodb connection
const MongoClient = require('mongodb').MongoClient; 
const url = 'mongodb+srv://varshini:varsh@cluster0.vlpwl1l.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(url, {useNewUrlParser: true})


const createCollection = (collectionName) => {
    client.connect((err,db) => {
        projectCollection = client.db().collection(collectionName);
        if(!err){
            console.log('MongoDb Connected')
        }
        else {
            console.log("DB Error: ", err);
            process.exit(1);
        }
    })
}
//insert project....
const insertProjects = (project,callback) => {
    projectCollection.insert(project,callback);
}

//post api....
app.post('/api/projects',(req,res) => {
  console.log("New Project added", req.body)
  var newProject = req.body;
  insertProjects(newProject,(err,result) => {
      if(err) {
          res.json({statusCode: 400, message: err})
      }
      else {
          res.json({statusCode: 200, message:"Project Successfully added", data: result})
      }
  })
})

// const cardList = [
//     {
//         title: "Kitten 2",
//         image: "images/kitten-2.jpg",
//         link: "About Kitten 2",
//         desciption: "Demo desciption about kitten 2"
//     },
//     {
//         title: "Kitten 3",
//         image: "images/kitten-3.jpg",
//         link: "About Kitten 3",
//         desciption: "Demo desciption about kitten 3"
//     }
// ]

// get project...
const getProjects = (callback) => {
  projectCollection.find({}).toArray(callback);
}

app.get('/api/projects',(req,res) => {
  getProjects((err,result) => {
      if(err) {
          res.json({statusCode: 400, message: err})
      }
      else {
          res.json({statusCode: 200, message:"Success", data: result})
      }
  })
})

var port = process.env.port || 3000;
app.listen(port,()=>{
    createCollection("Techs");
    console.log("App listening to: "+port);
    
})



//const addNumbers = (number1, number2) => {
  //  var num1 = parseInt(number1)
    //var num1 = parseInt(number1)
    //var result = num1+number2;
    //return result;

//}
//app.get("/addTwoNumbers", (req,res)=> {
//    var number1 =req.query.number1;
 //   var number2 =req.query.number2;
  //  var result = addNumbers(number1, number2)
   // req.json({statusCode: 200, data: result, messgae:'Success'})
//})