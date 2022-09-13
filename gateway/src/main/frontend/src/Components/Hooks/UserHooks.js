import { useState } from "react";
import { getLoggedinUser } from "../../helpers/api_helper";
import { useSelector } from 'react-redux';
import { IS_AUTHENTICATED_KEY, ACCOUNT_KEY } from "../../store/auth/authentication/authentication";
import { Storage } from "../../utils/storage-utils";

const useProfile = () => {
  const userProfileSession = useSelector((state) => state.authentication.account) || Storage.local.get(ACCOUNT_KEY);
  const [loading] = useState(userProfileSession ? false : true);
  const [userProfile] = useState(
    userProfileSession ? userProfileSession : null
  );

  const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated) || Storage.local.get(IS_AUTHENTICATED_KEY);

  return { userProfile, isAuthenticated, loading };
};

export { useProfile };
