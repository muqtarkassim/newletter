const express=require("express")
const app=express()
const https=require("https")
const path=require("path")

const bodyparser=require("body-parser")
const { stringify } = require("querystring")

app.use(bodyparser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'public')));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")

})



app.post("/",function(req,res){
   var fname=req.body.firstname;
   var lname=req.body.lastname;
    var email=req.body.email;

var data={
    members:[
        {
        email_address:email,
        status :"subscribed",
        merge_fields:{
            FNAME:fname,
            LNAME:lname
        }
        }
    ]
}
var jsondata=JSON.stringify(data);
const url="https://us11.api.mailchimp.com/3.0/lists/43cdaf1ef6"
const options={
    method:"POST",
    auth:"muqtar:4f81dcd52f043696be8ceae42a6caca7-us11"
}

const request=https.request(url,options,function(response){
  
  if (response.statusCode===200){
    res.sendFile(__dirname+"/success.html")
    
  }
  
  else{
    res.sendFile(__dirnmae+"/failure.html")
  }
  
    response.on("data",function(data){
        console.log(JSON.parse(data));
    })
})

request.write(jsondata);
request.end();
})


app.post("/failure",function(req,res){
    res.redirect("/")
})
//url  https://+listID+.api.mailchimp.com/3.0/lists/
//listID 43cdaf1ef6.
//const apikey=4f81dcd52f043696be8ceae42a6caca7-us11;
app.listen(3000,function(){
    console.log("listenning")
})