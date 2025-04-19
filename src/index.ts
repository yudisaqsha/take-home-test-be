import express, {Request, Response} from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import { router } from './routes/index.route'
dotenv.config()
const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(bodyParser.json())
app.use('/api',router)
app.get('/',(req:Request, res:Response)=>{
    res.send('Hello world')
})

app.listen(PORT, ()=>{
    console.log('Connected to : ',PORT)
})
export default app