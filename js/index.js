const $$ = document.querySelector.bind(document);
const $$$ = document.querySelectorAll.bind(document);

// DOM element 
const btnThem = $$('#btnThem');
const tableDanhSach = $$('#tableDanhSach');
const danhSachThongbao = $$$('.sp-thongbao');

// DOM element Modal inputs
const danhSachInput = $$$('.input-ele');
const tknv = $$('#tknv');
const ten = $$('#ten');
const email = $$('#email');
const password = $$('#password');
const datepicker = $$('#datepicker');
const luongCB = $$('#luongCB');
const chucVu = $$('#chucVu');
const gioLam = $$('#gioLam');

// DOM element Modal buttons
const btnThemNV = $$('#btnThemNV');
const btnCapNhat = $$('#btnCapNhat');
const btnDong = $$('#btnDong');

const app = {

    // Dữ liệu
    danhSachUsers: [],
    danhSachKiemTra: {
        tknv: [
            {
                ten: 'noiDungBatBuoc',
            },
            {
                ten: 'soLuongGiaTri',
                tuyChon: {
                    donVi: 'ký tự',
                    toiThieu: 4,
                    toiDa: 6
                }
            }
        ],
        ten: [
            {
                ten: 'noiDungBatBuoc',
            },
            {
                ten: 'duLieuChu',
            }
        ],
        email: [
            {
                ten: 'noiDungBatBuoc',
            },
            {
                ten: 'duLieuEmail',
            }
        ],
        password: [
            {
                ten: 'noiDungBatBuoc',
            },
            {
                ten: 'soLuongGiaTri',
                tuyChon: {
                    donVi: 'ký tự',
                    toiThieu: 6,
                    toiDa: 10
                }
            },
            {
                ten: 'duLieuMatKhau',
            }
        ],
        datepicker: [
            {
                ten: 'noiDungBatBuoc',
            }
        ],
        luongCB: [
            {
                ten: 'noiDungBatBuoc',
            },
            {
                ten: 'soLuongGiaTri',
                tuyChon: {
                    donVi: 'VNĐ',
                    toiThieu: 1e+6,
                    toiDa: 20e+6
                }
            }
        ],
        chucVu: [
            {
                ten: 'noiDungBatBuoc',
            }
        ],
        gioLam: [
            {
                ten: 'noiDungBatBuoc',
            },
            {
                ten: 'soLuongGiaTri',
                tuyChon: {
                    donVi: 'giờ',
                    toiThieu: 80,
                    toiDa: 200
                }
            }
        ],
    },

    // Render Table danh sách nhân viên
    renderTable: function () {
        const array = this.danhSachUsers.map(function (user, index) {
            return `
            <tr>
                <td>${user.taiKhoan}</td>
                <td>${user.hoTen}</td>
                <td>${user.email}</td>
                <td>${user.ngayLam}</td>
                <td>${user.chucVu}</td>
                <td>${user.tongLuong}</td>
                <td>${user.loaiNhanVien}</td>
                <td><button class="table-remove-btn btn btn-danger" data-index="${index}"">Xóa</button></td>
                <td><button class="table-update-btn btn btn-success" data-index="${index}"">Cập nhật</button></td>
            </tr>
            `;
        });

        tableDanhSach.innerHTML = array.join('');
    },

    // Hàm khởi tạo User
    User: function (taiKhoan, hoTen, email, matKhau, ngayLam, luongCoBan, chucVu, gioLam) {
        this.taiKhoan = taiKhoan;
        this.hoTen = hoTen;
        this.email = email;
        this.matKhau = matKhau;
        this.ngayLam = ngayLam;
        this.luongCoBan = luongCoBan;
        this.chucVu = chucVu;
        this.gioLam = gioLam;
        this.tongLuong = this.tinhTongLuong(chucVu, luongCoBan);
        this.loaiNhanVien = this.xepLoaiNhanVien(gioLam);
    },

    // Chức năng liên quan đến Hàm khởi tạo
    taoUser: function () {
        const user = new this.User(
            tknv.value,
            ten.value,
            email.value,
            password.value,
            datepicker.value,
            +luongCB.value,
            chucVu.value,
            +gioLam.value
        );
        return user;
    },

    hienThiUser: function (index) {
        const user = this.danhSachUsers[index];
        console.log(user);
        Object.keys(user).forEach(function (key) {
            if (user.hasOwnProperty(key)) {
                console.log(key + ' : ' + user[key]);
            }
        });
        // tknv.value,
        // ten.value,
        // email.value,
        // password.value,
        // datepicker.value,
        // +luongCB.value,
        // chucVu.value,
        // +gioLam.value


    },

    themThuocTinhUser: function () {
        this.User.prototype.tinhTongLuong = this.tinhTongLuong;
        this.User.prototype.xepLoaiNhanVien = this.xepLoaiNhanVien;
    },

    tinhTongLuong: function (chucVu, luongCB) {
        let tongLuong;

        switch (chucVu) {
            case 'Sếp':
                tongLuong = luongCB * 3;
                break;
            case 'Trưởng phòng':
                tongLuong = luongCB * 2;
                break;
            case 'Nhân viên':
                tongLuong = luongCB;
                break;
        }

        return new Intl.NumberFormat('vn-VN').format(tongLuong);
    },

    xepLoaiNhanVien: function (gioLam) {
        if (gioLam >= 192) {
            return 'Nhân viên xuất sắc';
        } else if (gioLam >= 176) {
            return 'Nhân viên giỏi';
        } else if (gioLam >= 160) {
            return 'Nhân viên khá';
        } else {
            return 'Nhân viên trung bình';
        }
    },

    // Tạo danhSachHopLe: danh sách cờ hiệu cho tính hợp lệ của từng ô input
    // const danhSachHopLe = [false, false, false,...]
    taoDanhSachHopLe: function () {
        const mang = Array.from(danhSachInput);

        this.danhSachHopLe = mang.map(function () {
            return false;
        });
    },

    /**
     * Hàm kiểm tra tính hợp lệ của form dựa theo danhSachHopLe
     * @return {boolean} true (nếu cờ hiệu hợp lệ của tất cả input là true) || false (nếu 1 cờ hiệu không hợp lệ)
     */
    kiemTraForm: function () {
        const mang = Array.from(this.danhSachHopLe);

        return mang.every(function (hopLe) {
            return hopLe;
        });
    },

    /**
     * Hàm kiểm tra tính hợp lệ của input dựa theo danhSachKiemTra
     * @param {HTMLElement} input input node cần kiểm tra
     * @return {undefined | string} undefined (nếu input hợp lệ) || thông báo lỗi (nếu input không hợp lệ)
     */
    kiemTraInput: function (input) {
        const _this = this;
        const danhSachLuat = this.danhSachKiemTra[input.id];

        // Lọc qua tất cả luật của từng input trong danhSachKiemTra, 
        // nếu chỉ 1 luật không hợp lệ, trả về luật đó
        const luatKhongHopLe = danhSachLuat.find(function (luat) {
            const thongBaoLoi = _this[luat.ten](input.value, luat.tuyChon);

            return thongBaoLoi ? true : false;
        });

        if (luatKhongHopLe) {
            return thongBaoLoi = this[luatKhongHopLe.ten](input.value, luatKhongHopLe.tuyChon);
        }
    },

    /**
     * =============================================================================
     * Danh sách các luật kiểm tra tính hợp lệ của nội dung
     * @param {*} noiDung nội dung cần kiểm tra
     * @param {Object} tuyChon điều kiện kiểm tra phụ, liệt kê trong danhSachKiemTra
     * @return {undefined | string} undefined (nếu nội dung hợp lệ) || thông báo lỗi (nếu nội dung không hợp lệ) 
     */

    // 1. Luật nội dung không được để trống 
    noiDungBatBuoc: function (noiDung, tuyChon) {
        if (noiDung === '') {
            return 'Vui lòng nhập nội dung';
        }
    },

    // 2. Luật nội dung mang giá trị trong khoảng xác định
    soLuongGiaTri: function (noiDung, tuyChon) {
        const dinhDangToiThieu = new Intl.NumberFormat('vn-VN').format(tuyChon.toiThieu);
        const dinhDangToiDa = new Intl.NumberFormat('vn-VN').format(tuyChon.toiDa);
        let hopLe = true;

        switch (tuyChon.donVi) {
            case 'ký tự':
                if (noiDung.length < tuyChon.toiThieu || noiDung.length > tuyChon.toiDa) {
                    hopLe = false;
                }
                break;
            default:
                if (noiDung < tuyChon.toiThieu || noiDung > tuyChon.toiDa) {
                    hopLe = false;
                }
                break;
        }

        if (!hopLe) {
            return `Vui lòng nhập từ ${dinhDangToiThieu} đến ${dinhDangToiDa} ${tuyChon.donVi}`;
        }
    },

    // 3. Luật nội dung phải là chữ
    duLieuChu: function (noiDung, tuyChon) {
        const pattern = /^([a-vxyỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ]+)((\s{1}[a-vxyỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ]+){0,})$/;
        const dinhDang = 'không chứa số và ký tự, không khoảng trống đầu và cuối nội dung, tối đa một khoảng trống giữa các chữ';

        if (!noiDung.match(pattern)) {
            return `Vui lòng nhập đúng họ và tên <i style="font-size: 0.8em;">(${dinhDang})</i>`;
        }
    },

    // 4. Luật nội dung phải là email
    duLieuEmail: function (noiDung, tuyChon) {
        const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

        if (!noiDung.match(pattern)) {
            return `Vui lòng nhập đúng email`;
        }
    },

    // 5. Luật nội dung phải là mật khẩu
    duLieuMatKhau: function (noiDung, tuyChon) {
        const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;
        const dinhDang = 'chứa ít nhất 1 ký tự thường, 1 ký tự hoa, 1 ký tự số, 1 ký tự đặc biệt gồm ! @ # $ % ^ & *';

        if (!noiDung.match(pattern)) {
            return `Vui lòng nhập đúng mật khẩu <i style="font-size: 0.8em;">(${dinhDang})</i>`;
        }
    },

    // =========================================================================

    // Lắng nghe và xử lý các sự kiện (DOM event)
    handleEvents: function () {
        const _this = this;

        // Xử lý khi blur khỏi input
        danhSachInput.forEach(function (input, index) {
            input.onblur = function () {
                const spanNode = input.closest('.form-group').querySelector('.sp-thongbao');
                const thongBaoLoi = _this.kiemTraInput(input);

                if (thongBaoLoi) {
                    _this.danhSachHopLe[index] = false;
                    spanNode.style.display = 'block';
                    spanNode.innerHTML = thongBaoLoi;
                } else {
                    _this.danhSachHopLe[index] = true;
                    spanNode.style.display = 'none';
                    spanNode.innerHTML = '';
                }
            };
        });

        // Xử lý khi bắt đầu nhập input
        danhSachInput.forEach(function (input) {
            input.oninput = function () {
                const spanNode = input.closest('.form-group').querySelector('.sp-thongbao');

                spanNode.style.display = 'none';
                spanNode.innerHTML = '';
            };
        });

        // Xử lý khi nhấn nút thêm người dùng
        btnThemNV.onclick = function () {
            const user = _this.taoUser();
            const mang = Array.from(danhSachInput);

            mang.forEach(function (input) {
                input.focus();
                input.blur();
            });

            if (_this.kiemTraForm()) {
                _this.danhSachUsers.push(user);
                _this.renderTable();
            }
        };

        // Xử lý khi nhấn nút xóa
        tableDanhSach.onclick = function (e) {
            const isBtnNode = e.target.matches('.table-remove-btn');

            if (isBtnNode) {
                const index = e.target.getAttribute('data-index');

                _this.danhSachUsers.splice(index, 1);
                _this.renderTable();
            }
        };

        // Xử lý khi nhấn nút cập nhật trong Table
        tableDanhSach.onclick = function (e) {
            const isBtnNode = e.target.matches('.table-update-btn');

            if (isBtnNode) {
                const index = e.target.getAttribute('data-index');

                _this.hienThiUser(index);
                btnThem.click();
            }
        };
    },

    // Hàm bắt đầu chạy app
    start: function () {

        // Thêm thuộc tính hàm khởi tạo
        this.themThuocTinhUser();

        // Tạo danh sách cờ hiệu tính hợp lệ của các ô input
        this.taoDanhSachHopLe();

        // Lắng nghe và xử lý các sự kiện (DOM events)
        this.handleEvents();

        // Render Table danh sách nhân viên
        this.renderTable();

        const user1 = new this.User('taiKhoan', 'hoTen', 'email', 'matKhau', '196', 20e6, 'Sếp', 160);
        const user2 = new this.User('taiKhoan2', 'hoTen2', 'email2', 'matKhau2', '100', 10e6, 'Trưởng phòng', 90);
        this.danhSachUsers.push(user1, user2);
        this.renderTable();
    }
};

app.start();


/**CAU HOI
 * 1. tong luong = luongCB * ngay lam * he so luong
 * 2. cap nhat theo tai khoan nhan vien ?
 * regex
 * 3. ho va ten input nhap it nhat 1 tu hay 2 tu?
 * 4. email sau gmail bao nhiêu cấp? .com.vn (2 cấp) hay vô số cấp
 * 5. mật khẩu không được để dấu hay trọng âm
 * =>trang nào đưa regex chuẩn
 */

//
// 
/**TOI UU
 * 1. khi nhan nut them nguoi dung co the bo viec focus() va blur() neu bo libary datapicker 
 * 2. không hard code font-size <i></i> trong kiem tra input, thay css
 */