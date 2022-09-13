package com.vdc.authservice.secutity;

import java.util.Arrays;


import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

public class SecurityUtils {
    private SecurityUtils() {}

    /**
     * Get the login of the current user.
     *
     * @return the login of the current user.
     */
    public static String getCurrentUserLogin() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return extractPrincipal(authentication);
    }

    private static String extractPrincipal(Authentication authentication) {
        if (authentication == null) {
            return null;
        } else if (authentication.getPrincipal() instanceof UserDetails) {
            UserDetails springSecurityUser = (UserDetails) authentication.getPrincipal();
            return springSecurityUser.getUsername();
        } else if (authentication.getPrincipal() instanceof String) {
            return (String) authentication.getPrincipal();
        }
        return null;
    }

    /**
     * Get the JWT of the current user.
     *
     * @return the JWT of the current user.
     */
    public static String getCurrentUserJWT() {
        // return ReactiveSecurityContextHolder
        //     .getContext()
        //     .map(SecurityContext::getAuthentication)
        //     .filter(authentication -> authentication.getCredentials() instanceof String)
        //     .map(authentication -> (String) authentication.getCredentials());
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication.getCredentials() instanceof String){
            return (String) authentication.getCredentials();
        }
        return null;
    }

    /**
     * Check if a user is authenticated.
     *
     * @return true if the user is authenticated, false otherwise.
     */
    public static Boolean isAuthenticated() {
        // return ReactiveSecurityContextHolder
        //     .getContext()
        //     .map(SecurityContext::getAuthentication)
        //     .map(Authentication::getAuthorities)
        //     .map(authorities -> authorities.stream().map(GrantedAuthority::getAuthority).noneMatch("ROLE_ANONYMOUS"::equals));

            return SecurityContextHolder.getContext().getAuthentication().getAuthorities().stream().map(GrantedAuthority::getAuthority).noneMatch("ROLE_ANONYMOUS"::equals);
    }

    /**
     * Checks if the current user has any of the authorities.
     *
     * @param authorities the authorities to check.
     * @return true if the current user has any of the authorities, false otherwise.
     */
    public static Boolean hasCurrentUserAnyOfAuthorities(String... authorities) {
        // return ReactiveSecurityContextHolder
        //     .getContext()
        //     .map(SecurityContext::getAuthentication)
        //     .map(Authentication::getAuthorities)
        //     .map(authorityList ->
        //         authorityList
        //             .stream()
        //             .map(GrantedAuthority::getAuthority)
        //             .anyMatch(authority -> Arrays.asList(authorities).contains(authority))
        //     );

        return SecurityContextHolder.getContext().getAuthentication()
                .getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .anyMatch(authority -> Arrays.asList(authorities).contains(authority));
    }

    /**
     * Checks if the current user has none of the authorities.
     *
     * @param authorities the authorities to check.
     * @return true if the current user has none of the authorities, false otherwise.
     */
    public static Boolean hasCurrentUserNoneOfAuthorities(String... authorities) {
        return !hasCurrentUserAnyOfAuthorities(authorities);
    }

    /**
     * Checks if the current user has a specific authority.
     *
     * @param authority the authority to check.
     * @return true if the current user has the authority, false otherwise.
     */
    public static Boolean hasCurrentUserThisAuthority(String authority) {
        return hasCurrentUserAnyOfAuthorities(authority);
    }
}
