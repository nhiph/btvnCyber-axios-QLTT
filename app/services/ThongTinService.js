function ThongTinService() {
    this.layDSTT = function () {
        let promise = axios({
            method: 'get',
            url: 'https://6065c01db8fbbd001756737e.mockapi.io/products'
        });
        return promise;
    } 
    this.themTT = function(tt){
        let promise = axios({
            method: 'post',
            url: 'https://6065c01db8fbbd001756737e.mockapi.io/products',
            data: tt
        });
        return promise;
    }
    this.xoaThongTin = function(id){
        let promise = axios({
            method: 'delete',
            url: `https://6065c01db8fbbd001756737e.mockapi.io/products/${id}`
        });
        return promise;
    }
    this.xemThongTin = function(id){
        let promise = axios({
            method: 'get',
            url:`https://6065c01db8fbbd001756737e.mockapi.io/products/${id}`
        });
        return promise;
    }
    this.capNhatThongTin = function(id, tt){
        let promise = axios({
            method: 'put',
            url: `https://6065c01db8fbbd001756737e.mockapi.io/products/${id}`,
            data: tt
        });
        return promise;
    }
}