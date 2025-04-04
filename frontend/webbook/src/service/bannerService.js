import axios from "axios";

const API_URL= 'http://localhost:8080/api'

export default{
    async getBanner(){
        try {
            const token = localStorage.getItem('jwt-token');
            if(!token) throw new Error('token inconrect');
            const response = await axios.get(`${API_URL}/public/banner`,{
                headers: { 'Authorization': `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error("Lỗi khi lấy banner:", error.message);
            return [];
        }
    },
    getImageUrl(fileName) {
        const token = localStorage.getItem('jwt-token');
        return token 
          ? `${API_URL}/public/images/banners/${fileName}?token=${token}`
          : 'assets/default-image.png';
      }
}