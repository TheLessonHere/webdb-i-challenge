const server = require('./server.js');

const accountRouter = require('./routers/accountRouter');
server.use('/api/accounts', accountRouter);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});