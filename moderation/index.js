const express = require("express");
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/events', async (req, res) => {
    const event = req.body;

    if (event.type === "CommentCreated") {
        const status = event.data.content.includes('orange') ? 'rejected' : 'approved';

        await axios.post(`${process.env.EVENT_URL}/events`, {
            type: 'CommentModerated',
            data: {
                ...event.data,
                status,
            }
        })
    }

    return res.send({ status: 'OK' })
})


app.listen(process.env.PORT, () => {
    console.log(`moderation service listening on port ${process.env.PORT}`)
})
