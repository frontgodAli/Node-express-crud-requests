import express from "express"


const app=express()
app.use(express.json())

const PORT=process.env.PORT || 3000
let mockData=[
    {id:1,username:"ali",pseudo:"zedxkira"},
    {id:2,username:"hamza",pseudo:"costrik"},
    {id:3,username:"saad",pseudo:"elcaballero"},
    {id:4,username:"mostafa",pseudo:"nfity"}
]

app.listen(PORT,()=>{
    console.log(`server launched on ${PORT}`)
})
/* GET Request with queries and params */

app.get("/",(req,res)=>{
    res.send("Welcome page")
})

app.get("/api/users",(req,res)=>{
    const {filter,value}=req.query
    if(filter && value) return res.send(mockData.filter(user=>user[filter].includes(value)))
    return res.send(mockData)
})
app.get("/api/users/:id",(req,res)=>{
    const parsedId=Number(req.params.id)
    const exactUser=mockData.find(user=>user.id===parsedId)
    if(isNaN(parsedId)) return res.status(400).send("Not a valid ID")
    if(!exactUser) return res.sendStatus(404)
    return res.send(exactUser)
})
/* Put request */


app.put("/api/users/:id",(req,res)=>{
    const {body,params:{id}}=req
    const parsedId=Number(id)
    if(isNaN(parsedId)) return res.sendStatus(400)
    const indexOfUser=mockData.findIndex(user=>user.id===parsedId)
    if(indexOfUser===-1) return res.sendStatus(404)
    mockData[indexOfUser]={id:parsedId,...body}
    res.send(204)
})


/*Patch request */

app.patch("/api/users/:id",(req,res)=>{
    const {body,params:{id}}=req
    const parsedId=Number(id)
    if(isNaN(parsedId)) return res.sendStatus(400)
    const findUserIndex=mockData.findIndex(user=>user.id===parsedId)
    if(findUserIndex===-1) return res.sendStatus(404)
    mockData[findUserIndex]={...mockData[findUserIndex],...body}
    res.send(204)
})

/*Delete request*/

app.delete("/api/users/:id",(req,res)=>{
    const {params:{id}}=req
    const parsedId=Number(id)
    if(isNaN(parsedId)) return res.sendStatus(400)
    const findUserIndex=mockData.findIndex(user=>user.id===parsedId)
    if(findUserIndex===-1) return res.sendStatus(404)
    mockData.splice(findUserIndex,1)
    res.sendStatus(204)

})


/*Post request*/
app.post("/api/users",(req,res)=>{

    const body=req.body
    const newUser={id:mockData.length+1,...body}
    mockData.push(newUser)
    return res.status(201).send(newUser)

})


