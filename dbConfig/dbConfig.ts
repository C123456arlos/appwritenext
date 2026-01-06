import mongoose from 'mongoose'
export async function Connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection
        connection.on('connected', () => {
            console.log('mongodb success')
        })
        connection.on('error', (err) => {
            console.log('error connection mongodb' + err)
            process.exit()
        })
    } catch (error) {
        console.log('error')
        console.log(error)
    }
}