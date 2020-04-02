package com.yzmoe.personalblog.mapper;


import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.yzmoe.personalblog.pojo.Article;
import org.apache.ibatis.annotations.Mapper;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface ArticleMapper extends BaseMapper<Article> {

}
