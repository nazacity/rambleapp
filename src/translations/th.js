const th = {
  tab: {
    home: 'Home',
    activity: 'Event',
    community: 'Community',
  },
  onboarding: {
    next: 'ต่อไป',
    getStarted: 'เริ่มต้นกันเถอะ',
  },
  signin: {
    username: 'ชื่อบัญชีผู้ใช่งาน',
    password: 'รหัสผ่าน',
    signin: 'เข้าสู่คอมมิวนิตี้',
    noaccount: 'ยังไม่มีบัญชีใช่ไหม',
    register: 'ลงทะเบียน',
    '401error': 'ชื่อบัญชีผู้ใช่งาน หรือ รหัสผ่าน ไม่ถูกต้อง',
    welcome: 'ยินดีต้อนรับเข้าสู่มาราธอนคอมมิวนิตี้',
    nouserorpasserror: 'กรุณาใส่ ชื่อบัญชีผู้ใช่งาน และ รหัสผ่าน',
    forgotpassword: 'ลืมรหัสผ่าน',
    linelogin: 'เข้าสู่คอมมิวนิตี้ด้วย Line',
    applelogin: 'ลงชื่อเข้าด้วย Apple',
    pdpa: 'เงื่อนไขความยินยอมข้อมูลส่วนบุคคลของท่าน',
    error: 'กรุณาลองใหม่',
    appleloginerror: 'การเข้าสู่ระบบด้วย Apple มีปัญหา',
    rememberusername: 'บันทึกชื่อบัญชีผู้ใช่งาน',
  },
  forgotpassword: {
    username: 'ชื่อบัญชีผู้ใช่งาน',
    reset: 'รีเซ็ตรหัสผ่าน',
    phone_number: 'เบอร์โทรศัพท์',
    nouser: 'ชื่อบัญชีผู้ใช่งาน หรือ เบอร์โทรศัพท์ไม่ถูกต้อง',
    fillallform: 'กรุณากรอก ชื่อบัญชีผู้ใช่งาน และ เบอร์โทรศัพท์',
    check: 'ตรวจสอบข้อมูล',
    success: 'เปลี่ยนรหัสเรียบร้อย',
    error: 'มีบางอย่างไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง',
    warning1: 'หากไม่สามารถจำ ชื่อบัญชีผู้ใช่งาน ได้ กรุณาติดต่อ Admin ทาง',
  },
  newregister: {
    first_name: 'ชื่อ',
    last_name: 'นามสกุล',
    phone_number: 'เบอร์โทรศัพท์',
    gender: 'เพศ',
    bloodtype: 'กรุ๊ปเลือด',
    birthdate: 'วันเกิด',
    save: 'บันทึก',
    title: 'กรุณาให้ข้อมูลเหล่านี้ก่อนสมัครงานอีเว้นท์',
  },
  signup: {
    username: 'ชื่อบัญชีผู้ใช่งาน',
    password: 'รหัสผ่าน',
    confirm_password: 'ยืนยันรหัสผ่าน',
    signin: 'เข้าสู่คอมมิวนิตี้',
    selfinfo: 'ข้อมูลส่วนตัว',
    first_name: 'ชื่อ',
    last_name: 'นามสกุล',
    haveaccount: 'มีบัญชีอยู่แล้ว',
    signup: 'ลงทะเบียน',
    gender: 'เพศ',
    bloodtype: 'กรุ๊ปเลือด',
    displayname: 'Display Name',
    passwordnotmatch: 'คอมเฟิร์มรหัสผ่านไม่ตรงกัน',
    okay: 'ตกลง',
    phone_number: 'เบอร์โทรศัพท์ (ไม่จำเป็น)',
    usedusername: 'ชื่อบัญชีผู้ใช่งานถูกใช้แล้ว',
    password8: 'รหัสผ่านต้องมีมากกว่า 8 ตัวขึ้นไป',
    phoneerror: 'เบอร์โทรศัพท์ไม่ถูกต้อง',
    noimage: 'กรุณาอัพโหลรูปโปรไฟล์',
    gendererror: 'กรุณาเลือกเพศ',
    bloodtypeerror: 'กรุณาเลือกกรุ๊ปเลือด',
    usernameerror: 'ชื่อบัญชีผู้ใช่งานต้องมีมากกว่า 6 ตัวขึ้นไป',
    firstnameerror: 'กรุณากรอกชื่อ',
    lastnameerror: 'กรุณากรอกนามสกุล',
    displaynameerror: 'กรุณากรอก display name',
    idcard: 'หมายเลขบัตรประชาชน*',
    idcarderror: 'กรุณากรอกหมายเลขบัตรประชาชน',
    rightidcard: 'หมายเลขบัตรประจำตัวประชาชนของคุณถูกต้อง',
    wrongidcard: 'หมายเลขบัตรประจำตัวประชาชนของคุณไม่ถูกต้อง',
    usedidcard: 'หมายเลขบัตรประจำตัวประชาชนของคุณถูกใช้งานแล้ว',
    birthdate: 'วันเกิด',
    condition1: 'โดยการสมัครสมาชิกนั้น ให้ถือว่า\nข้าพเจ้าได้อ่านและยอมรับ',
    condition2: ' และ ',
    // condition3: 'และตัดสินใจกดปุ่มสมัครสมาชิก',
    policy: 'นโยบายความเป็นส่วนตัว',
    useragreement: 'เงื่อนไข และข้อตกลงการใข้งาน',
    successed: 'การสมัครสำเร็จแล้ว',
    agree: 'ฉันรับยอม และตกลง',
    male: 'ชาย',
    female: 'หญิง',
  },
  phonechecking: {
    resend: 'ส่งรหัส OTP อีกครั้ง',
    confirm: 'ยืนยัน',
    changephonenumber: 'เปลี่ยนเบอร์โทรศัพท์',
  },
  confirmRegister: {
    appreciated: 'ยินดีต้อนรับสู่คอมมิวตี้ของเรา',
  },
  drawer: {
    signout: 'ออกจากคอมมิวนิตี้',
    upcoming: 'Upcoming',
    history: 'ประวัติงานอีเว้นท์',
    userposts: 'โพสต์ของฉัน',
    profile: 'โปรไฟล์',
    emergencycontact: 'การติดต่อฉุกเฉิก',
    address: 'ที่อยู่',
    home: 'หน้าแรก',
    setting: 'ตั้งค่า',
  },
  home: {
    upcomingactivity: 'Upcoming Events',
    historyactivity: 'History Events',
    seeall: 'ดูทั้งหมด',
    exit: 'ออกจากแอพ',
    sure: 'คุณแน่ใจที่จะออกจากแอพ ใช่หรือไม่',
    yes: 'ใช่',
    no: 'ไม่',
    noactivity: 'ยังไม่มีงานอีเว้นท์ใหม่',
  },
  userrecode: {
    activitiesinthisyear: 'งานอีเว้นท์ในปีนี้',
    howfardidyougo: 'ระยะทางทั้งหมด',
    timeyouspent: 'ระยะเวลาทั้งหมด',
    averagespeed: 'เวลาเฉลี่ย',
    km: 'กม.',
    hr: 'ชม.',
    min: 'นาที',
    'km/hr': 'กม./ชม.',
    'km/min': 'กม./นาที',
  },
  createpost: {
    find: 'ตามหา',
    form_team: 'เพื่อนร่วมวิ่ง',
    share_accommodation: 'เพื่อนร่วมแชร์ค่าที่พัก',
    share_transportation: 'เพื่อนร่วมแชร์ค่าเดินทาง',
    share_trip: 'เพื่อนร่วมทริปท่องเที่ยว',
    gender: 'เพศ',
    male: 'ชาย',
    female: 'หญิง',
    province: 'จังหวัด',
    moredetail: 'รายละเอียดเพิ่มเติม',
    moredetailcontact: 'กรุณาให้รายละเอียด และการติดต่อ',
    revealinfoterm: 'ฉันยืนยอมที่จะเปิดเผยข้อมูลการติดต่อ',
    createpost: 'สร้างโพสต์',
    selectprovince: 'เลือกจังหวัด',
    pleaseacceptterms: 'กรุณายอมรับเงื่อนไข และข้อตกลง',
    searchprovince: 'ค้นหาจังหวัด',
    description: 'รายละเอียด',
    editpost: 'แก้ไขโพสต์',
    editsuccessed: 'แก้ไขสำเร็จ',
    closepost: 'ปิดโพสต์',
    openpost: 'เปิดโพสต์',
    postdate: 'โพสต์เมื่อ',
    term: 'เงื่อนไขและข้อตกลง',
    iagree: 'ฉันยอมรับ ',
    actualdate: 'วันงาน',
  },
  communityfilter: {
    activity: 'งานอีเว้นท์',
    find: 'ค้นหา',
    selectone: 'เลือกงานอีเว้นท์',
    nouserpost: 'ไม่มีโพสต์ที่คุณค้นหา',
    clickhere: 'กลับไปเซตติ้ง Filter',
  },
  community: {
    nopost: 'ยังไม่มีโพสต์',
    noactivity: 'คุณยังไม่ได้สมัครงานอีเว้นท์ใหม่',
    recently: 'Recenet Contents',
    social: 'Sharing Community',
    trend: 'Trend',
    comment: {
      commentblog: 'คุณคิดเห็นอย่างไรกับบทความนี้',
      seeall: 'ดูทั้งหมด',
      seeless: 'ดูบางส่วน',
      commented: 'แสดงความคิดเห็นเรียบร้อย',
      noblog: 'ยังไม่มีเนื้อหา',
      textmorethan: 'เนื้อหาต้องไม่เกิน 500 อักษร',
      okay: 'ตกลง',
    },
    socialcomment: {
      post: 'โพสต์เรื่องราวของคุณ',
      comments: 'ความคิดเห็น',
      imagenumbererror: 'เลือกได้สูงสุด 3 รูปภาพ',
      pleaseselectagain: 'กรุณาเลือกอีกครั้ง',
      activity: 'สังคมงานอีเว้นท์ของคุณ',
      post1: 'โพสต์',
      selectimageerror: 'กรุณาเลือกรูปภาพอีกครั้ง',
      postsuccessed: 'โพสต์เรียบร้อยแล้ว',
      commentpost: 'คุณคิดเห็นอย่างไรกับโพสต์นี้',
      commentsuccessed: 'แสดงความคิดเห็นเรียบร้อย',
    },
  },
  activityfilter: {
    course: 'ระยะทางวิ่ง (กม.)',
    during: 'ห้วงวันที่',
    find: 'ค้นหางานอีเว้นท์',
    region: 'ภูมิภาค',
    noregion: 'ยังไม่ได้เลือกภูมิภาค',
    selectone: 'กรุณาเลือกภูมิภาค',
    noactivity: 'ไม่มีงานอีเว้นท์ที่คุณค้นหา',
    clickhere: 'กลับไปเซตติ้ง Filter',
    selectregion: 'กรุณาเลือกภูมิภาค',
  },
  activity: {
    place: 'สถานที่',
    register_date: 'วันที่เปิดรับสมัคร',
    actual_date: 'วันงาน',
    fee: 'ค่าสมัคร',
    bath: 'บาท',
    detail: 'รายละเอียด และกำหนดการ',
    gifts: 'ของที่ระลึก',
    shirt_style: 'สไตส์เสื้อ',
    rule: 'รางวัล',
    moredetail: 'รายละเอียดเพิ่มเติม',
    apply: 'สมัคร',
    findfriend: 'ค้นหาเพื่อนร่วมทริป',
    payment: 'การชำระ',
    checkin: 'เช็คอิน',
    checkout: 'เช็คเอ้าท์',
    rules: 'กฎ',
    course: 'คอร์สวิ่ง',
    size: 'ไซส์',
    address: 'ที่อยู่จัดส่ง',
    emergency: 'การติดต่อฉุกเฉิน',
    accept: 'ยอมรับ',
    conditionandterms: 'เงื่อนไข และข้อตกลง',
    accepted: 'ฉันได้อ่าน และยอมรับข้อตกลง และเงื่อนไขการลงแข่งขัน',
    addemergency: 'กรุณาเพิ่มการติดต่อฉุกเฉิก',
    addaddress: 'กรุณาเพิ่มที่อยู่',
    clickhere: 'กดที่นี่',
    atevent: 'ที่จัดงานอีเว้นท์',
    contestno: 'หมายเลขเข้าแข่งขัน',
    noannouncement: 'ยังไม่มีประกาศ',
    readmore: 'อ่านเพิ่มเติม',
    announcement: 'ประกาศ',
    edit: 'แก้ไขการสมัคร',
    pleaseacceptterm: 'กรุณายอมรับเงื่อนไขและข้อตกลง',
    editregister: 'แก้ไขการลงทะเบียน',
    register: 'สมัคร',
    noaddresses: 'ไม่มีที่อยู่จัดส่ง',
    pleaseaddaddresses: 'กรุณาเพิ่มที่อยู่จัดส่ง',
    okay: 'ตกลง',
    pleaseaddemergency: 'กรุณาเพิ่มการติดต่อฉุกเฉิน',
    noemergency: 'ไม่มีข้อมูลการติดต่อฉุกเฉิน',
    registersuccessed: 'การลงทะเบียนเรียบร้อย กรุณาดำเนินการชำระ',
    transaction: 'การชำระ',
    date: 'วันที่',
    time: 'เวลา',
    amount: 'จำนวนเงิน',
    notransfer: 'ยังไม่มีการชำระ',
    noactivity: 'ยังไม่มีงานอีเว้นท์ใหม่',
    noverified: 'คุณยังไม่ได้ยืนยันตัวตน',
    pleaseverify: 'กรุณายืนยันตัวตน',
    selectaddress: 'กรุณาเลือกที่อยู่จัดส่ง',
    selectemergency: 'กรุณาเลือกการติดต่อฉุกเฉิน',
    selectcourse: 'กรุณาเลือกประเภทวิ่ง',
    selectsize: 'กรุณาเลือกไซส์เสื้อ',
  },
  payment: {
    activity: 'งานอีเว้นท์',
    course: 'ประเภทวิ่ง',
    size: 'ไซส์เสื้อ',
    fee: 'ค่าสมัคร',
    emsfee: 'ค่าส่ง',
    total: 'ทั้งหมด',
    baht: 'บาท',
    confirm: 'ยืนยันการลงทะเบียน',
    warning1: 'ท่านสามารถสแกน Qrcode เพื่อชำระเงินผ่านระบบ Promtpay ได้ทุกชนิด',
    warning2: 'หากต้องการชำระเงินทางอื่น กรุณาติดต่อ Admin ทาง',
    warning3: 'Ramble Line OA กดที่นี่',
    back: 'กลับสู่หน้าหลัก',
  },
  addaddress: {
    title: 'เพิ่มที่อยู่ใหม่',
    edittitle: 'แก้ไขที่อยู่',
    add: 'เพิ่ม',
    address: 'ที่อยู่',
    province: 'จังหวัด',
    zip: 'รหัสไปรษณีย์',
    phone: 'เบอร์โทรศัพท์',
    error: 'กรุณาใส่ข้อมูลให้ครบถ้วน',
    edit: 'แก้ไข',
    success: 'เพิ่มที่อยู่เรียบร้อย',
    editsuccess: 'แก้ไขที่อยู่เรียบร้อย',
    addressno: 'บ้านเลขที่',
    district: 'อำเภอ',
    subdistrict: 'ตำบล',
  },
  addemergencycontact: {
    title: 'เพิ่มข้อมูลติดต่อฉุกเฉิน',
    add: 'เพิ่ม',
    name: 'ชื่อ',
    phone: 'เบอร์โทรศัพท์',
    relationship: 'ความสัมพันธ์',
    error: 'กรุณาใส่ข้อมูลให้ครบถ้วน',
    success: 'เพิ่มข้อมูลติดต่อฉุกเฉินเรียบร้อย',
    editsuccess: 'แก้ไขข้อมูลติดต่อฉุกเฉินเรียบร้อย',
    edit: 'แก้ไข',
    edittitle: 'แก้ไขข้อมูลติดต่อฉุกเฉิน',
  },
  emergencycontact: {
    name: 'ขื่อ',
    relationship: 'ความสัมพันธ์',
    phone: 'เบอร์โทรศัพท์',
    noemrgencycontact: 'ยังไม่ได้เพิ่มการติดต่อฉุกเฉิน',
  },
  address: {
    phone: 'เบอร์โทรศัพท์',
    confirmremove: 'ลบที่อยู่',
    confirmremovedetail: 'คุณต้องการจะลบที่อยู่ใช่หรือไม่',
    confirm: 'ยืนยัน',
    cancel: 'ยกเลิก',
    noaddress: 'ยังไม่ได้เพิ่มที่อยู่',
  },
  profile: {
    time: 'เวลา',
    distance: 'ระยะทาง',
    average: 'เฉลี่ย',
    activity: 'งานอีเว้นท์',
    activityunit: 'งาน',
    km: 'กม.',
  },
  qrcodescanner: {
    activityidincorrect: 'Qr Code ไม่ถูกต้อง',
    pleasetryagain: 'กรุณาลองอีกครั้ง',
    cancel: 'ยกเลิก',
    tryagain: 'ลองอีกครั้ง',
  },
  coupon: {use: 'ใช้คูปอง'},
  promoteactivity: {detail: 'ข้อมูลเพิ่มเติม'},
  history: {
    noactivity: 'คุณยังไม่มีประวัติงานอีเว้นท์',
  },
  upcoming: {
    noactivity: 'คุณยังไม่มีงานอีเว้นท์ใหม่',
  },
  uploadpicture: {
    uploadPhoto: 'อัพโหลดรูปภาพ',
    choosePhoto: 'เลือกรูปภาพโปรไฟล์',
    takePhoto: 'ถ่ายภาพ',
    chooseLibrary: 'เลือกจากคลัง',
    cancel: 'ยกเลิก',
  },
  userpost: {
    nopost: 'ไม่เจอโพสต์ใหม่',
  },
  editprofile: {
    changepassword: 'เปลี่ยนรหัสผ่าน',
    oldpassword: 'รหัสผ่านเดิม',
    newpassword: 'รหัสผ่านใหม่',
    confirmpassword: 'ยืนยันรหัสผ่านใหม่',
    oldpasswordisincorrect: 'รหัสผ่านเดิมไม่ถูกต้อง',
    changepasswordsuccess: 'เปลี่ยนรหัสผ่านสำเร็จ',
    sucessed: 'เปลี่ยนสำเร็จ',
    imageuploadsuccessed: 'เปลี่ยนรูปภาพเรียบร้อย',
    first_name: 'ชื่อ',
    last_name: 'นามสกุล',
    displayname: 'Display Name',
    phone_number: 'เบอร์โทรศัพท์',
    lineconnect: 'เชื่อมต่อ Line',
    changelineconnect: 'เปลี่ยน Line Account',
    notverifiedidentity: 'ยืนยันตัวตน',
    verifiedidentity: 'ยืนยันตัวตนแล้ว',
    notverifiedvaccine: 'ยืนยันการฉีดวัคซีน',
    verifiedvaccine: 'ยืนยันการฉีดวัคซีนแล้ว',
    sendinfo: 'ส่งข้อมูล',
    idcard: 'รหัสบัตรประจำตัวประชาชน',
    idcardlengthincorret: 'กรุณากรอกรหัสบัตรประชาชน 13 หลัก',
    pleasecheck: 'กรุณาตรวจสอบ',
    okay: 'ตกลง',
    passport: 'หมายเลขหนังสือเดินทาง',
    uploadpicture: 'กรุณาเลือกรูป',
    verifying: 'กำลังตรวจสอบ',
    rejected: 'ยืนยันตัวตนอีกครั้ง',
    sentinformation: 'ส่งข้อมูลเรียบร้อย',
    rejectedvaccine: 'ยืนยันการฉีดวัคซีนอีกครั้ง',
    vaccinedoc: 'รูปเอกสาร หรือใบเสร็จยืนยันการฉีดวัคซีน Covid-19',
  },
  lineconnect: {
    successed: 'เชื่อมต่อ Line สำเร็จ',
    failed: 'การเชื่อมต่อกับ Line ล้มเหลว',
    lineisused: 'Line account นี้ได้ถูกเชื่อมต่อแล้ว',
    lineisconnected: 'คุณได้เชื่อมต่อ Line account นี้แล้ว',
  },
  share: {
    interest: 'ฉันสนใจที่จะเข้าร่วมงานอีเว้นท์',
  },
  userrecord: {
    year: 'ปี',
    activity: 'งานอีเว้นท์',
    work: 'งาน',
    distance: 'ระยะทาง',
    km: 'กม.',
  },
  setting: {
    aboutramble: 'เกี่ยวกับ Ramble',
  },
};

export default th;
