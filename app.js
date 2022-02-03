const express = require('express');
const { dirname } = require('path');
const app = express();
const path = require('path');

//settings
app.set('port', 8080);

//middlewares
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.get('/', (req, res) => {
    res.send('Bienvenidos');
})

app.listen(app.get('port'), () => {
    console.log(`Aplicación desplegada en el puerto ${app.get('port')}`);
});