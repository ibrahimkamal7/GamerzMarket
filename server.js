var exp=require("express");
var mysql=require("mysql");
var cors = require('cors');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var session = require('client-sessions');
var formidable = require('formidable');
var multiparty = require('multiparty');
var request = require('request')
var util = require('util');


var con = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "CS375project",
    database: "GamerzMarket"
  });
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'verify.email456@gmail.com',
      pass: 'CS375project'
    }
  });



var app=exp()
app.use(cors())
app.use( bodyParser.json() );    
app.use(exp.static('.'));

//app.use(multiparty({ uploadDir: "D:\\DREXEL\\2020 Winter quarter\\CS375\\Project\\images\\"}));

app.use(exp.json());       

  app.listen(8080,function(){
    console.log("hello")
  })

app.use(session({
  cookieName:"session",
  secret:"qwertyuiop",
  duration:30*60*1000,
  activeDuration:5*60*1000
}))

  app.post("/register",function(req,res){
      con.getConnection(function(err){
          if (err) throw err;
          console.log("connected")
          console.log(req.body)
          var sql = "INSERT INTO Users(email,password,address,phone,firstName,lastName) Values ('"+req.body.email+"',SHA1('"+req.body.password+"'),'"+req.body.address+"','"+req.body.phone+"','"+req.body.first+"','"+req.body.last+"');";
          con.query(sql,function(err,result){
              if(err) throw err;
              console.log("successful")
              res.send("data inserted")
          })
      })
  })
  app.post("/login",function(req,res){
    con.getConnection(function(err){
      if (err) throw err;
      console.log("connected")
      var sql="Select * from Users where email='"+req.body.email+"' and password=SHA1('"+req.body.password+"')"
      con.query(sql,function(err,result,fields){
        if(err) throw err;
        if(result.length>=1){
          var output=JSON.stringify({"success":"true","result":result})
          req.session.email=result[0].email
          req.session.firstName=result[0].firstName
          req.session.lastName=result[0].lastName
          req.session.userId=result[0].userId
          res.send(output)

        }
        else if(result.length==0){
          
          var output=JSON.stringify({"success":"false","error":"wrong email or password"})
          res.send(output)
        }
      })
    })
  })
  app.post("/verify",function(req,res){
    var code=req.body.code
    var email=req.body.email
    console.log(email)
    var mailOptions = {
      from: 'verify.email456@gmail.com',
      to: email,
      subject: "VERIFICATION CODE FOR GAMERZ MARKET",
      text: 'YOUR VERIFICATION CODE IS:'+code
    };
    transporter.sendMail(mailOptions,function(err,info){
      if(err){
        console.log(err)
        res.send({success:false})
      }
      else{
        console.log(info)
        res.send({success:true})
      }
    })
    
  })

  app.post("/sell",function(req,res){
    console.log(req.session.email)
    if(req.session.userId!=undefined){
      console.log(req.body)
      console.log("fcred")
      var form = new multiparty.Form({ uploadDir: "D:\\DREXEL\\2020 Winter quarter\\CS375\\Project\\images\\"});
      form.parse(req, function(err, fields, files) {
        if (err) throw err;
        var paths=files.img[0].path.split("\\")
        var path=paths[paths.length-1]
        console.log(path)
        con.getConnection(function(err){
          if (err) throw err;
          var sql="INSERT INTO item(itemName,itemDescription,platform,price,sellerId,email,image) VALUES('"+fields.name[0]+"','"+fields.description[0]+"','"+fields.platform[0]+"','"+fields.price[0]+"','"+req.session.userId+"','"+req.session.email+"','"+path+"')"
          con.query(sql,function(err,result){
            if(err) throw err;
            console.log('inserted')
            res.send("success")
          })
        })
      });
    }
    else{
      console.log("user not logged in")
      res.send("user not logged in")
    }
  })

  app.get("/",function(req,res){
    if(req.session.userId!=undefined){
      res.sendfile("homepage1.html")
    }
    else{
      res.sendfile("homepage.html")
    }
    
  })

  app.get("/home",function(req,res){
    console.log("home")
    con.getConnection(function(err){
      if (err) throw err;
      var sql="select itemId, itemName, platform, price,image from item"
      con.query(sql,function(err,result,fields){
        res.send(result)
      })
    })
  })

  app.get("/filter",function(req,res){
    con.getConnection(function(err){
      if (err) throw err;
      console.log(req.query.platform)
      var sql="select itemId, itemName, platform, price,image from item where platform='"+req.query.platform+"'"
      con.query(sql,function(err,result,fields){
        res.send(result)
      })
    })
  })

  app.get("/search",function(req,res){
    con.getConnection(function(err){
      if (err) throw err;
      console.log(req.query.platform)
      var sql="select itemId, itemName, platform, price,image from item where itemName LIKE '%"+req.query.name+"%'"
      con.query(sql,function(err,result,fields){
        res.send(result)
      })
    })
  })

  app.get("/info",function(req,res){
    con.getConnection(function(err){
      if (err) throw err
      //var sql="select * from item where itemId='"+req.query.id+"'"
      var sql="select item.itemName,item.itemDescription,item.platform,item.price,item.image,item.email,Users.firstName,Users.lastName,Users.phone from item inner join Users where item.itemId='"+req.query.id+"' AND item.sellerId=Users.userId"
      con.query(sql,function(err,result,fields){
        if (err) throw err
        res.send(result)
      })
    })
  })

  app.get('/logout', function (req, res){
    req.session.reset();
    res.send()
    res.sendfile("homepage.html")
  })
