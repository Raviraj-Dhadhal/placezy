import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { UserLayout } from '../../layouts/UserLayout';
import { OwnerLayout } from '../../layouts/OwnerLayout';
import { AdminLayout } from '../../layouts/AdminLayout';
import { AuthLayout } from '../../layouts/AuthLayout';

// Feature: Auth (5 screens)
import { SplashScreen } from '../../features/auth/pages/SplashScreen';
import { CreateAccountPage } from '../../features/auth/pages/CreateAccountPage';
import { RegisterInterestsPage } from '../../features/auth/pages/RegisterInterestsPage';
import { LoginPage } from '../../features/auth/pages/LoginPage';
import { ForgotPasswordPage } from '../../features/auth/pages/ForgotPasswordPage';

// Feature: Places & Discovery (6 screens)
import { UserHomePage } from '../../features/places/pages/UserHomePage';
import { UserExplorePage } from '../../features/places/pages/UserExplorePage';
import { UserExploreFilterPage } from '../../features/places/pages/UserExploreFilterPage';
import { UserExploreDetailPage } from '../../features/places/pages/UserExploreDetailPage';
import { UserNearbyPage } from '../../features/places/pages/UserNearbyPage';
import { UserMapViewPage } from '../../features/places/pages/UserMapViewPage';

// Feature: Reviews (1 screen)
import { UserRatingReviewPage } from '../../features/reviews/pages/UserRatingReviewPage';

// Feature: Trips (2 screens)
import { UserTripPlannerPage } from '../../features/trips/pages/UserTripPlannerPage';
import { UserPlanNewTripPage } from '../../features/trips/pages/UserPlanNewTripPage';

// Feature: Wishlist (1 screen)
import { UserWishlistPage } from '../../features/wishlist/pages/UserWishlistPage';

// Feature: Notifications (1 screen)
import { UserNotificationPage } from '../../features/notifications/pages/UserNotificationPage';

// Feature: User Profile & Settings (2 screens)
import { UserProfilePage } from '../../features/user-profile/pages/UserProfilePage';
import { UserSettingsPage } from '../../features/user-profile/pages/UserSettingsPage';

// Feature: Legal & Support (5 screens)
import { UserHelpPage } from '../../features/legal-support/pages/UserHelpPage';
import { PrivacyPolicyPage } from '../../features/legal-support/pages/PrivacyPolicyPage';
import { TermsPage } from '../../features/legal-support/pages/TermsPage';
import { PublicFaqPage } from '../../features/legal-support/pages/PublicFaqPage';
import { ContactUsPage } from '../../features/legal-support/pages/ContactUsPage';

// Feature: Owner Panel (8 screens)
import { OwnerBusinessRegisterPage } from '../../features/owner/pages/OwnerBusinessRegisterPage';
import { OwnerDashboardPage } from '../../features/owner/pages/OwnerDashboardPage';
import { OwnerListingsPage } from '../../features/owner/pages/OwnerListingsPage';
import { OwnerReviewsPage } from '../../features/owner/pages/OwnerReviewsPage';
import { OwnerPhotosPage } from '../../features/owner/pages/OwnerPhotosPage';
import { OwnerAnalyticsPage } from '../../features/owner/pages/OwnerAnalyticsPage';
import { OwnerSettingsPage } from '../../features/owner/pages/OwnerSettingsPage';
import { OwnerNotificationsPage } from '../../features/owner/pages/OwnerNotificationsPage';

// Feature: Admin Console (9 screens)
import { AdminDashboardPage } from '../../features/admin/pages/AdminDashboardPage';
import { AdminUsersPage } from '../../features/admin/pages/AdminUsersPage';
import { AdminBusinessesPage } from '../../features/admin/pages/AdminBusinessesPage';
import { AdminCategoriesPage } from '../../features/admin/pages/AdminCategoriesPage';
import { AdminReviewsPage } from '../../features/admin/pages/AdminReviewsPage';
import { AdminReportsPage } from '../../features/admin/pages/AdminReportsPage';
import { AdminSettingsPage } from '../../features/admin/pages/AdminSettingsPage';
import { AdminProfilePage } from '../../features/admin/pages/AdminProfilePage';
import { AdminNotificationsPage } from '../../features/admin/pages/AdminNotificationsPage';

export const AppRouter = () => {
  return (
    <Routes>
      {/* ─── AUTHENTICATION & ONBOARDING (5 Screens) ─── */}
      <Route element={<AuthLayout />}>
        <Route path="/splash" element={<SplashScreen />} />
        <Route path="/register" element={<CreateAccountPage />} />
        <Route path="/register/interests" element={<RegisterInterestsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      {/* ─── MODULE 01: USER PANEL (18 Screens) ─── */}
      <Route element={<UserLayout />}>
        {/* Discovery & Places */}
        <Route path="/" element={<UserHomePage />} />
        <Route path="/explore" element={<UserExplorePage />} />
        <Route path="/explore/filter" element={<UserExploreFilterPage />} />
        <Route path="/place/:id" element={<UserExploreDetailPage />} />
        <Route path="/nearby" element={<UserNearbyPage />} />
        <Route path="/map" element={<UserMapViewPage />} />

        {/* Reviews */}
        <Route path="/place/:id/review" element={<UserRatingReviewPage />} />

        {/* Wishlist */}
        <Route path="/wishlist" element={<UserWishlistPage />} />

        {/* Trips */}
        <Route path="/trip-planner" element={<UserTripPlannerPage />} />
        <Route path="/plan-trip" element={<UserPlanNewTripPage />} />

        {/* User Account */}
        <Route path="/notifications" element={<UserNotificationPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/settings" element={<UserSettingsPage />} />

        {/* Support & Legal */}
        <Route path="/help" element={<UserHelpPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/faq" element={<PublicFaqPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
      </Route>

      {/* ─── MODULE 02: OWNER PANEL (8 Screens) ─── */}
      <Route path="/owner/register" element={<OwnerBusinessRegisterPage />} />
      <Route element={<OwnerLayout />}>
        <Route path="/owner" element={<Navigate to="/owner/dashboard" replace />} />
        <Route path="/owner/dashboard" element={<OwnerDashboardPage />} />
        <Route path="/owner/listings" element={<OwnerListingsPage />} />
        <Route path="/owner/reviews" element={<OwnerReviewsPage />} />
        <Route path="/owner/photos" element={<OwnerPhotosPage />} />
        <Route path="/owner/analytics" element={<OwnerAnalyticsPage />} />
        <Route path="/owner/settings" element={<OwnerSettingsPage />} />
        <Route path="/owner/notifications" element={<OwnerNotificationsPage />} />
      </Route>

      {/* ─── MODULE 03: ADMIN CONSOLE (9 Screens) ─── */}
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/users" element={<AdminUsersPage />} />
        <Route path="/admin/businesses" element={<AdminBusinessesPage />} />
        <Route path="/admin/categories" element={<AdminCategoriesPage />} />
        <Route path="/admin/reviews" element={<AdminReviewsPage />} />
        <Route path="/admin/reports" element={<AdminReportsPage />} />
        <Route path="/admin/settings" element={<AdminSettingsPage />} />
        <Route path="/admin/profile" element={<AdminProfilePage />} />
        <Route path="/admin/notifications" element={<AdminNotificationsPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
