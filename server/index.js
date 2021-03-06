const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

const posts = require('./routes/posts')

app.use('/vue-game',posts);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(__dirname+'/public'))

    app.get(/.*/,(req,res) => res.sendFile(__dirname+'/public/index.html'))
}

app.listen(port,() => console.log(`Server started on port ${port}`));


