import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));

let headerText = "Please enter your name below";
const dataChecker = (req, res, next) =>
{
    const data = req.body;//example: { street: 'Daiganjichou', pet: 'Jollibee and Chikka' };
    console.log(`data: ${JSON.stringify(data)}`);
    const keys = Object.keys(data); //this will give us an array of the keys in the data object. In this case, it will be ["street", "pet"].
    console.log(`the POST keys are ${keys}`);//["fname","lname"]

    let enteredFirstName = req.body["fName"];
    let enteredLastName = req.body["lName"];
    

    if(enteredFirstName && enteredLastName)
    { 
      let nameLength = enteredFirstName.length + enteredLastName.length;
      headerText = `Your name has ${nameLength} characters`;
      console.log(headerText);
    }
    else
    {
      headerText = "Please enter your name below";
    }

  next();
}
app.use(dataChecker);

app.get("/", (req, res) => {
  res.render("index.ejs",
  {
      publicHeaderText : headerText
  });
});

app.post("/submit", (req, res) => {

  res.render("index.ejs",
    {
      firstName : req.body["fName"],
      lastName : req.body["lName"],
      publicHeaderText : headerText

    }


  )
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
