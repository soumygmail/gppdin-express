const express = require('express');
const students = require('./data.js')
const app = express();


app.use(express.json()); //does not give the undefined value.

// app.get('/', (req,res) => {
//   // res.send("hello world");

//   res.json({message: "api is working...."})
//  //res.json(students)
// })

app.get('/', (req,res) => {
    res.json(students);
});

app.get('/api/students', (req,res) => {
    res.json(students);
  //  res.send("students post request");
})

app.post('/api/students', (req,res) => {
if(!req.body.email){
res.status(400);
res.json({error: "email is required"});
}
    const user = {
        id : students.length+1,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email:req.body.email

    }

    students.push(user);
    res.json(user);
//console.log(req.body);
   // res.send("students post request");
})


app.put('/api/students/:id', (req, res) => {

      let id = req.params.id
       let first_name = req.body.first_name
       let last_name = req.body.last_name
       let email = req.body.email

       let index = students.findIndex((student) => {
          return (student.id == Number.parseInt(id))
       })

       if(index >= 0) {
         let std = students[index]
         std.last_name = last_name
         std.first_name = first_name
         std.email = email

         res.json(std)
         console.log(std);
       }else{
        res.status(404)
       // res.json(404)
       }
    }

)


app.delete("/api/students/:id", (req,res) => {
    let id = req.params.id;
    let index = students.findIndex((student) => {
        return (student.id == Number.parseInt(id))
     })
     if(index >= 0) {
        let std = students[index]
       students.splice(index, 1 );
       res.json(std);
      }else{
       res.status(404)
      // res.json(404)
      }
})




app.listen(3000, ()=>{
console.log('Listining On Port 3000')
})