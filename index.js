const express = require("express")
const mongoose = require("mongoose")
const app = express()
const List = require("./model/transactions")
const User = require("./model/user")
const Seller = require("./model/seller")
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//user api
app.get('/user', async (req, res) => {
    try {
        const user = await User.find()
        res.status(200).json(user)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
})
app.post('/user', async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(200).json(user)
        console.log(user)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
})

//seller api
app.get("/seller", async (req, res) => {
    try {
        const seller = await Seller.find()
        res.status(200).json(seller)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
})
app.post("/seller", async (req, res) => {
    try {
        const seller = await Seller.create(req.body)
        res.status(200).json(seller)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
})

//transaction api
app.get("/transaction", async (req, res) => {
    try {
        const trans = await List.find()
        res.status(200).json(trans)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
})

app.get("/transaction/:user", async (req, res) => {
    try {
        const { user } = req.params
        const trans = await List.find({ user })
        res.status(200).json(trans)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
})


app.post("/transaction", async (req, res) => {
    try {
        const trans = await List.create(req.body)
        res.status(200).json(trans)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
})



app.put("/transaction/:id", async (req, res) => {
    try {
        const { id } = req.params
        const trans = await List.findByIdAndUpdate(id, req.body)
        if (!trans) {
            res.status(404).json({ message: "cannot find such data" })
        }
        const t = await List.findByIdAndUpdate(id, req.body)
        res.status(200).json(t)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
})

app.get("/download/:user", async (req, res) => {
    try {
      const { user } = req.params;
      const trans = await List.find({ user });
      const text = trans.map((t,i) => `${i+1} | ${t.amount} | ${t.seller} | ${t.createdAt} | ${t._id}`).join("\n");
      res.set({
        "Content-Disposition": `attachment; filename=${user}transactions.txt`,
        "Content-Type": "text/plain",
      });
  
      res.send(text);
  
      console.log(trans);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  });



mongoose.connect("mongodb+srv://uttam_gupta:Qazwsx55@cluster0.et4nl6t.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        console.log("working mongo")
        app.listen(5000, () => console.log("working on 5000"))
    })
    .catch((error) => { console.log(error) })
