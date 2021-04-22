var thongTinSer = new ThongTinService();
var validation = new Validation();

//Hàm rút gọn cú pháp document.getElements..
function getELE(id) {
    return document.getElementById(id);
}

getListInfo();
function getListInfo() {
    thongTinSer.layDSTT()
        .then(res => {
            console.log(res.data);
            renderTable(res.data);
            setLocalStorage(res.data);
        })
        .catch(err => {
            console.log(err);

        })
}

function setLocalStorage(mangTT) {
    localStorage.setItem("DSTT", JSON.stringify(mangTT));
}

function getLocalStorage() {
    var mangKQ = JSON.parse(localStorage.getItem("DSTT"));
    return mangKQ;
}

getELE("btnThemNguoiDung").addEventListener("click", function () {
    var footerEle = document.querySelector(".modal-footer");
    footerEle.innerHTML = `
        <button onclick="addInfos()" class="btn btn-success">Add Info</button>
    `;
});

function renderTable(mangTT) {
    var content = "";
    var count = 1;
    mangTT.map(function (tt, index) {
        content += `
            <tr>
                <td>${count}</td>
                <td>${tt.taiKhoan}</td>
                <td>${tt.matKhau}</td>
                <td>${tt.hoTen}</td>
                <td>${tt.email}</td>
                <td>${tt.ngonNgu}</td>
                <td>${tt.loaiND}</td>
                <td>
                    <button class="btn btn-danger" onclick="xoaTT('${tt.id}')">Xóa</button>
                    <button class="btn btn-info" onclick="xemTT('${tt.id}')">Xem</button>
                </td>
            </tr>
        `;
        count++;
    });
    getELE("tblDanhSachNguoiDung").innerHTML = content;
}

function addInfos() {
    //B1: Lấy thông tin(info) từ form
    // data, info
    let taiKhoan = getELE("TaiKhoan").value;
    let matKhau = getELE("MatKhau").value;
    let hoTen = getELE("HoTen").value;
    let email = getELE("Email").value;
    let ngonNgu = getELE("loaiNgonNgu").value;
    let loaiND = getELE("loaiNguoiDung").value;
    let moTa = getELE("MoTa").value;
    let hinhAnh = getELE("HinhAnh").value;

    //Kiểm tra dữ liệu
    var isValid = true;
    // &: cộng giá trị (chuỗi) binary
    //&&: so sánh (AND) giá trị boolean
    // true => 1 (bit)
    // false => 0 (bit)
    // 1 & 1 = 1 => true & true = true
    //1 & 0 = 0 => true & false = false

    //kiểm tra taiKhoan: không được để trống và không được trùng
    let mangTT = getLocalStorage();
    isValid &= validation.checkEmpty(taiKhoan, "tbTKNV", "Tài khoản không được để trống") && validation.checkTK(taiKhoan, "tbTKNV", "Tài khoản không được trùng", "Tài khoản nhân viên phải có từ 6-8 ký tự", mangTT);

    // Kiem tra ho va ten 
    isValid &= validation.checkEmpty(hoTen, "tbTen", "Tên nhân viên không được để trống") && validation.checkName(hoTen, "tbTen", "Tên nhân viên phải là chữ");

    // Kiểm tra email
    // KHông được để trống và đúng định dạng
    isValid &= validation.checkEmpty(email, "tbEmail", "Email không được để trống") && validation.checkEmail(email, "tbEmail", "Email không hợp lệ");

    // Kiểm tra password không được để trống và đúng điều kiện
    isValid &= validation.checkEmpty(matKhau, "tbMatKhau", "Password không được để trống") && validation.checkPassword(matKhau, "tbMatKhau", "Password phải có 6-10 ký tự, ít nhất 1 ký tự đặc biệt, 1 ký tự hoa");

    // Kiểm tra ngonNgu
    isValid &= validation.checkDropDown("loaiNgonNgu", "tbNgonNgu", "Ngôn ngữ phải được chọn");

    // Kiểm tra loaiND
    isValid &= validation.checkDropDown("loaiNguoiDung", "tbLoaiND", "Loại người dùng phải được chọn");

    // Kiểm tra mô tả
    isValid &= validation.checkEmpty(moTa, "tbMoTa", "Mô tả không được bỏ trống") && validation.checkLength(moTa, "tbMoTa", "Mô tả phải nhở hơn bằng 60 ký tự");

    // Kiểm tra hình ành
    isValid &= validation.checkEmpty(hinhAnh, "tbHinhAnh", "Hình ảnh không được bỏ trống");

    // isValid === true
    if (isValid) {
        let tt = new ThongTin(taiKhoan, matKhau, hoTen, email, ngonNgu, loaiND);
        //B2: lưu info xuống database(cơ sở dữ liệu)
        thongTinSer.themTT(tt)
            .then(function (result) {
                //Load lại danh sách sau khi thêm thành công      
                getListInfo();

                //gọi sự kiên click có sẵn của close button
                //Để tắt modal khi thêm thành công
                document.querySelector("#myModal .close").click();
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

function xoaTT(id) {
    thongTinSer.xoaThongTin(id)
        .then(function (result) {
            //Load lại danh sách sau khi xóa thành công      
            getListInfo();
        })
        .catch(function (error) {
            console.log(error);
        });
}

function xemTT(id) {
    thongTinSer.xemThongTin(id)
        .then(function (result) {
            console.log(result.data);
            //Mở modal 
            $('#myModal').modal('show');
            //Điền thông tin lên form
            getELE("TaiKhoan").value = result.data.taiKhoan;
            getELE("MatKhau").value = result.data.matKhau;
            getELE("HoTen").value = result.data.hoTen;
            getELE("Email").value = result.data.email;
            getELE("loaiNgonNgu").value = result.data.ngonNgu;
            getELE("loaiNguoiDung").value = result.data.loaiND;
            getELE("MoTa").value = result.data.moTa;
            getELE("HinhAnh").value = result.data.hinhAnh;

            //Thêm button cập nhật cho form
            var footerEle = document.querySelector(".modal-footer");
            footerEle.innerHTML = `
            <button onclick="capNhatTT('${result.data.id}')" class="btn btn-success">Update Info</button>
        `;
        })
        .catch(function (error) {
            console.log(error);
        });
}

function capNhatTT(id) {
    //B1: Lấy thông tin(info) từ form
    let taiKhoan = getELE("TaiKhoan").value;
    let matKhau = getELE("MatKhau").value;
    let hoTen = getELE("HoTen").value;
    let email = getELE("Email").value;
    let ngonNgu = getELE("loaiNgonNgu").value;
    let loaiND = getELE("loaiNguoiDung").value;
    let moTa = getELE("MoTa").value;
    let hinhAnh = getELE("HinhAnh").value;

    let tt = new ThongTin(taiKhoan, matKhau, hoTen, email, ngonNgu, loaiND);
    console.log(tt);

    //B2: Cập nhật thông tin mới xuống DB
    thongTinSer.capNhatThongTin(id, tt)
        .then(function (result) {
            console.log(result.data);
            //Load lại danh sách sau khi cập nhật thành công      
            getListInfo();

            //gọi sự kiên click có sẵn của close button
            //Để tắt modal khi cập nhật thành công
            document.querySelector("#myModal .close").click();
        })
        .catch(function (error) {
            console.log(error);
        });

}
