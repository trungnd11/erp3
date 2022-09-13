package com.vdc.hrservice.data;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class InitData {
    
    private final Permission ROLE_CREATE_EMPLOYEE = new Permission("ROLE_CREATE_EMPLOYEE", "Create new employee");
    private final Permission ROLE_UPDATE_EMPLOYEE = new Permission("ROLE_UPDATE_EMPLOYEE", "Update employee");
    private final Permission ROLE_REMOVE_EMPLOYEE = new Permission("ROLE_REMOVE_EMPLOYEE", "Remove employee");
    private final Permission ROLE_READ_EMPLOYEE = new Permission("ROLE_READ_EMPLOYEE", "View list employee");
    private final Permission ROLE_UPDATE_PERSONAL = new Permission("ROLE_UPDATE_PERSONAL", "Update personal infomation");
    private final Permission ROLE_PART_LEADER = new Permission("ROLE_PART_LEADER", "Update team in department");
    private final Permission ROLE_SETTING_ACCOUNT = new Permission("ROLE_SETTING_ACCOUNT", "Setting user account");
    private final Permission ROLE_SETTING_POSITION_ROLE = new Permission("ROLE_SETTING_POSITION_ROLE", "Setting role for position");
    private final Permission ROLE_CREATE_ROLE = new Permission("ROLE_CREATE_ROLE", "Create role");
    private final Permission ROLE_UPDATE_ROLE = new Permission("ROLE_UPDATE_ROLE", "Update role");
    private final Permission ROLE_READ_ROLE = new Permission("ROLE_READ_ROLE", "View list role");


    private Map<String, Role> roles;

    private Map<String, List<Permission>> permissions;

    public InitData(){
        
        // define roles
        this.roles = new HashMap<>();
        this.roles.put("ADMIN.HR", new Role("HR", "ADMIN.HR"));
        this.roles.put("EMPLOYEE", new Role("EMPLOYEE", "EMPLOYEE"));
        this.roles.put("PART_LEADER", new Role("PART_LEADER", "PART_LEADER"));

        // define permissions for each role
        this.permissions = new HashMap<>();
        this.permissions.put("ADMIN.HR", new ArrayList<>(Arrays.asList(ROLE_CREATE_EMPLOYEE, ROLE_UPDATE_EMPLOYEE, ROLE_REMOVE_EMPLOYEE, ROLE_READ_EMPLOYEE, ROLE_SETTING_ACCOUNT,ROLE_SETTING_POSITION_ROLE, ROLE_CREATE_ROLE, ROLE_UPDATE_ROLE, ROLE_READ_ROLE )));
        // this.permissions.put("ADMIN.HR", new ArrayList<>(Arrays.asList(ROLE_CREATE_EMPLOYEE, ROLE_UPDATE_EMPLOYEE, ROLE_REMOVE_EMPLOYEE)));

        this.permissions.put("EMPLOYEE", new ArrayList<>(Arrays.asList(ROLE_UPDATE_PERSONAL)));
        this.permissions.put("PART_LEADER", new ArrayList<>(Arrays.asList(ROLE_PART_LEADER)));

    }

    @Data
    @AllArgsConstructor
    public class Role{
        private String name;
        private String code;
    }

    @Data
    @AllArgsConstructor
    public class Permission{
        private String name;
        private String descriptions;
    }
}
