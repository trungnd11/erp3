package com.vdc.authservice.repository;

import java.util.Optional;

import com.vdc.authservice.domain.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u WHERE u.username= :username")
    Optional<User> findByUsernameAndActiveIsTrue(@Param("username") String username);

    @Query("SELECT count(u.id) FROM User u WHERE u.username like :userName || '%'")
    Long countUser(@Param("userName") String userName);
}
