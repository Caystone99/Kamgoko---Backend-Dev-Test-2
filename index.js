require('dotenv').config()
const express = require('express')
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const client = require('./configs/db')

client.connect((err)=>{
    if(err){
        console.log(err)
    }else{
        
        app.get("/", (req, res) => {
            res.send("Admin Login Goes Here");
        });
        
        app.post('/login', async(req, res)=>{
            const {name, pwd} = req.body;
        
            const data = await client.query(`SELECT * FROM admin WHERE name=${name}`)
            const admin = data.rows;
            const pwdCorrect = admin == null
                ? false
                : await bcrypt.compare(pwd, admin[0].password)
                
        
            if(!(admin && pwdCorrect)){
                return res.status(401).json({
                    error: 'invalid credentials'
                })
            }
        
            const adminToken = {
                name:admin[0].name,
                id:admin[0]._id,
            }
        
            const token = jwt.sign(adminToken, process.env.SECRET)
        
            res
                .status(200)
                .send({token, name:admin[0].name})
        
        })
        console.log("Data Logged")
    }
})

app.use(cors())
app.use(bodyParser.json())


//app.use(adminRouter)

app.listen(3001, ()=>{
    console.log(`Server is running on port 3001`)
})