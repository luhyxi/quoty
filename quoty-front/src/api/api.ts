import axios from 'axios'

export default {
    getQuote() {
        return axios.get(process.env.REACT_APP_API_ENDPOINT!)
    }
}