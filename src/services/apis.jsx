const BASE_URL = process.env.REACT_APP_BASE_URL

export const categories = {
    CATEGORIES_API: BASE_URL + "/course/getallcategory"
}

export const endpoints = {
    RESETPASSTOKEN_API: BASE_URL + "/profile/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/profile/reset-password",
    SENDOTP_API: BASE_URL + '/auth/sendotp',
    SIGNUP_API: BASE_URL + '/auth/signup',
    LOGIN_API: BASE_URL + '/auth/login',
    CHANGEPASSWORD_API: BASE_URL + "/auth/changepassword"
}

export const profile = {
    UPDATEPROFILE_API: BASE_URL + "/profile/updateprofile",
    UPDATEDISPLAYPICTURE_API: BASE_URL + "/profile/updatedisplaypicture",
    DELETEACCOUNT_API: BASE_URL + "/profile/deleteaccount",
    GET_ENROLLED_COURSES_DETAILS_API: BASE_URL + "/profile/getenrolledcourses",
    GET_INSTRUCTOR_DASHBOARD_DETAILS: BASE_URL + '/profile/instructordashboard'
}

export const course = {
    CREATE_COURSE_API: BASE_URL + '/course/createcourse',
    GET_INSTRUCTOR_COURSES_DETAILS_API: BASE_URL + "/course/getallcourses",
    DELETE_COURSE_API: BASE_URL + '/course/deletecourse',
    UPDATE_COURSE_API: BASE_URL + '/course/updatecourse',
    GET_ALL_COURSE_DETAILS_API: BASE_URL + '/course/getalldetails'
}

export const section = {
    CREATE_SECTION_API: BASE_URL + '/course/createsection',
    UPDATE_SECTION_API: BASE_URL + '/course/updatesection',
    DELETE_SECTION_API: BASE_URL + '/course/deletesection/:sectionId/:courseId',
    DELETE_SUB_SECTION_API: BASE_URL + '/course/deletesubsection/:subSectionId/:sectionId',
    CREATE_SUB_SECTION_API: BASE_URL + '/course/createsubsection',
    UPDATE_SUB_SECTION_API: BASE_URL + '/course/updatesubsection'
}

export const category = {
    GET_ALL_CATEGORY_DETAILS: BASE_URL + '/course/getpagedetails'
}

export const studentFeatures = {
    CAPTURE_PAYMENT_API: BASE_URL + '/payment/capturepayment',
    VERIFY_PAYMENT_API: BASE_URL + '/payment/verifypayment',
    SEND_SUCCESSFULL_PAYMENT_RESPONSE_API: BASE_URL + '/payment/sendsuccessfulpaymentemail',
    CREATE_RATING_AND_REVIEW_API: BASE_URL + '/auth/createrating'
}

export const ratingAndReview = {
    LECTURE_COMPLETION_API: BASE_URL + '/course/updatecourseprogress',
    GET_ALL_RATINGS_AND_REVIEWS: BASE_URL + '/auth/getallreview',
    GET_COURSE_SPECIFIC_RATINGS: BASE_URL + '/auth/getcoursespecificrating'
}