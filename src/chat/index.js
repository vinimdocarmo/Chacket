const ChatServer = require('./ChatServer');
const ClientsDir = require('./ClientsDir');

const clientsDir = new ClientsDir();
const server = new ChatServer(clientsDir);

server.listen(process.env.PORT || 3333);
server.on('listening', () => {
    const address = server.address();
    console.log(`server listening on ${address.address}:${address.port}`)
});