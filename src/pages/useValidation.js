export const validateForm = (data) => {
    const errors = {};
  
    if (!data.name || data.name.trim() === "") {
      errors.name = "Vui lòng nhập họ tên";
    }
  
    if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
      errors.email = "Vui lòng nhập email hợp lệ";
    }
  
    if (!data.message || data.message.trim() === "") {
      errors.message = "Vui lòng nhập nội dung";
    }
  
    return errors;
  };
  