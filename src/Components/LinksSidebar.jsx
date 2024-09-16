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
import { Link, useLocation } from "react-router-dom";


const LinksSidebar = () => {
       const location = useLocation();
       console.log('location', location)
       const savedState = JSON.parse(localStorage.getItem('sidebarState')) || {};

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
       const [isActiveLive, setIsActiveLive] = useState(savedState.isActiveLive ?? false);
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
       const [isActiveSupport, setIsActiveSupport] = useState(savedState.isActiveSupport ?? false);
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
                     isActiveLive,
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
                     isActiveReports,
                     isActiveSetting,
                     openListSetting,
                     isActiveAdminRoles,
                     isActiveCountries,
                     isActiveCities,
                     isActiveParentRelation,
                     isActiveOperations,
                     isActivePaymentMethod,
                     isActiveNoticeBoard,
              };
              localStorage.setItem('sidebarState', JSON.stringify(sidebarState));
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
              isActiveLive,
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
              isActiveReports,
              isActiveSetting,
              openListSetting,
              isActiveAdminRoles,
              isActiveCountries,
              isActiveCities,
              isActiveParentRelation,
              isActiveOperations,
              isActivePaymentMethod,
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
              setIsActiveLive(false)
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
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
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
              setIsActiveLive(false)
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
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
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
              setIsActiveLive(false)
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
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
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
              setIsActiveLive(false)
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
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
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
              setIsActiveLive(false)
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
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
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
              setIsActiveLive(false)
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
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
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
              setIsActiveLive(false)
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
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
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
              setIsActiveLive(false)
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
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
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
              setIsActiveLive(false)
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
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
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
              setIsActiveLive(false)
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
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
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
              setIsActiveLive(false)
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
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
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
              setIsActiveLive(false)
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
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
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
              setIsActiveLive(false)
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
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
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
              setIsActiveLive(false)
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
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
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
              setIsActiveLive(true)
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
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
              setIsActiveNoticeBoard(false)
       };
       useEffect(() => {
              const part = location.pathname;
              const parts = part.split('/');
              const result = parts.slice(0, 3).join('/');
              if (result == "/dashboard_admin/live") {
                     handleClickLive()
              }
       }, [location])
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
              setIsActiveLive(false)
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
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
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
              setIsActiveLive(false)
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
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
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
              setIsActiveLive(false)
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
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
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
              setIsActiveLive(false)
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
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
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
              setIsActiveLive(false)
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
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
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
              setIsActiveLive(false)
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
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
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
              setIsActiveLive(false)
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
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
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
              setIsActiveLive(false)
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
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
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
              setIsActiveLive(false)
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
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
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
              setIsActiveLive(false)
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
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
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
              setIsActiveLive(false)
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
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
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
              setIsActiveLive(false)
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
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
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
              setIsActiveLive(false)
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
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
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
              setIsActiveLive(false)
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
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
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
              setIsActiveLive(false)
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
              setIsActiveReports(false)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
              setIsActiveNoticeBoard(false)
       };
       useEffect(() => {
              const part = location.pathname;
              const parts = part.split('/');
              const result = parts.slice(0, 3).join('/');
              if (result == "/dashboard_admin/support") {
                     handleClickSupport()
              }
       }, [location])
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
              setIsActiveLive(false)
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
              setIsActiveReports(true)
              setIsActiveSetting(false)
              setOpenListSetting(false)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
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
              setIsActiveLive(false)
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
              setIsActiveReports(false)
              setIsActiveSetting(true)
              setOpenListSetting(true)
              setIsActiveAdminRoles(true)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActivePaymentMethod(false)
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
              setIsActiveLive(false)
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
              setIsActiveReports(false)
              setIsActiveSetting(true)
              setOpenListSetting(true)
              setIsActiveAdminRoles(true)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
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
              setIsActiveLive(false)
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
              setIsActiveReports(false)
              setIsActiveSetting(true)
              setOpenListSetting(true)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(true)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
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
              setIsActiveLive(false)
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
              setIsActiveReports(false)
              setIsActiveSetting(true)
              setOpenListSetting(true)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(true)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
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
              setIsActiveLive(false)
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
              setIsActiveReports(false)
              setIsActiveSetting(true)
              setOpenListSetting(true)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(true)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(false)
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
              setIsActiveLive(false)
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
              setIsActiveReports(false)
              setIsActiveSetting(true)
              setOpenListSetting(true)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(true)
              setIsActivePaymentMethod(false)
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
              setIsActiveLive(false)
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
              setIsActiveReports(false)
              setIsActiveSetting(true)
              setOpenListSetting(true)
              setIsActiveAdminRoles(false)
              setIsActiveCountries(false)
              setIsActiveCities(false)
              setIsActiveParentRelation(false)
              setIsActiveOperations(false)
              setIsActivePaymentMethod(true)
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
              setIsActiveLive(false)
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
                            <Link to="live" onClick={handleClickLive} className={`${isActiveLive ? 'active' : ''} w-full flex items-center justify-start pl-6 py-[9px] gap-x-5`}>
                                   <LiveIcon Width={25} Height={23} isActive={isActiveLive} />
                                   <span className={`${isActiveLive ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}>Live</span>
                            </Link>
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
                            <Link to="support" onClick={handleClickSupport} className={`${isActiveSupport ? 'active' : ''} w-full flex items-center justify-start pl-6 py-[9px] gap-x-5`}>
                                   <SupportIcon Width={25} Height={23} isActive={isActiveSupport} />
                                   <span className={`${isActiveSupport ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}>Support</span>
                            </Link>
                            <Link to="reports" onClick={handleClickReports} className={`${isActiveReports ? 'active' : ''} w-full flex items-center justify-start pl-6 py-[9px] gap-x-5`}>
                                   <ReportsIcon Width={25} Height={23} isActive={isActiveReports} />
                                   <span className={`${isActiveReports ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}>Reports</span>
                            </Link>
                            <Link to="adminRoles" onClick={handleClickSetting} className={`${isActiveSetting ? 'active' : ''} w-full flex items-center justify-start pl-6 py-[9px] gap-x-5`}>
                                   <SettingsIcon Width={25} Height={23} isActive={isActiveSetting} />
                                   <span className={`${isActiveSetting ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}>Setting</span>
                            </Link>
                            <div className={`${openListSetting ? "h-42" : "h-0 overflow-hidden"} w-full transition-all duration-500`}>
                                   <ul className={`${openListSetting ? "h-full overflow-hidden" : "h-0 overflow-hidden"} listUser ml-[20%] bg-blacks transition-all duration-700 flex flex-col gap-y-2`} >
                                          <li className={`${isActiveAdminRoles ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"adminRoles"} onClick={handleClickAdminRoles}>Admin Roles</Link></li>
                                          <li className={`${isActiveCountries ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"countries"} onClick={handleClickCountries}>Countries</Link></li>
                                          <li className={`${isActiveCities ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"cities"} onClick={handleClickCities}>Cities</Link></li>
                                          <li className={`${isActiveParentRelation ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"parentRelation"} onClick={handleClickParentRelatioen}>Parent Relation</Link></li>
                                          <li className={`${isActiveOperations ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"operations"} onClick={handleClickOperations}>Operations</Link></li>
                                          <li className={`${isActivePaymentMethod ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}><Link to={"paymentMethod"} onClick={handleClickPaymentMethod}>PaymentMethod</Link></li>
                                   </ul>
                            </div>
                            <Link to="noticeboard" onClick={handleClickNoticeBoard} className={`${isActiveNoticeBoard ? 'active' : ''} w-full flex items-center justify-start pl-6 py-[9px] gap-x-5`}>
                                   <NoticeBoardIcon Width={25} Height={23} isActive={isActiveNoticeBoard} />
                                   <span className={`${isActiveNoticeBoard ? "text-mainColor" : "text-thirdColor"} hover:text-mainColor text-lg font-[400]`}>Notice Board</span>
                            </Link>

                     </div>
              </>
       );
}
export default LinksSidebar;
