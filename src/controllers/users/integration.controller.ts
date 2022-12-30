import { Request, Response } from 'express'
import userCreateService from '../../services/users/userCreate.service'

const integration = async (req: Request, res: Response) => {
    let img = ""

    try {
      const res = await fetch(`https://http.cat/101`,{
          method: 'GET',
          mode: 'no-cors', 
          cache: 'no-cache', 
          credentials: 'same-origin', 
          headers: {
          'Content-Type': 'image/jpeg'
          },
      })
      res.blob().then(blob => img = URL.createObjectURL(blob))
      console.log(img)
    } catch (err) {

        if (err instanceof Error) {
            return res.status(400).send({
                "error": err.name,
                "message": err.message
            })
        }
    }
}

export default integration