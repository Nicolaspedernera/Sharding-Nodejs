const {Client}= require('pg'); 

const clients ={
    '5432': new Client({
        'host': '127.0.0.1' ,
        'port' : '5432' ,
        'user' : 'postgres',
        'password' : 'changeme',
        'database' : 'postgres',    
    }),
    '5433': new Client({
        'host': '127.0.0.1' ,
        'port' : '5433' ,
        'user' : 'postgres',
        'password' : 'changeme',
        'database' : 'postgres',    
    }),
    '5434': new Client({
        'host': '127.0.0.1' ,
        'port' : '5434' ,
        'user' : 'postgres',
        'password' : 'changeme',
        'database' : 'postgres',    
    })

}

try { 
    async function connectClients(){
        await clients[5432].connect();
        await clients[5433].connect();
        await clients[5434].connect();
    }
    connectClients();
}catch{
    console.log(`${connectClients} can't connect`);
}


module.exports = {clients} ;