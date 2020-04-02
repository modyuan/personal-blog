package com.yzmoe.personalblog.controller;


import com.yzmoe.personalblog.pojo.User;
import com.yzmoe.personalblog.service.LoginService;
//import org.apache.shiro.SecurityUtils;
//import org.apache.shiro.authc.IncorrectCredentialsException;
//import org.apache.shiro.authc.UnknownAccountException;
//import org.apache.shiro.authc.UsernamePasswordToken;
//import org.apache.shiro.subject.Subject;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;


//登录控制器API
@RestController
@Slf4j
@RequestMapping("/user")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping("/login")
    public void login(@RequestBody User info, HttpServletResponse response){
        boolean r = loginService.login(info);
        if(r){
            response.setStatus(200);
        }else{
            response.setStatus(400);
        }
    }

    @PostMapping("/logout")
    public void logout(){
        loginService.logout();
    }

    @GetMapping("/login")
    public Object isLogin(){
        String user = loginService.getCurrentLoginUser();
        if (user == null) {
            return false;
        }else{
            User userInfo = loginService.getUserInfo(user);
            userInfo.setPassword(null);
            return userInfo;
        }
    }

}
