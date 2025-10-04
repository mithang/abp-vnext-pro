export default {
  api: {
    operationFailed: 'Thao tác thất bại',
    errorTip: 'Thông báo lỗi',
    errorMessage: 'Thao tác thất bại, hệ thống bất thường!',
    timeoutMessage: 'Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!',
    apiTimeoutMessage: 'Yêu cầu giao diện hết thời gian, vui lòng làm mới trang và thử lại!',
    apiRequestFailed: 'Yêu cầu giao diện thất bại, vui lòng thử lại sau!',
    networkException: 'Bất thường mạng',
    networkExceptionMsg:
      'Vui lòng kiểm tra kết nối mạng của bạn có bình thường không! Mạng bất thường',

    errMsg401: 'Người dùng không có quyền (token, tên người dùng, mật khẩu sai)!',
    errMsg403: 'Người dùng được ủy quyền, nhưng truy cập bị cấm!',
    errMsg404: 'Lỗi yêu cầu mạng, không tìm thấy tài nguyên!',
    errMsg405: 'Lỗi yêu cầu mạng, phương thức yêu cầu không được phép!',
    errMsg408: 'Yêu cầu mạng hết thời gian!',
    errMsg500: 'Lỗi máy chủ, vui lòng liên hệ quản trị viên!',
    errMsg501: 'Mạng chưa được triển khai!',
    errMsg502: 'Lỗi mạng!',
    errMsg503: 'Dịch vụ không khả dụng, máy chủ tạm thời quá tải hoặc bảo trì!',
    errMsg504: 'Mạng hết thời gian!',
    errMsg505: 'Phiên bản http không hỗ trợ yêu cầu!',
  },
  app: {
    logoutTip: 'Nhắc nhở',
    logoutMessage: 'Xác nhận thoát khỏi hệ thống?',
    menuLoading: 'Đang tải menu...',
  },
  errorLog: {
    tableTitle: 'Danh sách nhật ký lỗi',
    tableColumnType: 'Loại',
    tableColumnDate: 'Thời gian',
    tableColumnFile: 'Tệp',
    tableColumnMsg: 'Thông báo lỗi',
    tableColumnStackMsg: 'Thông tin ngăn xếp',

    tableActionDesc: 'Chi tiết',

    modalTitle: 'Chi tiết lỗi',

    fireVueError: 'Kích hoạt lỗi vue',
    fireResourceError: 'Kích hoạt lỗi tài nguyên',
    fireAjaxError: 'Kích hoạt lỗi ajax',

    enableMessage: 'Chỉ có hiệu lực khi useErrorHandle=true trong `/src/settings/projectSetting.ts`.',
  },
  exception: {
    backLogin: 'Quay lại đăng nhập',
    backHome: 'Về trang chủ',
    subTitle403: 'Xin lỗi, bạn không có quyền truy cập trang này.',
    subTitle404: 'Xin lỗi, trang bạn truy cập không tồn tại.',
    subTitle500: 'Xin lỗi, máy chủ đang báo lỗi.',
    noDataTitle: 'Không có dữ liệu trên trang hiện tại.',
    networkErrorTitle: 'Lỗi mạng',
    networkErrorSubTitle:
      'Xin lỗi, kết nối mạng của bạn đã bị ngắt, vui lòng kiểm tra mạng của bạn!',
  },
  lock: {
    unlock: 'Nhấp để mở khóa',
    alert: 'Mật khẩu khóa màn hình sai',
    backToLogin: 'Quay lại đăng nhập',
    entry: 'Vào hệ thống',
    placeholder: 'Vui lòng nhập mật khẩu khóa màn hình hoặc mật khẩu người dùng',
  },
  login: {
    backSignIn: 'Quay lại đăng nhập',
    mobileSignInFormTitle: 'Đăng nhập di động',
    qrSignInFormTitle: 'Đăng nhập mã QR',
    signInFormTitle: 'Đăng nhập',
    signUpFormTitle: 'Đăng ký',
    forgetFormTitle: 'Đặt lại mật khẩu',
    tenantFormTitle: 'Đăng nhập tenant',
    signInTitle: 'Hệ thống quản lý backend',
    signInDesc: 'Nhập thông tin cá nhân của bạn và bắt đầu!',
    policy: 'Tôi đồng ý với Chính sách bảo mật xxx',
    scanSign: 'quét mã để hoàn thành đăng nhập',

    loginButton: 'Đăng nhập',
    registerButton: 'Đăng ký',
    rememberMe: 'Ghi nhớ tôi',
    forgetPassword: 'Quên mật khẩu?',
    otherSignIn: 'Đăng nhập với',

    // notify
    loginSuccessTitle: 'Đăng nhập thành công',
    loginSuccessDesc: 'Chào mừng trở lại',

    // placeholder
    accountPlaceholder: 'Vui lòng nhập tên người dùng',
    passwordPlaceholder: 'Vui lòng nhập mật khẩu',
    smsPlaceholder: 'Vui lòng nhập mã SMS',
    mobilePlaceholder: 'Vui lòng nhập số điện thoại',
    policyPlaceholder: 'Đăng ký sau khi kiểm tra',
    diffPwd: 'Hai mật khẩu không nhất quán',

    userName: 'Tên người dùng',
    password: 'Mật khẩu',
    confirmPassword: 'Xác nhận mật khẩu',
    email: 'Email',
    smsCode: 'Mã SMS',
    mobile: 'Điện thoại',
    tenant: 'Tenant',
    tenantPlaceholder: 'Vui lòng nhập tenant',
  },
};
