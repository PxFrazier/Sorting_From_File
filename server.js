const express = require('express');
const fs = require('fs');
const readLine = require('readline');
const app = express();
const PORT = process.env.PORT || 3000;
app.set('view engine', 'ejs');
const array = [];

const rd = readLine.createInterface({
    input: fs.createReadStream('words.txt'),
    console: false
});

function MAX(array){
    let current_max = 0;
    array.forEach((entry)=>{
        if(entry.length > current_max) current_max = entry.length;
    });
    return current_max;
}

rd.on('line', (line)=>{
    array.push(line);
});

//Time complexity O(n)
function sortedFromFile()
{
    let multi_array = [];
    let iterator = MAX(array);

    for(let i = 0; i < iterator; i++)
        multi_array.push([]);
    
    array.forEach((entry)=>{
        multi_array[entry.length -1].push(entry);
    });

    multi_array.forEach((entry)=>{
        entry.sort();
    });

    return multi_array;
}

app.get('/', (req, res)=>{
    res.render('index', {text: sortedFromFile()});
});

app.listen(PORT, ()=>{
    console.log(`Server started on port: ${PORT}`);
});
