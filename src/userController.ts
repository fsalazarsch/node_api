import { AppDataSource } from "./data-source"
import { User } from "./entity/User"


export async function list_users(){
    const users = await AppDataSource.manager.find(User)
    return users;
}

export async function get_user(id){
    const users = await AppDataSource.manager.findOneBy(User,{id: id})
    return users;
}

export async function del_user(id){
    const user = await AppDataSource.manager.findOneBy(User,{id: id})
    await AppDataSource.manager.remove(user);
}

export async function add_user(fname, lname, age){
    const user = new User()
    user.firstName = fname
    user.lastName = lname
    user.age = age
    await AppDataSource.manager.save(user)
}


export async function update_user(id, fname, lname, age){
    const user = await AppDataSource.manager.findOneBy(User,{id: id})
    if (fname != null)
        user.firstName = fname
    if (lname != null)
        user.lastName = lname
    if (age != null)
        user.age = age
    await AppDataSource.manager.save(user)
}


//AppDataSource.initialize().then(async () => {
//}).catch(error => console.log(error))
