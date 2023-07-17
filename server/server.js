const express = require('express'); 
const HashRing = require('hashring');
const { SHA256, enc } = require('crypto-js');
const {clients} = require('./model')

const hr = new HashRing();
hr.add('5432');
hr.add('5433');
hr.add('5434');

const app = express(); 
app.use(express.json()); 

app.get('/:urlId' , async (req,res)=>{

    const urlId = req.params.urlId;
    const server= hr.get(urlId);
    const result= await clients[server].query('SELECT * FROM URL_TABLE WHERE URL_ID=$1',[urlId]);
    if (result.rowCount>0){
        res.status(200).json({
                'message':'Found', 
                'urlId': urlId,
                'server':server         
        })
    }else {
        res.status(404).json({
            'Message':'Not found',
            
        })
    }

})

app.post('/' , async (req,res)=>{

    const url = req.query.url;
 // consistently hash this to get the port.
    const hash = SHA256(url).toString(enc.Base64);
    const urlId = hash.substring(0, 5);

 //
    const server= hr.get(urlId);    
    const savedClient= await clients[server].query('INSERT INTO URL_TABLE(URL, URL_ID) VALUES($1,$2)', [url ,urlId]);

    res.status(200).json({
        'message':'ok', 
        'urlId': urlId,
        'url': url, 
        'server':server        
    });
    // console.log(savedClient);
}) 

app.listen(8000, ()=> console.log(`Listening on the port 8000`));