package com.yzmoe.personalblog.config;

import com.yzmoe.personalblog.mapper.UserMapper;
import com.yzmoe.personalblog.pojo.User;
import com.yzmoe.personalblog.service.LoginService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.Instant;

@Component
@Slf4j
@Order(value=2)
public class StartupRunner implements CommandLineRunner
{
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private LoginService loginService;

    @Value("${blogConfig.username}")
    private String defaultUser;

    @Value("${blogConfig.password}")
    private String defaultPass;


    @Override
    public void run(String... args) throws Exception
    {
        Integer integer = userMapper.selectCount(null);
        if(integer==null || integer==0){
            loginService.addUser(new User(defaultUser,defaultPass,new Timestamp(System.currentTimeMillis()))) ;
            log.info("没有默认用户，新增默认用户root");
        }
    }
}