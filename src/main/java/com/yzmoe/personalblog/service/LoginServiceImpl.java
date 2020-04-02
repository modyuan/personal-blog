package com.yzmoe.personalblog.service;

import com.yzmoe.personalblog.mapper.UserMapper;
import com.yzmoe.personalblog.pojo.User;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.sql.Date;

@Service
@Slf4j
public class LoginServiceImpl implements LoginService {

    @Autowired
    private UserMapper userMapper;

    @Value("${blogConfig.salt}")
    private String salt;

    @Override
    public boolean login(User info) {
        Subject subject = SecurityUtils.getSubject();
        UsernamePasswordToken token = new UsernamePasswordToken(info.getUsername(),info.getPassword());
        try{
            subject.login(token);
            info.setLastLoginTime(new Timestamp(System.currentTimeMillis()));
            info.setPassword(null);
            userMapper.updateById(info);
            subject.getSession().setAttribute("username",info.getUsername());
        }catch (AuthenticationException e){
            log.info(e.getMessage());
            log.info("用户{}登录失败！", info.getUsername());
            return false;
        }
        log.info("用户{}登录成功！", info.getUsername());
        return true;
    }

    @Override
    public String getCurrentLoginUser() {
        Subject subject = SecurityUtils.getSubject();
        Object username = subject.getSession().getAttribute("username");
        if(username==null) return null;
        else return (String)username;

    }

    @Override
    public User getUserInfo(String userName) {
        return userMapper.selectById(userName);
    }


    @Override
    public boolean addUser(User user) {
        String s = new SimpleHash("sha-256", user.getPassword(), salt).toHex();
        user.setPassword(s);
        boolean r = userMapper.insert(user)>0;
        log.info("增加用户{} {}",user.getUsername(), r?"成功":"失败");
        return r;
    }

    @Override
    public void logout() {
        Subject subject = SecurityUtils.getSubject();
        Object username = subject.getSession().getAttribute("username");
        try{
            String user = (String)username;
            log.info("用户{}登出",user);
        }catch (Exception e){}
        subject.logout();
    }

    @Override
    public boolean changePassword(User user) {
        user.setLastLoginTime(null);
        if(user.getUsername()==null || user.getPassword()==null) return false;
        String s = new SimpleHash("sha-256", user.getPassword(), salt).toHex();
        user.setPassword(s);
        int r = userMapper.updateById(user);
        return (r>0);
    }
}
