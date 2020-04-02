package com.yzmoe.personalblog.config;


import com.yzmoe.personalblog.mapper.UserMapper;
import com.yzmoe.personalblog.pojo.User;
import com.yzmoe.personalblog.service.LoginService;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.apache.shiro.web.servlet.Cookie;
import org.apache.shiro.web.session.mgt.DefaultWebSessionManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;

@Configuration
public class ShiroConfig {

    @Bean("sha256Matcher")
    public HashedCredentialsMatcher hashedCredentialsMatcher() {
        HashedCredentialsMatcher credentialsMatcher =
                new HashedCredentialsMatcher();
        //指定加密方式
        credentialsMatcher.setHashAlgorithmName("sha-256");
        //加密次数
        //credentialsMatcher.setHashIterations(1);
        return credentialsMatcher;
    }

    @Bean
    public ShiroFilterFactoryBean shiroFilterFactoryBean(@Autowired DefaultWebSecurityManager manager){
        ShiroFilterFactoryBean bean = new ShiroFilterFactoryBean();
        bean.setSecurityManager(manager);

        Map<String,String> filter = new LinkedHashMap<>();

        filter.put("/back/**","authc");
        filter.put("/back","authc");

        bean.setFilterChainDefinitionMap(filter);
        bean.setLoginUrl("/#login");
        bean.setUnauthorizedUrl("/#unauth");

        return bean;
    }


    @Bean//(name="defaultWebSecurityManager")
    public DefaultWebSecurityManager getDefaultWebSecurityManager(@Autowired UserRealm userRealm){
        DefaultWebSecurityManager manager = new DefaultWebSecurityManager();
        manager.setRealm(userRealm);

        DefaultWebSessionManager sessionManager = new DefaultWebSessionManager();
        sessionManager.getSessionIdCookie().setSameSite(Cookie.SameSiteOptions.STRICT);
        sessionManager.setSessionIdUrlRewritingEnabled(false);

        manager.setSessionManager(sessionManager);

        return manager;
    }
}


