import { v4 as uuidv4 } from "uuid"
import { AppDataSource } from "../../data-source"
import { User } from "../../entities/user.entity"
import { IUser, IUserCreate } from "../../interfaces/user"
import bcrypt from "bcrypt";

const userCreateService = async ({name, email, password}: IUserCreate) => {

    const userRepository = AppDataSource.getRepository(User)

    const users = await userRepository.find()

    const emailAlreadyExists = users.find(user => user.email === email)
    
    if (emailAlreadyExists) {
        throw new Error("Email already exists")
    }

    const user = new User()
    user.name = name
    user.email = email
	user.password = bcrypt.hashSync(password, 10)

    userRepository.create(user)
    await userRepository.save(user)

    return user

}

export default userCreateService