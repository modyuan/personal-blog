package com.yzmoe.personalblog;

import com.yzmoe.personalblog.config.UserRealm;
import com.yzmoe.personalblog.mapper.UserMapper;
import com.yzmoe.personalblog.pojo.User;
import com.yzmoe.personalblog.service.LoginService;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import org.apache.shiro.crypto.hash.SimpleHash;

import javax.swing.plaf.synth.SynthTextAreaUI;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.TimeZone;

@SpringBootTest
class PersonalBlogApplicationTests {


    @Test
    void makeHash() {

        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        System.out.println(timestamp);

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("HH:mm:ss'Z'");
        simpleDateFormat.setTimeZone(TimeZone.getTimeZone("+00:00"));
        System.out.println(simpleDateFormat.format(new Date()));


    }

}
