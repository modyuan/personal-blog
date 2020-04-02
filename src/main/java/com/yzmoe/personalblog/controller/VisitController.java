package com.yzmoe.personalblog.controller;

import com.yzmoe.personalblog.pojo.Article;
import com.yzmoe.personalblog.pojo.ResultMsg;
import com.yzmoe.personalblog.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
public class VisitController {


    @Autowired
    private ArticleService articleService;

    @GetMapping("/article/{id}")
    public Object getArticle(@PathVariable int id, HttpServletResponse response){
        Article article = articleService.getArticleById(id);
        if(article != null){
            return article;
        }else{
            response.setStatus(400);
            return new ResultMsg(false,"未知文章Id");
        }
    }

    @GetMapping("/articles")
    public Object getArticleBriefList(@RequestParam Integer pageIndex,
                                      @RequestParam Integer pageSize,
                                      @RequestParam(required = false) Boolean isDesc){
        List<Article> list = articleService.getArticlesBriefSortedByDate(pageIndex, pageSize, (isDesc == null) ? false : isDesc);
        return list;
    }

    @GetMapping("/articleCount")
    public Object getArticleCount(){
        return articleService.getArticleCount();
    }

}
