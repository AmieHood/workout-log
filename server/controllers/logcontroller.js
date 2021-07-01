let Express = require('express')
let router = Express.Router()
let validateJWT = require("../middleware/validate-jwt")
const { LogModel } = require("../models")

router.get('/practice', validateJWT, (req, res) => {
    res.send('This is the practice route!')
})

//Log Create
router.post("/", validateJWT, async(req, res) => {
    const { description, definition, result, date } = req.body.log
    const { id } = req.user
    const logEntry = {
        description,
        definition,
        result,
        date,
        owner_id: id
    }
    try {
        const newLog = await LogModel.create(logEntry)
        res.status(200).json(newLog)
    } catch (err) {
        res.status(500).json({ error: err})
    }
})

//get all logs
router.get("/", validateJWT, async (req, res) => {
    let owner_id = req.user.id
    try {
        const entries = await LogModel.findAll({
            where: {
                owner_id: req.user.id
            }
        })
        res.status(200).json(entries)
    } catch (err) {
        res.status(500).json({ error: err})
    }
})

//get individual logs by id 
router.get("/:id", validateJWT, async (req, res) => {
    // const { id } = req.user
    try {
        const userLogs = await LogModel.findOne({
            where: {
                id: req.params.id,
                owner_id: req.user.id
            }
        })
        res.status(200).json(userLogs)
    } catch (err) {
        res.status(500).json({ error: err})
    }
})



//update logs by user

router.put("/:id", validateJWT, async (req, res) => {
    const { description, definition, result, date } = req.body.log

    const query = {
        where: {
            id: req.params.id,
            owner_id: req.user.id
        }
    }

    const updatedLog = {
        description: description,
        definition: definition,
        result: result,
        date: date,
    }

    try {
        const update = await LogModel.update(updatedLog, query)
        res.status(200).json(update)
    } catch (err) {
        res.status(500).json({error: err})
    }
})

//Delete logs by user
router.delete("/:id", validateJWT, async (req, res) => {

    try {
        const query = {
            where: {
                owner_id: req.user.id,
                id: req.params.id
            }
        }
        await LogModel.destroy(query)
        res.status(200).json({
            message: "Log removed"
        })
    } catch (err) {
        res.status(500).json({error: err})
    }
})

module.exports = router