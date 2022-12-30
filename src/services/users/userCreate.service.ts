import { v4 as uuidv4 } from "uuid"
import { AppDataSource } from "../../data-source"
import { User } from "../../entities/user.entity"
import { IUser, IUserCreate } from "../../interfaces/user"
import bcrypt from "bcrypt";
import { Cart } from "../../entities/cart.entity";

const userCreateService = async ({name, email, password}: IUserCreate) => {
    
        const userRepository = AppDataSource.getRepository(User) 
        const cartRepository = AppDataSource.getRepository(Cart)
    
        const users = await userRepository.find()
    
        const emailAlreadyExists = users.find(user => user.email === email)
    
       if (emailAlreadyExists) {
        throw new Error("Email already exists")
    }
    
        const cart = new Cart()
        cart.subtotal = 0
    
        cartRepository.create(cart)
        await cartRepository.save(cart)
    
        const user = new User()
        user.name = name
        user.email = email
        user.password = bcrypt.hashSync(password,10)
        user.cart = cart
    
        userRepository.create(user)
        await userRepository.save(user)
    
        return user
    
    }
    
    export default userCreateService    