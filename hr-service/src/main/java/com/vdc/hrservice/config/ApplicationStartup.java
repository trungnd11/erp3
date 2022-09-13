package com.vdc.hrservice.config;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.FlushModeType;
import javax.persistence.Query;
import javax.transaction.Transactional.TxType;

import org.bouncycastle.jcajce.provider.asymmetric.ec.SignatureSpi.ecCVCDSA384;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.vdc.hrservice.auth.domain.AppRole;
import com.vdc.hrservice.auth.domain.AppUser;
import com.vdc.hrservice.auth.domain.Privilege;
import com.vdc.hrservice.auth.repository.AppUserRepository;
import com.vdc.hrservice.auth.repository.PrivilegeRepository;
import com.vdc.hrservice.auth.repository.RoleRepository;
import com.vdc.hrservice.data.InitData;
import com.vdc.hrservice.hr.domain.employee.Employee;
import com.vdc.hrservice.hr.repository.employee.EmployeeRepository;

@Component
@ConfigurationProperties(prefix = "sp-admin")
public class ApplicationStartup implements ApplicationListener<ApplicationReadyEvent> {

    @Autowired
    private AppUserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PrivilegeRepository privilegeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ApplicationProperties properties;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EntityManagerFactory emf;

    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        // TODO Auto-generated method stub
        try {
            initOrUpdateUserAndRole();
        } catch (Exception e) {
            e.printStackTrace();

        }
    }

    @Transactional(rollbackFor = Exception.class)
    private void initOrUpdateUserAndRole() throws Exception {
        EntityManager entityManager = emf.createEntityManager();
        entityManager.setFlushMode(FlushModeType.COMMIT);
        EntityTransaction transaction = entityManager.getTransaction();

        try {
            transaction.begin();

            AppUser user = null;
            Optional<AppUser> userOpt = userRepository.getUserByUsername(properties.getAdminUsername());
            if (userOpt.isPresent()) {
                user = userOpt.get();
                user.setActive(true);

            } else {
                user = new AppUser(properties.getAdminUsername(), passwordEncoder.encode(properties.getAdminPassword()),
                        true, null);
                entityManager.persist(user);
            }

            InitData data = new InitData();
            Map<String, InitData.Role> roles = data.getRoles();
            Map<String, List<InitData.Permission>> permissions = data.getPermissions();

            for (Map.Entry<String, InitData.Role> pair : roles.entrySet()) {
                AppRole role = roleRepository.findByCode(pair.getValue().getCode());
                if (role == null) {
                    role = new AppRole();
                    role.setCode(pair.getValue().getCode());
                    role.setName(pair.getValue().getName());
                    entityManager.persist(role);

                }

                Collection<AppRole> listRole = user.getRoles();

                // listRole == null => account has not roles
                if (listRole == null) {
                    listRole = new ArrayList<>();
                    listRole.add(role);
                    user.setRoles(listRole);
                    entityManager.merge(user);
                } else {
                    boolean isExist = false;
                    for (AppRole iRole : listRole) {
                        if (iRole.getCode().equals(role.getCode())) {
                            isExist = true;
                            break;
                        }
                    }

                    if (!isExist) {
                        user.getRoles().add(role);
                        entityManager.merge(user);
                    }
                }

                List<InitData.Permission> rolePermissions = permissions.get(pair.getKey());

                for (InitData.Permission permission : rolePermissions) {
                    Privilege privilege = privilegeRepository.findByName(permission.getName());
                    if (privilege == null) {
                        privilege = new Privilege();
                        privilege.setName(permission.getName());
                        privilege.setDescription(permission.getDescriptions());
                        entityManager.persist(privilege);
                    }

                    Collection<Privilege> listPrivileges = role.getPrivileges();

                    if(listPrivileges == null){
                        listPrivileges = new ArrayList<>();
                        listPrivileges.add(privilege);
                        role.setPrivileges(listPrivileges);
                        entityManager.merge(role);
                    }
                    else{
                        boolean isExist = false;

                        for (Privilege iPrivilege : listPrivileges) {
                            if (iPrivilege.getName().equals(privilege.getName())) {
                                isExist = true;
                                break;
                            }
                        }
    
                        if (!isExist) {
                            // user.getRoles().add(role);
                            // entityManager.merge(user);
                            role.getPrivileges().add(privilege);
                            entityManager.merge(role);
                        }
                    }

                }
            }

            transaction.commit();

        } catch (Exception e) {
            if (transaction.isActive()) {
                transaction.rollback();
            }
            throw e;
        } finally {
            entityManager.close();
        }
    }

}
