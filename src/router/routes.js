import store from '@/store/index'
import { lazyload, generaMenu } from '@/util'

const routes = [
    // {
    //     path: '/',
    //     name: 'index',
    //     meta: {
    //         title: '绑定手机号'
    //     },
    //     component: lazyload('bindPhone')
    // },
    {
        path: '/start',
        name: 'start',
        meta: {
            title: '开始'
        },
        component: lazyload('start')
    },{
        path: '/bindPhone',
        name: 'bindPhone',
        meta: {
            title: '绑定手机号'
        },
        component: lazyload('bindPhone')
    },{
        path: '/serviceTerm',
        name: 'serviceTerm',
        meta: {
            title: '服务条款'
        },
        component: lazyload('serviceTerm')
    },{
        path: '/4-1-1',
        name: '4-1-1',
        meta: {
            title: '就诊人列表'
        },
        component: lazyload('4-1-1')
    },{
        path: '/4-2',
        name: '4-2',
        meta: {
            title: '绑定就诊人'
        },
        component: lazyload('4-2')
    },{
        path: '/nationSelect',
        name: 'nationSelect',
        meta: {
            title: '选择民族'
        },
        component: lazyload('nationSelect')
    },{
        path: '/hospitalSelect',
        name: 'hospitalSelect',
        meta: {
            title: '选择院区'
        },
        component: lazyload('hospitalSelect')
    },
    {
        path: '/patientInfo',
        name: 'patientInfo',
        meta: {
            title: '就诊人信息'
        },
        component: lazyload('patientInfo')
    },{
        path: '/6-1-1',
        name: '6-1-1',
        meta: {
            title: '就诊记录'
        },
        component: lazyload('6-1-1')
    },
    {
        path: '/6-1-2/:orderId/:userId',
        name: '6-1-2',
        meta: {
            title: '就诊详情'
        },
        component: lazyload('6-1-2')
    },
    {
        path: '/6-3',
        name: '6-3',
        meta: {
            title: '诊断结果'
        },
        component: lazyload('6-3')
    },
    {
        path: '/dynamicOnPhone',
        name: 'dynamicOnPhone',
        meta: {
            title: '微官网'
        },
        component: lazyload('dynamicOnPhone')
    },
  {
    path: '/payConfirm',
    name: 'payConfirm',
    meta: {
      title: '订单明细'
    },
    component: lazyload('payConfirm')
  },
  {
    path: '/payNow',
    name: 'payNow',
    meta: {
      title: '预约信息'
    },
    component: lazyload('payNow')
  },
    {
        path: '/reportIndex',
        name: 'reportIndex',
        meta: {
            title: '选择就诊人'
        },
        component: lazyload('viewReport/reportIndex')
    },
    {
        path: '/reportList',
        name: 'reportList',
        meta: {
            title: '报告单列表'
        },
        component: lazyload('viewReport/reportList')
    },
    {
        path: '/checkList',
        name: 'checkList',
        meta: {
            title: '检验单'
        },
        component: lazyload('viewReport/checkList')
    },
    {
        path: '/inspectList',
        name: 'inspectList',
        meta: {
            title: '检查单'
        },
        component: lazyload('viewReport/inspectList')
    },
    {
        path: '/imageList',
        name: 'imageList',
        meta: {
            title: '影像单'
        },
        component: lazyload('viewReport/inspectList')
    },
    {
        path: '/microorganism',
        name: 'microorganism',
        meta: {
            title: '微生物单'
        },
        component: lazyload('viewReport/microorganism')
    },
    {
        path: '/errMsg',
        name: 'errMsg',
        meta: {
            title: '发生错误了'
        },
        component: lazyload('errMsg')
    },
    // {
    //     path: '/1-1-6',
    //     name: 'selectHospital',
    //     meta: {
    //         title: '选择院区'
    //     },
    //     component: lazyload('selectHospital/selectHospital')
    // },{
    //     path: '/1-2-1',
    //     name: 'appointNotice',
    //     meta: {
    //         title: '预约须知'
    //     },
    //     component: lazyload('appointNotice/appointNotice')
    // },{
    //     path: '/1-3-1',
    //     name: 'appointType',
    //     meta: {
    //         title: '预约类型',
    //     },
    //     component: lazyload('appointType/appointType')
    // },{
    //     path: '/1-4-1',
    //     name: 'outPatientType',
    //     meta: {
    //         title: '门诊类型'
    //     },
    //     component: lazyload('outPatientType/outPatientType')
    // },{
    //     path: '/1-5-4',
    //     name: 'sectionSelect',
    //     meta: {
    //         title: '选择科室'
    //     },
    //     component: lazyload('section/sectionSelect')
    // },{
    //     path: '/1-6-1',
    //     name: 'visitTime',
    //     meta: {
    //         title: '就诊时间'
    //     },
    //     component: lazyload('visitTime/visitTime')
    // },{
    //     path: '/1-7-4',
    //     name: 'doctorSelect',
    //     meta: {
    //         title: '选择医生'
    //     },
    //     component: lazyload('doctor/doctorSelect')
    // },{
    //     path: '/1-8-1',
    //     name: 'timePeriod',
    //     meta: {
    //         title: '就诊时段'
    //     },
    //     component: lazyload('timePeriod/timePeriod')
    // },{
    //     path: '/1-9-5',
    //     name: 'appointInfo',
    //     meta: {
    //         title: '预约信息'
    //     },
    //     component: lazyload('appointInfo/appointInfo')
    // }
]

// generaMenu(routes, store.state.flowRouters)

export {
    routes
}
