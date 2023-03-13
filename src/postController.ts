import { AppDataSource } from "./data-source"
import { Post } from "./entity/Post"


export async function list_posts(){
    const posts = await AppDataSource.manager.find(Post)
    return posts;
}

export async function get_post(id){
    const posts = await AppDataSource.manager.findOneBy(Post,{id: id})
    return posts;
}

export async function del_post(id){
    const post = await AppDataSource.manager.findOneBy(Post,{id: id})
    await AppDataSource.manager.remove(post);
}

export async function add_post(name, description){
    const post = new Post()
    post.name = name
    post.description = description
    await AppDataSource.manager.save(post)
}


export async function update_post(id,name, description){
    const post = await AppDataSource.manager.findOneBy(Post,{id: id})
    if (name != null)
        post.name = name
    if (description != null)
        post.description = description
    await AppDataSource.manager.save(post)
}


//AppDataSource.initialize().then(async () => {
//}).catch(error => console.log(error))
