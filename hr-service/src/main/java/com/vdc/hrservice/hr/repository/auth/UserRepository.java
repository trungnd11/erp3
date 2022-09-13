package com.vdc.hrservice.hr.repository.auth;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.vdc.hrservice.auth.domain.AppUser;

@Repository
public interface UserRepository extends JpaRepository<AppUser, Long> {

	@Query("SELECT u FROM AppUser u LEFT JOIN FETCH u.employee WHERE u.username= :username AND u.active=1")
	Optional<AppUser> findByUsernameAndActiveIsTrue(@Param("username") String username);
}
