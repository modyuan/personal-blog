package com.yzmoe.personalblog.config;


import com.baomidou.mybatisplus.extension.plugins.PaginationInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

//设置mybatis-plus分页插件
@Configuration
public class MPConfig {
    @Bean
    public PaginationInterceptor paginationInterceptor() {
        PaginationInterceptor interceptor = new PaginationInterceptor();
        interceptor.setLimit(50);
        return interceptor;
    }
}
