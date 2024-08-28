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
  HomeWorkAD,
  RevisionAD,
  ExamsAD,
  LiveAD,
  MarketingAD,
  FinancialAD,
  AffiliateAD,
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

import UserContext from "./Context/UserContext";
import LoginUser from "./Pages/RegisterPage/LoginUser";
import SignUpPage from "./Pages/RegisterPage/SignUpPage";

import {
  HomePage,
  LoginHistoryPage,
  ParentPage,
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
<<<<<<< Updated upstream
=======
import NavbarStudent from "./Components/NavbarStudent";
>>>>>>> Stashed changes

export const ContextNumper = createContext()
const AppLayoutAuthentication = () => (
  <>
    <Authentication />
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
        <UserContext>
          <Outlet />
        </UserContext>
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
const AppLayoutUser = () => (
  <>
    <div className="">
      {/* <ContextProvider> */}

      {/* <SidebarAdmin />
                     <div className="contentSection w-4/5 min-h-screen ">
                            <HeaderAdmin />
                            <UserContext> */}
      <Outlet />
      {/* </UserContext>
                     </div> */}
      {/* </ContextProvider> */}
    </div>
  </>
);
const AppLayoutStudent = () => (
  <>
    <div className="relative flex gap-x-4 directionAR">
      <SidebarStudent />
      <div className="contentSection w-4/5 min-h-screen ">
        {/* <HeaderStudent /> */}
        <UserContext>
        <NavbarStudent />
          <Outlet />
        </UserContext>
      </div>
    </div>
  </>
);
const AppLayoutTeacher = () => (
  <>
    <div className="relative flex gap-x-4">
      <SidebarTeacher />
      <div className="contentSection w-4/5 min-h-screen ">
        <HeaderTeacher />
        <UserContext>
          <Outlet />
        </UserContext>
      </div>
    </div>
  </>
);
const AppLayoutAffiliate = () => (
  <>
    <div className="relative flex gap-x-4">
      <SidebarAffiliate />
      <div className="contentSection w-4/5 min-h-screen ">
        <HeaderAffiliate />
        <UserContext>
          <Outlet />
        </UserContext>
      </div>
    </div>
  </>
);
const AppLayoutParent = () => (
  <>
    <div className="relative flex gap-x-4">
      <SidebarParent />
      <div className="contentSection w-4/5 min-h-screen ">
        <HeaderParent />
        <UserContext>
          <Outlet />
        </UserContext>
      </div>
    </div>
  </>
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
            path: 'login',
            element: <LoginUser />,
          },
          {
            path: 'signup',
            element: <SignUpPage />,
          },
          {
            index: true, // This makes it the default route for "/authentication"
            element: <Navigate to="login" replace />,
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
    element: <AppLayoutSuperAdmin />,
    path: '/DashboardSuperAdmin',
    children: [
      {
        path: 'Dashboard',
        element: <App />,
      }
    ],
  },
  {
    element: <ProtectedRoute allowedRoles={['admin', 'super admin']} />,
    path: '/dashboardAdmin',
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
                path: '', // Default route for "subject"
                element: <SubjectEducationLayout />,
              },
              /* Add and Edit And show Students and Chapter Page */
              {
                path: 'add', // Default route for "subject"
                element: <AddSubjectLayout />,
              },
              {
                path: 'edit/:subjectId', // Default route for "subject"
                element: <EditSubjectLayout />,
              },
              {
                path: 'chapter/:subjectId', // Default route for "subject"
                element: <ChapterSubjectLayout />,
              },
              {
                path: 'students/:subjectId', // Default route for "subject"
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
                path: 'add', // Default route for "subject"
                element: <AddBundlesLayout />,
              },
              {
                path: 'edit/:bundleId', // Default route for "subject"
                element: <EditBundlesLayout />,
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
            element: <HomeWorkAD />,
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
            element: <LiveAD />,
          },
          {
            path: 'marketing',
            element: <MarketingAD />,
          },
          {
            path: 'financial',
            element: <FinancialAD />,
          },
          {
            path: 'affiliate',
            element: <AffiliateAD />,
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
    element: <ProtectedRoute allowedRoles={['teacher', 'parent', 'affiliate']} />,
    path: '/dashboardUser',
    children: [
      {
        path: '',
        element: <AppLayoutUser />,
        children: [
          {
            index: true,
            element: <User />,
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute allowedRoles={['student']} />,
    path: '/dashboard',
    children: [
      {
        path: '',
        element: <AppLayoutStudent />,
        children: [
          {
            index: true,
            element: <App />,
          },
        ],
      },
    ],
  },
  {
    element: <AppLayoutTeacher />,
    children: [
      {
        path: '/DashboardTeacher',
        element: <App />,
      }
    ],
  },
  {
    element: <AppLayoutAffiliate />,
    children: [
      {
        path: '/DashboardAffiliate',
        element: <App />,
      }
    ],
  },
  {
    element: <AppLayoutParent />,
    children: [
      {
        path: '/DashboardParent',
        element: <App />,
      }
    ],
  },
  {
    element: <AppLayoutStudent />,
    children: [
      {
        path: '/DashboardStudent',
        element: <App />,
      },
      {
        path: "/Curricula",
        element: <Curricula />,
      },
      {
        path: "/Duties",
        element: <Duties />,
      },
      {
        path: "/LiveClasses",
        element: <LiveClasses />,
      },
      {
        path: "/MonthsReviews",
        element: <MonthsReviews />,
      },
      {
        path: "/FinalReviews",
        element: <FinalReviews />,
      },
      {
        path: "/SolveExams",
        element: <SolveExams />,
      },
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

