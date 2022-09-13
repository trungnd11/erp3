package com.vdc.authservice.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.vdc.authservice.config.Constants;
import com.vdc.authservice.domain.Role;
import com.vdc.authservice.domain.User;
import com.vdc.authservice.dto.RegisterUserDto;
import com.vdc.authservice.dto.RoleDto;
import com.vdc.authservice.utils.AccountUtils;

@Repository
public class AccountRepository {
    
    @Autowired
    private EntityManager entityManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional(rollbackFor = Exception.class)
    public User createUser(RegisterUserDto registerUserDto){
        String sql = "SELECT * FROM app_role AS role LEFT JOIN position_role AS p ON p.role_id = role.id WHERE p.employee_position_id= :positionId";
        Query query = entityManager.createNativeQuery(sql, Role.class);
        query.setParameter("positionId", registerUserDto.getPositionId());

        List<Role> roles = query.getResultList();

        // List<Role> roles = rolesDto.stream().map(Role::of).collect(Collectors.toList());

        String username = usernameGenerator(registerUserDto.getFullName());

        User user = User.builder().active(true).username(username).password(passwordEncoder.encode(Constants.defaultPassword)).roles(roles).build();

        user = userRepository.save(user);
        return user;

    }

    private String usernameGenerator(String fullName) {
        String username = AccountUtils.usernameGenerator(fullName);
        long userNo = userRepository.countUser(username);
        return userNo == 0 ? username : username + userNo;
    }

}
