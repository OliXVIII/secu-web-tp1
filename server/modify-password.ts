'use server';

import { User, updatePassword } from 'firebase/auth';

type ModifyPasswordProps = {
  previousPassword: string;
  newPassword: string;
  user: User;
};
export const ModifyPassword = ({ previousPassword, newPassword, user }: ModifyPasswordProps) => {
  if (user) {
    // [START auth_update_password]
    updatePassword(user, newPassword)
      .then(() => {
        // Update successful.
      })
      .catch((error) => {
        // An error ocurred
      });
    // [END auth_update_password]
  }
};
