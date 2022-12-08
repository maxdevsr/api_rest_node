import { Request, Response } from 'express'
import userUpdatePasswordService from '../../services/users/userUpdatePassword.service'

    const userUpdatePasswordController = async (req: Request, res: Response) => {
    
        try {
          
            const email = req.userEmail
    
            const {password} = req.body
    
            if (!password) {
                throw new Error("No password informed")
            }
    
            const user =  await userUpdatePasswordService(email, password)
            
            return res.status(201).json({message: "Password updated!"})
    
        } catch (err) {
    
            if (err instanceof Error) {
    
                return res.status(400).send({
                    "error": err.name,
                    "message": err.message
                })
            }
        }
    }
    
    export default userUpdatePasswordController