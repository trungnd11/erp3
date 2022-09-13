package com.vdc.hrservice.auth.repository;

import java.util.Optional;

import com.vdc.hrservice.auth.domain.AppUser;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser,Long> {
    
    @Query("SELECT U FROM AppUser U JOIN FETCH U.employee e WHERE U.username = :username AND U.active=true AND U.delFlg=false")
    Optional<AppUser> getUser(@Param("username") String username);

    @Query("SELECT U FROM AppUser U LEFT JOIN FETCH U.roles WHERE U.username = :username AND U.active=true AND U.delFlg=false")
    Optional<AppUser> getUserByUsername(@Param("username") String username);
}
