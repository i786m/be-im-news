const express = require('express')
const cors = require('cors');

const { handleServerErrors, handlePsqlErrors, handleCustomErrors } = require('./errors/errors')

const apiRouter = require("./routes/api-router");

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api", apiRouter)



app.all("*", (_,res)=>{
  res.status(404).send({msg:"Not Found"})
})


app.use((err, req, res, next) => {
  handlePsqlErrors(err, req, res, next)
})

app.use((err, req, res, next) => {
  handleCustomErrors(err, req, res, next)
})

app.use((err, req, res, next) => {
  handleServerErrors(err, req, res, next)
})



module.exports = app

