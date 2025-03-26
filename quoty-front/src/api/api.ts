import axios from 'axios'

export default {
    getQuote() {
        return axios.get(import.meta.env.VITE_FINNEGANS_API!)
    }
}