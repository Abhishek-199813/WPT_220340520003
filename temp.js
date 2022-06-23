
const express = require('express');
const app = express();
const mysql = require('mysql');


//const cors = require('cors');
//app.use(cors());


//const bodyParser = require('body-parser');






app.use(express.static('sf'));


//app.use(bodyParser.json());
 // support json encoded bodies
//app.use(bodyParser.urlencoded({ extended: true }));
//whether you want nested objects support  or not

app.listen(8081,function(error){
	if(error){console.log(error);
	}
	console.log('server is running on port 8081');
})







app.get('/getdataofbook',  (req, res)=>{

	console.log('ajax called');
	const dbobject={
		host:'localhost',
		user:'root',
		password:'cdac',
		database:'abhishek',
		port:3306
	}

	const conn = mysql.createConnection(dbobject); 

	let output ={ status:false, detail:{ bookid:0 , bookname:"", price:""}}

	let bookid = req.query.bookid;
	console.log(bookid);

	conn.query('select bookname, price from book where bookid = ?',[bookid],
	(error, rows)=>{
		if(error)
		{
			console.log(error);
		}
		else{
			if(rows.length > 0)
			{
				output.status = true;
				output.detail = rows[0];
			}
			else{
				console.log('data not found');
			}
		}

		console.log(output);
		res.send(output);
	});
});




app.get('/updateprice',  (req, res)=>{

	console.log('ajax called');
	const dbobject={
		host:'localhost',
		user:'root',
		password:'cdac',
		database:'abhishek',
		port:3306
	}

	const conn = mysql.createConnection(dbobject); 

	let output ={ status:false} 

	let bookid = req.query.bookid;
	let price = req.query.price;
	console.log(bookid);

	conn.query('update book set price = ? where bookid = ?',[price, bookid],
	(error, rows)=>{
		if(error)
		{
			console.log(error);
		}
		else{
			if(rows.affectedRows > 0)
			{
				output.status = true;
				
			}
			else{
				console.log('data has not been updated');
			}
		}

		console.log(output);
		res.send(output);
	});
});

    
