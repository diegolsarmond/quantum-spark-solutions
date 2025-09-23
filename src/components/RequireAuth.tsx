import type { ReactNode } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";

interface RequireAuthProps {
  children?: ReactNode;
  permissions?: string[];
  roles?: string[];
  requireAllPermissions?: boolean;
  requireAllRoles?: boolean;
  redirectTo?: string;
  fallback?: ReactNode;
}

const RequireAuth = ({
  children,
  permissions,
  roles,
  requireAllPermissions = true,
  requireAllRoles = true,
  redirectTo = "/admin/login",
  fallback,
}: RequireAuthProps) => {
  const { isAuthenticated, isLoading, hasPermission, hasRole } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <span className="text-sm text-muted-foreground">Carregando...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate replace state={{ from: location }} to={redirectTo} />;
  }

  const hasRequiredPermissions = permissions?.length
    ? requireAllPermissions
      ? permissions.every((permission) => hasPermission(permission))
      : permissions.some((permission) => hasPermission(permission))
    : true;

  const hasRequiredRoles = roles?.length
    ? requireAllRoles
      ? roles.every((role) => hasRole(role))
      : roles.some((role) => hasRole(role))
    : true;

  if (!hasRequiredPermissions || !hasRequiredRoles) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return <Navigate replace state={{ from: location, unauthorized: true }} to={redirectTo} />;
  }

  if (children) {
    return <>{children}</>;
  }

  return <Outlet />;
};

export default RequireAuth;
