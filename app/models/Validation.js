function Validation(){
    // Kiem tra cac field khong duoc bo trong
    this.checkEmpty = function(inputVal, spanID, message){
        if(inputVal.trim() != "") {
            document.getElementById(spanID).innerHTML = "";
            return true; //hop le
        }
        else {
            document.getElementById(spanID).innerHTML = message;
            return false; 
        }
    }

    // Kiem tra taiKhoan khong duoc trung
    this.checkTK = function(inputVal, spanID, message1, message2, mangTT){
        // Kiểm tả xem tài khoản này có tồn tại trong mảng thông tin chưa
        var isExist = false;
        // some: duyệt magr trả về kết quả true/false
        isExist = mangTT.some(item => {
            return item.taiKhoan === inputVal;
        });
        // Điều kiện thực thi nếu isExist là true hoặc false
        if(isExist){
            // Tài khoản bị trùn g lặp
            document.getElementById(spanID).innerHTML = message1;
            return false;
        }else{ // Tài khoản chưa đăng ký
            // Ma thoa dieu 4-6 ky tu => true
            if(inputVal.length >= 4 && inputVal.length <= 6){
                document.getElementById(spanID).innerHTML = "";
                return true;
            }else{ // Ma khong thoa dieu => false
                document.getElementById(spanID).innerHTML = message2;
                return false;
            }
        }
    }

    this.checkName = function(inputVal,spanID,message){
        // C1: dùng đối tượng RegExp
        var namePattern = new RegExp("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$");

        if(namePattern.test(inputVal)){
            //tên hợp lệ
            document.getElementById(spanID).innerHTML  = "";
            return true;
        }else{
            document.getElementById(spanID).innerHTML  = message;
            return false;
        }

    }

    // Kiểm tra password không được để trống và phải đúng định dạng
    this.checkPassword = function(inputVal, spanID, message){
        var passPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,8}$/;
        if(inputVal.match(passPattern)){
            //Đúng định dạng password
            document.getElementById(spanID).innerHTML  = "";
            return true;
        }else{
            document.getElementById(spanID).innerHTML  = message;
            return false;
        }
    }

    // Kiểm tra email không được để trống và phải đúng định dạng
    this.checkEmail = function(inputVal,spanID,message){
        // C2: sử dụng trực tiếp biểu thức

        var emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if(inputVal.match(emailPattern)){
            //Đúng định dạng email
            document.getElementById(spanID).innerHTML  = "";
            return true;
        }else{
            document.getElementById(spanID).innerHTML  = message;
            return false;
        }
    }

    // Kiểm tra loại người dung và ngôn ngữ (thẻ select)
    this.checkDropDown = function(selectID,spanID,message){
        if(document.getElementById(selectID).selectedIndex != 0){
            //có chọn các khóa học
            document.getElementById(spanID).innerHTML  = "";
            return true;
        }else{
            document.getElementById(spanID).innerHTML  = message;
            return false;
        }
    }

    // Kiểm ta mô tả chiều dài <= 60 ký tự
    this.checkLength = function(inputVal, spanID, message){
        if(inputVal.length<=60){
            //Đúng định dạng
            document.getElementById(spanID).innerHTML  = "";
            return true;
        }else{
            document.getElementById(spanID).innerHTML  = message;
            return false;
        }
    }
}