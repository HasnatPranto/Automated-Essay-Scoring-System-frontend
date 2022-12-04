export enum api{
  baseUrl = "http://127.0.0.1:5000/api/",
  signin ="auth/signin",
  signup = "auth/signup",
  create_assessment = "assessor/create_assessment",
  running_assessments = "assessor/running_assessments",
  completed_assessments = "assessor/completed_assessments",
  search_assessment = "student/valid_assessment",
  enlist = "student/assessment_enlistment",
  enlisted_assessments = "student/assessments_enlisted",
  submit_assessment = "student/assessment_submission",
  enlisted_students = "evaluation/enlisted_students"
}
