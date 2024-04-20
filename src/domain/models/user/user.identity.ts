/**
 * This class is supposed to be lightweight, because it should only carry
 * some information about the current user and their permissions.
 */
export class UserIdentity {
  id!: number;
  username!: string;
  isAdmin!: boolean;
}
