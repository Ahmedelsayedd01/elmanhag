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
  SupportAD,
  ReportsAD,
  NoticeBoardAD,
  BundlesEducationLayout,
  CategoriesEducationLayout,
  SubjectEducationLayout,
  QuestionsBankEducation,
  AddStudentpage,
  AdminRolesAD,
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
  LessonsLayout,
  ProfileStudent
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
  AffilatePage,
  DownloadMobilePage,
  HomePage,
  LoginHistoryPage,
  ParentPage,
  PayoutHistoryPage,
  PayoutPendingPage,
  ProfilePage,
  ProgressPage,
  PurchasesPage
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
import TeacherUser from "./Layouts/Admin/TeacherUser";
import ParentUser from "./Layouts/Admin/ParentUser";
import AdminUser from "./Layouts/Admin/AdminUser";
import LayoutAdmin from "./Layouts/Admin/LayoutAdmin";
import EditProfilePage from "./Layouts/Admin/EditeProfileStudent";
import EditCategoryLayout from "./Layouts/Admin/EditCategoryLayout";
import NavbarStudent from "./Components/NavbarStudent";
import SignUpAffiliatePage from "./Pages/RegisterPage/SignUpAffilatePage";
import EditAffiliateUserLayout from "./Layouts/Admin/EditAffiliateUserLayout";

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

const AppLayoutSuperAdmin = () => (
  <>
    <div className="relative flex gap-x-4">
      <SidebarSuperAdmin />
      <div className="contentSection w-4/5 min-h-screen ">
        {/* <HeaderSuperAdmin /> */}
        <Outlet />
      </div>
    </div>
  </>
);
const AppLayoutAdmin = () => (
  <>
    <LayoutAdmin />
  </>
);
const AppLayoutStudentUser = () => (
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
    <Outlet />
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
const AppLayoutAffilateDashboard = () => (
  <div className="relative flex gap-x-4 directionAR">
    <SidebarStudent />
    <div className="contentSection w-4/5 min-h-screen ">
      {/* <AffilatePage /> */}
      <NavbarStudent />
      <AffilatePage />
      {/* <Outlet /> */}
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
  }, {
    path: "/loginWego",
    element: <ProtectedLogin />,
    children: [
      {
        path: '',
        element: <LoginAdmin />,
      }
    ]
  },
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
          },
        ],
      },

    ]

  },
  {
    path: '/forgetPassword',
    element: <ProtectedLogin />,
    children: [
      {
        path: '',
        element: <AppLayoutForgetPass />,
      },
    ],
  },
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
                path: 'edit/:profileId',
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
            element: <TeacherUser />,
          },
          {
            path: 'admin',
            element: <AdminUser />,
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
                index: true, // Default route for "questionsbank"
                element: <QuestionsBankEducation />,
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
                path: '',
                element: <LiveLayout />
              },
              {
                path: 'add',
                element: <AddLiveLayout />
              },
              {
                path: 'edit/:liveId',
                element: <EditLiveLayout />
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
                children: [
                  {
                    path: 'add',
                    element: <AddDiscountLayout />,
                  },
                  {
                    path: 'edit/:marketingId',
                    element: <EditDiscountLayout />,
                  }
                ]
              },
            ]
          },
          {
            path: 'promo_code',
            element: <AppLayoutPromoCode />,
            children: [
              {
                path: '',
                element: <PromoCodeLayout />,
                children: [
                  {
                    path: 'add',
                    element: <AddPromoCodeLayout />,
                  },
                  {
                    path: 'edit/:marketingId',
                    element: <EditPromoCodeLayout />,
                  }
                ]
              },
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
          {
            path: 'support',
            element: <SupportAD />,
          },
          {
            path: 'reports',
            element: <ReportsAD />,
          },
          {
            path: 'adminRoles',
            element: <AppLayoutAdminRoles />,
            children: [
              {
                path: '',
                element: <AdminRolesAD />,
              }
            ]
          },
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
          {
            path: 'operations',
            element: <AppLayoutOperations />,
            children: [
              {
                path: '',
                element: <OperationsLayout />,
              }
            ]
          }
          ,
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
  {
    element: <ProtectedRoute allowedRoles={['studentSignup']} />,
    path: '/download',
    children: [
      {
        path: '',
        element: <DownloadMobilePage />,
      },
    ]
  },
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
            path: "profile",
            element: <ProfileStudent />,
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute allowedRoles={['affilate']} />,
    children: [
      {
        path: '/dashboard_affilate',
        element: <AppLayoutAffilateDashboard />,
      }
    ],
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);