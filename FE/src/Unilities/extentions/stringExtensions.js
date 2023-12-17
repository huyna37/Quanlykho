String.prototype.formatDate = function (type) {
    if(!type) {
      type = "DD/MM/YYYY";
    }
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  
    // Tạo đối tượng Date từ chuỗi ban đầu
    const dateString = this.slice(0, -1); // Xóa dấu chấm cuối cùng
    const date = new Date(convertToUTC7(dateString));
    
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    // Trả về chuỗi định dạng ngày tháng theo kiểu truyền vào
    switch (type) {
      case "DD/MM/YYYY":
        return (
          date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + hours + ":" + minutes + ":" + seconds
        );
      case "MM/DD/YYYY":
        return (
          date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear()
        );
      case "Month D, YYYY":
        return (
          monthNames[date.getMonth()] +
          " " +
          date.getDate() +
          ", " +
          date.getFullYear()
        );
      default:
        return dateString;
    }
  }

  function convertToUTC7(dateString) {
    // Tạo đối tượng Date từ chuỗi thời gian chuẩn
    var date = new Date(dateString);
  
    // Đặt giờ UTC+7
    date.setHours(date.getHours() + 7);
  
    // Trả về chuỗi đại diện cho thời gian mới
    return date.toISOString();
  }
  Number.prototype.formatMoney = function() {
    return new Intl.NumberFormat().format(this);
  };