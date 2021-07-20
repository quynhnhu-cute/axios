let userService = new UserService();
let validator = new Validator();

let btnThemNguoiDung = document.querySelector('#btnThemNguoiDung');
btnThemNguoiDung.onclick = function () {
  document.querySelector('.modal-title').innerHTML = 'Thêm người dùng';
  document.querySelector('#form-input').reset();
  document.querySelector(
    '.modal-footer'
  ).innerHTML = `<button class="btn btn-success" id="btnThem" onclick="addUser()">Thêm người dùng</button>`;
  document.querySelector('#TaiKhoan').disabled = false;
  document.querySelector('#MatKhau').disabled = false;
};

const validateForm = function (user) {
  var r = true;
  if (user.taiKhoan.trim().length === 0) {
    document.querySelector('#tbTaiKhoan').innerHTML =
      'Tài khoản không được rỗng';
    r = false;
  } else {
    document.querySelector('#tbTaiKhoan').innerHTML = '';
  }
  // Check fullname
  if (
    !validator.checkFormat(
      user.hoTen,
      'tbTen',
      'Tên phải không được để trống và không chứa kí tự đặc biệt',
      '^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ' +
        'ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ' +
        'ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$'
    )
  ) {
    r = false;
  }

  //Check password
  if (
    !validator.checkFormat(
      user.matKhau,
      'tbMatKhau',
      'Password phải chứa ít nhát 1 số, 1 kí tự in hoa và 1 kí tự đặc biệt và từ 6 đến 8 kí tự',
      '^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,8}$'
    )
  ) {
    r = false;
  }

  //Check email
  if (
    !validator.checkFormat(
      user.email,
      'tbEmail',
      'Email không hợp lệ',
      '^[A-Za-z0-9+_.-]+@(.+)$'
    )
  ) {
    r = false;
  }

  //Check hinhAnh
  if (user.hinhAnh.trim().length == 0) {
    document.querySelector('#tbHinhAnh').innerHTML =
      'Hình ảnh không được để trống';
    r = false;
  } else {
    document.querySelector('#tbHinhAnh').innerHTML = '';
  }

  // CheckLoaiND
  if (user.loaiND === '0') {
    document.querySelector('#tbLoaiND').innerHTML =
      'Vui lòng chọn loại người dùng';
    r = false;
  } else {
    document.querySelector('#tbLoaiND').innerHTML = '';
  }

  // CheckLoaiNN
  if (user.ngonNgu === '0') {
    document.querySelector('#tbLoaiNN').innerHTML =
      'Vui lòng chọn loại ngôn ngữ';
    r = false;
  } else {
    document.querySelector('#tbLoaiNN').innerHTML = '';
  }

  // Check description
  if (user.moTa.length > 60 || user.moTa.length == 0) {
    document.querySelector('#tbMoTa').innerHTML =
      'Mô tả không được để trống và phải dưới 60 kí tự';
    r = false;
  } else {
    document.querySelector('#tbMoTa').innerHTML = '';
  }
  return r;
};
const getAllUserList = function () {
  userService
    .getAllUsers()
    .then(function (result) {
      renderTable(result.data);
      setLocalStorage(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

const updateUser = function (id) {
  let taiKhoan = document.querySelector('#TaiKhoan').value.trim();
  let hoTen = document.querySelector('#HoTen').value.trim();
  let matKhau = document.querySelector('#MatKhau').value.trim();
  let email = document.querySelector('#Email').value.trim();
  let hinhAnh = document.querySelector('#HinhAnh').value.trim();
  let loaiND = document.querySelector('#loaiNguoiDung').value;
  let ngonNgu = document.querySelector('#loaiNgonNgu').value;
  let moTa = document.querySelector('#MoTa').value.trim();

  let userUpdate = new User(
    taiKhoan,
    hoTen,
    matKhau,
    email,
    loaiND,
    ngonNgu,
    moTa,
    hinhAnh
  );
  if (!validateForm(userUpdate)) {
    return;
  }
  userService
    .updateUser(userUpdate, id)
    .then(function (result) {
      getAllUserList();
      document.querySelector('#myModal .close').click();
    })
    .catch(function (error) {
      console.log(error);
    });
};
const getUserByAccount = function (id) {
  userService
    .getUserById(id)
    .then(function (result) {
      document.querySelector('#TaiKhoan').value = result.data.taiKhoan;
      document.querySelector('#HoTen').value = result.data.hoTen;
      document.querySelector('#MatKhau').value = result.data.matKhau;
      document.querySelector('#Email').value = result.data.email;
      document.querySelector('#HinhAnh').value = result.data.hinhAnh;
      document.querySelector('#loaiNguoiDung').value = result.data.loaiND;
      document.querySelector('#loaiNgonNgu').value = result.data.ngonNgu;
      document.querySelector('#MoTa').innerHTML = result.data.moTa;
      document.querySelector(
        '.modal-footer'
      ).innerHTML = `<button class="btn btn-success" id="btnCapNhat" onclick="updateUser('${result.data.id}')">Cập nhật</button>`;
      document.querySelector('#TaiKhoan').disabled = true;
      document.querySelector('#MatKhau').disabled = true;
    })
    .catch(function (error) {
      console.log(error);
    });
};

const deleteUser = function (id) {
  userService
    .deleteUser(id)
    .then(function (result) {
      getAllUserList();
    })
    .catch(function (error) {
      console.log(error);
    });
};

function renderTable(userArr) {
  let content = '';
  userArr.map(function (user, index) {
    content += `
            <tr>
                <td>${index + 1}</td>
                <td>${user.taiKhoan}</td>
                <td>${user.matKhau}</td>
                <td>${user.hoTen}</td>
                <td>${user.email}</td>
                <td>${user.ngonNgu}</td>
                <td>${user.loaiND}</td>
                <td>
                    <button class="btn btn-success" onclick="getUserByAccount('${
                      user.id
                    }')" data-toggle="modal"
                    data-target="#myModal">Chỉnh sửa</button>
                    <button class="btn btn-danger" onclick="deleteUser('${
                      user.id
                    }')">Xóa</button>
                </td>
            </tr>
        `;
  });
  document.getElementById('tblDanhSachNguoiDung').innerHTML = content;
}

getAllUserList();

const addUser = function () {
  let taiKhoan = document.querySelector('#TaiKhoan').value.trim();
  let hoTen = document.querySelector('#HoTen').value.trim();
  let matKhau = document.querySelector('#MatKhau').value.trim();
  let email = document.querySelector('#Email').value.trim();
  let hinhAnh = document.querySelector('#HinhAnh').value.trim();
  let loaiND = document.querySelector('#loaiNguoiDung').value;
  let ngonNgu = document.querySelector('#loaiNgonNgu').value;
  let moTa = document.querySelector('#MoTa').value.trim();
  if (userService.checkAccountDuplicated(taiKhoan.trim(), getLocalStorage())) {
    document.querySelector('#tbTaiKhoan').innerHTML =
      'Tài khoản không được trùng';
    return;
  }
  let user = new User(
    taiKhoan.toLowerCase(),
    hoTen,
    matKhau,
    email,
    loaiND,
    ngonNgu,
    moTa,
    hinhAnh
  );
  if (!validateForm(user)) {
    return;
  }

  userService
    .addNewUser(user)
    .then(function (result) {
      getAllUserList();
      document.querySelector('#myModal .close').click();
    })
    .catch(function (error) {
      console.log(error);
    });
};

function getLocalStorage() {
  if (localStorage.getItem('DSND')) {
    return JSON.parse(localStorage.getItem('DSND'));
  }
}

function setLocalStorage(userArray) {
  localStorage.setItem('DSND', JSON.stringify(userArray));
}
