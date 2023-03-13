import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import { Post } from "./entity/Post"
import { add_user, del_user, list_users, get_user, update_user} from "./userController"
import { add_post, del_post, list_posts, get_post, update_post} from "./postController"

const express  = require("express")
const server = express();
const bodyParser = require('body-parser');
server.use(bodyParser.urlencoded({ extended: true }));

server.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, DELETE, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

server.get("/", (req, res) => {
	res.send("<p>Hola </p>")
});

server.get("/users/:id?", async (req, res) => {
	const id = req.params.id;

    if (id == null){
	    const users = await list_users();
    	res.json(users);
    }
	else{
	    const user = await get_user(id);
	    if (user != null)
    		res.json(user);
    	else
    		res.json({"Error" : "Usuario no existe"})
	}
    
});


server.post("/users", async (req, res) => {

	var fname, lname ="";
	var age, flag  =0;
	var error="";

	if( req.body.firstname){
		fname = req.body.firstname;
	}
	else{
		flag = 1;
    	error +="nombre "
	}

	if( req.body.lastname){
		lname = req.body.lastname;
	}
	else{
		flag = 1;
    	error +="apellido "
	}

	if( req.body.age){
		age = req.body.age;
	}
	else{
		flag = 1;
    	 error +="edad "
	}

	if (flag != 1){
	await add_user(fname, lname, age)
	res.json({"Ok" : "Usuario insertado", "data" : {"firstname" : fname, "lastname" : lname, "age" : age}})
	}
	else{
		res.json({"Error" : "Falta campo, "+error})
	}
});

server.put("/users/:id", async (req, res) => {

	const id = req.params.id;
	const fname = req.body.firstname;
	const lname = req.body.lastname;
	const age = req.body.age;
	await update_user(id, fname, lname, age);
	res.json({"Ok" : "Usuario modificado", "data" : {"firstname" : fname, "lastname" : lname, "age" : age}})
});

server.delete("/users/:id", async (req, res) => {
	const id = req.params.id;
	const user = await get_user(id);
	    if (user != null){
    		await del_user(id);
			res.json({"Error" : "Usuario borrado"})
	    }

    	else
    		res.json({"Error" : "Usuario no existe"})	    
});





server.get("/post/:id?", async (req, res) => {
	const id = req.params.id;

    if (id == null){
	    const posts = await list_posts();
    	res.json(posts);
    }
	else{
	    const post = await get_post(id);
	    if (post != null)
    		res.json(post);
    	else
    		res.json({"Error" : "Post no existe"})
	}
    
});


server.post("/post", async (req, res) => {

	var name, description ="";
	var age, flag  =0;
	var error="";

	if( req.body.name){
		name = req.body.name;
	}
	else{
		flag = 1;
    	error +="nombre "
	}

	if( req.body.description){
		description = req.body.description;
	}
	else{
		flag = 1;
    	error +="descripcion "
	}

	if (flag != 1){
	await add_post(name, description)
	res.json({"Ok" : "Post  insertado", "data" : {"name" : name, "descripcion" : description }})
	}
	else{
		res.json({"Error" : "Falta campo, "+error})
	}
});

server.put("/post/:id", async (req, res) => {

	const id = req.params.id;
	const name = req.body.name;
	const description = req.body.description;
	await update_post(id, name, description);
	res.json({"Ok" : "Post modificado", "data" : {"name" : name, "descripcion" : description }})
});

server.delete("/post/:id", async (req, res) => {
	const id = req.params.id;
	const user = await get_post(id);
	    if (user != null){
    		await del_post(id);
			res.json({"Error" : "Post borrado"})
	    }

    	else
    		res.json({"Error" : "Post no existe"})	    
});



server.listen(3000, async () =>{
  try {
    await AppDataSource.initialize();
    	console.log("Server start");
  } catch (error) {
    console.log(error);
  }
});
