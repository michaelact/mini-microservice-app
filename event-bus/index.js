const express = require("express");
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')

const app = express();

app.use(bodyParser.json());
app.use(cors());

const events = [];

app.post('/events', async (req, res) => {
    const event = req.body;

    console.log('event received', event);

    events.push(event);

    axios.post(`${process.env.POSTS_URL}/events`, event).catch(err => { });
    axios.post(`${process.env.EVENT_URL}/events`, event).catch(err => { });
    axios.post(`${process.env.QUERY_URL}/events`, event).catch(err => { });
    axios.post(`${process.env.MODERATION_URL}/events`, event).catch(err => { });

    return res.send({ status: 'OK' })
})

app.get("/events", (req, res) => {
    return res.send(events)
})


app.listen(process.env.PORT, () => {
    console.log(`event bus service listening on port ${process.env.PORT}`)
})
