package com.yzmoe.personalblog.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.yzmoe.personalblog.pojo.Article;

import java.util.List;


public interface ArticleService {

    void addArticle(Article article) throws Exception;
    void delArticle(int id) throws Exception;
    void setArticleById(Article article) throws Exception;
    Article getArticleById(int id);
    List<Article> getArticlesBriefSortedByDate(int pageIndex,int pageSize, boolean desc);
    Integer getArticleCount();

}
