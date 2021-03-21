import axios from 'axios';

const url = '/vue-game'


class PostService{
    static getPosts(){
        return new Promise(async (resolve,reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data
                );
            } catch (error) {
                reject(err)
            }
        })
    }
}

export default PostService;