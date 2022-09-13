package com.vdc.hrservice.security;


/* privilege name = PREFIX + PRIVILEGE_OTHER  */
public class AuthoritiesConstants {
    public static final String ANONYMOUS = "ROLE_ANONYMOUS";
    public static final String PREFIX = "ROLE_";
    //ADMIN.ORG
    public static final String PRIVILEGE_MANAGE_WORKSPACE= "MANAGE_WORKSPACE";
    public static final String PRIVILEGE_MANAGE_EMPLOYEE= "MANAGE_EMPLOYEE";
    public static final String PRIVILEGE_STATISTIC_DAYOFF= "STATISTIC_DAYOFF";
    public static final String PRIVILEGE_STATISTIC_OVERTIME= "STATISTIC_OVERTIME";
    // Administrator for system
    public final static String ROLE_ADMIN = "ROLE_ADMIN";

    // user, employee role
    public final static String ROLE_USER = "ROLE_USER";
    public final static String ROLE_MANAGER = "ROLE_MANAGER";
    public final static String ROLE_HR_MANAGER = "ROLE_HR_MANAGER";
    public final static String ROLE_HR = "ROLE_HR";
    public final static String ROLE_CANDIDATE = "ROLE_CANDIDATE";
    public final static String ROLE_CEO = "ROLE_CEO";
    public final static String ROLE_IVENTORY_MANAGER = "ROLE_INVENTORY_MANAGER";
    public final static String ROLE_PURCHASING = "ROLE_PURCHASING";
    public final static String ROLE_ASSET_MANAGER = "ROLE_ASSET_MANAGER";
    public final static String ROLE_MAINTENANCE = "ROLE_MAINTENANCE";
    public final static String ROLE_BUSINESS = "ROLE_BUSINESS";
    public final static String ROLE_ACCOUNTING = "ROLE_ACCOUNTING";
    public final static String ROLE_TECNICAL = "ROLE_TECHNICAL";
    // role production
    public final static String ROLE_PRODUCTION = "ROLE_PRODUCTION";
}
