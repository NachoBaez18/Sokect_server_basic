
const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand(new Band('Quenn'));
bands.addBand(new Band('Bon Jovi'));
bands.addBand(new Band('Héroes del silencio'));
bands.addBand(new Band('Metalica'));


io.on('connection', client => {
    console.log('Cliente conectado');
    client.emit('active-bands',bands.getBands());
    client.on('disconnect', () => {console.log('Cliente desconectado'); });


    client.on('mensaje',(payload) => {
        console.log('Mensaje',payload)
    
        io.emit('mensaje',{admin:'Nuevo mensaje'})
    });

    client.on('emitir-mensaje', (payload) =>{
       // io.emit('nuevo-mensaje',payload); emite todos
       client.broadcast.emit('nuevo-mensaje',payload); // emite a todos menos al que esta emitiendoi
    });

    client.on('vote-band',(data)=>{
        bands.voteBand(data.id);
        io.emit('active-bands',bands.getBands());
    });

    client.on('add-band',(data)=>{
        const newBand = new Band(data.name);
        bands.addBand(newBand);
        io.emit('active-bands',bands.getBands());
    });
   

    client.on('delete-band',(data)=>{
        bands.deleteBand(data.id);
        io.emit('active-bands',bands.getBands());
    });
  });