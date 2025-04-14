function removeVietnameseTones(str) {
    return str
      .normalize("NFD") // tách dấu
      .replace(/[\u0300-\u036f]/g, "") // xóa dấu
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .replace(/[^a-zA-Z0-9\s]/g, "") // xóa ký tự đặc biệt
      .replace(/\s+/g, " ") // gom khoảng trắng
      .trim();
  }

  module.exports = removeVietnameseTones