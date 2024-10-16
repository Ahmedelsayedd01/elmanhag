import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";

import App from "./App";

import {
  Curricula,
  Duties,
  LiveClasses,
  MonthsReviews,
  FinalReviews,
  SolveExams,
  DashboardAD,
  RevisionAD,
  ExamsAD,
  LiveLayout,
  AddLiveLayout,
  EditLiveLayout,
  NoticeBoardAD,
  BundlesEducationLayout,
  CategoriesEducationLayout,
  SubjectEducationLayout,
  QuestionsBankLayout,
  AddStudentpage,
  AdminRolesLayout,
  AddCountryLayout,
  EditCountryLayout,
  CountriesLayout,
  ParentRelationLayout,
  AddParentRelationLayout,
  EditParentRelationLayout,
  AddCityLayout,
  EditCityLayout,
  CitiesLayout,
  AddCategoryLayout,
  OperationsLayout,
  PaymentMethodLayout,
  AddPaymentMethodLayout,
  EditPaymentMethodLayout,
  AddSubjectLayout,
  EditSubjectLayout,
  ChapterSubjectLayout,
  StudentsSubjectLayout,
  AddBundlesLayout,
  EditBundlesLayout,
  StudentsBundlesLayout,
  AddChapterLayout,
  EditChapterLayout,
  HomeWorkLayout,
  AddHomeWorkLayout,
  EditHomeWorkLayout,
  AddLessonLayout,
  EditLessonLayout,
  MaterialLessonLayout,
  DiscountLayout,
  AddDiscountLayout,
  EditDiscountLayout,
  PromoCodeLayout,
  AddPromoCodeLayout,
  EditPromoCodeLayout,
  ReviewLayout,
  PopUpLayout,
  AddPopUpLayout,
  EditPopUpLayout,
  EditReviewLayout,
  AffiliateUserLayout,
  AddAffiliateUserLayout,
  EditAffiliatePaymentMethodLayout,
  AddAffiliatePaymentMethodLayout,
  AffiliatePaymentMethodLayout,
  AffiliateCommissionsLayout,
  FinancialPendingPaymentsLayout,
  FinancialPaymentsLayout,
  UnitsLayout,
  LayoutStudent,
  AffiliateBonusLayout,
  AffiliatePayoutLayout,
  SubscriptionsLayout,
  My_SubscriptionsLayout,
  SubscriptionsPaymentLayout,
  AllPlansLayout,
  PaymentMethodDetailsLayout,
  LessonsLayout,
  ProfileStudent,
  ComplaintLayout,
  AddAffiliateBonusLayout,
  EditAffiliateBonusLayout,
  AddTeacherUserLayout,
  EditTeacherUserLayout,
  AffilateStudentLayout,
  ReportsAD,
  ComplaintsLayout,
  SuggestionsLayout,
  EditAdminRolesLayout,
  AddAdminRolesLayout,
  AdminUserLayout,
  AddAdminUserLayout,
  EditAdminUserLayout,
  QuestionIssuesLayout,
  AddQuestionIssuesLayout,
  EditQuestionIssuesLayout,
  VideoIssuesLayout,
  AddVideoIssuesLayout,
  EditVideoIssuesLayout
} from "./Layouts/AllLayouts";

import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import SidebarSuperAdmin from "./Components/SidebarSuperAdmin";

import SidebarAdmin from "./Components/SidebarAdmin";

import SidebarTeacher from "./Components/SidebarTeacher";
import SidebarAffiliate from "./Components/SidebarAffiliate";
import SidebarParent from "./Components/SidebarParent";
import SidebarStudent from "./Components/SidebarStudent";


// import HeaderStudent from "./Components/HeaderStudent";

import { createContext } from "react";

import LoginUser from "./Pages/RegisterPage/LoginUser";
import SignUpPage from "./Pages/RegisterPage/SignUpPage";

import {
  AddLiveUpcomingPage,
  AffilatePage,
  ComplaintsHistoryPage,
  ComplaintsPage,
  DownloadMobilePage,
  EditLiveUpcomingPage,
  HomePage,
  LiveUpcomingPage,
  LoginHistoryPage,
  ParentDashboardPage,
  ParentPage,
  PayoutHistoryPage,
  PayoutPendingPage,
  ProfilePage,
  ProgressPage,
  PurchasesPage,
  SuggestionsHistoryPage,
  SuggestionsPage,
  TeacherPage
} from "./Pages/AllPages";

import HeaderHome from "./Components/HeaderHome";
import FooterHome from "./Components/FooterHome";
import LevelsPage from "./Pages/LevelsPage/LevelsPage";
import AboutUsPage from "./Pages/AboutUsPage/AboutUsPage";
import ConectUsPage from "./Pages/ConectUsPage/ConectUsPage";

import { ContextProvider } from "./Context/Auth";
import ProtectedRoute from "./Protected Data/ProtectedRoute";
import Unauthorized from "./Pages/Unauthorized/Unauthorized";
import ProtectedLogin from "./Protected Data/ProtectedLogin";
import Authentication from "./Pages/RegisterPage/Authentication";
import ForgetPass from "./Pages/RegisterPage/ForgetPass";
import LoginAdmin from "./Pages/RegisterPage/LoginAdmin";
import User from "./Layouts/User/User";
import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";
import StudentUser from "./Layouts/Admin/StudentUser";
import TeacherUserLayout from "./Layouts/Admin/TeacherUserLayout";
import ParentUser from "./Layouts/Admin/ParentUser";
import AdminUser from "./Layouts/Admin/AdminUserLayout";
import LayoutAdmin from "./Layouts/Admin/LayoutAdmin";
import EditProfilePage from "./Layouts/Admin/EditeProfileStudent";
import EditCategoryLayout from "./Layouts/Admin/EditCategoryLayout";
import NavbarStudent from "./Components/NavbarStudent";
import SignUpAffiliatePage from "./Pages/RegisterPage/SignUpAffilatePage";
import EditAffiliateUserLayout from "./Layouts/Admin/EditAffiliateUserLayout";
import AddQuestionLayout from "./Layouts/Admin/AddQuestionLayout";
import EditQuestionLayout from "./Layouts/Admin/EditQuestionLayout";
import QuestionLayout from "./Layouts/Admin/QuestionLayout";
import Complaint from "./Pages/Student/Complaint/ComplaintPage";
import EditProfileStudentLayout from "./Layouts/Student/EditProfileStudentLayout";
import LiveHistoryPage from "./Pages/Admin/LivePage/History/LiveHistoryPage";

export const ContextNumper = createContext()
const AppLayoutAuthentication = () => (
  <>
    <Outlet />
  </>
);
const AppLayoutForgetPass = () => (
  <>
    <ForgetPass />
  </>
);
const AppLayoutHomePage = () => (
  <>
    <div className="flex flex-col">
      <HeaderHome />
      <Outlet />
      <FooterHome />
    </div>
  </>
);
const AppLayoutAdmin = () => (
  <>
    <LayoutAdmin />
  </>
);
/* User */
// Students
const AppLayoutStudentUser = () => (
  <>
    <Outlet />
  </>
);

const AppLayoutStudentAdd = () => (
  <>
    <AddStudentpage />
  </>
);
const AppLayoutStudentProfile = () => (
  <>
    <EditProfilePage />
  </>
);
// Teachers
const AppLayoutTeachersUser = () => (
  <>
    <Outlet />
  </>
);

const AppLayoutTeacherAdd = () => (
  <>
    <AddTeacherUserLayout />
  </>
);
const AppLayoutTeacherEdit = () => (
  <>
    <EditTeacherUserLayout />
  </>
);
// Admin User
const AppLayoutAdminUser = () => (
  <>
    <Outlet />
  </>
);


/* Education */
const AppLayoutCategories = () => (
  <>
    {/* <div className="flex flex-col items-center gap-y-4"> */}
    <Outlet />
    {/* </div> */}
  </>
);
const AppLayoutSubject = () => (
  <>
    <Outlet />
  </>
);
const AppLayoutChapterAdd = () => (
  <>
    <Outlet />
  </>
);
/* Home Work */
const AppLayoutHomeWork = () => (
  <>
    <Outlet />
  </>
);
const AppLayoutBundles = () => (
  <>
    <Outlet />
  </>
);
const AppLayoutQuestionsBank = () => (
  <>
    <Outlet />
  </>
);

/* Live */
const AppLayoutLive = () => (
  <>
    {/* <Outlet /> */}
    <LiveLayout />
  </>
);
/* Marketing */
const AppLayoutMarketing = () => (
  <>
    <Outlet />
  </>
);
const AppLayoutPromoCode = () => (
  <>
    <Outlet />
  </>
);
const AppLayoutReview = () => (
  <>
    <Outlet />
  </>
);
const AppLayoutPopUp = () => (
  <>
    <Outlet />
  </>
);
/* Affiliate */
const AppLayoutAffilate = () => (
  <>
    <Outlet />
  </>
);
/* Support */
const AppLayoutSupport = () => (
  <>
    <Outlet />
  </>
);
const AppLayoutAffilatePaymentMethod = () => (
  <>
    <Outlet />
  </>
);
const AppLayoutAffilateCommissions = () => (
  <>
    <Outlet />
  </>
);
const AppLayoutAffilateBonus = () => (
  <>
    <Outlet />
  </>
);
const AppLayoutAffilatePayout = () => (
  <>
    <Outlet />
  </>
);
/* Setting */
const AppLayoutAdminRoles = () => (
  <>
    <Outlet />
  </>
);
const AppLayoutCountries = () => (
  <>
    <Outlet />
  </>
);
const AppLayoutCities = () => (
  <>
    <Outlet />
  </>
);
const AppLayoutParentRelation = () => (
  <>
    <Outlet />
  </>
);
const AppLayoutOperations = () => (
  <>
    <Outlet />
  </>
);
const AppLayoutPaymentMethod = () => (
  <>
    <Outlet />
  </>
);

// Question Issues
const AppLayoutQuestionIssues = () => (
  <>
    <Outlet />
  </>
);
// Video Issues
const AppLayoutVideoIssues = () => (
  <>
    <Outlet />
  </>
);

/* Student Dashboard */
const AppLayoutStudentDashboard = () => (
  <>
    <LayoutStudent />
  </>
);
const AppLayoutCurricula = () => (
  <>
    <Outlet />
  </>
);

const AppLayoutUnit = () => (
  <>
    <Outlet />
  </>
);

const AppLayoutSubscriptions = () => (
  <>
    <Outlet />
  </>
)

const AppLayoutAffilateDashboard = () => (
  <div className="w-full flex gap-x-4 directionAR">
    {/* <SidebarStudent /> */}
    <div className=" w-full h-screen ">
      <NavbarStudent />
      <AffilatePage />
    </div>
    {/* <AffilatePage /> */}
    {/* <NavbarStudent />
      <AffilatePage /> */}
    {/* <Outlet /> */}
  </div>
);
const AppLayoutTeacherDashboard = () => (
  <div className="w-full flex gap-x-4 directionAR">
    {/* <SidebarStudent /> */}
    <div className=" w-full h-screen ">
      <NavbarStudent />
      <TeacherPage />
    </div>
    {/* <AffilatePage /> */}
    {/* <NavbarStudent />
      <AffilatePage /> */}
    {/* <Outlet /> */}
  </div>
);
const AppLayoutParentDashboard = () => (
  <div className="w-full flex gap-x-4 directionAR">
    <div className=" w-full h-screen ">
      <NavbarStudent />
      <ParentDashboardPage />
    </div>
  </div>
);

export const router = createBrowserRouter([
  {
    element: <AppLayoutHomePage />,
    path: "/",
    children: [
      {
        index: true, // This makes it the default route for "/"
        element: <HomePage />,
      },
      {
        path: "Levels",
        element: <LevelsPage />,
      },
      {
        path: "AboutUs",
        element: <AboutUsPage />,
      },
      {
        path: "ConectUs",
        element: <ConectUsPage />,
      },
    ],
  },
  /* Login Admin */
  {
    path: "/loginWego",
    element: <ProtectedLogin />,
    children: [
      {
        path: '',
        element: <LoginAdmin />,
      }
    ]
  },
  /* Login && SignUp User */
  {
    path: '/authentication',
    element: <ProtectedLogin />,
    children: [
      {
        path: '',
        element: <AppLayoutAuthentication />,
        children: [
          {
            path: '',
            element: <Authentication />,
            children: [
              {
                path: 'signup',
                index: true,
                element: <SignUpPage />,
              },
              {
                path: 'login',
                element: <LoginUser />,
              },
              {
                path: 'signup_affilate',
                element: <SignUpAffiliatePage />,
              },
            ]
          }
        ]
      }
    ]
  },
  /* Forget Password User */
  {
    path: '/forget_password',
    element: <ProtectedLogin />,
    children: [
      {
        path: '',
        element: <AppLayoutForgetPass />,
      },
    ],
  },
  /* Admin && Super Admin Dashboard */
  {
    element: <ProtectedRoute allowedRoles={['admin', 'supAdmin']} />,
    path: '/dashboard_admin',
    children: [
      {
        path: '',
        element: <AppLayoutAdmin />,
        children: [
          {
            path: 'student',
            // element: <StudentUser />,
            element: <AppLayoutStudentUser />,

            children: [
              {
                path: '',
                element: <StudentUser />,
              },
              {
                path: 'add',
                element: <AppLayoutStudentAdd />,
              },
              {
                path: 'edit/:profileStudentId',
                element: <AppLayoutStudentProfile />,
                children: [
                  {
                    index: true, // This will match the base '/edit' path
                    element: <Navigate to="profile" />, // Redirect to '/edit/profile'
                  },
                  {
                    path: 'profile',
                    element: <ProfilePage />,
                  },
                  {
                    path: 'parent',
                    element: <ParentPage />,
                  },
                  {
                    path: 'Purchases',
                    element: <PurchasesPage />,
                  },
                  {
                    path: 'Progress',
                    element: <ProgressPage />,
                  },
                  {
                    path: 'loginHistory',
                    element: <LoginHistoryPage />,
                  },
                ],
              }
            ]

          },
          {
            path: 'parent',
            element: <ParentUser />,
          },
          {
            path: 'teacher',
            element: <AppLayoutTeachersUser />,
            children: [
              {
                path: '',
                element: <TeacherUserLayout />
              },
              {
                path: 'add',
                element: <AppLayoutTeacherAdd />
              },
              {
                path: 'edit/:teacherId',
                element: <AppLayoutTeacherEdit />
              }
            ]
          },
          {
            path: 'admin',
            element: <AppLayoutAdminUser />,
            children: [
              {
                path: '',
                element: <AdminUserLayout />,
              },
              {
                path: 'add',
                element: <AddAdminUserLayout />,
              },
              {
                path: 'edit/:adminId',
                element: <EditAdminUserLayout />,
              },
            ],
          },
          {
            path: 'categories',
            element: <AppLayoutCategories />,
            children: [
              {
                path: '', // This defines the default route for "categories"
                element: <CategoriesEducationLayout />,
              },
              {
                path: 'add',
                element: <AddCategoryLayout />
              },
              {
                path: 'edit/:categoryId',
                element: <EditCategoryLayout />
              }

            ]
          },
          {
            path: 'subject',
            element: <AppLayoutSubject />,
            children: [
              {
                path: '',
                element: <SubjectEducationLayout />,
              },
              /* Add and Edit And show Students and Chapter Page */
              {
                path: 'add',
                element: <AddSubjectLayout />,
              },
              {
                path: 'edit/:subjectId',
                element: <EditSubjectLayout />,
              },
              {
                path: 'chapter/:subjectId',
                element: <AppLayoutChapterAdd />,
                children: [
                  {
                    path: '',
                    element: <ChapterSubjectLayout />,
                  },
                  {
                    path: 'add_chapter',
                    element: <AddChapterLayout />,
                  },
                  {
                    path: 'edit_chapter/:chapterID',
                    element: <EditChapterLayout />,
                  },
                  {
                    path: 'add_Lesson',
                    element: <AddLessonLayout />,
                  },
                  {
                    path: 'edit_lesson/:lessonID',
                    element: <EditLessonLayout />,
                  },
                  {
                    path: 'material_lesson/:lessonID',
                    element: <MaterialLessonLayout />,
                  },

                ],
              },
              {
                path: 'students/:subjectId',
                element: <StudentsSubjectLayout />,
              },
            ]
          },
          {
            path: 'bundles',
            element: <AppLayoutBundles />,
            children: [
              {
                path: '', // Default route for "bundles"
                element: <BundlesEducationLayout />,
              },
              {
                path: 'add',
                element: <AddBundlesLayout />,
              },
              {
                path: 'edit/:bundleId',
                element: <EditBundlesLayout />,
              },
              {
                path: 'students/:bundleId',
                element: <StudentsBundlesLayout />,
              },
            ]
          },
          {
            path: 'questionsbank',
            element: <AppLayoutQuestionsBank />,
            children: [
              {
                path: '',
                element: <QuestionsBankLayout />,
              },
              {
                path: 'add',
                element: <AddQuestionLayout />,
              },
              {
                path: 'edit/:questionId',
                element: <EditQuestionLayout />,
              },
              {
                path: 'question/:questionId',
                element: <QuestionLayout />,
              }
            ]
          }
          ,
          {
            path: 'homework',
            // element: <HomeWorkLayout />,
            element: <AppLayoutHomeWork />,
            children: [
              {
                path: '',
                element: <HomeWorkLayout />
              },
              {
                path: 'add',
                element: <AddHomeWorkLayout />
              },
              {
                path: 'edit/:homeWorkId',
                element: <EditHomeWorkLayout />
              },
            ]
          },
          {
            path: 'revision',
            element: <RevisionAD />,
          },
          {
            path: 'exams',
            element: <ExamsAD />,
          },
          {
            path: 'live',
            element: <AppLayoutLive />,
            children: [
              {
                path: 'upcoming',
                element: <LiveUpcomingPage />,
              },
              {
                path: 'upcoming/add',
                element: <AddLiveUpcomingPage />
              },
              {
                path: 'upcoming/edit/:liveId',
                element: <EditLiveUpcomingPage />
              },
              {
                path: 'history',
                element: <LiveHistoryPage />,
              },
            ]
          },
          /* Marketing */
          {
            path: 'discount',
            element: <AppLayoutMarketing />,
            children: [
              {
                path: '',
                element: <DiscountLayout />,
              },
              {
                path: 'add',
                element: <AddDiscountLayout />,
              },
              {
                path: 'edit/:discountId',
                element: <EditDiscountLayout />,
              }
            ]
          },
          {
            path: 'promo_code',
            element: <AppLayoutPromoCode />,
            children: [
              {
                path: '',
                element: <PromoCodeLayout />,
              },
              {
                path: 'add',
                element: <AddPromoCodeLayout />,
              },
              {
                path: 'edit/:promoCodeId',
                element: <EditPromoCodeLayout />,
              }
            ]
          },
          {
            path: 'review',
            element: <AppLayoutReview />,
            children: [
              {
                path: '',
                element: <ReviewLayout />,
                children: [
                  {
                    path: 'edit/:marketingId',
                    element: <EditReviewLayout />,
                  }
                ]
              },
            ]
          },
          {
            path: 'pop_up',
            element: <AppLayoutPopUp />,
            children: [
              {
                path: '',
                element: <PopUpLayout />,
                children: [
                  {
                    path: 'add',
                    element: <AddPopUpLayout />,
                  },
                  {
                    path: 'edit/:marketingId',
                    element: <EditPopUpLayout />,
                  }
                ]
              },
            ]
          },
          {
            path: 'financial_pending_Payments',
            element: <FinancialPendingPaymentsLayout />,
          },
          {
            path: 'financial_payments',
            element: <FinancialPaymentsLayout />
          },

          /* affiliate */
          {
            path: 'affiliate_user',
            element: <AppLayoutAffilate />,
            children: [
              {
                path: '',
                element: <AffiliateUserLayout />,
              },
              {
                path: 'add',
                element: <AddAffiliateUserLayout />,
              },
              {
                path: 'edit/:affiliateId',
                element: <EditAffiliateUserLayout />,
              },

            ]
          },
          {
            path: 'affiliate_Payment_method',
            element: <AppLayoutAffilatePaymentMethod />,
            children: [
              {
                path: '',
                element: <AffiliatePaymentMethodLayout />,
              },
              {
                path: 'add',
                element: <AddAffiliatePaymentMethodLayout />,
              },
              {
                path: 'edit/:paymentMethodId',
                element: <EditAffiliatePaymentMethodLayout />,
              },
            ]
          },
          {
            path: 'affiliate_commissions',
            element: <AppLayoutAffilateCommissions />,
            children: [
              {
                path: '',
                element: <AffiliateCommissionsLayout />,
              },
            ]
          },
          {
            path: 'affiliate_bonus',
            element: <AppLayoutAffilateBonus />,
            children: [
              {
                path: '',
                element: <AffiliateBonusLayout />,
              },
              {
                path: 'add',
                element: <AddAffiliateBonusLayout />,
              },
              {
                path: 'edit/:bonusId',
                element: <EditAffiliateBonusLayout />,
              },
            ]
          },
          {
            path: 'affiliate_payout',
            element: <AppLayoutAffilatePayout />,
            children: [
              {
                path: '',
                element: <AffiliatePayoutLayout />,
                children: [
                  {
                    index: true,
                    path: 'pending',
                    element: <PayoutPendingPage />
                  },
                  {
                    path: 'history',
                    element: <PayoutHistoryPage />
                  }
                ]
              },
            ]
          },
          /* Support */
          {
            path: 'support',
            element: <AppLayoutSupport />,
            children: [
              {
                path: 'complaints',
                element: <ComplaintsLayout />,
                children: [
                  {
                    index: true,
                    path: '',
                    element: <ComplaintsPage />
                  },
                  {
                    path: 'history',
                    element: <ComplaintsHistoryPage />
                  }
                ]
              },
              // {
              //   path: 'suggestions',
              //   element: <SuggestionsLayout />,
              //   children: [
              //     {
              //       index: true,
              //       path: '',
              //       element: <SuggestionsPage />
              //     },
              //     {
              //       path: 'history',
              //       element: <SuggestionsHistoryPage />
              //     }
              //   ]
              // },

            ]
          },
          {
            path: 'reports',
            element: <ReportsAD />,
          },
          /* Setting */
          // Admin Roles
          {
            path: 'adminRoles',
            element: <AppLayoutAdminRoles />,
            children: [
              {
                path: '',
                element: <AdminRolesLayout />,
              },
              {
                path: 'add',
                element: <AddAdminRolesLayout />,
              },
              {
                path: 'edit/:roleId',
                element: <EditAdminRolesLayout />,
              }
            ]
          },
          // Countries
          {
            path: 'countries',
            element: <AppLayoutCountries />,
            children: [
              {
                path: '',
                element: <CountriesLayout />,
              }
              ,
              {
                path: 'add',
                element: <AddCountryLayout />,
              }, {
                path: 'edit/:countryId',
                element: <EditCountryLayout />,

              }
            ]
          },
          // Cities
          {
            path: 'cities',
            element: <AppLayoutCities />,
            children: [
              {
                path: '',
                element: <CitiesLayout />,
              }
              ,
              {
                path: 'add',
                element: <AddCityLayout />,
              }, {
                path: 'edit/:cityId',
                element: <EditCityLayout />,

              }
            ]
          },
          // Parent Relation
          {
            path: 'parentRelation',
            element: <AppLayoutParentRelation />,
            children: [
              {
                path: '',
                element: <ParentRelationLayout />,
              },
              {
                path: 'add',
                element: <AddParentRelationLayout />,
              }, {
                path: 'edit/:parentRelationId',
                element: <EditParentRelationLayout />,

              }
            ]
          },
          // Operations
          {
            path: 'operations',
            element: <AppLayoutOperations />,
            children: [
              {
                path: '',
                element: <OperationsLayout />,
              }
            ]
          },
          // Payment Method
          {
            path: 'paymentMethod',
            element: <AppLayoutPaymentMethod />,
            children: [
              {
                path: '',
                element: <PaymentMethodLayout />,
              },
              {
                path: 'add',
                element: <AddPaymentMethodLayout />,
              },
              {
                path: 'edit/:PaymentMethodId',
                element: <EditPaymentMethodLayout />,
              }
            ]
          },
          //Question Issues
          {
            path: 'question_issues',
            element: <AppLayoutQuestionIssues />,
            children: [
              {
                path: '',
                element: <QuestionIssuesLayout />,
              },
              {
                path: 'add',
                element: <AddQuestionIssuesLayout />,
              },
              {
                path: 'edit/:questionIssuesId',
                element: <EditQuestionIssuesLayout />,
              }
            ]
          },
          //Viedo Issues
          {
            path: 'video_issues',
            element: <AppLayoutVideoIssues />,
            children: [
              {
                path: '',
                element: <VideoIssuesLayout />,
              },
              {
                path: 'add',
                element: <AddVideoIssuesLayout />,
              },
              {
                path: 'edit/:videoIssuesId',
                element: <EditVideoIssuesLayout />,
              }
            ]
          },
          {
            path: 'noticeboard',
            element: <NoticeBoardAD />,
          },
          {
            index: true,
            element: <DashboardAD />,
          },
        ],
      },
    ],
  },
  /* Signup coming soon student Dashboard */
  // {
  //   element: <ProtectedRoute allowedRoles={['studentSignup']} />,
  //   path: '/download',
  //   children: [
  //     {
  //       path: '',
  //       element: <DownloadMobilePage />,
  //     },
  //   ]
  // },
  /* Student Dashboard */
  {
    element: <ProtectedRoute allowedRoles={['student']} />,
    path: '/dashboard',
    children: [
      {
        path: '',
        element: <AppLayoutStudentDashboard />,
        children: [
          {
            path: '',
            element: <App />,
          },
          {
            path: "curricula",
            element: <AppLayoutCurricula />, // Add the JSX brackets
            children: [
              {
                path: '',
                element: <Curricula />,
              },
              {
                path: 'subject/:subject_Id',
                element: <AppLayoutUnit />,
                children: [
                  {
                    path: '',
                    element: <UnitsLayout />,
                  },
                  {
                    path: 'lesson/:lessonId',
                    element: <LessonsLayout /> // Add the component to render the lesson
                  }
                ]
              },
              // {
              //   path: 'lesson/:lessonId',
              //   element: <LessonsLayout /> // Add the component to render the lesson
              // }
            ]
          },
          {
            path: "duties",
            element: <Duties />,
          },
          {
            path: "live_classes",
            element: <LiveClasses />,
          },
          {
            path: "months_reviews",
            element: <MonthsReviews />,
          },
          {
            path: "final_reviews",
            element: <FinalReviews />,
          },
          {
            path: "solve_exams",
            element: <SolveExams />,
          },
          {
            path: "subscriptions",
            element: <AppLayoutSubscriptions />,
            children: [
              {
                path: '',
                element: <SubscriptionsLayout />,
              },
              {
                path: 'plans',
                element: <AllPlansLayout />,
              },
              {
                path: 'my_plans',
                element: < My_SubscriptionsLayout />,
              },
              {
                path: "plansMethod",
                element: <SubscriptionsPaymentLayout />,
              },
              {
                path: "method_details",
                element: <PaymentMethodDetailsLayout />,
              },

            ]
          },
          {
            path: "profile",
            element: <ProfileStudent />,
          },
          {
            path: "edit_profile",
            element: <EditProfileStudentLayout />,
          },
          {
            path: "complaint_suggestion",
            element: <ComplaintLayout />,
          },
          {
            path: "affilate_student",
            element: <AffilateStudentLayout />,
          },
        ],
      },
    ],
  },
  /* Parent Dashboard */
  {
    element: <ProtectedRoute allowedRoles={['parent']} />,
    children: [
      {
        path: '/dashboard_parent',
        element: <AppLayoutAffilateDashboard />,
      }
    ],
  },
  /* Affiliate Dashboard */
  {
    element: <ProtectedRoute allowedRoles={['affilate']} />,
    children: [
      {
        path: '/dashboard_affilate',
        element: <AppLayoutAffilateDashboard />,
      }
    ],
  },
  /* Teacher Dashboard */
  {
    element: <ProtectedRoute allowedRoles={['teacher']} />,
    children: [
      {
        path: '/dashboard_teacher',
        element: <AppLayoutTeacherDashboard />,
      }
    ],
  },

  /* Unauthorized Permission Page */
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  /* Not Found The Page */
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);