package com.yzmoe.personalblog;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
public class PersonalBlogApplication {

    public static void main(String[] args) {

        SpringApplication.run(PersonalBlogApplication.class, args);
    }

}
