package com.yzmoe.personalblog.config;

import com.yzmoe.personalblog.pojo.User;
import com.yzmoe.personalblog.service.LoginService;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.authc.credential.CredentialsMatcher;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.authz.UnauthenticatedException;
import org.apache.shiro.crypto.hash.Hash;
import org.apache.shiro.crypto.hash.Sha256Hash;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.util.ByteSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Set;


@Slf4j
@Component
public class UserRealm extends AuthorizingRealm {

    @Autowired
    @Lazy
    private LoginService loginService;

    @Value("${blogConfig.salt}")
    private String salt;

    public UserRealm(@Qualifier("sha256Matcher") CredentialsMatcher matcher) {
        super(matcher);
    }

    //授权
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        log.info("授权！");
        SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
        return info;
    }
    //认证
    //在service层执行 subject.login(token) 这句之后就会跳转到这里。
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        log.info("认证！");

        UsernamePasswordToken passwordToken = (UsernamePasswordToken) authenticationToken;
        User user = loginService.getUserInfo(passwordToken.getUsername());

        if (user == null) {
            return null;
        }

        return new SimpleAuthenticationInfo(user.getUsername(),user.getPassword(), ByteSource.Util.bytes(salt),getName());
    }
}

