const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const pkg = require('../package.json');

const noteRoutes = require('./routes/notes.routes');
const userRoutes = require('./routes/users.routes');
const authRoutes = require('./routes/auth.routes');
const sequelize = require('./db');


const port = process.env.PORT || 3000;

const app = express();

app.set('pkg', pkg);
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.status(200).json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version,
    })
})

app.use(noteRoutes);
app.use(userRoutes);
app.use(authRoutes);

app.use((err, req, res, next) => {
    return res.status(400).json({
        message: err.message
    })
});

async function main() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(port, (err) => {
            if (err) console.error(err);
            console.log("Server on port " + port);
        });
    } catch (e) {
        console.error('Unable to connect to the database:', e)
    }
}

main();
