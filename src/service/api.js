import axios from 'axios'
// let BaseUrl = 'http://192.168.2.40:30000/';
// 测试
// let BaseUrl = 'http://test.wfw.zwjk.com/';
// let BaseUrl = URL_CONFIG.backendBaseUrl;
export const appid = 'wxe130160f55f1d0da';

export const apiurl = {
    // 微信授权，登录，绑定
    OauthStatus:'user/thirdapp/oauthstatus',    //第三方用户检测授权状态，授权通过的话，会返回用户信息：昵称、头像
    GetPictureCode:'user/picturecode',     //获取图片验证码
    GetValidateCode:'user/thirdapp/validatecode',    //获取短信验证码
    BindPhone:'user/thirdapp/bindphone',       // 绑定手机号
    AuthPublic:'wechat/auth/publicService',  //微信
    verifyMessageCode:'user/thirdapp/verifyMessageCode',//校验短信验证码
    // 预约挂号
    GetFlowConfig:'config/getUcUiFlowByPhIdAndUseTypeFlow',  //获取页面流配置
    GetPageComptConfig:'config/getViewUiconfigList?ucUiFlowId=e49f5778-12b5-11e7-aceb-507b9d24b9d1&stepId=bindPatientVisit', //页面项目组件配置
    GetHospitalList:'appointment/export/ui/branch/list_1_1_1', // 获取院区数据
    GetAppointNotice:'appointment/export/ui/reservation/explain_1_2_1', // 获取预约须知
    GetSectionList:'appointment/export/ui/dept/list_1_5_4', // 获取科室列表
    GetPatientVisitList:'/export/ui/patientVisits/getPatientVisitList',  // 就诊人列表
    GetVisitTime:'appointment/export/ui/clinic/date_1_6_1',  //获取排班时间
    GetDoctorsList:'appointment/export/ui/doct/list_1_7_4',  //获取排班医生
    GetVisitPeriod:'appointment/export/ui/clinic/time_1_8_1',  //获取排班时段
    GetPeriodIndexList:'appointment/export/ui/appointment/style_1_9_5',  //获取预约信息页面排班时段/序号列表
    PostAppointmentInfo:'appointment/export/ui/confirm/appointment/1_9_5',//确认预约
    GetInfoYYok:'appointment/export/ui/appointment/end_1_12_1',//获取预约成功后的数据
    // 就诊人管理
    GetPatientVisitList:'/patient/export/ui/patientVisits/getPatientVisitList',  // 获取就诊人列表
    bindPatient:'/patient/export/ui/patientVisits/bind',  // 绑定就诊人
    GetPatientInfo:'patient/export/ui/patientVisits/getPatientVisit',  //获取就诊人信息
    updatePatientInfo:'patient/export/ui/patientVisits', //添加或修改就诊人
    DeletePatient:'patient/export/ui/patientVisits/getPatientVisit',//删除就诊人
    getViewUiconfigList:'config/getViewUiconfigList',//动态配置新增就诊人项
    cardNumber:'patient/export/ui/patientVisits/cardNumber',//获取卡号列表
    
    //就诊人记录
    PatientOrderListBySyuserId:'patientorder/export/ui/patientOrder/PatientOrderListBySyuserId',//获取就诊记录列表
    GetPatientVisitList:'patient/export/ui/patientVisits/getPatientVisitList',  // 获取就诊人列表
    bindPatient:'patient/export/ui/patientVisits/bind',  // 绑定就诊人
    getViewUiconfigList:'config/getViewUiconfigList',//页面项目配置
    getPatientOrder:'patientorder/export/patientOrderVisit/getPatientOrder',//获取就诊记录详情
    cancelRegister:'patientorder/export/ui/ptientClinic/cancelRegister',//取消预约
    
    //查询报告单
    getReportlist:'patientorder/export/ui/report/list/',//报告单列表
    getReportDetail:'patientorder/export/ui/report/',//报告单详情
    
}