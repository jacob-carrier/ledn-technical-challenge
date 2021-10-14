import express from "express";
import accountsRouter from "./api/accounts";

const app = express();
const port = 8080; // default port to listen

app.use('/accounts', accountsRouter);

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
