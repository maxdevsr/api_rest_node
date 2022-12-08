import { Request, Response } from 'express'
import userDeleteSelfService from '../../services/users/userDeleteSelf.service'
    
const userDeleteSelfController = async (req: Request, res: Response) => {

    try {

        const email = req.userEmail
    
        const user =  await userDeleteSelfService(email)
        
        return res.status(200).json({message: "User deleted with sucess!"})

    } catch (err) {

        if (err instanceof Error) {

            return res.status(401).send({
                "error": err.name,
                "message": err.message
            })
        }
    }
}

export default userDeleteSelfController