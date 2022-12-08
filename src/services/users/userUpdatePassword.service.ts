import { AppDataSource } from "../../data-source"
import { User } from "../../entities/user.entity"
import bcrypt from "bcrypt"

const userUpdatePasswordService = async (email: string, password: string) => {

    const userRepository = AppDataSource.getRepository(User) 

    const users = await userRepository.find()

    const account = users.find(user => user.email === email)

    if (bcrypt.compareSync(password, account!.password)) {
        throw new Error("Inform a different password.")
    }

    const newPassword = bcrypt.hashSync(password, 10)

    await userRepository.update(account!.id, { password: newPassword })

    return true
}

export default userUpdatePasswordService