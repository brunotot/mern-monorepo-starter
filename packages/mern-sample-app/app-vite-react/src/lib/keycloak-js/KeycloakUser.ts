export interface KeycloakUser {
  firstName?: string;
  lastName?: string;
  userName?: string;
  token?: string;
  locale?: string;
  companyId?: string;
  roles: string[];
  email?: string;
}
