package com.yzmoe.personalblog.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.view.InternalResourceView;
import org.springframework.web.servlet.view.InternalResourceViewResolver;


@Configuration
public class ViewConfig {

    @Bean
    public InternalResourceViewResolver commonResourceView(){
        InternalResourceViewResolver resolver = new InternalResourceViewResolver();
        resolver.setPrefix("/");
        resolver.setSuffix(".html");
        resolver.setOrder(1);
        resolver.setContentType("text/html");
        resolver.setCache(false); // 禁用页面缓存
        return resolver;
    }
}
