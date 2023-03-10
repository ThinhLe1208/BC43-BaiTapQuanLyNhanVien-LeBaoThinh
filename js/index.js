const $$ = document.querySelector.bind(document);
const $$$ = document.querySelectorAll.bind(document);

// DOM element 
const btnThemTbl = $$('#btnThem');
const headerTitle = $$('#header-title');
const tableDanhSach = $$('#tableDanhSach');
const danhSachThongbao = $$$('.sp-thongbao');
const searchName = $$('#searchName');

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
const btnThemMod = $$('#btnThemNV');
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
            },
            {
                ten: 'trungNoiDung',
                tuyChon: {
                    tenThuocTinh: 'taiKhoan'
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
            },
            {
                ten: 'duLieuThoiGian',
            }
        ],
        luongCB: [
            {
                ten: 'noiDungBatBuoc',
            },
            {
                ten: 'duLieuSo',
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
                ten: 'duLieuSo',
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

    // Trạng thái
    dangCapNhat: false,

    // Render Table danh sách nhân viên
    renderTable: function (list) {
        const array = list.map(function (user, index) {
            return `
            <tr>
                <td>${user.taiKhoan}</td>
                <td>${user.hoTen}</td>
                <td>${user.email}</td>
                <td>${user.ngayLam}</td>
                <td>${user.chucVu}</td>
                <td>${user.tongLuong}</td>
                <td>${user.loaiNhanVien}</td>
                <td style="width: 190px;">
                    <button class="table-remove-btn d-inline-block btn btn-danger" data-index="${index}"">Xóa</button>
                    <button class="table-update-btn d-inline-block btn btn-success" data-index="${index}"">Cập nhật</button>
                </td>
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

    /**
     * Tạo danhSachHopLe: danh sách cờ hiệu cho tính hợp lệ của từng ô input
     * const danhSachHopLe = [false, false, false,...]
     */
    taoDanhSachHopLe: function () {
        const mang = Array.from(danhSachInput);

        this.danhSachHopLe = mang.map(function () {
            return false;
        });
    },

    /**
     * Hàm kiểm tra tính hợp lệ của form dựa theo danhSachHopLe
     * @return {boolean} true (nếu tất cả input hợp lệ) || false (nếu 1 input không hợp lệ)
     */
    kiemTraForm: function () {
        const mangInputs = Array.from(danhSachInput);

        mangInputs.forEach(function (input) {
            input.onblur();
        });

        return this.danhSachHopLe.every(function (hopLe) {
            return hopLe;
        });
    },

    /**
     * Hàm kiểm tra tính hợp lệ của input dựa theo danhSachKiemTra
     * @param {HTMLElement} input input node cần kiểm tra
     * @return {undefined | string} undefined (nếu input hợp lệ) || thông báo lỗi (nếu input không hợp lệ)
     */
    kiemTraInput: function (input) {
        const danhSachLuat = this.danhSachKiemTra[input.id];

        // Nếu input bị disabled thì luôn hợp lệ
        if (input.disabled) {
            return undefined;
        }

        // Lọc qua tất cả luật của từng input trong danhSachKiemTra, 
        // nếu chỉ 1 luật không hợp lệ, trả về luật đó
        const luatKhongHopLe = danhSachLuat.find((luat) => {
            const thongBaoLoi = this[luat.ten](input.value, luat.tuyChon);

            return thongBaoLoi;
        });

        if (luatKhongHopLe) {
            return thongBaoLoi = this[luatKhongHopLe.ten](input.value, luatKhongHopLe.tuyChon);
        }
    },

    /**
     * =============================================================================
     * Danh sách các luật kiểm tra tính hợp lệ của nội dung input
     * @param {*} noiDung nội dung cần kiểm tra
     * @param {Object} tuyChon điều kiện kiểm tra phụ, liệt kê trong danhSachKiemTra
     * @return {undefined | string} undefined (nếu nội dung hợp lệ) || thông báo lỗi (nếu nội dung không hợp lệ) 
     */

    // 1. Luật nội dung không được để trống 
    noiDungBatBuoc: function (noiDung, tuyChon) {
        if (noiDung.trim() === '') {
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
        const pattern = /^([a-z]+)((\s{1}[a-z]+){1,})$/;
        const dinhDang = 'không chứa số và ký tự, không khoảng trống đầu và cuối nội dung, tối đa một khoảng trống giữa các chữ';

        if (!pattern.test(this.toSlug(noiDung))) {
            return `Vui lòng nhập đúng họ và tên <i style="font-size: 0.8em;">(${dinhDang})</i>`;
        }
    },

    // 4. Luật nội dung phải là số
    duLieuSo: function (noiDung, tuyChon) {
        const pattern = /^[0-9]*$/;

        if (!pattern.test(noiDung)) {
            return `Vui lòng nhập số`;
        }
    },

    // 5. Luật nội dung phải là email
    duLieuEmail: function (noiDung, tuyChon) {
        const pattern = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;

        if (!pattern.test(noiDung)) {
            return `Vui lòng nhập đúng email`;
        }
    },

    // 6. Luật nội dung phải là mật khẩu
    duLieuMatKhau: function (noiDung, tuyChon) {
        const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;
        const dinhDang = 'chứa ít nhất 1 ký tự thường, 1 ký tự hoa, 1 ký tự số, 1 ký tự đặc biệt gồm ! @ # $ % ^ & *';

        if (!pattern.test(noiDung)) {
            return `Vui lòng nhập đúng mật khẩu <i style="font-size: 0.8em;">(${dinhDang})</i>`;
        }
    },

    // 7. Luật nội dung phải là tháng ngày năm
    duLieuThoiGian: function (noiDung, tuyChon) {
        const pattern = /^(0[1-9]|1[012])[\/\-](0[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;
        const dinhDang = 'mm/dd/yyyy';

        if (!pattern.test(noiDung)) {
            return `Vui lòng nhập đúng tháng/ngày/năm <i style="font-size: 0.8em;">(${dinhDang})</i>`;
        }
    },

    // 8. Luật nội dung không được trùng lặp
    trungNoiDung: function (noiDung, tuyChon) {
        const noiDungSoSanh = tuyChon.tenThuocTinh;

        const trungLap = this.danhSachUsers.some(function (user) {
            return user[noiDungSoSanh] === noiDung;
        });

        if (trungLap) {
            return `Vui lòng nhập lại do nội dung này bị trùng lặp`;
        }
    },

    // =============================================================================

    // Lắng nghe và xử lý các sự kiện (DOM event)
    handleEvents: function () {
        const _this = this;

        // Xử lý khi nhấn nút thêm nhân viên 
        btnThemTbl.onclick = function () {
            if (_this.dangCapNhat) {
                tknv.setAttribute('disabled', '');
                btnCapNhat.style.display = 'block';
                btnThemMod.style.display = 'none';
                headerTitle.innerHTML = 'Cập nhật nhân viên';
            } else {
                _this.resetForm();
                tknv.removeAttribute('disabled', '');
                btnCapNhat.style.display = 'none';
                btnThemMod.style.display = 'block';
                headerTitle.innerHTML = 'Thêm nhân viên';
            }

            _this.dangCapNhat = false;
        };

        // ============ Search ============

        // Xử lý khi nhập input tìm kiếm
        searchName.oninput = function () {
            const danhSachKetQua = _this.danhSachUsers.reduce(function (acc, user) {

                if (_this.toSlug(user.loaiNhanVien, true).search(_this.toSlug(searchName.value, true)) !== -1) {
                    acc.push(user);
                    return acc;
                }
                return acc;
            }, []);

            _this.renderTable(danhSachKetQua);
        };

        // ============ Table ============

        // Xử lý khi nhấn các nút
        tableDanhSach.onclick = function (e) {
            // Xử lý khi nhấn nút xóa
            const nutXoa = e.target.matches('.table-remove-btn');

            if (nutXoa) {
                const index = e.target.getAttribute('data-index');

                _this.danhSachUsers.splice(index, 1);
                _this.renderTable(_this.danhSachUsers);
            }

            // Xử lý khi nhấn nút cập nhật
            const nutCapNhat = e.target.matches('.table-update-btn');

            if (nutCapNhat) {
                const indexUser = e.target.getAttribute('data-index');
                const userDuocChon = _this.danhSachUsers[indexUser];

                _this.dangCapNhat = true;
                _this.userVaInputs(userDuocChon, 'inputs');
                btnThem.click();
            }
        };

        // ============ Modal ============

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

        // Xử lý khi nhập input
        danhSachInput.forEach(function (input) {
            input.oninput = function () {
                const spanNode = input.closest('.form-group').querySelector('.sp-thongbao');

                spanNode.style.display = 'none';
                spanNode.innerHTML = '';
            };
        });

        // Xử lý khi nhấn nút thêm người dùng
        btnThemMod.onclick = function () {
            const user = _this.taoUser();

            if (_this.kiemTraForm()) {
                _this.danhSachUsers.push(user);
                _this.renderTable(_this.danhSachUsers);
            }
        };

        // Xử lý khi nhấn nút cập nhật
        btnCapNhat.onclick = function () {
            const hopLe = _this.kiemTraForm();

            if (hopLe) {
                const userHienTai = _this.danhSachUsers.find(function (user) {
                    return user.taiKhoan === tknv.value;
                });

                _this.userVaInputs(userHienTai, 'user');
                _this.renderTable(_this.danhSachUsers);
            }
        };

        // Xử lý khi chọn ngày trong lịch
        datepicker.onchange = function () {
            datepicker.onblur();
        };
    },

    /**
     * Hàm lấy thông tin user đưa vào các inputs hay ngược lại
     * @param {string} ganVo 'user' khi gán giá trị các inputs vô user, 'inputs' khi hiển thị các giá trị user lên các inputs
     */
    userVaInputs: function (user, ganVo) {
        const mang = Array.from(danhSachInput);

        Object.keys(user).forEach(function (key, index) {
            if (key !== 'tongLuong' && key !== 'loaiNhanVien') {
                switch (ganVo) {
                    case 'user':
                        user[key] = mang[index].value;
                        break;
                    case 'inputs':
                        mang[index].value = user[key];
                        break;
                }
            }
        });
    },

    /**
     * Xóa nội dung tất cả inputs và ẩn tất cả thông báo lỗi
     */
    resetForm: function () {
        const user = new this.User('', '', '', '', '', '', '', '');
        const mang = Array.from(danhSachThongbao);

        this.userVaInputs(user, 'inputs');
        mang.forEach(function (thongBao) {
            thongBao.style.display = 'none';
        });
    },

    toSlug: function (string, optional) {
        //Đổi chữ hoa thành chữ thường
        slug = string.toLowerCase();

        switch (optional) {
            case true:
                //Xóa các ký tự đặt biệt
                slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
                //Đổi khoảng trắng thành ký tự gạch ngang
                slug = slug.replace(/ /gi, "-");
                //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
                //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
                slug = slug.replace(/\-\-\-\-\-/gi, '-');
                slug = slug.replace(/\-\-\-\-/gi, '-');
                slug = slug.replace(/\-\-\-/gi, '-');
                slug = slug.replace(/\-\-/gi, '-');
                //Xóa các ký tự gạch ngang ở đầu và cuối
                slug = '@' + slug + '@';
                slug = slug.replace(/\@\-|\-\@|\@/gi, '');
            default:
                //Đổi ký tự có dấu thành không dấu
                slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
                slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
                slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
                slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
                slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
                slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
                slug = slug.replace(/đ/gi, 'd');
        }

        return slug;
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
        this.renderTable(this.danhSachUsers);
    }
};

app.start();