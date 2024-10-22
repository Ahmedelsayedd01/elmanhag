import React, { useEffect, useState } from "react";


import {
       AffiliateIcon,
       DashboardIcon,
       EducationIcon,
       ExamsIcon,
       FinancialIcon,
       HomeWorkIcon,
       LiveIcon,
       MarketingIcon,
       NoticeBoardIcon,
       ReportsIcon,
       RevisionIcon,
       SettingsIcon,
       SupportIcon,
       UserIcon,
} from "./Icons/All_Icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/Auth";


const LinksSidebar = () => {
       const location = useLocation();
       const auth = useAuth();
       const navigate = useNavigate();
       console.log('location', location)
       const [Premission] = useState(auth.user.premissions)
       // const savedState = JSON.parse(localStorage.getItem('sidebarState')) || {};
       const savedState = auth.sidebar ? JSON.parse(auth.sidebar) : {}; // Load the saved state from auth.sidebar
       // setSidebar(savedState); // Update the state

       // Define the initial state values using the saved state or fallback to default values
       const [isActiveDashboard, setIsActiveDashboard] = useState(savedState.isActiveDashboard ?? true);
       const [isActiveUser, setIsActiveUser] = useState(savedState.isActiveUser ?? false);
       /* User */
       /* Childern User */
       const [openListUser, setOpenListUser] = useState(savedState.openListUser ?? false);
       const [isActiveStudent, setIsActiveStudent] = useState(savedState.isActiveStudent ?? false);
       const [isActiveParent, setIsActiveParent] = useState(savedState.isActiveParent ?? false);
       const [isActiveTeacher, setIsActiveTeacher] = useState(savedState.isActiveTeacher ?? false);
       const [isActiveAdmin, setIsActiveAdmin] = useState(savedState.isActiveAdmin ?? false);
       /* ///Childern User */
       /* Education */
       /* Childern Education */
       const [isActiveEducation, setIsActiveEducation] = useState(savedState.isActiveEducation ?? false);
       const [openListEducation, setOpenListEducation] = useState(savedState.openListEducation ?? false);
       const [isActiveCategories, setIsActiveCategories] = useState(savedState.isActiveCategories ?? false);
       const [isActiveSubject, setIsActiveSubject] = useState(savedState.isActiveSubject ?? false);
       const [isActiveBundles, setIsActiveBundles] = useState(savedState.isActiveBundles ?? false);
       const [isActiveQuestionsBank, setIsActiveQuestionsBank] = useState(savedState.isActiveQuestionsBank ?? false);
       /* ///Childern Education */
       const [isActiveHomeWork, setIsActiveHomeWork] = useState(savedState.isActiveHomeWork ?? false);
       const [isActiveRevision, setIsActiveRevision] = useState(savedState.isActiveRevision ?? false);
       const [isActiveExams, setIsActivExams] = useState(savedState.isActiveExams ?? false);

       /* Lives */
       const [isActiveLives, setIsActiveLives] = useState(savedState.isActiveLives ?? false);
       const [openListLives, setOpenListLives] = useState(savedState.openListLives ?? false);
       /* Childern Lives */
       const [isActiveLive, setIsActiveLive] = useState(savedState.isActiveLive ?? false);
       const [isActiveRecordedLive, setIsActiveRecordedLive] = useState(savedState.isActiveRecordedLive ?? false);
       /* Marketiwng */
       /* Childern Marketing */
       const [isActiveMarketing, setIsActiveMarketing] = useState(savedState.isActiveMarketing ?? false);
       const [openListMarketing, setOpenListMarketing] = useState(savedState.openListMarketing ?? false);
       const [isActiveDiscount, setIsActiveDiscount] = useState(savedState.isActiveDiscount ?? false);
       const [isActivePromoCode, setIsActivePromoCode] = useState(savedState.isActivePromoCode ?? false);
       const [isActiveReview, setIsActiveReview] = useState(savedState.isActiveReview ?? false);
       const [isActivePopUp, setIsActivePopUp] = useState(savedState.isActivePopUp ?? false);
       /* ////Childern Marketing */
       /* ///Marketing */
       /* Financial */
       const [isActiveFinancial, setIsActiveFinancial] = useState(savedState.isActiveFinancial ?? false);
       const [openListFinancial, setOpenListFinancial] = useState(savedState.openListFinancial ?? false);
       /* Childern Financial */
       const [isActiveFinancialPendingPayments, setIsActiveFinancialPendingPayments] = useState(savedState.isActiveFinancialPendingPayments ?? false);
       const [isActiveFinancialPayments, setIsActiveFinancialPayments] = useState(savedState.isActiveFinancialPayments ?? false);
       /* ////Childern Financial */
       /* ////Financial */
       /* Affiliate */
       const [isActiveAffiliate, setIsActiveAffiliate] = useState(savedState.isActiveAffiliate ?? false);
       const [openListAffiliate, setOpenListAffiliate] = useState(savedState.openListAffiliate ?? false);
       /* Childern Affiliate */
       const [isActiveAffiliateUser, setIsActiveAffiliateUser] = useState(savedState.isActiveAffiliateUser ?? false);
       const [isActiveAffiliatePaymentMethod, setIsActiveAffiliatePaymentMethod] = useState(savedState.isActiveAffiliateCommissions ?? false);
       const [isActiveAffiliateCommissions, setIsActiveAffiliateCommissions] = useState(savedState.isActiveAffiliateCommissions ?? false);
       const [isActiveAffiliateBonus, setIsActiveAffiliateBonus] = useState(savedState.isActiveAffiliateBonus ?? false);
       const [isActiveAffiliatePayout, setIsActiveAffiliatePayout] = useState(savedState.isActiveAffiliatePayout ?? false);
       /* ////Childern Affiliate */
       /* ///Affiliate */
       /* Support */
       const [isActiveSupport, setIsActiveSupport] = useState(savedState.isActiveSupport ?? false);
       const [openListSupport, setOpenListSupport] = useState(savedState.openListSupport ?? false);
       /* Childern Support */
       const [isActiveComplaints, setIsActiveComplaints] = useState(savedState.isActiveComplaints ?? false);
       const [isActiveSuggestions, setIsActiveSuggestions] = useState(savedState.isActiveSuggestions ?? false);
       /* // Childern Support */
       /* // Support */
       const [isActiveReports, setIsActiveReports] = useState(savedState.isActiveReports ?? false);
       /* Setting */
       /* Childern Setting */
       const [isActiveSetting, setIsActiveSetting] = useState(savedState.isActiveSetting ?? false);
       const [openListSetting, setOpenListSetting] = useState(savedState.openListSetting ?? false);
       const [isActiveAdminRoles, setIsActiveAdminRoles] = useState(savedState.isActiveAdminRoles ?? false);
       const [isActiveCountries, setIsActiveCountries] = useState(savedState.isActiveCountries ?? false);
       const [isActiveCities, setIsActiveCities] = useState(savedState.isActiveCities ?? false);
       const [isActiveParentRelation, setIsActiveParentRelation] = useState(savedState.isActiveParentRelation ?? false);
       const [isActiveOperations, setIsActiveOperations] = useState(savedState.isActiveOperations ?? false);
       const [isActivePaymentMethod, setIsActivePaymentMethod] = useState(savedState.isActivePaymentMethod ?? false);
       const [isActiveQuestionIssues, setIsActiveQuestionIssues] = useState(savedState.isActiveQuestionIssues ?? false);
       const [isActiveVideoIssues, setIsActiveVideoIssues] = useState(savedState.isActiveVideoIssues ?? false);
       /* ///Childern Setting */
       const [isActiveNoticeBoard, setIsActiveNoticeBoard] = useState(savedState.isActiveNoticeBoard ?? false);

       useEffect(() => {
              const sidebarState = {
                     isActiveDashboard,
                     isActiveUser,
                     openListUser,
                     isActiveStudent,
                     isActiveParent,
                     isActiveTeacher,
                     isActiveAdmin,
                     isActiveEducation,
                     openListEducation,
                     isActiveCategories,
                     isActiveSubject,
                     isActiveBundles,
                     isActiveQuestionsBank,
                     isActiveHomeWork,
                     isActiveRevision,
                     isActiveExams,
                     isActiveLives,
                     openListLives,
                     isActiveLive,
                     isActiveRecordedLive,
                     isActiveMarketing,
                     openListMarketing,
                     isActiveDiscount,
                     isActivePromoCode,
                     isActiveReview,
                     isActivePopUp,
                     isActiveFinancial,
                     openListFinancial,
                     isActiveFinancialPendingPayments,
                     isActiveFinancialPayments,
                     isActiveAffiliate,
                     openListAffiliate,
                     isActiveAffiliateUser,
                     isActiveAffiliatePaymentMethod,
                     isActiveAffiliateCommissions,
                     isActiveAffiliateBonus,
                     isActiveAffiliatePayout,
                     isActiveSupport,
                     openListSupport,
                     isActiveComplaints,
                     isActiveSuggestions,
                     isActiveReports,
                     isActiveSetting,
                     openListSetting,
                     isActiveAdminRoles,
                     isActiveCountries,
                     isActiveCities,
                     isActiveParentRelation,
                     isActiveOperations,
                     isActivePaymentMethod,
                     isActiveQuestionIssues,
                     isActiveVideoIssues,
                     isActiveNoticeBoard,
              };
              // localStorage.setItem('sidebarState', JSON.stringify(sidebarState));
              // Whenever sidebarState changes
              auth.sidebar = JSON.stringify(sidebarState); // Save the new state to auth.sidebar
       }, [isActiveDashboard,
              isActiveUser,
              openListUser,
              isActiveStudent,
              isActiveParent,
              isActiveTeacher,
              isActiveAdmin,
              isActiveEducation,
              openListEducation,
              isActiveCategories,
              isActiveSubject,
              isActiveBundles,
              isActiveQuestionsBank,
              isActiveHomeWork,
              isActiveRevision,
              isActiveExams,
              isActiveLives,
              openListLives,
              isActiveLive,
              isActiveRecordedLive,
              isActiveMarketing,
              openListMarketing,
              isActiveDiscount,
              isActivePromoCode,
              isActiveReview,
              isActivePopUp,
              isActiveFinancial,
              openListFinancial,
              isActiveFinancialPendingPayments,
              isActiveFinancialPayments,
              isActiveAffiliate,
              openListAffiliate,
              isActiveAffiliateUser,
              isActiveAffiliatePaymentMethod,
              isActiveAffiliateCommissions,
              isActiveAffiliateBonus,
              isActiveAffiliatePayout,
              isActiveSupport,
              openListSupport,
              isActiveComplaints,
              isActiveSuggestions,
              isActiveReports,
              isActiveSetting,
              openListSetting,
              isActiveAdminRoles,
              isActiveCountries,
              isActiveCities,
              isActiveParentRelation,
              isActiveOperations,
              isActivePaymentMethod,
              isActiveQuestionIssues,
              isActiveVideoIssues,
              isActiveNoticeBoard]);


       const handleClickDashboard = () => {
              setIsActiveDashboard(true);
              setIsActiveUser(false);
              setOpenListUser(false);
              setIsActiveStudent(false);
              setIsActiveParent(false);
              setIsActiveTeacher(false);
              setIsActiveAdmin(false);
              setIsActiveEducation(false)
              setOpenListEducation(false)
              setIsActiveCategories(false)
              setIsActiveSubject(false)
              setIsActiveBundles(false)
              setIsActiveQuestionsBank(false)
              setIsActiveHomeWork(false)
              setIsActiveRevision(false)
              setIsActivExams(false)
              setIsActiveLives(false)
              setOpenListLives(false)
              setIsActiveLive(false)
              setIsActiveRecordedLive(false)
              setIsActiveMarketing(false)
              setOpenListMarketing(false)
              setIsActiveDiscount(false)
              setIsActivePromoCode(false)
              setIsActiveReview(false)
              setIsActivePopUp(false)
              setIsActiveFinancial(false)
              setOpenListFinancial(false)
              setIsActiveFinancialPendingPayments(false)
              setIsActiveFinancialPayments(false)
              setIsActiveAffiliate(false)
              setOpenListAffiliate(false)
              setIsActiveAffiliateUser(false)
              setIsActiveAffiliatePaymentMethod(false)
              setIsActiveAffiliateCommissions(false)
              setIsActiveAffiliateBonus(false)
              setIsActiveAffiliatePayout(false)
              setIsActiveSupport(false)
              setOpenListSupport(false)
              setIsActiveComplaints(false)
              setIsActiveSuggestions(false)
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
              setIsActiveQuestionIssues(false)
              setIsActiveVideoIssues(false)
              setIsActiveNoticeBoard(false)
       };
       useEffect(() => {

              const part = location.pathname;
              // const parts = part.split('/');
              // const result = parts.slice(0, 3).join('/');
              if (part == "/dashboard_admin" || part == "/dashboard_admin/") {
                     handleClickDashboard()
              }
       }, [location])
       /* User */
       const handleClickUser = () => {
              setIsActiveDashboard(false);
              setIsActiveUser(true);
              setOpenListUser(true);
              setIsActiveStudent(true);
              setIsActiveParent(false);
              setIsActiveTeacher(false);
              setIsActiveAdmin(false);
              setIsActiveEducation(false)
              setOpenListEducation(false)
              setIsActiveCategories(false)
              setIsActiveSubject(false)
              setIsActiveBundles(false)
              setIsActiveQuestionsBank(false)
              setIsActiveHomeWork(false)
              setIsActiveRevision(false)
              setIsActivExams(false)
              setIsActiveLives(false)
              setOpenListLives(false)
              setIsActiveLive(false)
              setIsActiveRecordedLive(false)
              setIsActiveMarketing(false)
              setOpenListMarketing(false)
              setIsActiveDiscount(false)
              setIsActivePromoCode(false)
              setIsActiveReview(false)
              setIsActivePopUp(false)
              setIsActiveFinancial(false)
              setOpenListFinancial(false)
              setIsActiveFinancialPendingPayments(false)
              setIsActiveFinancialPayments(false)
              setIsActiveAffiliate(false)
              setOpenListAffiliate(false)
              setIsActiveAffiliateUser(false)
              setIsActiveAffiliatePaymentMethod(false)
              setIsActiveAffiliateCommissions(false)
              setIsActiveAffiliateBonus(false)
              setIsActiveAffiliatePayout(false)
              setIsActiveSupport(false)
              setOpenListSupport(false)
              setIsActiveComplaints(false)
              setIsActiveSuggestions(false)
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
              setIsActiveQuestionIssues(false)
              setIsActiveVideoIssues(false)
              setIsActiveNoticeBoard(false)
       };
       useEffect(() => {
              const part = location.pathname;
              const parts = part.split('/');
              const result = parts.slice(0, 3).join('/');
              if (result == "/dashboard_admin/student") {
                     handleClickUser()
              }
       }, [location])
       /* Childern User */
       const handleClickStudent = () => {
              setIsActiveDashboard(false);
              setIsActiveUser(true);
              setOpenListUser(true);
              setIsActiveStudent(true);
              setIsActiveParent(false);
              setIsActiveTeacher(false);
              setIsActiveAdmin(false);
              setIsActiveEducation(false)
              setOpenListEducation(false)
              setIsActiveCategories(false)
              setIsActiveSubject(false)
              setIsActiveBundles(false)
              setIsActiveQuestionsBank(false)
              setIsActiveHomeWork(false)
              setIsActiveRevision(false)
              setIsActivExams(false)
              setIsActiveLives(false)
              setOpenListLives(false)
              setIsActiveLive(false)
              setIsActiveRecordedLive(false)
              setIsActiveMarketing(false)
              setOpenListMarketing(false)
              setIsActiveDiscount(false)
              setIsActivePromoCode(false)
              setIsActiveReview(false)
              setIsActivePopUp(false)
              setIsActiveFinancial(false)
              setOpenListFinancial(false)
              setIsActiveFinancialPendingPayments(false)
              setIsActiveFinancialPayments(false)
              setIsActiveAffiliate(false)
              setOpenListAffiliate(false)
              setIsActiveAffiliateUser(false)
              setIsActiveAffiliatePaymentMethod(false)
              setIsActiveAffiliateCommissions(false)
              setIsActiveAffiliateBonus(false)
              setIsActiveAffiliatePayout(false)
              setIsActiveSupport(false)
              setOpenListSupport(false)
              setIsActiveComplaints(false)
              setIsActiveSuggestions(false)
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
              setIsActiveQuestionIssues(false)
              setIsActiveVideoIssues(false)
              setIsActiveNoticeBoard(false)
       };
       const handleClickParent = () => {
              setIsActiveDashboard(false);
              setIsActiveUser(true);
              setOpenListUser(true);
              setIsActiveStudent(false);
              setIsActiveParent(true);
              setIsActiveTeacher(false);
              setIsActiveAdmin(false);
              setIsActiveEducation(false)
              setOpenListEducation(false)
              setIsActiveCategories(false)
              setIsActiveSubject(false)
              setIsActiveBundles(false)
              setIsActiveQuestionsBank(false)
              setIsActiveHomeWork(false)
              setIsActiveRevision(false)
              setIsActivExams(false)
              setIsActiveLives(false)
              setOpenListLives(false)
              setIsActiveLive(false)
              setIsActiveRecordedLive(false)
              setIsActiveMarketing(false)
              setOpenListMarketing(false)
              setIsActiveDiscount(false)
              setIsActivePromoCode(false)
              setIsActiveReview(false)
              setIsActivePopUp(false)
              setIsActiveFinancial(false)
              setOpenListFinancial(false)
              setIsActiveFinancialPendingPayments(false)
              setIsActiveFinancialPayments(false)
              setIsActiveAffiliate(false)
              setOpenListAffiliate(false)
              setIsActiveAffiliateUser(false)
              setIsActiveAffiliatePaymentMethod(false)
              setIsActiveAffiliateCommissions(false)
              setIsActiveAffiliateBonus(false)
              setIsActiveAffiliatePayout(false)
              setIsActiveSupport(false)
              setOpenListSupport(false)
              setIsActiveComplaints(false)
              setIsActiveSuggestions(false)
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
              setIsActiveQuestionIssues(false)
              setIsActiveVideoIssues(false)
              setIsActiveNoticeBoard(false)
       };
       useEffect(() => {
              const part = location.pathname;
              const parts = part.split('/');
              const result = parts.slice(0, 3).join('/');
              if (result == "/dashboard_admin/parent") {
                     handleClickParent()
              }
       }, [location])
       const handleClickTeacher = () => {
              setIsActiveDashboard(false);
              setIsActiveUser(true);
              setOpenListUser(true);
              setIsActiveStudent(false);
              setIsActiveParent(false);
              setIsActiveTeacher(true);
              setIsActiveAdmin(false);
              setIsActiveEducation(false)
              setOpenListEducation(false)
              setIsActiveCategories(false)
              setIsActiveSubject(false)
              setIsActiveBundles(false)
              setIsActiveQuestionsBank(false)
              setIsActiveHomeWork(false)
              setIsActiveRevision(false)
              setIsActivExams(false)
              setIsActiveLives(false)
              setOpenListLives(false)
              setIsActiveLive(false)
              setIsActiveRecordedLive(false)
              setIsActiveMarketing(false)
              setOpenListMarketing(false)
              setIsActiveDiscount(false)
              setIsActivePromoCode(false)
              setIsActiveReview(false)
              setIsActivePopUp(false)
              setIsActiveFinancial(false)
              setOpenListFinancial(false)
              setIsActiveFinancialPendingPayments(false)
              setIsActiveFinancialPayments(false)
              setIsActiveAffiliate(false)
              setOpenListAffiliate(false)
              setIsActiveAffiliateUser(false)
              setIsActiveAffiliatePaymentMethod(false)
              setIsActiveAffiliateCommissions(false)
              setIsActiveAffiliateBonus(false)
              setIsActiveAffiliatePayout(false)
              setIsActiveSupport(false)
              setOpenListSupport(false)
              setIsActiveComplaints(false)
              setIsActiveSuggestions(false)
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
              setIsActiveQuestionIssues(false)
              setIsActiveVideoIssues(false)
              setIsActiveNoticeBoard(false)
       };
       useEffect(() => {
              const part = location.pathname;
              const parts = part.split('/');
              const result = parts.slice(0, 3).join('/');
              if (result == "/dashboard_admin/teacher") {
                     handleClickTeacher()
              }
       }, [location])
       const handleClickAdmin = () => {
              setIsActiveDashboard(false);
              setIsActiveUser(true);
              setOpenListUser(true);
              setIsActiveStudent(false);
              setIsActiveParent(false);
              setIsActiveTeacher(false);
              setIsActiveAdmin(true);
              setIsActiveEducation(false)
              setOpenListEducation(false)
              setIsActiveCategories(false)
              setIsActiveSubject(false)
              setIsActiveBundles(false)
              setIsActiveQuestionsBank(false)
              setIsActiveHomeWork(false)
              setIsActiveRevision(false)
              setIsActivExams(false)
              setIsActiveLives(false)
              setOpenListLives(false)
              setIsActiveLive(false)
              setIsActiveRecordedLive(false)
              setIsActiveMarketing(false)
              setOpenListMarketing(false)
              setIsActiveDiscount(false)
              setIsActivePromoCode(false)
              setIsActiveReview(false)
              setIsActivePopUp(false)
              setIsActiveFinancial(false)
              setOpenListFinancial(false)
              setIsActiveFinancialPendingPayments(false)
              setIsActiveFinancialPayments(false)
              setIsActiveAffiliate(false)
              setOpenListAffiliate(false)
              setIsActiveAffiliateUser(false)
              setIsActiveAffiliatePaymentMethod(false)
              setIsActiveAffiliateCommissions(false)
              setIsActiveAffiliateBonus(false)
              setIsActiveAffiliatePayout(false)
              setIsActiveSupport(false)
              setOpenListSupport(false)
              setIsActiveComplaints(false)
              setIsActiveSuggestions(false)
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
              setIsActiveQuestionIssues(false)
              setIsActiveVideoIssues(false)
              setIsActiveNoticeBoard(false)
       };
       useEffect(() => {
              const part = location.pathname;
              const parts = part.split('/');
              const result = parts.slice(0, 3).join('/');
              if (result == "/dashboard_admin/admin") {
                     handleClickAdmin()
              }
       }, [location])
       /* ///Childern User */
       /* Education */
       const handleClickEducation = () => {
              setIsActiveDashboard(false);
              setIsActiveUser(false);
              setOpenListUser(false);
              setIsActiveStudent(false);
              setIsActiveParent(false);
              setIsActiveTeacher(false);
              setIsActiveAdmin(false);
              setIsActiveEducation(true)
              setIsActiveCategories(true)
              setIsActiveSubject(false)
              setIsActiveBundles(false)
              setIsActiveQuestionsBank(false)
              setOpenListEducation(true)
              setIsActiveHomeWork(false)
              setIsActiveRevision(false)
              setIsActivExams(false)
              setIsActiveLives(false)
              setOpenListLives(false)
              setIsActiveLive(false)
              setIsActiveRecordedLive(false)
              setIsActiveMarketing(false)
              setOpenListMarketing(false)
              setIsActiveDiscount(false)
              setIsActivePromoCode(false)
              setIsActiveReview(false)
              setIsActivePopUp(false)
              setIsActiveFinancial(false)
              setOpenListFinancial(false)
              setIsActiveFinancialPendingPayments(false)
              setIsActiveFinancialPayments(false)
              setIsActiveAffiliate(false)
              setOpenListAffiliate(false)
              setIsActiveAffiliateUser(false)
              setIsActiveAffiliatePaymentMethod(false)
              setIsActiveAffiliateCommissions(false)
              setIsActiveAffiliateBonus(false)
              setIsActiveAffiliatePayout(false)
              setIsActiveSupport(false)
              setOpenListSupport(false)
              setIsActiveComplaints(false)
              setIsActiveSuggestions(false)
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
              setIsActiveQuestionIssues(false)
              setIsActiveVideoIssues(false)
              setIsActiveNoticeBoard(false)
       };
       useEffect(() => {
              const part = location.pathname;
              const parts = part.split('/');
              const result = parts.slice(0, 3).join('/');
              if (result == "/dashboard_admin/categories") {
                     handleClickEducation()
              }
       }, [location])
       /* Childern Education */
       const handleClickCategories = () => {
              setIsActiveDashboard(false);
              setIsActiveUser(false);
              setOpenListUser(false);
              setIsActiveStudent(false);
              setIsActiveParent(false);
              setIsActiveTeacher(false);
              setIsActiveAdmin(false);
              setIsActiveEducation(true)
              setOpenListEducation(true)
              setIsActiveCategories(true)
              setIsActiveSubject(false)
              setIsActiveBundles(false)
              setIsActiveQuestionsBank(false)
              setIsActiveHomeWork(false)
              setIsActiveRevision(false)
              setIsActivExams(false)
              setIsActiveLives(false)
              setOpenListLives(false)
              setIsActiveLive(false)
              setIsActiveRecordedLive(false)
              setIsActiveMarketing(false)
              setOpenListMarketing(false)
              setIsActiveDiscount(false)
              setIsActivePromoCode(false)
              setIsActiveReview(false)
              setIsActivePopUp(false)
              setIsActiveFinancial(false)
              setOpenListFinancial(false)
              setIsActiveFinancialPendingPayments(false)
              setIsActiveFinancialPayments(false)
              setIsActiveAffiliate(false)
              setOpenListAffiliate(false)
              setIsActiveAffiliateUser(false)
              setIsActiveAffiliatePaymentMethod(false)
              setIsActiveAffiliateCommissions(false)
              setIsActiveAffiliateBonus(false)
              setIsActiveAffiliatePayout(false)
              setIsActiveSupport(false)
              setOpenListSupport(false)
              setIsActiveComplaints(false)
              setIsActiveSuggestions(false)
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
              setIsActiveQuestionIssues(false)
              setIsActiveVideoIssues(false)
              setIsActiveNoticeBoard(false)
       };
       const handleClickSubject = () => {
              setIsActiveDashboard(false);
              setIsActiveUser(false);
              setOpenListUser(false);
              setIsActiveStudent(false);
              setIsActiveParent(false);
              setIsActiveTeacher(false);
              setIsActiveAdmin(false);
              setIsActiveEducation(true)
              setOpenListEducation(true)
              setIsActiveCategories(false)
              setIsActiveSubject(true)
              setIsActiveBundles(false)
              setIsActiveQuestionsBank(false)
              setIsActiveHomeWork(false)
              setIsActiveRevision(false)
              setIsActivExams(false)
              setIsActiveLives(false)
              setOpenListLives(false)
              setIsActiveLive(false)
              setIsActiveRecordedLive(false)
              setIsActiveMarketing(false)
              setOpenListMarketing(false)
              setIsActiveDiscount(false)
              setIsActivePromoCode(false)
              setIsActiveReview(false)
              setIsActivePopUp(false)
              setIsActiveFinancial(false)
              setOpenListFinancial(false)
              setIsActiveFinancialPendingPayments(false)
              setIsActiveFinancialPayments(false)
              setIsActiveAffiliate(false)
              setOpenListAffiliate(false)
              setIsActiveAffiliateUser(false)
              setIsActiveAffiliatePaymentMethod(false)
              setIsActiveAffiliateCommissions(false)
              setIsActiveAffiliateBonus(false)
              setIsActiveAffiliatePayout(false)
              setIsActiveSupport(false)
              setOpenListSupport(false)
              setIsActiveComplaints(false)
              setIsActiveSuggestions(false)
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
              setIsActiveQuestionIssues(false)
              setIsActiveVideoIssues(false)
              setIsActiveNoticeBoard(false)
       };
       useEffect(() => {
              const part = location.pathname;
              const parts = part.split('/');
              const result = parts.slice(0, 3).join('/');
              if (result == "/dashboard_admin/subject") {
                     handleClickSubject()
              }
       }, [location])
       const handleClickBundles = () => {
              setIsActiveDashboard(false);
              setIsActiveUser(false);
              setOpenListUser(false);
              setIsActiveStudent(false);
              setIsActiveParent(false);
              setIsActiveTeacher(false);
              setIsActiveAdmin(false);
              setIsActiveEducation(true)
              setOpenListEducation(true)
              setIsActiveCategories(false)
              setIsActiveSubject(false)
              setIsActiveBundles(true)
              setIsActiveQuestionsBank(false)
              setIsActiveHomeWork(false)
              setIsActiveRevision(false)
              setIsActivExams(false)
              setIsActiveLives(false)
              setOpenListLives(false)
              setIsActiveLive(false)
              setIsActiveRecordedLive(false)
              setIsActiveMarketing(false)
              setOpenListMarketing(false)
              setIsActiveDiscount(false)
              setIsActivePromoCode(false)
              setIsActiveReview(false)
              setIsActivePopUp(false)
              setIsActiveFinancial(false)
              setOpenListFinancial(false)
              setIsActiveFinancialPendingPayments(false)
              setIsActiveFinancialPayments(false)
              setIsActiveAffiliate(false)
              setOpenListAffiliate(false)
              setIsActiveAffiliateUser(false)
              setIsActiveAffiliatePaymentMethod(false)
              setIsActiveAffiliateCommissions(false)
              setIsActiveAffiliateBonus(false)
              setIsActiveAffiliatePayout(false)
              setIsActiveSupport(false)
              setOpenListSupport(false)
              setIsActiveComplaints(false)
              setIsActiveSuggestions(false)
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
              setIsActiveQuestionIssues(false)
              setIsActiveVideoIssues(false)
              setIsActiveNoticeBoard(false)
       };
       useEffect(() => {
              const part = location.pathname;
              const parts = part.split('/');
              const result = parts.slice(0, 3).join('/');
              if (result == "/dashboard_admin/bundles") {
                     handleClickBundles()
              }
       }, [location])
       const handleClickQuestionsBank = () => {
              setIsActiveDashboard(false);
              setIsActiveUser(false);
              setOpenListUser(false);
              setIsActiveStudent(false);
              setIsActiveParent(false);
              setIsActiveTeacher(false);
              setIsActiveAdmin(false);
              setIsActiveEducation(true)
              setOpenListEducation(true)
              setIsActiveCategories(false)
              setIsActiveSubject(false)
              setIsActiveBundles(false)
              setIsActiveQuestionsBank(true)
              setIsActiveHomeWork(false)
              setIsActiveRevision(false)
              setIsActivExams(false)
              setIsActiveLives(false)
              setOpenListLives(false)
              setIsActiveLive(false)
              setIsActiveRecordedLive(false)
              setIsActiveMarketing(false)
              setOpenListMarketing(false)
              setIsActiveDiscount(false)
              setIsActivePromoCode(false)
              setIsActiveReview(false)
              setIsActivePopUp(false)
              setIsActiveFinancial(false)
              setOpenListFinancial(false)
              setIsActiveFinancialPendingPayments(false)
              setIsActiveFinancialPayments(false)
              setIsActiveAffiliate(false)
              setOpenListAffiliate(false)
              setIsActiveAffiliateUser(false)
              setIsActiveAffiliatePaymentMethod(false)
              setIsActiveAffiliateCommissions(false)
              setIsActiveAffiliateBonus(false)
              setIsActiveAffiliatePayout(false)
              setIsActiveSupport(false)
              setOpenListSupport(false)
              setIsActiveComplaints(false)
              setIsActiveSuggestions(false)
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
              setIsActiveQuestionIssues(false)
              setIsActiveVideoIssues(false)
              setIsActiveNoticeBoard(false)
       };
       useEffect(() => {
              const part = location.pathname;
              const parts = part.split('/');
              const result = parts.slice(0, 3).join('/');
              if (result == "/dashboard_admin/questionsbank") {
                     handleClickQuestionsBank()
              }
       }, [location])
       /* ///Childern Education */
       const handleClickHomeWork = () => {
              setIsActiveDashboard(false);
              setIsActiveUser(false);
              setOpenListUser(false);
              setIsActiveStudent(false);
              setIsActiveParent(false);
              setIsActiveTeacher(false);
              setIsActiveAdmin(false);
              setIsActiveEducation(false)
              setOpenListEducation(false)
              setIsActiveCategories(false)
              setIsActiveSubject(false)
              setIsActiveBundles(false)
              setIsActiveQuestionsBank(false)
              setIsActiveHomeWork(true)
              setIsActiveRevision(false)
              setIsActivExams(false)
              setIsActiveLives(false)
              setOpenListLives(false)
              setIsActiveLive(false)
              setIsActiveRecordedLive(false)
              setIsActiveMarketing(false)
              setOpenListMarketing(false)
              setIsActiveDiscount(false)
              setIsActivePromoCode(false)
              setIsActiveReview(false)
              setIsActivePopUp(false)
              setIsActiveFinancial(false)
              setOpenListFinancial(false)
              setIsActiveFinancialPendingPayments(false)
              setIsActiveFinancialPayments(false)
              setIsActiveAffiliate(false)
              setOpenListAffiliate(false)
              setIsActiveAffiliateUser(false)
              setIsActiveAffiliatePaymentMethod(false)
              setIsActiveAffiliateCommissions(false)
              setIsActiveAffiliateBonus(false)
              setIsActiveAffiliatePayout(false)
              setIsActiveSupport(false)
              setOpenListSupport(false)
              setIsActiveComplaints(false)
              setIsActiveSuggestions(false)
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
              setIsActiveQuestionIssues(false)
              setIsActiveVideoIssues(false)
              setIsActiveNoticeBoard(false)
       };
       useEffect(() => {
              const part = location.pathname;
              const parts = part.split('/');
              const result = parts.slice(0, 3).join('/');
              if (result == "/dashboard_admin/homework") {
                     handleClickHomeWork()
              }
       }, [location])
       const handleClickRevision = () => {
              setIsActiveDashboard(false);
              setIsActiveUser(false);
              setOpenListUser(false);
              setIsActiveStudent(false);
              setIsActiveParent(false);
              setIsActiveTeacher(false);
              setIsActiveAdmin(false);
              setIsActiveEducation(false)
              setOpenListEducation(false)
              setIsActiveCategories(false)
              setIsActiveSubject(false)
              setIsActiveBundles(false)
              setIsActiveQuestionsBank(false)
              setIsActiveHomeWork(false)
              setIsActiveRevision(true)
              setIsActivExams(false)
              setIsActiveLives(false)
              setOpenListLives(false)
              setIsActiveLive(false)
              setIsActiveRecordedLive(false)
              setIsActiveMarketing(false)
              setOpenListMarketing(false)
              setIsActiveDiscount(false)
              setIsActivePromoCode(false)
              setIsActiveReview(false)
              setIsActivePopUp(false)
              setIsActiveFinancial(false)
              setOpenListFinancial(false)
              setIsActiveFinancialPendingPayments(false)
              setIsActiveFinancialPayments(false)
              setIsActiveAffiliate(false)
              setOpenListAffiliate(false)
              setIsActiveAffiliateUser(false)
              setIsActiveAffiliatePaymentMethod(false)
              setIsActiveAffiliateCommissions(false)
              setIsActiveAffiliateBonus(false)
              setIsActiveAffiliatePayout(false)
              setIsActiveSupport(false)
              setOpenListSupport(false)
              setIsActiveComplaints(false)
              setIsActiveSuggestions(false)
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
              setIsActiveQuestionIssues(false)
              setIsActiveVideoIssues(false)
              setIsActiveNoticeBoard(false)
       };
       useEffect(() => {
              const part = location.pathname;
              const parts = part.split('/');
              const result = parts.slice(0, 3).join('/');
              if (result == "/dashboard_admin/revision") {
                     handleClickRevision()
              }
       }, [location])
       const handleClickExams = () => {
              setIsActiveDashboard(false);
              setIsActiveUser(false);
              setOpenListUser(false);
              setIsActiveStudent(false);
              setIsActiveParent(false);
              setIsActiveTeacher(false);
              setIsActiveAdmin(false);
              setIsActiveEducation(false)
              setOpenListEducation(false)
              setIsActiveCategories(false)
              setIsActiveSubject(false)
              setIsActiveBundles(false)
              setIsActiveQuestionsBank(false)
              setIsActiveHomeWork(false)
              setIsActiveRevision(false)
              setIsActivExams(true)
              setIsActiveLives(false)
              setOpenListLives(false)
              setIsActiveLive(false)
              setIsActiveRecordedLive(false)
              setIsActiveMarketing(false)
              setOpenListMarketing(false)
              setIsActiveDiscount(false)
              setIsActivePromoCode(false)
              setIsActiveReview(false)
              setIsActivePopUp(false)
              setIsActiveFinancial(false)
              setOpenListFinancial(false)
              setIsActiveFinancialPendingPayments(false)
              setIsActiveFinancialPayments(false)
              setIsActiveAffiliate(false)
              setOpenListAffiliate(false)
              setIsActiveAffiliateUser(false)
              setIsActiveAffiliatePaymentMethod(false)
              setIsActiveAffiliateCommissions(false)
              setIsActiveAffiliateBonus(false)
              setIsActiveAffiliatePayout(false)
              setIsActiveSupport(false)
              setOpenListSupport(false)
              setIsActiveComplaints(false)
              setIsActiveSuggestions(false)
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
              setIsActiveQuestionIssues(false)
              setIsActiveVideoIssues(false)
              setIsActiveNoticeBoard(false)
       };
       useEffect(() => {
              const part = location.pathname;
              const parts = part.split('/');
              const result = parts.slice(0, 3).join('/');
              if (result == "/dashboard_admin/exams") {
                     handleClickExams()
              }
       }, [location])
       /* Lives */
       const handleClickLives = () => {
              setIsActiveDashboard(false);
              setIsActiveUser(false);
              setOpenListUser(false);
              setIsActiveStudent(false);
              setIsActiveParent(false);
              setIsActiveTeacher(false);
              setIsActiveAdmin(false);
              setIsActiveEducation(false)
              setOpenListEducation(false)
              setIsActiveCategories(false)
              setIsActiveSubject(false)
              setIsActiveBundles(false)
              setIsActiveQuestionsBank(false)
              setIsActiveHomeWork(false)
              setIsActiveRevision(false)
              setIsActivExams(false)
              setIsActiveLives(true)
              setOpenListLives(true)
              setIsActiveLive(true)
              setIsActiveRecordedLive(false)
              setIsActiveMarketing(false)
              setOpenListMarketing(false)
              setIsActiveDiscount(false)
              setIsActivePromoCode(false)
              setIsActiveReview(false)
              setIsActivePopUp(false)
              setIsActiveFinancial(false)
              setOpenListFinancial(false)
              setIsActiveFinancialPendingPayments(false)
              setIsActiveFinancialPayments(false)
              setIsActiveAffiliate(false)
              setOpenListAffiliate(false)
              setIsActiveAffiliateUser(false)
              setIsActiveAffiliatePaymentMethod(false)
              setIsActiveAffiliateCommissions(false)
              setIsActiveAffiliateBonus(false)
              setIsActiveAffiliatePayout(false)
              setIsActiveSupport(false)
              setOpenListSupport(false)
              setIsActiveComplaints(false)
              setIsActiveSuggestions(false)
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
              setIsActiveQuestionIssues(false)
              setIsActiveVideoIssues(false)
              setIsActiveNoticeBoard(false)
       };
       useEffect(() => {
              const part = location.pathname;
              const parts = part.split('/');
              const result = parts.slice(0, 4).join('/');
              console.log('resultLives', result)
              // if (result == "/dashboard_admin/lives") {
              //        handleClickLives()
              //        // navigate('lives/live');

              // }

              // Check only if the path matches without constantly re-triggering state updates
              if (result === "/dashboard_admin/lives" || result === "/dashboard_admin/lives/") {
                     handleClickLives(); // Calls state changes
                     navigate('lives/live'); // Prevent triggering navigate on every render
              }
       }, [location])
       /* Childern Lives */
       const handleClickLive = () => {
              setIsActiveDashboard(false);
              setIsActiveUser(false);
              setOpenListUser(false);
              setIsActiveStudent(false);
              setIsActiveParent(false);
              setIsActiveTeacher(false);
              setIsActiveAdmin(false);
              setIsActiveEducation(false)
              setOpenListEducation(false)
              setIsActiveCategories(false)
              setIsActiveSubject(false)
              setIsActiveBundles(false)
              setIsActiveQuestionsBank(false)
              setIsActiveHomeWork(false)
              setIsActiveRevision(false)
              setIsActivExams(false)
              setIsActiveLives(true)
              setOpenListLives(true)
              setIsActiveLive(true)
              setIsActiveRecordedLive(false)
              setIsActiveMarketing(false)
              setOpenListMarketing(false)
              setIsActiveDiscount(false)
              setIsActivePromoCode(false)
              setIsActiveReview(false)
              setIsActivePopUp(false)
              setIsActiveFinancial(false)
              setOpenListFinancial(false)
              setIsActiveFinancialPendingPayments(false)
              setIsActiveFinancialPayments(false)
              setIsActiveAffiliate(false)
              setOpenListAffiliate(false)
              setIsActiveAffiliateUser(false)
              setIsActiveAffiliatePaymentMethod(false)
              setIsActiveAffiliateCommissions(false)
              setIsActiveAffiliateBonus(false)
              setIsActiveAffiliatePayout(false)
              setIsActiveSupport(false)
              setOpenListSupport(false)
              setIsActiveComplaints(false)
              setIsActiveSuggestions(false)
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
              setIsActiveQuestionIssues(false)
              setIsActiveVideoIssues(false)
              setIsActiveNoticeBoard(false)
       };
       useEffect(() => {
              const part = location.pathname;
              const parts = part.split('/');
              const result = parts.slice(0, 4).join('/');
              if (result == "/dashboard_admin/lives/live") {
                     handleClickLive()
              }
       }, [location])
       const handleClickRecordedLive = () => {
              setIsActiveDashboard(false);
              setIsActiveUser(false);
              setOpenListUser(false);
              setIsActiveStudent(false);
              setIsActiveParent(false);
              setIsActiveTeacher(false);
              setIsActiveAdmin(false);
              setIsActiveEducation(false)
              setOpenListEducation(false)
              setIsActiveCategories(false)
              setIsActiveSubject(false)
              setIsActiveBundles(false)
              setIsActiveQuestionsBank(false)
              setIsActiveHomeWork(false)
              setIsActiveRevision(false)
              setIsActivExams(false)
              setIsActiveLives(true)
              setOpenListLives(true)
              setIsActiveLive(false)
              setIsActiveRecordedLive(true)
              setIsActiveMarketing(false)
              setOpenListMarketing(false)
              setIsActiveDiscount(false)
              setIsActivePromoCode(false)
              setIsActiveReview(false)
              setIsActivePopUp(false)
              setIsActiveFinancial(false)
              setOpenListFinancial(false)
              setIsActiveFinancialPendingPayments(false)
              setIsActiveFinancialPayments(false)
              setIsActiveAffiliate(false)
              setOpenListAffiliate(false)
              setIsActiveAffiliateUser(false)
              setIsActiveAffiliatePaymentMethod(false)
              setIsActiveAffiliateCommissions(false)
              setIsActiveAffiliateBonus(false)
              setIsActiveAffiliatePayout(false)
              setIsActiveSupport(false)
              setOpenListSupport(false)
              setIsActiveComplaints(false)
              setIsActiveSuggestions(false)
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
              setIsActiveQuestionIssues(false)
              setIsActiveVideoIssues(false)
              setIsActiveNoticeBoard(false)
       };
       useEffect(() => {
              const part = location.pathname;
              const parts = part.split('/');
              const result = parts.slice(0, 4).join('/');
              if (result == "/dashboard_admin/lives/recorded_live") {
                     handleClickRecordedLive()
              }
       }, [location])
       /* // Childern Lives */
       /* // Lives */
       /* Marketing */
       const handleClickMarketing = () => {
              setIsActiveDashboard(false);
              setIsActiveUser(false);
              setOpenListUser(false);
              setIsActiveStudent(false);
              setIsActiveParent(false);
              setIsActiveTeacher(false);
              setIsActiveAdmin(false);
              setIsActiveEducation(false)
              setOpenListEducation(false)
              setIsActiveCategories(false)
              setIsActiveSubject(false)
              setIsActiveBundles(false)
              setIsActiveQuestionsBank(false)
              setIsActiveHomeWork(false)
              setIsActiveRevision(false)
              setIsActivExams(false)
              setIsActiveLives(false)
              setOpenListLives(false)
              setIsActiveLive(false)
              setIsActiveRecordedLive(false)
              setIsActiveMarketing(true)
              setOpenListMarketing(true)
              setIsActiveDiscount(true)
              setIsActivePromoCode(false)
              setIsActiveReview(false)
              setIsActivePopUp(false)
              setIsActiveFinancial(false)
              setOpenListFinancial(false)
              setIsActiveFinancialPendingPayments(false)
              setIsActiveFinancialPayments(false)
              setIsActiveAffiliate(false)
              setOpenListAffiliate(false)
              setIsActiveAffiliateUser(false)
              setIsActiveAffiliatePaymentMethod(false)
              setIsActiveAffiliateCommissions(false)
              setIsActiveAffiliateBonus(false)
              setIsActiveAffiliatePayout(false)
              setIsActiveSupport(false)
              setOpenListSupport(false)
              setIsActiveComplaints(false)
              setIsActiveSuggestions(false)
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
              setIsActiveQuestionIssues(false)
              setIsActiveVideoIssues(false)
              setIsActiveNoticeBoard(false)
       };
       useEffect(() => {
              const part = location.pathname;
              const parts = part.split('/');
              const result = parts.slice(0, 3).join('/');
              if (result == "/dashboard_admin/discount") {
                     handleClickMarketing()
              }
       }, [location])
       const handleClickDiscount = () => {
              setIsActiveDashboard(false);
              setIsActiveUser(false);
              setOpenListUser(false);
              setIsActiveStudent(false);
              setIsActiveParent(false);
              setIsActiveTeacher(false);
              setIsActiveAdmin(false);
              setIsActiveEducation(false)
              setOpenListEducation(false)
              setIsActiveCategories(false)
              setIsActiveSubject(false)
              setIsActiveBundles(false)
              setIsActiveQuestionsBank(false)
              setIsActiveHomeWork(false)
              setIsActiveRevision(false)
              setIsActivExams(false)
              setIsActiveLives(false)
              setOpenListLives(false)
              setIsActiveLive(false)
              setIsActiveRecordedLive(false)
              setIsActiveMarketing(true)
              setOpenListMarketing(true)
              setIsActiveDiscount(true)
              setIsActivePromoCode(false)
              setIsActiveReview(false)
              setIsActivePopUp(false)
              setIsActiveFinancial(false)
              setOpenListFinancial(false)
              setIsActiveFinancialPendingPayments(false)
              setIsActiveFinancialPayments(false)
              setIsActiveAffiliate(false)
              setOpenListAffiliate(false)
              setIsActiveAffiliateUser(false)
              setIsActiveAffiliatePaymentMethod(false)
              setIsActiveAffiliateCommissions(false)
              setIsActiveAffiliateBonus(false)
              setIsActiveAffiliatePayout(false)
              setIsActiveSupport(false)
              setOpenListSupport(false)
              setIsActiveComplaints(false)
              setIsActiveSuggestions(false)
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
              setIsActiveQuestionIssues(false)
              setIsActiveVideoIssues(false)
              setIsActiveNoticeBoard(false)
       }
       const handleClickPromoCode = () => {
              setIsActiveDashboard(false);
              setIsActiveUser(false);
              setOpenListUser(false);
              setIsActiveStudent(false);
              setIsActiveParent(false);
              setIsActiveTeacher(false);
              setIsActiveAdmin(false);
              setIsActiveEducation(false)
              setOpenListEducation(false)
              setIsActiveCategories(false)
              setIsActiveSubject(false)
              setIsActiveBundles(false)
              setIsActiveQuestionsBank(false)
              setIsActiveHomeWork(false)
              setIsActiveRevision(false)
              setIsActivExams(false)
              setIsActiveLives(false)
              setOpenListLives(false)
              setIsActiveLive(false)
              setIsActiveRecordedLive(false)
              setIsActiveMarketing(true)
              setOpenListMarketing(true)
              setIsActiveDiscount(false)
              setIsActivePromoCode(true)
              setIsActiveReview(false)
              setIsActivePopUp(false)
              setIsActiveFinancial(false)
              setOpenListFinancial(false)
              setIsActiveFinancialPendingPayments(false)
              setIsActiveFinancialPayments(false)
              setIsActiveAffiliate(false)
              setOpenListAffiliate(false)
              setIsActiveAffiliateUser(false)
              setIsActiveAffiliatePaymentMethod(false)
              setIsActiveAffiliateCommissions(false)
              setIsActiveAffiliateBonus(false)
              setIsActiveAffiliatePayout(false)
              setIsActiveSupport(false)
              setOpenListSupport(false)
              setIsActiveComplaints(false)
              setIsActiveSuggestions(false)
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
              setIsActiveQuestionIssues(false)
              setIsActiveVideoIssues(false)
              setIsActiveNoticeBoard(false)
       }
       useEffect(() => {
              const part = location.pathname;
              const parts = part.split('/');
              const result = parts.slice(0, 3).join('/');
              if (result == "/dashboard_admin/promo_code") {
                     handleClickPromoCode()
              }
       }, [location])
       const handleClickReviews = () => {
              setIsActiveDashboard(false);
              setIsActiveUser(false);
              setOpenListUser(false);
              setIsActiveStudent(false);
              setIsActiveParent(false);
              setIsActiveTeacher(false);
              setIsActiveAdmin(false);
              setIsActiveEducation(false)
              setOpenListEducation(false)
              setIsActiveCategories(false)
              setIsActiveSubject(false)
              setIsActiveBundles(false)
              setIsActiveQuestionsBank(false)
              setIsActiveHomeWork(false)
              setIsActiveRevision(false)
              setIsActivExams(false)
              setIsActiveLives(false)
              setOpenListLives(false)
              setIsActiveLive(false)
              setIsActiveRecordedLive(false)
              setIsActiveMarketing(true)
              setOpenListMarketing(true)
              setIsActiveDiscount(false)
              setIsActivePromoCode(false)
              setIsActiveReview(true)
              setIsActivePopUp(false)
              setIsActiveFinancial(false)
              setOpenListFinancial(false)
              setIsActiveFinancialPendingPayments(false)
              setIsActiveFinancialPayments(false)
              setIsActiveAffiliate(false)
              setOpenListAffiliate(false)
              setIsActiveAffiliateUser(false)
              setIsActiveAffiliatePaymentMethod(false)
              setIsActiveAffiliateCommissions(false)
              setIsActiveAffiliateBonus(false)
              setIsActiveAffiliatePayout(false)
              setIsActiveSupport(false)
              setOpenListSupport(false)
              setIsActiveComplaints(false)
              setIsActiveSuggestions(false)
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
              setIsActiveQuestionIssues(false)
              setIsActiveVideoIssues(false)
              setIsActiveNoticeBoard(false)
       }
       useEffect(() => {
              const part = location.pathname;
              const parts = part.split('/');
              const result = parts.slice(0, 3).join('/');
              if (result == "/dashboard_admin/review") {
                     handleClickReviews()
              }
       }, [location])
       const handleClickPopUp = () => {
              setIsActiveDashboard(false);
              setIsActiveUser(false);
              setOpenListUser(false);
              setIsActiveStudent(false);
              setIsActiveParent(false);
              setIsActiveTeacher(false);
              setIsActiveAdmin(false);
              setIsActiveEducation(false)
              setOpenListEducation(false)
              setIsActiveCategories(false)
              setIsActiveSubject(false)
              setIsActiveBundles(false)
              setIsActiveQuestionsBank(false)
              setIsActiveHomeWork(false)
              setIsActiveRevision(false)
              setIsActivExams(false)
              setIsActiveLives(false)
              setOpenListLives(false)
              setIsActiveLive(false)
              setIsActiveRecordedLive(false)
              setIsActiveMarketing(true)
              setOpenListMarketing(true)
              setIsActiveDiscount(false)
              setIsActivePromoCode(false)
              setIsActiveReview(false)
              setIsActivePopUp(true)
              setIsActiveFinancial(false)
              setOpenListFinancial(false)
              setIsActiveFinancialPendingPayments(false)
              setIsActiveFinancialPayments(false)
              setIsActiveAffiliate(false)
              setOpenListAffiliate(false)
              setIsActiveAffiliateUser(false)
              setIsActiveAffiliatePaymentMethod(false)
              setIsActiveAffiliateCommissions(false)
              setIsActiveAffiliateBonus(false)
              setIsActiveAffiliatePayout(false)
              setIsActiveSupport(false)
              setOpenListSupport(false)
              setIsActiveComplaints(false)
              setIsActiveSuggestions(false)
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
              setIsActiveQuestionIssues(false)
              setIsActiveVideoIssues(false)
              setIsActiveNoticeBoard(false)
       }
       useEffect(() => {
              const part = location.pathname;
              const parts = part.split('/');
              const result = parts.slice(0, 3).join('/');
              if (result == "/dashboard_admin/pop_up") {
                     handleClickPopUp()
              }
       }, [location])
       /* ////Marketing */
       /* Financial */
       const handleClickFinancial = () => {
              setIsActiveDashboard(false);
              setIsActiveUser(false);
              setOpenListUser(false);
              setIsActiveStudent(false);
              setIsActiveParent(false);
              setIsActiveTeacher(false);
              setIsActiveAdmin(false);
              setIsActiveEducation(false)
              setOpenListEducation(false)
              setIsActiveCategories(false)
              setIsActiveSubject(false)
              setIsActiveBundles(false)
              setIsActiveQuestionsBank(false)
              setIsActiveHomeWork(false)
              setIsActiveRevision(false)
              setIsActivExams(false)
              setIsActiveLives(false)
              setOpenListLives(false)
              setIsActiveLive(false)
              setIsActiveRecordedLive(false)
              setIsActiveMarketing(false)
              setOpenListMarketing(false)
              setIsActiveDiscount(false)
              setIsActivePromoCode(false)
              setIsActiveReview(false)
              setIsActivePopUp(false)
              setIsActiveFinancial(true)
              setOpenListFinancial(true)
              setIsActiveFinancialPendingPayments(true)
              setIsActiveFinancialPayments(false)
              setIsActiveAffiliate(false)
              setOpenListAffiliate(false)
              setIsActiveAffiliateUser(false)
              setIsActiveAffiliatePaymentMethod(false)
              setIsActiveAffiliateCommissions(false)
              setIsActiveAffiliateBonus(false)
              setIsActiveAffiliatePayout(false)
              setIsActiveSupport(false)
              setOpenListSupport(false)
              setIsActiveComplaints(false)
              setIsActiveSuggestions(false)
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
              setIsActiveQuestionIssues(false)
              setIsActiveVideoIssues(false)
              setIsActiveNoticeBoard(false)
       };
       useEffect(() => {
              const part = location.pathname;
              const parts = part.split('/');
              const result = parts.slice(0, 3).join('/');
              if (result == "/dashboard_admin/financial_pending_Payments") {
                     handleClickFinancial()
              }
       }, [location])
       const handleClickFinancialPendingPayments = () => {
              setIsActiveDashboard(false);
              setIsActiveUser(false);
              setOpenListUser(false);
              setIsActiveStudent(false);
              setIsActiveParent(false);
              setIsActiveTeacher(false);
              setIsActiveAdmin(false);
              setIsActiveEducation(false)
              setOpenListEducation(false)
              setIsActiveCategories(false)
              setIsActiveSubject(false)
              setIsActiveBundles(false)
              setIsActiveQuestionsBank(false)
              setIsActiveHomeWork(false)
              setIsActiveRevision(false)
              setIsActivExams(false)
              setIsActiveLives(false)
              setOpenListLives(false)
              setIsActiveLive(false)
              setIsActiveRecordedLive(false)
              setIsActiveMarketing(false)
              setOpenListMarketing(false)
              setIsActiveDiscount(false)
              setIsActivePromoCode(false)
              setIsActiveReview(false)
              setIsActivePopUp(false)
              setIsActiveFinancial(true)
              setOpenListFinancial(true)
              setIsActiveFinancialPendingPayments(true)
              setIsActiveFinancialPayments(false)
              setIsActiveAffiliate(false)
              setOpenListAffiliate(false)
              setIsActiveAffiliateUser(false)
              setIsActiveAffiliatePaymentMethod(false)
              setIsActiveAffiliateCommissions(false)
              setIsActiveAffiliateBonus(false)
              setIsActiveAffiliatePayout(false)
              setIsActiveSupport(false)
              setOpenListSupport(false)
              setIsActiveComplaints(false)
              setIsActiveSuggestions(false)
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
              setIsActiveQuestionIssues(false)
              setIsActiveVideoIssues(false)
              setIsActiveNoticeBoard(false)
       };
       const handleClickFinancialPayments = () => {
              setIsActiveDashboard(false);
              setIsActiveUser(false);
              setOpenListUser(false);
              setIsActiveStudent(false);
              setIsActiveParent(false);
              setIsActiveTeacher(false);
              setIsActiveAdmin(false);
              setIsActiveEducation(false)
              setOpenListEducation(false)
              setIsActiveCategories(false)
              setIsActiveSubject(false)
              setIsActiveBundles(false)
              setIsActiveQuestionsBank(false)
              setIsActiveHomeWork(false)
              setIsActiveRevision(false)
              setIsActivExams(false)
              setIsActiveLives(false)
              setOpenListLives(false)
              setIsActiveLive(false)
              setIsActiveRecordedLive(false)
              setIsActiveMarketing(false)
              setOpenListMarketing(false)
              setIsActiveDiscount(false)
              setIsActivePromoCode(false)
              setIsActiveReview(false)
              setIsActivePopUp(false)
              setIsActiveFinancial(true)
              setOpenListFinancial(true)
              setIsActiveFinancialPendingPayments(false)
              setIsActiveFinancialPayments(true)
              setIsActiveAffiliate(false)
              setOpenListAffiliate(false)
              setIsActiveAffiliateUser(false)
              setIsActiveAffiliatePaymentMethod(false)
              setIsActiveAffiliateCommissions(false)
              setIsActiveAffiliateBonus(false)
              setIsActiveAffiliatePayout(false)
              setIsActiveSupport(false)
              setOpenListSupport(false)
              setIsActiveComplaints(false)
              setIsActiveSuggestions(false)
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
              setIsActiveQuestionIssues(false)
              setIsActiveVideoIssues(false)
              setIsActiveNoticeBoard(false)
       };
       useEffect(() => {
              const part = location.pathname;
              const parts = part.split('/');
              const result = parts.slice(0, 3).join('/');
              if (result == "/dashboard_admin/financial_payments") {
                     handleClickFinancialPayments()
              }
       }, [location])
       /* ///Financial */
       /* Affiliate */
       const handleClickAffiliate = () => {
              setIsActiveDashboard(false);
              setIsActiveUser(false);
              setOpenListUser(false);
              setIsActiveStudent(false);
              setIsActiveParent(false);
              setIsActiveTeacher(false);
              setIsActiveAdmin(false);
              setIsActiveEducation(false)
              setOpenListEducation(false)
              setIsActiveCategories(false)
              setIsActiveSubject(false)
              setIsActiveBundles(false)
              setIsActiveQuestionsBank(false)
              setIsActiveHomeWork(false)
              setIsActiveRevision(false)
              setIsActivExams(false)
              setIsActiveLives(false)
              setOpenListLives(false)
              setIsActiveLive(false)
              setIsActiveRecordedLive(false)
              setIsActiveMarketing(false)
              setOpenListMarketing(false)
              setIsActiveDiscount(false)
              setIsActivePromoCode(false)
              setIsActiveReview(false)
              setIsActivePopUp(false)
              setIsActiveFinancial(false)
              setOpenListFinancial(false)
              setIsActiveFinancialPendingPayments(false)
              setIsActiveFinancialPayments(false)
              setIsActiveAffiliate(true)
              setOpenListAffiliate(true)
              setIsActiveAffiliateUser(true)
              setIsActiveAffiliatePaymentMethod(false)
              setIsActiveAffiliateCommissions(false)
              setIsActiveAffiliateBonus(false)
              setIsActiveAffiliatePayout(false)
              setIsActiveSupport(false)
              setOpenListSupport(false)
              setIsActiveComplaints(false)
              setIsActiveSuggestions(false)
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
              setIsActiveQuestionIssues(false)
              setIsActiveVideoIssues(false)
              setIsActiveNoticeBoard(false)
       };
       useEffect(() => {
              const part = location.pathname;
              const parts = part.split('/');
              const result = parts.slice(0, 3).join('/');
              if (result == "/dashboard_admin/affiliate_user") {
                     handleClickAffiliate()
              }
       }, [location])
       const handleClickAffiliateUser = () => {
              setIsActiveDashboard(false);
              setIsActiveUser(false);
              setOpenListUser(false);
              setIsActiveStudent(false);
              setIsActiveParent(false);
              setIsActiveTeacher(false);
              setIsActiveAdmin(false);
              setIsActiveEducation(false)
              setOpenListEducation(false)
              setIsActiveCategories(false)
              setIsActiveSubject(false)
              setIsActiveBundles(false)
              setIsActiveQuestionsBank(false)
              setIsActiveHomeWork(false)
              setIsActiveRevision(false)
              setIsActivExams(false)
              setIsActiveLives(false)
              setOpenListLives(false)
              setIsActiveLive(false)
              setIsActiveRecordedLive(false)
              setIsActiveMarketing(false)
              setOpenListMarketing(false)
              setIsActiveDiscount(false)
              setIsActivePromoCode(false)
              setIsActiveReview(false)
              setIsActivePopUp(false)
              setIsActiveFinancial(false)
              setOpenListFinancial(false)
              setIsActiveFinancialPendingPayments(false)
              setIsActiveFinancialPayments(false)
              setIsActiveAffiliate(true)
              setOpenListAffiliate(true)
              setIsActiveAffiliateUser(true)
              setIsActiveAffiliatePaymentMethod(false)
              setIsActiveAffiliateCommissions(false)
              setIsActiveAffiliateBonus(false)
              setIsActiveAffiliatePayout(false)
              setIsActiveSupport(false)
              setOpenListSupport(false)
              setIsActiveComplaints(false)
              setIsActiveSuggestions(false)
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
              setIsActiveQuestionIssues(false)
              setIsActiveVideoIssues(false)
              setIsActiveNoticeBoard(false)
       };
       const handleClickAffiliatePaymentMethod = () => {
              setIsActiveDashboard(false);
              setIsActiveUser(false);
              setOpenListUser(false);
              setIsActiveStudent(false);
              setIsActiveParent(false);
              setIsActiveTeacher(false);
              setIsActiveAdmin(false);
              setIsActiveEducation(false)
              setOpenListEducation(false)
              setIsActiveCategories(false)
              setIsActiveSubject(false)
              setIsActiveBundles(false)
              setIsActiveQuestionsBank(false)
              setIsActiveHomeWork(false)
              setIsActiveRevision(false)
              setIsActivExams(false)
              setIsActiveLives(false)
              setOpenListLives(false)
              setIsActiveLive(false)
              setIsActiveRecordedLive(false)
              setIsActiveMarketing(false)
              setOpenListMarketing(false)
              setIsActiveDiscount(false)
              setIsActivePromoCode(false)
              setIsActiveReview(false)
              setIsActivePopUp(false)
              setIsActiveFinancial(false)
              setOpenListFinancial(false)
              setIsActiveFinancialPendingPayments(false)
              setIsActiveFinancialPayments(false)
              setIsActiveAffiliate(true)
              setOpenListAffiliate(true)
              setIsActiveAffiliateUser(false)
              setIsActiveAffiliatePaymentMethod(true)
              setIsActiveAffiliateCommissions(false)
              setIsActiveAffiliateBonus(false)
              setIsActiveAffiliatePayout(false)
              setIsActiveSupport(false)
              setOpenListSupport(false)
              setIsActiveComplaints(false)
              setIsActiveSuggestions(false)
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
              setIsActiveQuestionIssues(false)
              setIsActiveVideoIssues(false)
              setIsActiveNoticeBoard(false)
       };
       useEffect(() => {
              const part = location.pathname;
              const parts = part.split('/');
              const result = parts.slice(0, 3).join('/');
              if (result == "/dashboard_admin/affiliate_Payment_method") {
                     handleClickAffiliatePaymentMethod()
              }
       }, [location])
       const handleClickAffiliateCommissions = () => {
              setIsActiveDashboard(false);
              setIsActiveUser(false);
              setOpenListUser(false);
              setIsActiveStudent(false);
              setIsActiveParent(false);
              setIsActiveTeacher(false);
              setIsActiveAdmin(false);
              setIsActiveEducation(false)
              setOpenListEducation(false)
              setIsActiveCategories(false)
              setIsActiveSubject(false)
              setIsActiveBundles(false)
              setIsActiveQuestionsBank(false)
              setIsActiveHomeWork(false)
              setIsActiveRevision(false)
              setIsActivExams(false)
              setIsActiveLives(false)
              setOpenListLives(false)
              setIsActiveLive(false)
              setIsActiveRecordedLive(false)
              setIsActiveMarketing(false)
              setOpenListMarketing(false)
              setIsActiveDiscount(false)
              setIsActivePromoCode(false)
              setIsActiveReview(false)
              setIsActivePopUp(false)
              setIsActiveFinancial(false)
              setOpenListFinancial(false)
              setIsActiveFinancialPendingPayments(false)
              setIsActiveFinancialPayments(false)
              setIsActiveAffiliate(true)
              setOpenListAffiliate(true)
              setIsActiveAffiliateUser(false)
              setIsActiveAffiliatePaymentMethod(false)
              setIsActiveAffiliateCommissions(true)
              setIsActiveAffiliateBonus(false)
              setIsActiveAffiliatePayout(false)
              setIsActiveSupport(false)
              setOpenListSupport(false)
              setIsActiveComplaints(false)
              setIsActiveSuggestions(false)
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
              setIsActiveQuestionIssues(false)
              setIsActiveVideoIssues(false)
              setIsActiveNoticeBoard(false)
       };
       useEffect(() => {
              const part = location.pathname;
              const parts = part.split('/');
              const result = parts.slice(0, 3).join('/');
              if (result == "/dashboard_admin/affiliate_commissions") {
                     handleClickAffiliateCommissions()
              }
       }, [location])
       const handleClickAffiliateBonus = () => {
              setIsActiveDashboard(false);
              setIsActiveUser(false);
              setOpenListUser(false);
              setIsActiveStudent(false);
              setIsActiveParent(false);
              setIsActiveTeacher(false);
              setIsActiveAdmin(false);
              setIsActiveEducation(false)
              setOpenListEducation(false)
              setIsActiveCategories(false)
              setIsActiveSubject(false)
              setIsActiveBundles(false)
              setIsActiveQuestionsBank(false)
              setIsActiveHomeWork(false)
              setIsActiveRevision(false)
              setIsActivExams(false)
              setIsActiveLives(false)
              setOpenListLives(false)
              setIsActiveLive(false)
              setIsActiveRecordedLive(false)
              setIsActiveMarketing(false)
              setOpenListMarketing(false)
              setIsActiveDiscount(false)
              setIsActivePromoCode(false)
              setIsActiveReview(false)
              setIsActivePopUp(false)
              setIsActiveFinancial(false)
              setOpenListFinancial(false)
              setIsActiveFinancialPendingPayments(false)
              setIsActiveFinancialPayments(false)
              setIsActiveAffiliate(true)
              setOpenListAffiliate(true)
              setIsActiveAffiliateUser(false)
              setIsActiveAffiliatePaymentMethod(false)
              setIsActiveAffiliateCommissions(false)
              setIsActiveAffiliateBonus(true)
              setIsActiveAffiliatePayout(false)
              setIsActiveSupport(false)
              setOpenListSupport(false)
              setIsActiveComplaints(false)
              setIsActiveSuggestions(false)
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
              setIsActiveQuestionIssues(false)
              setIsActiveVideoIssues(false)
              setIsActiveNoticeBoard(false)
       };
       useEffect(() => {
              const part = location.pathname;
              const parts = part.split('/');
              const result = parts.slice(0, 3).join('/');
              if (result == "/dashboard_admin/affiliate_bonus") {
                     handleClickAffiliateBonus()
              }
       }, [location])

       const handleClickAffiliatePayout = () => {
              setIsActiveDashboard(false);
              setIsActiveUser(false);
              setOpenListUser(false);
              setIsActiveStudent(false);
              setIsActiveParent(false);
              setIsActiveTeacher(false);
              setIsActiveAdmin(false);
              setIsActiveEducation(false)
              setOpenListEducation(false)
              setIsActiveCategories(false)
              setIsActiveSubject(false)
              setIsActiveBundles(false)
              setIsActiveQuestionsBank(false)
              setIsActiveHomeWork(false)
              setIsActiveRevision(false)
              setIsActivExams(false)
              setIsActiveLives(false)
              setOpenListLives(false)
              setIsActiveLive(false)
              setIsActiveRecordedLive(false)
              setIsActiveMarketing(false)
              setOpenListMarketing(false)
              setIsActiveDiscount(false)
              setIsActivePromoCode(false)
              setIsActiveReview(false)
              setIsActivePopUp(false)
              setIsActiveFinancial(false)
              setOpenListFinancial(false)
              setIsActiveFinancialPendingPayments(false)
              setIsActiveFinancialPayments(false)
              setIsActiveAffiliate(true)
              setOpenListAffiliate(true)
              setIsActiveAffiliateUser(false)
              setIsActiveAffiliatePaymentMethod(false)
              setIsActiveAffiliateCommissions(false)
              setIsActiveAffiliateBonus(false)
              setIsActiveAffiliatePayout(true)
              setIsActiveSupport(false)
              setOpenListSupport(false)
              setIsActiveComplaints(false)
              setIsActiveSuggestions(false)
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
              setIsActiveQuestionIssues(false)
              setIsActiveVideoIssues(false)
              setIsActiveNoticeBoard(false)
       };
       useEffect(() => {
              const part = location.pathname;
              const parts = part.split('/');
              const result = parts.slice(0, 3).join('/');
              if (result == "/dashboard_admin/affiliate_payout") {
                     handleClickAffiliatePayout()
              }
       }, [location])

       /* ///Affiliate */
       /* Support */
       const handleClickSupport = () => {
              setIsActiveDashboard(false);
              setIsActiveUser(false);
              setOpenListUser(false);
              setIsActiveStudent(false);
              setIsActiveParent(false);
              setIsActiveTeacher(false);
              setIsActiveAdmin(false);
              setIsActiveEducation(false)
              setOpenListEducation(false)
              setIsActiveCategories(false)
              setIsActiveSubject(false)
              setIsActiveBundles(false)
              setIsActiveQuestionsBank(false)
              setIsActiveHomeWork(false)
              setIsActiveRevision(false)
              setIsActivExams(false)
              setIsActiveLives(false)
              setOpenListLives(false)
              setIsActiveLive(false)
              setIsActiveRecordedLive(false)
              setIsActiveMarketing(false)
              setOpenListMarketing(false)
              setIsActiveDiscount(false)
              setIsActivePromoCode(false)
              setIsActiveReview(false)
              setIsActivePopUp(false)
              setIsActiveFinancial(false)
              setOpenListFinancial(false)
              setIsActiveFinancialPendingPayments(false)
              setIsActiveFinancialPayments(false)
              setIsActiveAffiliate(false)
              setOpenListAffiliate(false)
              setIsActiveAffiliateUser(false)
              setIsActiveAffiliatePaymentMethod(false)
              setIsActiveAffiliateCommissions(false)
              setIsActiveAffiliateBonus(false)
              setIsActiveAffiliatePayout(false)
              setIsActiveSupport(true)
              setOpenListSupport(true)
              setIsActiveComplaints(true)
              setIsActiveSuggestions(false)
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
              setIsActiveQuestionIssues(false)
              setIsActiveVideoIssues(false)
              setIsActiveNoticeBoard(false)
       };
       useEffect(() => {
              const part = location.pathname;
              const parts = part.split('/');
              const result = parts.slice(0, 4).join('/');

              console.log('parts1', parts)
              console.log('result1', result)
              // Check only if the path matches without constantly re-triggering state updates
              if (result === "/dashboard_admin/support" || result === "/dashboard_admin/support/") {
                     handleClickSupport(); // Calls state changes
                     navigate('support/complaints'); // Prevent triggering navigate on every render
              }
       }, [location]); // Only trigger when the `pathname` changes
       // Complaints 
       const handleClickComplaints = () => {
              setIsActiveDashboard(false);
              setIsActiveUser(false);
              setOpenListUser(false);
              setIsActiveStudent(false);
              setIsActiveParent(false);
              setIsActiveTeacher(false);
              setIsActiveAdmin(false);
              setIsActiveEducation(false)
              setOpenListEducation(false)
              setIsActiveCategories(false)
              setIsActiveSubject(false)
              setIsActiveBundles(false)
              setIsActiveQuestionsBank(false)
              setIsActiveHomeWork(false)
              setIsActiveRevision(false)
              setIsActivExams(false)
              setIsActiveLives(false)
              setOpenListLives(false)
              setIsActiveLive(false)
              setIsActiveRecordedLive(false)
              setIsActiveMarketing(false)
              setOpenListMarketing(false)
              setIsActiveDiscount(false)
              setIsActivePromoCode(false)
              setIsActiveReview(false)
              setIsActivePopUp(false)
              setIsActiveFinancial(false)
              setOpenListFinancial(false)
              setIsActiveFinancialPendingPayments(false)
              setIsActiveFinancialPayments(false)
              setIsActiveAffiliate(false)
              setOpenListAffiliate(false)
              setIsActiveAffiliateUser(false)
              setIsActiveAffiliatePaymentMethod(false)
              setIsActiveAffiliateCommissions(false)
              setIsActiveAffiliateBonus(false)
              setIsActiveAffiliatePayout(false)
              setIsActiveSupport(true)
              setOpenListSupport(true)
              setIsActiveComplaints(true)
              setIsActiveSuggestions(false)
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
              setIsActiveQuestionIssues(false)
              setIsActiveVideoIssues(false)
              setIsActiveNoticeBoard(false)
       };
       useEffect(() => {
              const part = location.pathname;
              const parts = part.split('/');
              const result = parts.slice(0, 4).join('/');
              console.log('parts2', parts)
              console.log('result2', result)
              if (result == "/dashboard_admin/support/complaints") {
                     handleClickComplaints()
              }
       }, [location])
       // Suggestions
       const handleClickSuggestions = () => {
              setIsActiveDashboard(false);
              setIsActiveUser(false);
              setOpenListUser(false);
              setIsActiveStudent(false);
              setIsActiveParent(false);
              setIsActiveTeacher(false);
              setIsActiveAdmin(false);
              setIsActiveEducation(false)
              setOpenListEducation(false)
              setIsActiveCategories(false)
              setIsActiveSubject(false)
              setIsActiveBundles(false)
              setIsActiveQuestionsBank(false)
              setIsActiveHomeWork(false)
              setIsActiveRevision(false)
              setIsActivExams(false)
              setIsActiveLives(false)
              setOpenListLives(false)
              setIsActiveLive(false)
              setIsActiveRecordedLive(false)
              setIsActiveMarketing(false)
              setOpenListMarketing(false)
              setIsActiveDiscount(false)
              setIsActivePromoCode(false)
              setIsActiveReview(false)
              setIsActivePopUp(false)
              setIsActiveFinancial(false)
              setOpenListFinancial(false)
              setIsActiveFinancialPendingPayments(false)
              setIsActiveFinancialPayments(false)
              setIsActiveAffiliate(false)
              setOpenListAffiliate(false)
              setIsActiveAffiliateUser(false)
              setIsActiveAffiliatePaymentMethod(false)
              setIsActiveAffiliateCommissions(false)
              setIsActiveAffiliateBonus(false)
              setIsActiveAffiliatePayout(false)
              setIsActiveSupport(true)
              setOpenListSupport(true)
              setIsActiveComplaints(false)
              setIsActiveSuggestions(true)
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
              setIsActiveQuestionIssues(false)
              setIsActiveVideoIssues(false)
              setIsActiveNoticeBoard(false)
       };
       useEffect(() => {
              const part = location.pathname;
              const parts = part.split('/');
              const result = parts.slice(0, 4).join('/');
              console.log('parts3', parts)
              console.log('result3', result)
              if (result == "/dashboard_admin/support/suggestions") {
                     handleClickSuggestions()
              }
              console.log('isActiveSuggestions', isActiveSuggestions)
       }, [location])


       /* // Support */
       const handleClickReports = () => {
              setIsActiveDashboard(false);
              setIsActiveUser(false);
              setOpenListUser(false);
              setIsActiveStudent(false);
              setIsActiveParent(false);
              setIsActiveTeacher(false);
              setIsActiveAdmin(false);
              setIsActiveEducation(false)
              setOpenListEducation(false)
              setIsActiveCategories(false)
              setIsActiveSubject(false)
              setIsActiveBundles(false)
              setIsActiveQuestionsBank(false)
              setIsActiveHomeWork(false)
              setIsActiveRevision(false)
              setIsActivExams(false)
              setIsActiveLives(false)
              setOpenListLives(false)
              setIsActiveLive(false)
              setIsActiveRecordedLive(false)
              setIsActiveMarketing(false)
              setOpenListMarketing(false)
              setIsActiveDiscount(false)
              setIsActivePromoCode(false)
              setIsActiveReview(false)
              setIsActivePopUp(false)
              setIsActiveFinancial(false)
              setOpenListFinancial(false)
              setIsActiveFinancialPendingPayments(false)
              setIsActiveFinancialPayments(false)
              setIsActiveAffiliate(false)
              setOpenListAffiliate(false)
              setIsActiveAffiliateUser(false)
              setIsActiveAffiliatePaymentMethod(false)
              setIsActiveAffiliateCommissions(false)
              setIsActiveAffiliateBonus(false)
              setIsActiveAffiliatePayout(false)
              setIsActiveSupport(false)
              setOpenListSupport(false)
              setIsActiveComplaints(false)
              setIsActiveSuggestions(false)
              setIsActiveReports(true)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
              setIsActiveQuestionIssues(false)
              setIsActiveVideoIssues(false)
              setIsActiveNoticeBoard(false)
       };
       useEffect(() => {
              const part = location.pathname;
              const parts = part.split('/');
              const result = parts.slice(0, 3).join('/');
              if (result == "/dashboard_admin/reports") {
                     handleClickReports()
              }
       }, [location])
       /* Setting */
       const handleClickSetting = () => {
              setIsActiveDashboard(false);
              setIsActiveUser(false);
              setOpenListUser(false);
              setIsActiveStudent(false);
              setIsActiveParent(false);
              setIsActiveTeacher(false);
              setIsActiveAdmin(false);
              setIsActiveEducation(false)
              setOpenListEducation(false)
              setIsActiveCategories(false)
              setIsActiveSubject(false)
              setIsActiveBundles(false)
              setIsActiveQuestionsBank(false)
              setIsActiveHomeWork(false)
              setIsActiveRevision(false)
              setIsActivExams(false)
              setIsActiveLives(false)
              setOpenListLives(false)
              setIsActiveLive(false)
              setIsActiveRecordedLive(false)
              setIsActiveMarketing(false)
              setOpenListMarketing(false)
              setIsActiveDiscount(false)
              setIsActivePromoCode(false)
              setIsActiveReview(false)
              setIsActivePopUp(false)
              setIsActiveFinancial(false)
              setOpenListFinancial(false)
              setIsActiveFinancialPendingPayments(false)
              setIsActiveFinancialPayments(false)
              setIsActiveAffiliate(false)
              setOpenListAffiliate(false)
              setIsActiveAffiliateUser(false)
              setIsActiveAffiliatePaymentMethod(false)
              setIsActiveAffiliateCommissions(false)
              setIsActiveAffiliateBonus(false)
              setIsActiveAffiliatePayout(false)
              setIsActiveSupport(false)
              setOpenListSupport(false)
              setIsActiveComplaints(false)
              setIsActiveSuggestions(false)
              setIsActiveReports(false)
              setIsActiveSetting(true)
              setOpenListSetting(true)
              setIsActiveAdminRoles(true)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActivePaymentMethod(false)
              setIsActiveQuestionIssues(false)
              setIsActiveVideoIssues(false)
              setIsActiveNoticeBoard(false)

       };
       useEffect(() => {
              const part = location.pathname;
              const parts = part.split('/');
              const result = parts.slice(0, 3).join('/');
              if (result == "/dashboard_admin/adminRoles") {
                     handleClickSetting()
              }
       }, [location])
       /* Setting Childern */
       const handleClickAdminRoles = () => {
              setIsActiveDashboard(false);
              setIsActiveUser(false);
              setOpenListUser(false);
              setIsActiveStudent(false);
              setIsActiveParent(false);
              setIsActiveTeacher(false);
              setIsActiveAdmin(false);
              setIsActiveEducation(false)
              setOpenListEducation(false)
              setIsActiveCategories(false)
              setIsActiveSubject(false)
              setIsActiveBundles(false)
              setIsActiveQuestionsBank(false)
              setIsActiveHomeWork(false)
              setIsActiveRevision(false)
              setIsActivExams(false)
              setIsActiveLives(false)
              setOpenListLives(false)
              setIsActiveLive(false)
              setIsActiveRecordedLive(false)
              setIsActiveMarketing(false)
              setOpenListMarketing(false)
              setIsActiveDiscount(false)
              setIsActivePromoCode(false)
              setIsActiveReview(false)
              setIsActivePopUp(false)
              setIsActiveFinancial(false)
              setOpenListFinancial(false)
              setIsActiveFinancialPendingPayments(false)
              setIsActiveFinancialPayments(false)
              setIsActiveAffiliate(false)
              setOpenListAffiliate(false)
              setIsActiveAffiliateUser(false)
              setIsActiveAffiliatePaymentMethod(false)
              setIsActiveAffiliateCommissions(false)
              setIsActiveAffiliateBonus(false)
              setIsActiveAffiliatePayout(false)
              setIsActiveSupport(false)
              setOpenListSupport(false)
              setIsActiveComplaints(false)
              setIsActiveSuggestions(false)
              setIsActiveReports(false)
              setIsActiveSetting(true)
              setOpenListSetting(true)
              setIsActiveAdminRoles(true)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
              setIsActiveQuestionIssues(false)
              setIsActiveVideoIssues(false)
              setIsActiveNoticeBoard(false)
       }
       const handleClickCountries = () => {
              setIsActiveDashboard(false);
              setIsActiveUser(false);
              setOpenListUser(false);
              setIsActiveStudent(false);
              setIsActiveParent(false);
              setIsActiveTeacher(false);
              setIsActiveAdmin(false);
              setIsActiveEducation(false)
              setOpenListEducation(false)
              setIsActiveCategories(false)
              setIsActiveSubject(false)
              setIsActiveBundles(false)
              setIsActiveQuestionsBank(false)
              setIsActiveHomeWork(false)
              setIsActiveRevision(false)
              setIsActivExams(false)
              setIsActiveLives(false)
              setOpenListLives(false)
              setIsActiveLive(false)
              setIsActiveRecordedLive(false)
              setIsActiveMarketing(false)
              setOpenListMarketing(false)
              setIsActiveDiscount(false)
              setIsActivePromoCode(false)
              setIsActiveReview(false)
              setIsActivePopUp(false)
              setIsActiveFinancial(false)
              setOpenListFinancial(false)
              setIsActiveFinancialPendingPayments(false)
              setIsActiveFinancialPayments(false)
              setIsActiveAffiliate(false)
              setOpenListAffiliate(false)
              setIsActiveAffiliateUser(false)
              setIsActiveAffiliatePaymentMethod(false)
              setIsActiveAffiliateCommissions(false)
              setIsActiveAffiliateBonus(false)
              setIsActiveAffiliatePayout(false)
              setIsActiveSupport(false)
              setOpenListSupport(false)
              setIsActiveComplaints(false)
              setIsActiveSuggestions(false)
              setIsActiveReports(false)
              setIsActiveSetting(true)
              setOpenListSetting(true)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(true)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
              setIsActiveQuestionIssues(false)
              setIsActiveVideoIssues(false)
              setIsActiveNoticeBoard(false)
       }
       useEffect(() => {
              const part = location.pathname;
              const parts = part.split('/');
              const result = parts.slice(0, 3).join('/');
              if (result == "/dashboard_admin/countries") {
                     handleClickCountries()
              }
       }, [location])
       const handleClickCities = () => {
              setIsActiveDashboard(false);
              setIsActiveUser(false);
              setOpenListUser(false);
              setIsActiveStudent(false);
              setIsActiveParent(false);
              setIsActiveTeacher(false);
              setIsActiveAdmin(false);
              setIsActiveEducation(false)
              setOpenListEducation(false)
              setIsActiveCategories(false)
              setIsActiveSubject(false)
              setIsActiveBundles(false)
              setIsActiveQuestionsBank(false)
              setIsActiveHomeWork(false)
              setIsActiveRevision(false)
              setIsActivExams(false)
              setIsActiveLives(false)
              setOpenListLives(false)
              setIsActiveLive(false)
              setIsActiveRecordedLive(false)
              setIsActiveMarketing(false)
              setOpenListMarketing(false)
              setIsActiveDiscount(false)
              setIsActivePromoCode(false)
              setIsActiveReview(false)
              setIsActivePopUp(false)
              setIsActiveFinancial(false)
              setOpenListFinancial(false)
              setIsActiveFinancialPendingPayments(false)
              setIsActiveFinancialPayments(false)
              setIsActiveAffiliate(false)
              setOpenListAffiliate(false)
              setIsActiveAffiliateUser(false)
              setIsActiveAffiliatePaymentMethod(false)
              setIsActiveAffiliateCommissions(false)
              setIsActiveAffiliateBonus(false)
              setIsActiveAffiliatePayout(false)
              setIsActiveSupport(false)
              setOpenListSupport(false)
              setIsActiveComplaints(false)
              setIsActiveSuggestions(false)
              setIsActiveReports(false)
              setIsActiveSetting(true)
              setOpenListSetting(true)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(true)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
              setIsActiveQuestionIssues(false)
              setIsActiveVideoIssues(false)
              setIsActiveNoticeBoard(false)
       }
       useEffect(() => {
              const part = location.pathname;
              const parts = part.split('/');
              const result = parts.slice(0, 3).join('/');
              if (result == "/dashboard_admin/cities") {
                     handleClickCities()
              }
       }, [location])
       const handleClickParentRelatioen = () => {
              setIsActiveDashboard(false);
              setIsActiveUser(false);
              setOpenListUser(false);
              setIsActiveStudent(false);
              setIsActiveParent(false);
              setIsActiveTeacher(false);
              setIsActiveAdmin(false);
              setIsActiveEducation(false)
              setOpenListEducation(false)
              setIsActiveCategories(false)
              setIsActiveSubject(false)
              setIsActiveBundles(false)
              setIsActiveQuestionsBank(false)
              setIsActiveHomeWork(false)
              setIsActiveRevision(false)
              setIsActivExams(false)
              setIsActiveLives(false)
              setOpenListLives(false)
              setIsActiveLive(false)
              setIsActiveRecordedLive(false)
              setIsActiveMarketing(false)
              setOpenListMarketing(false)
              setIsActiveDiscount(false)
              setIsActivePromoCode(false)
              setIsActiveReview(false)
              setIsActivePopUp(false)
              setIsActiveFinancial(false)
              setOpenListFinancial(false)
              setIsActiveFinancialPendingPayments(false)
              setIsActiveFinancialPayments(false)
              setIsActiveAffiliate(false)
              setOpenListAffiliate(false)
              setIsActiveAffiliateUser(false)
              setIsActiveAffiliatePaymentMethod(false)
              setIsActiveAffiliateCommissions(false)
              setIsActiveAffiliateBonus(false)
              setIsActiveAffiliatePayout(false)
              setIsActiveSupport(false)
              setOpenListSupport(false)
              setIsActiveComplaints(false)
              setIsActiveSuggestions(false)
              setIsActiveReports(false)
              setIsActiveSetting(true)
              setOpenListSetting(true)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(true)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
              setIsActiveQuestionIssues(false)
              setIsActiveVideoIssues(false)
              setIsActiveNoticeBoard(false)
       }
       useEffect(() => {
              const part = location.pathname;
              const parts = part.split('/');
              const result = parts.slice(0, 3).join('/');
              if (result == "/dashboard_admin/parentRelation") {
                     handleClickParentRelatioen()
              }
       }, [location])
       const handleClickOperations = () => {
              setIsActiveDashboard(false);
              setIsActiveUser(false);
              setOpenListUser(false);
              setIsActiveStudent(false);
              setIsActiveParent(false);
              setIsActiveTeacher(false);
              setIsActiveAdmin(false);
              setIsActiveEducation(false)
              setOpenListEducation(false)
              setIsActiveCategories(false)
              setIsActiveSubject(false)
              setIsActiveBundles(false)
              setIsActiveQuestionsBank(false)
              setIsActiveHomeWork(false)
              setIsActiveRevision(false)
              setIsActivExams(false)
              setIsActiveLives(false)
              setOpenListLives(false)
              setIsActiveLive(false)
              setIsActiveRecordedLive(false)
              setIsActiveMarketing(false)
              setOpenListMarketing(false)
              setIsActiveDiscount(false)
              setIsActivePromoCode(false)
              setIsActiveReview(false)
              setIsActivePopUp(false)
              setIsActiveFinancial(false)
              setOpenListFinancial(false)
              setIsActiveFinancialPendingPayments(false)
              setIsActiveFinancialPayments(false)
              setIsActiveAffiliate(false)
              setOpenListAffiliate(false)
              setIsActiveAffiliateUser(false)
              setIsActiveAffiliatePaymentMethod(false)
              setIsActiveAffiliateCommissions(false)
              setIsActiveAffiliateBonus(false)
              setIsActiveAffiliatePayout(false)
              setIsActiveSupport(false)
              setOpenListSupport(false)
              setIsActiveComplaints(false)
              setIsActiveSuggestions(false)
              setIsActiveReports(false)
              setIsActiveSetting(true)
              setOpenListSetting(true)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(true)
              setIsActivePaymentMethod(false)
              setIsActiveQuestionIssues(false)
              setIsActiveVideoIssues(false)
              setIsActiveNoticeBoard(false)
       }
       useEffect(() => {
              const part = location.pathname;
              const parts = part.split('/');
              const result = parts.slice(0, 3).join('/');
              if (result == "/dashboard_admin/operations") {
                     handleClickOperations()
              }
       }, [location])
       const handleClickPaymentMethod = () => {
              setIsActiveDashboard(false);
              setIsActiveUser(false);
              setOpenListUser(false);
              setIsActiveStudent(false);
              setIsActiveParent(false);
              setIsActiveTeacher(false);
              setIsActiveAdmin(false);
              setIsActiveEducation(false)
              setOpenListEducation(false)
              setIsActiveCategories(false)
              setIsActiveSubject(false)
              setIsActiveBundles(false)
              setIsActiveQuestionsBank(false)
              setIsActiveHomeWork(false)
              setIsActiveRevision(false)
              setIsActivExams(false)
              setIsActiveLives(false)
              setOpenListLives(false)
              setIsActiveLive(false)
              setIsActiveRecordedLive(false)
              setIsActiveMarketing(false)
              setOpenListMarketing(false)
              setIsActiveDiscount(false)
              setIsActivePromoCode(false)
              setIsActiveReview(false)
              setIsActivePopUp(false)
              setIsActiveFinancial(false)
              setOpenListFinancial(false)
              setIsActiveFinancialPendingPayments(false)
              setIsActiveFinancialPayments(false)
              setIsActiveAffiliate(false)
              setOpenListAffiliate(false)
              setIsActiveAffiliateUser(false)
              setIsActiveAffiliatePaymentMethod(false)
              setIsActiveAffiliateCommissions(false)
              setIsActiveAffiliateBonus(false)
              setIsActiveAffiliatePayout(false)
              setIsActiveSupport(false)
              setOpenListSupport(false)
              setIsActiveComplaints(false)
              setIsActiveSuggestions(false)
              setIsActiveReports(false)
              setIsActiveSetting(true)
              setOpenListSetting(true)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(true)
              setIsActiveQuestionIssues(false)
              setIsActiveVideoIssues(false)
              setIsActiveNoticeBoard(false)
       }
       useEffect(() => {
              const part = location.pathname;
              const parts = part.split('/');
              const result = parts.slice(0, 3).join('/');
              if (result == "/dashboard_admin/paymentMethod") {
                     handleClickPaymentMethod()
              }
       }, [location])
       // Question Issues
       const handleClickQuestionIssues = () => {
              setIsActiveDashboard(false);
              setIsActiveUser(false);
              setOpenListUser(false);
              setIsActiveStudent(false);
              setIsActiveParent(false);
              setIsActiveTeacher(false);
              setIsActiveAdmin(false);
              setIsActiveEducation(false)
              setOpenListEducation(false)
              setIsActiveCategories(false)
              setIsActiveSubject(false)
              setIsActiveBundles(false)
              setIsActiveQuestionsBank(false)
              setIsActiveHomeWork(false)
              setIsActiveRevision(false)
              setIsActivExams(false)
              setIsActiveLives(false)
              setOpenListLives(false)
              setIsActiveLive(false)
              setIsActiveRecordedLive(false)
              setIsActiveMarketing(false)
              setOpenListMarketing(false)
              setIsActiveDiscount(false)
              setIsActivePromoCode(false)
              setIsActiveReview(false)
              setIsActivePopUp(false)
              setIsActiveFinancial(false)
              setOpenListFinancial(false)
              setIsActiveFinancialPendingPayments(false)
              setIsActiveFinancialPayments(false)
              setIsActiveAffiliate(false)
              setOpenListAffiliate(false)
              setIsActiveAffiliateUser(false)
              setIsActiveAffiliatePaymentMethod(false)
              setIsActiveAffiliateCommissions(false)
              setIsActiveAffiliateBonus(false)
              setIsActiveAffiliatePayout(false)
              setIsActiveSupport(false)
              setOpenListSupport(false)
              setIsActiveComplaints(false)
              setIsActiveSuggestions(false)
              setIsActiveReports(false)
              setIsActiveSetting(true)
              setOpenListSetting(true)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
              setIsActiveQuestionIssues(true)
              setIsActiveVideoIssues(false)
              setIsActiveNoticeBoard(false)
       }
       useEffect(() => {
              const part = location.pathname;
              const parts = part.split('/');
              const result = parts.slice(0, 3).join('/');
              if (result == "/dashboard_admin/question_issues") {
                     handleClickQuestionIssues()
              }
       }, [location])
       // Video Issues
       const handleClickVideoIssues = () => {
              setIsActiveDashboard(false);
              setIsActiveUser(false);
              setOpenListUser(false);
              setIsActiveStudent(false);
              setIsActiveParent(false);
              setIsActiveTeacher(false);
              setIsActiveAdmin(false);
              setIsActiveEducation(false)
              setOpenListEducation(false)
              setIsActiveCategories(false)
              setIsActiveSubject(false)
              setIsActiveBundles(false)
              setIsActiveQuestionsBank(false)
              setIsActiveHomeWork(false)
              setIsActiveRevision(false)
              setIsActivExams(false)
              setIsActiveLives(false)
              setOpenListLives(false)
              setIsActiveLive(false)
              setIsActiveRecordedLive(false)
              setIsActiveMarketing(false)
              setOpenListMarketing(false)
              setIsActiveDiscount(false)
              setIsActivePromoCode(false)
              setIsActiveReview(false)
              setIsActivePopUp(false)
              setIsActiveFinancial(false)
              setOpenListFinancial(false)
              setIsActiveFinancialPendingPayments(false)
              setIsActiveFinancialPayments(false)
              setIsActiveAffiliate(false)
              setOpenListAffiliate(false)
              setIsActiveAffiliateUser(false)
              setIsActiveAffiliatePaymentMethod(false)
              setIsActiveAffiliateCommissions(false)
              setIsActiveAffiliateBonus(false)
              setIsActiveAffiliatePayout(false)
              setIsActiveSupport(false)
              setOpenListSupport(false)
              setIsActiveComplaints(false)
              setIsActiveSuggestions(false)
              setIsActiveReports(false)
              setIsActiveSetting(true)
              setOpenListSetting(true)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
              setIsActiveQuestionIssues(false)
              setIsActiveVideoIssues(true)
              setIsActiveNoticeBoard(false)
       }
       useEffect(() => {
              const part = location.pathname;
              const parts = part.split('/');
              const result = parts.slice(0, 3).join('/');
              if (result == "/dashboard_admin/video_issues") {
                     handleClickVideoIssues()
              }
       }, [location])
       /* /////Setting Childern */
       const handleClickNoticeBoard = () => {
              setIsActiveDashboard(false);
              setIsActiveUser(false);
              setOpenListUser(false);
              setIsActiveStudent(false);
              setIsActiveParent(false);
              setIsActiveTeacher(false);
              setIsActiveAdmin(false);
              setIsActiveEducation(false)
              setOpenListEducation(false)
              setIsActiveCategories(false)
              setIsActiveSubject(false)
              setIsActiveBundles(false)
              setIsActiveQuestionsBank(false)
              setIsActiveHomeWork(false)
              setIsActiveRevision(false)
              setIsActivExams(false)
              setIsActiveLives(false)
              setOpenListLives(false)
              setIsActiveLive(false)
              setIsActiveRecordedLive(false)
              setIsActiveMarketing(false)
              setOpenListMarketing(false)
              setIsActiveDiscount(false)
              setIsActivePromoCode(false)
              setIsActiveReview(false)
              setIsActivePopUp(false)
              setIsActiveFinancial(false)
              setOpenListFinancial(false)
              setIsActiveFinancialPendingPayments(false)
              setIsActiveFinancialPayments(false)
              setIsActiveAffiliate(false)
              setOpenListAffiliate(false)
              setIsActiveAffiliateUser(false)
              setIsActiveAffiliatePaymentMethod(false)
              setIsActiveAffiliateCommissions(false)
              setIsActiveAffiliateBonus(false)
              setIsActiveAffiliatePayout(false)
              setIsActiveSupport(false)
              setOpenListSupport(false)
              setIsActiveComplaints(false)
              setIsActiveSuggestions(false)
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActiveNoticeBoard(true)
       };
       useEffect(() => {
              const part = location.pathname;
              const parts = part.split('/');
              const result = parts.slice(0, 3).join('/');
              if (result == "/dashboard_admin/noticeboard") {
                     handleClickNoticeBoard()
              }
       }, [location])
       return (
              <>
                     {auth.user.role === 'supAdmin' ? (
                            <div className="LinksSidebar w-full h-full flex flex-col items-center justify-start">

                                   <Link to="/dashboard_admin" onClick={handleClickDashboard} className={`${isActiveDashboard ? 'active' : ''} w-full flex items-center justify-start pl-6 py-[9px] gap-x-5`}>
                                          <DashboardIcon isActive={isActiveDashboard} />
                                          <span className={`${isActiveDashboard ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}>Dashboard</span>
                                   </Link>


                                   <Link to="student" onClick={handleClickUser} className={`${isActiveUser ? 'active' : ''} w-full flex items-center justify-start pl-6 py-[9px] gap-x-5`}>
                                          <UserIcon Width={25} Height={23} isActive={isActiveUser} />
                                          <span className={`${isActiveUser ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}>User</span>
                                   </Link>
                                   <div className={`${openListUser ? "h-36" : "h-0 overflow-hidden"} w-full transition-all duration-500`}>
                                          <ul className={`${openListUser ? "h-full overflow-hidden" : "h-0 overflow-hidden"} listUser ml-[20%] bg-blacks transition-all duration-700 flex flex-col gap-y-2`} >
                                                 <li className={`${isActiveStudent ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"student"} onClick={handleClickStudent}>Student</Link></li>


                                                 <li className={`${isActiveParent ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"parent"} onClick={handleClickParent}>Parent</Link></li>

                                                 <li className={`${isActiveTeacher ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"teacher"} onClick={handleClickTeacher}>Teacher</Link></li>

                                                 <li className={`${isActiveAdmin ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"admin"} onClick={handleClickAdmin}>Admin</Link></li>

                                          </ul>
                                   </div>

                                   <Link to="categories" onClick={handleClickEducation} className={` ${isActiveEducation ? 'active' : ''} w-full flex items-center justify-start pl-6 py-[9px] gap-x-5`}>
                                          <EducationIcon Width={25} Height={23} isActive={isActiveEducation} />
                                          <span className={`${isActiveEducation ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}>Education</span>
                                   </Link>
                                   <div className={`${openListEducation ? "h-36" : "h-0 overflow-hidden"} w-full transition-all duration-500`}>
                                          <ul className={`${openListEducation ? "h-full overflow-hidden" : "h-0 overflow-hidden"} listUser ml-[20%] bg-blacks transition-all duration-700 flex flex-col gap-y-2`} >
                                                 <li className={`${isActiveCategories ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"categories"} onClick={handleClickCategories}>Categories</Link></li>

                                                 <li className={`${isActiveSubject ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"subject"} onClick={handleClickSubject}>Subject</Link></li>

                                                 <li className={`${isActiveBundles ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"bundles"} onClick={handleClickBundles}>Bundles</Link></li>

                                                 <li className={`${isActiveQuestionsBank ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"questionsbank"} onClick={handleClickQuestionsBank}>Questions Bank</Link></li>

                                          </ul>
                                   </div>

                                   <Link to="homework" onClick={handleClickHomeWork} className={`${isActiveHomeWork ? 'active' : ''} w-full flex items-center justify-start pl-6 py-[9px] gap-x-5`}>
                                          <HomeWorkIcon Width={25} Height={23} isActive={isActiveHomeWork} />
                                          <span className={`${isActiveHomeWork ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}>H.W</span>
                                   </Link>


                                   <Link to="revision" onClick={handleClickRevision} className={`${isActiveRevision ? 'active' : ''} w-full flex items-center justify-start pl-6 py-[9px] gap-x-5`}>
                                          <RevisionIcon Width={25} Height={23} isActive={isActiveRevision} />
                                          <span className={`${isActiveRevision ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}>Revision</span>
                                   </Link>


                                   <Link to="exams" onClick={handleClickExams} className={`${isActiveExams ? 'active' : ''} w-full flex items-center justify-start pl-6 py-[9px] gap-x-5`}>
                                          <ExamsIcon Width={25} Height={23} isActive={isActiveExams} />
                                          <span className={`${isActiveExams ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}>Exams</span>
                                   </Link>


                                   <Link to="lives" onClick={handleClickLives} className={`${isActiveLives ? 'active' : ''} w-full flex items-center justify-start pl-6 py-[9px] gap-x-5`}>
                                          <LiveIcon Width={25} Height={23} isActive={isActiveLives} />
                                          <span className={`${isActiveLives ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}>Lives</span>
                                   </Link>

                                   <div className={`${openListLives ? "h-18" : "h-0 overflow-hidden"} w-full transition-all duration-500`}>
                                          <ul className={`${openListLives ? "h-full" : "h-0 overflow-hidden"} listUser ml-[20%] bg-blacks transition-all duration-700 flex flex-col gap-y-2`}>
                                                 <li className={`${isActiveLive ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}>
                                                        <Link to="lives/live" onClick={handleClickLive}>Live</Link> {/* Full path to 'live' */}
                                                 </li>

                                                 <li className={`${isActiveRecordedLive ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}>
                                                        <Link to="lives/recorded_live" onClick={handleClickRecordedLive}>Recorded Live</Link> {/* Full path to 'recorded_live' */}
                                                 </li>
                                          </ul>
                                   </div>



                                   <Link to="discount" onClick={handleClickMarketing} className={`${isActiveMarketing ? 'active' : ''} w-full flex items-center justify-start pl-6 py-[9px] gap-x-5`}>
                                          <MarketingIcon Width={25} Height={23} isActive={isActiveMarketing} />
                                          <span className={`${isActiveMarketing ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}>Marketing</span>
                                   </Link>
                                   <div className={`${openListMarketing ? "h-36" : "h-0 overflow-hidden"} w-full transition-all duration-500`}>
                                          <ul className={`${openListMarketing ? "h-full overflow-hidden" : "h-0 overflow-hidden"} listUser ml-[20%] bg-blacks transition-all duration-700 flex flex-col gap-y-2`} >
                                                 <li className={`${isActiveDiscount ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"discount"} onClick={handleClickDiscount}>Discount</Link></li>

                                                 <li className={`${isActivePromoCode ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"promo_code"} onClick={handleClickPromoCode}>PromoCode</Link></li>

                                                 <li className={`${isActiveReview ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"review"} onClick={handleClickReviews}>Reviews</Link></li>

                                                 <li className={`${isActivePopUp ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"pop_up"} onClick={handleClickPopUp}>Pop Up</Link></li>

                                          </ul>
                                   </div>

                                   <>
                                          <Link to="financial_pending_Payments" onClick={handleClickFinancial} className={`${isActiveFinancial ? 'active' : ''} w-full flex items-center justify-start pl-6 py-[9px] gap-x-5`}>
                                                 <FinancialIcon Width={25} Height={23} isActive={isActiveFinancial} />
                                                 <span className={`${isActiveFinancial ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}>Financial</span>
                                          </Link>
                                          <div className={`${openListFinancial ? "h-24" : "h-0 overflow-hidden"} w-full transition-all duration-500`}>
                                                 <ul className={`${openListFinancial ? "h-full overflow-hidden" : "h-0 overflow-hidden"} listUser ml-[20%] bg-blacks transition-all duration-700 flex flex-col gap-y-2`} >
                                                        <li className={`${isActiveFinancialPendingPayments ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"financial_pending_Payments"} onClick={handleClickFinancialPendingPayments}>Pending Payments</Link></li>
                                                        <li className={`${isActiveFinancialPayments ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"financial_payments"} onClick={handleClickFinancialPayments}>Payments</Link></li>
                                                 </ul>
                                          </div>
                                   </>


                                   <>
                                          <Link to="affiliate_user" onClick={handleClickAffiliate} className={`${isActiveAffiliate ? 'active' : ''} w-full flex items-center justify-start pl-6 py-[9px] gap-x-5`}>
                                                 <AffiliateIcon Width={25} Height={23} isActive={isActiveAffiliate} />
                                                 <span className={`${isActiveAffiliate ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}>Affiliate</span>
                                          </Link>
                                          <div className={`${openListAffiliate ? "h-44" : "h-0 overflow-hidden"} w-full transition-all duration-500`}>
                                                 <ul className={`${openListAffiliate ? "h-full overflow-hidden" : "h-0 overflow-hidden"} listUser ml-[20%] bg-blacks transition-all duration-700 flex flex-col gap-y-2`} >
                                                        <li className={`${isActiveAffiliateUser ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"affiliate_user"} onClick={handleClickAffiliateUser}>User</Link></li>
                                                        <li className={`${isActiveAffiliatePaymentMethod ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"affiliate_Payment_method"} onClick={handleClickAffiliatePaymentMethod}>Payment Method</Link></li>
                                                        <li className={`${isActiveAffiliateCommissions ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"affiliate_commissions"} onClick={handleClickAffiliateCommissions}>Commissions</Link></li>
                                                        <li className={`${isActiveAffiliateBonus ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"affiliate_bonus"} onClick={handleClickAffiliateBonus}>Bonus</Link></li>
                                                        <li className={`${isActiveAffiliatePayout ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"affiliate_payout/pending"} onClick={handleClickAffiliatePayout}>Payout</Link></li>
                                                 </ul>
                                          </div>
                                   </>


                                   <Link to="support" onClick={handleClickSupport} className={`${isActiveSupport ? 'active' : ''} w-full flex items-center justify-start pl-6 py-[9px] gap-x-5`}>
                                          <SupportIcon Width={25} Height={23} isActive={isActiveSupport} />
                                          <span className={`${isActiveSupport ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}>Support</span>
                                   </Link>
                                   <div className={`${openListSupport ? "h-10" : "h-0 overflow-hidden"} w-full transition-all duration-500`}>
                                          <ul className={`${openListSupport ? "h-full overflow-hidden" : "h-0 overflow-hidden"} listUser ml-[20%] bg-blacks transition-all duration-700 flex flex-col gap-y-2`} >
                                                 <li className={`${isActiveComplaints ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"support/complaints"} onClick={handleClickComplaints}>Complaints</Link></li>

                                                 {/* <li className={`${isActiveSuggestions ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"support/suggestions"} onClick={handleClickSuggestions}>Suggestions</Link></li> */}
                                          </ul>
                                   </div>

                                   <Link to="reports" onClick={handleClickReports} className={`${isActiveReports ? 'active' : ''} w-full flex items-center justify-start pl-6 py-[9px] gap-x-5`}>
                                          <ReportsIcon Width={25} Height={23} isActive={isActiveReports} />
                                          <span className={`${isActiveReports ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}>Reports</span>
                                   </Link>


                                   <>
                                          <Link to="admin_roles" onClick={handleClickSetting} className={`${isActiveSetting ? 'active' : ''} w-full flex items-center justify-start pl-6 py-[9px] gap-x-5`}>
                                                 <SettingsIcon Width={25} Height={23} isActive={isActiveSetting} />
                                                 <span className={`${isActiveSetting ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}>Setting</span>
                                          </Link>
                                          <div className={`${openListSetting ? "h-42" : "h-0 overflow-hidden"} w-full transition-all duration-500`}>
                                                 <ul className={`${openListSetting ? "h-full overflow-hidden" : "h-0 overflow-hidden"} listUser ml-[20%] bg-blacks transition-all duration-700 flex flex-col gap-y-2`} >
                                                        <li className={`${isActiveAdminRoles ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"admin_roles"} onClick={handleClickAdminRoles}>Admin Roles</Link></li>
                                                        <li className={`${isActiveCountries ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"countries"} onClick={handleClickCountries}>Countries</Link></li>
                                                        <li className={`${isActiveCities ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"cities"} onClick={handleClickCities}>Cities</Link></li>
                                                        <li className={`${isActiveParentRelation ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"parentRelation"} onClick={handleClickParentRelatioen}>Parent Relation</Link></li>
                                                        <li className={`${isActiveOperations ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"operations"} onClick={handleClickOperations}>Operations</Link></li>
                                                        <li className={`${isActivePaymentMethod ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"paymentMethod"} onClick={handleClickPaymentMethod}>PaymentMethod</Link></li>
                                                        <li className={`${isActiveQuestionIssues ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"question_issues"} onClick={handleClickQuestionIssues}>Question Issues</Link></li>
                                                        <li className={`${isActiveVideoIssues ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"video_issues"} onClick={handleClickVideoIssues}>Video Issues</Link></li>
                                                 </ul>
                                          </div>
                                   </>

                                   <>

                                          <Link to="noticeboard" onClick={handleClickNoticeBoard} className={`${isActiveNoticeBoard ? 'active' : ''} w-full flex items-center justify-start pl-6 py-[9px] gap-x-5`}>
                                                 <NoticeBoardIcon Width={25} Height={23} isActive={isActiveNoticeBoard} />
                                                 <span className={`${isActiveNoticeBoard ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}>Notice Board</span>
                                          </Link>
                                   </>


                            </div >
                     ) : (
                            <div className="LinksSidebar w-full h-full flex flex-col items-center justify-start">

                                   <Link to="/dashboard_admin" onClick={handleClickDashboard} className={`${isActiveDashboard ? 'active' : ''} w-full flex items-center justify-start pl-6 py-[9px] gap-x-5`}>
                                          <DashboardIcon isActive={isActiveDashboard} />
                                          <span className={`${isActiveDashboard ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}>Dashboard</span>
                                   </Link>


                                   {(Premission.includes("students") || Premission.includes("parent") || Premission.includes("teachers") || Premission.includes("admins")) && (
                                          <>
                                                 <Link to="student" onClick={handleClickUser} className={`${isActiveUser ? 'active' : ''} w-full flex items-center justify-start pl-6 py-[9px] gap-x-5`}>
                                                        <UserIcon Width={25} Height={23} isActive={isActiveUser} />
                                                        <span className={`${isActiveUser ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}>User</span>
                                                 </Link>
                                                 <div className={`${openListUser ? "" : "h-0 overflow-hidden"} w-full transition-all duration-500`}>
                                                        <ul className={`${openListUser ? "h-full overflow-hidden" : "h-0 overflow-hidden"} listUser ml-[20%] bg-blacks transition-all duration-700 flex flex-col gap-y-2`} >
                                                               {Premission.includes("students") && (
                                                                      <li className={`${isActiveStudent ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"student"} onClick={handleClickStudent}>Student</Link></li>

                                                               )}
                                                               {Premission.includes("parent") && (
                                                                      <li className={`${isActiveParent ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"parent"} onClick={handleClickParent}>Parent</Link></li>
                                                               )}
                                                               {Premission.includes("teachers") && (
                                                                      <li className={`${isActiveTeacher ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"teacher"} onClick={handleClickTeacher}>Teacher</Link></li>
                                                               )}
                                                               {Premission.includes("admins") && (
                                                                      <li className={`${isActiveAdmin ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"admin"} onClick={handleClickAdmin}>Admin</Link></li>
                                                               )}
                                                        </ul>
                                                 </div>
                                          </>
                                   )}
                                   {(Premission.includes("categories") || Premission.includes("subjects") || Premission.includes("bundles") || Premission.includes("questions")) && (
                                          <>

                                                 <Link to="categories" onClick={handleClickEducation} className={` ${isActiveEducation ? 'active' : ''} w-full flex items-center justify-start pl-6 py-[9px] gap-x-5`}>
                                                        <EducationIcon Width={25} Height={23} isActive={isActiveEducation} />
                                                        <span className={`${isActiveEducation ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}>Education</span>
                                                 </Link>
                                                 <div className={`${openListEducation ? "" : "h-0 overflow-hidden"} w-full transition-all duration-500`}>
                                                        <ul className={`${openListEducation ? "h-full overflow-hidden" : "h-0 overflow-hidden"} listUser ml-[20%] bg-blacks transition-all duration-700 flex flex-col gap-y-2`} >
                                                               {Premission.includes("categories") && (
                                                                      <li className={`${isActiveCategories ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"categories"} onClick={handleClickCategories}>Categories</Link></li>
                                                               )}
                                                               {Premission.includes("subjects") && (
                                                                      <li className={`${isActiveSubject ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"subject"} onClick={handleClickSubject}>Subject</Link></li>
                                                               )}
                                                               {Premission.includes("bundles") && (
                                                                      <li className={`${isActiveBundles ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"bundles"} onClick={handleClickBundles}>Bundles</Link></li>
                                                               )}
                                                               {Premission.includes("questions") && (
                                                                      <li className={`${isActiveQuestionsBank ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"questionsbank"} onClick={handleClickQuestionsBank}>Questions Bank</Link></li>
                                                               )}
                                                        </ul>
                                                 </div>

                                          </>
                                   )}
                                   {Premission.includes("hw") && (
                                          <Link to="homework" onClick={handleClickHomeWork} className={`${isActiveHomeWork ? 'active' : ''} w-full flex items-center justify-start pl-6 py-[9px] gap-x-5`}>
                                                 <HomeWorkIcon Width={25} Height={23} isActive={isActiveHomeWork} />
                                                 <span className={`${isActiveHomeWork ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}>H.W</span>
                                          </Link>
                                   )}

                                   {Premission.includes("revisions") && (
                                          <Link to="revision" onClick={handleClickRevision} className={`${isActiveRevision ? 'active' : ''} w-full flex items-center justify-start pl-6 py-[9px] gap-x-5`}>
                                                 <RevisionIcon Width={25} Height={23} isActive={isActiveRevision} />
                                                 <span className={`${isActiveRevision ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}>Revision</span>
                                          </Link>
                                   )}

                                   {Premission.includes("exams") && (
                                          <Link to="exams" onClick={handleClickExams} className={`${isActiveExams ? 'active' : ''} w-full flex items-center justify-start pl-6 py-[9px] gap-x-5`}>
                                                 <ExamsIcon Width={25} Height={23} isActive={isActiveExams} />
                                                 <span className={`${isActiveExams ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}>Exams</span>
                                          </Link>
                                   )}

                                   {Premission.includes("live") && (
                                          <Link to="live" onClick={handleClickLive} className={`${isActiveLive ? 'active' : ''} w-full flex items-center justify-start pl-6 py-[9px] gap-x-5`}>
                                                 <LiveIcon Width={25} Height={23} isActive={isActiveLive} />
                                                 <span className={`${isActiveLive ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}>Live</span>
                                          </Link>
                                   )}

                                   {(Premission.includes("discounts") || Premission.includes("promocode") || Premission.includes("reviews") || Premission.includes("pop up")) && (
                                          <>

                                                 <Link to="discount" onClick={handleClickMarketing} className={`${isActiveMarketing ? 'active' : ''} w-full flex items-center justify-start pl-6 py-[9px] gap-x-5`}>
                                                        <MarketingIcon Width={25} Height={23} isActive={isActiveMarketing} />
                                                        <span className={`${isActiveMarketing ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}>Marketing</span>
                                                 </Link>
                                                 <div className={`${openListMarketing ? "" : "h-0 overflow-hidden"} w-full transition-all duration-500`}>
                                                        <ul className={`${openListMarketing ? "h-full overflow-hidden" : "h-0 overflow-hidden"} listUser ml-[20%] bg-blacks transition-all duration-700 flex flex-col gap-y-2`} >
                                                               {Premission.includes("discounts") && (
                                                                      <li className={`${isActiveDiscount ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"discount"} onClick={handleClickDiscount}>Discount</Link></li>
                                                               )}
                                                               {Premission.includes("promocode") && (
                                                                      <li className={`${isActivePromoCode ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"promo_code"} onClick={handleClickPromoCode}>PromoCode</Link></li>
                                                               )}
                                                               {Premission.includes("reviews") && (
                                                                      <li className={`${isActiveReview ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"review"} onClick={handleClickReviews}>Reviews</Link></li>
                                                               )}
                                                               {Premission.includes("pop up") && (
                                                                      <li className={`${isActivePopUp ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"pop_up"} onClick={handleClickPopUp}>Pop Up</Link></li>
                                                               )}
                                                        </ul>
                                                 </div>
                                          </>
                                   )}

                                   {Premission.includes("payments") && (
                                          <>
                                                 <Link to="financial_pending_Payments" onClick={handleClickFinancial} className={`${isActiveFinancial ? 'active' : ''} w-full flex items-center justify-start pl-6 py-[9px] gap-x-5`}>
                                                        <FinancialIcon Width={25} Height={23} isActive={isActiveFinancial} />
                                                        <span className={`${isActiveFinancial ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}>Financial</span>
                                                 </Link>
                                                 <div className={`${openListFinancial ? "h-24" : "h-0 overflow-hidden"} w-full transition-all duration-500`}>
                                                        <ul className={`${openListFinancial ? "h-full overflow-hidden" : "h-0 overflow-hidden"} listUser ml-[20%] bg-blacks transition-all duration-700 flex flex-col gap-y-2`} >
                                                               <li className={`${isActiveFinancialPendingPayments ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"financial_pending_Payments"} onClick={handleClickFinancialPendingPayments}>Pending Payments</Link></li>
                                                               <li className={`${isActiveFinancialPayments ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"financial_payments"} onClick={handleClickFinancialPayments}>Payments</Link></li>
                                                        </ul>
                                                 </div>
                                          </>
                                   )}

                                   {Premission.includes("affilate") && (
                                          <>
                                                 <Link to="affiliate_user" onClick={handleClickAffiliate} className={`${isActiveAffiliate ? 'active' : ''} w-full flex items-center justify-start pl-6 py-[9px] gap-x-5`}>
                                                        <AffiliateIcon Width={25} Height={23} isActive={isActiveAffiliate} />
                                                        <span className={`${isActiveAffiliate ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}>Affiliate</span>
                                                 </Link>
                                                 <div className={`${openListAffiliate ? "" : "h-0 overflow-hidden"} w-full transition-all duration-500`}>
                                                        <ul className={`${openListAffiliate ? "h-full overflow-hidden" : "h-0 overflow-hidden"} listUser ml-[20%] bg-blacks transition-all duration-700 flex flex-col gap-y-2`} >
                                                               <li className={`${isActiveAffiliateUser ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"affiliate_user"} onClick={handleClickAffiliateUser}>User</Link></li>
                                                               <li className={`${isActiveAffiliatePaymentMethod ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"affiliate_Payment_method"} onClick={handleClickAffiliatePaymentMethod}>Payment Method</Link></li>
                                                               <li className={`${isActiveAffiliateCommissions ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"affiliate_commissions"} onClick={handleClickAffiliateCommissions}>Commissions</Link></li>
                                                               <li className={`${isActiveAffiliateBonus ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"affiliate_bonus"} onClick={handleClickAffiliateBonus}>Bonus</Link></li>
                                                               <li className={`${isActiveAffiliatePayout ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"affiliate_payout/pending"} onClick={handleClickAffiliatePayout}>Payout</Link></li>
                                                        </ul>
                                                 </div>
                                          </>
                                   )}

                                   {(Premission.includes("complaint")) && (
                                          <>
                                                 <Link to="support" onClick={handleClickSupport} className={`${isActiveSupport ? 'active' : ''} w-full flex items-center justify-start pl-6 py-[9px] gap-x-5`}>
                                                        <SupportIcon Width={25} Height={23} isActive={isActiveSupport} />
                                                        <span className={`${isActiveSupport ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}>Support</span>
                                                 </Link>
                                                 <div className={`${openListSupport ? "" : "h-0 overflow-hidden"} w-full transition-all duration-500`}>
                                                        <ul className={`${openListSupport ? "h-full overflow-hidden" : "h-0 overflow-hidden"} listUser ml-[20%] bg-blacks transition-all duration-700 flex flex-col gap-y-2`} >
                                                               {Premission.includes("complaint") && (
                                                                      <li className={`${isActiveComplaints ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"support/complaints"} onClick={handleClickComplaints}>Complaints</Link></li>
                                                               )}
                                                               {/* <li className={`${isActiveSuggestions ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"support/suggestions"} onClick={handleClickSuggestions}>Suggestions</Link></li> */}
                                                        </ul>
                                                 </div>
                                          </>
                                   )}

                                   {Premission.includes("reports") && (
                                          <Link to="reports" onClick={handleClickReports} className={`${isActiveReports ? 'active' : ''} w-full flex items-center justify-start pl-6 py-[9px] gap-x-5`}>
                                                 <ReportsIcon Width={25} Height={23} isActive={isActiveReports} />
                                                 <span className={`${isActiveReports ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}>Reports</span>
                                          </Link>
                                   )}

                                   {Premission.includes("settings") && (
                                          <>
                                                 <Link to="admin_roles" onClick={handleClickSetting} className={`${isActiveSetting ? 'active' : ''} w-full flex items-center justify-start pl-6 py-[9px] gap-x-5`}>
                                                        <SettingsIcon Width={25} Height={23} isActive={isActiveSetting} />
                                                        <span className={`${isActiveSetting ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}>Setting</span>
                                                 </Link>
                                                 <div className={`${openListSetting ? "" : "h-0 overflow-hidden"} w-full transition-all duration-500`}>
                                                        <ul className={`${openListSetting ? "h-full overflow-hidden" : "h-0 overflow-hidden"} listUser ml-[20%] bg-blacks transition-all duration-700 flex flex-col gap-y-2`} >
                                                               <li className={`${isActiveAdminRoles ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"admin_roles"} onClick={handleClickAdminRoles}>Admin Roles</Link></li>
                                                               <li className={`${isActiveCountries ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"countries"} onClick={handleClickCountries}>Countries</Link></li>
                                                               <li className={`${isActiveCities ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"cities"} onClick={handleClickCities}>Cities</Link></li>
                                                               <li className={`${isActiveParentRelation ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"parentRelation"} onClick={handleClickParentRelatioen}>Parent Relation</Link></li>
                                                               <li className={`${isActiveOperations ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"operations"} onClick={handleClickOperations}>Operations</Link></li>
                                                               <li className={`${isActivePaymentMethod ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"paymentMethod"} onClick={handleClickPaymentMethod}>PaaymentMethods</Link></li>
                                                        </ul>
                                                 </div>
                                          </>
                                   )}
                                   {Premission.includes("notice board") && (
                                          <>

                                                 <Link to="noticeboard" onClick={handleClickNoticeBoard} className={`${isActiveNoticeBoard ? 'active' : ''} w-full flex items-center justify-start pl-6 py-[9px] gap-x-5`}>
                                                        <NoticeBoardIcon Width={25} Height={23} isActive={isActiveNoticeBoard} />
                                                        <span className={`${isActiveNoticeBoard ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}>Notice Board</span>
                                                 </Link>
                                          </>
                                   )}

                            </div>
                     )}
              </>
       );
}
export default LinksSidebar;
