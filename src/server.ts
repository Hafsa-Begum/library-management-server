import mongoose from 'mongoose';
import app from './app';

const PORT = 4000;

async function main() {
    try {
        await mongoose.connect('mongodb+srv://hafsagood:TGh05RJDTE9IVZFb@cluster0.v2x3wqx.mongodb.net/library-management-app?retryWrites=true&w=majority&appName=Cluster0');
        console.log("MongoDB is Connected Using Mongoose!!");
        app.listen(PORT, () => {
            console.log(`App is listening on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

main();