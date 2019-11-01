import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
export const connect = () => mongoose.connect('mongodb://127.0.0.1:27017/music_api', {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => console.log('DB Connected!'))
.catch(err => {
console.log(`DB Connection Error: ${err.message}`);
});;
mongoose.set('debug', true);

