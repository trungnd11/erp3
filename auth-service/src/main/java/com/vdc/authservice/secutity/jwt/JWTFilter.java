package com.vdc.authservice.secutity.jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

public class JWTFilter extends OncePerRequestFilter{
    public static final String AUTHORIZATION_HEADER = "Authorization";

    private final TokenProvider tokenProvider;

    public JWTFilter(TokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException {
                HttpServletRequest httpServletRequest = (HttpServletRequest) request;
                HttpServletResponse httpServletResponse= (HttpServletResponse) response;
                String jwt = resolveToken(httpServletRequest);

                // List<String> apiEndpoints = List.of("/register", "/authenticate");
                String uri = httpServletRequest.getRequestURI();

                try {
                    if (StringUtils.hasText(jwt) && this.tokenProvider.validateToken(jwt)) {
                        Authentication authentication = this.tokenProvider.getAuthentication(jwt);
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    }
                    else {

                    }
                } catch (Exception e) {
                    response.setStatus(HttpStatus.SC_UNAUTHORIZED);
                    response.setContentType("application/json");
                    response.getOutputStream().println("{ \"error\": \"" + e.getMessage() + "\" }");
                }
                filterChain.doFilter(request, httpServletResponse);
    }
    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
         return null;
    }
}
