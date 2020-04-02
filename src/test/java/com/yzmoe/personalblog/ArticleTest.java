package com.yzmoe.personalblog;


import com.yzmoe.personalblog.mapper.ArticleMapper;
import com.yzmoe.personalblog.pojo.Article;
import com.yzmoe.personalblog.service.ArticleService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.print.DocFlavor;
import java.io.FileInputStream;
import java.sql.Date;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;

@SpringBootTest
public class ArticleTest {

    @Autowired
    ArticleService articleService;

    @Autowired
    ArticleMapper mapper;

    @Test
    public void insertTest() throws Exception {

        for (int i = 1; i <= 100; i++) {
            Article article = new Article();
            article.setTitle("标题测试-"+i);
            article.setAuthor("测试菌");
            article.setBrief("这是文章的简单介绍～～～"+i*2);
            article.setContent("这里是内容："+ (int)(Math.random()*1000));
            article.setTags("spring, java");
            articleService.addArticle(article);
            Thread.sleep(1000);
        }
    }

    @Test
    public void getBriefTest(){
        List<Article> articles = articleService.getArticlesBriefSortedByDate(1, 10, true);
        for (Article article : articles) {
            System.out.println(article);
        }
    }

    @Test
    public void getTest() throws Exception {

        Article article = new Article();
        articleService.addArticle(article);
        //System.out.println(art);

    }

    @Test
    public void insertFailTest(){
        Article article = new Article();
        article.setTitle("failTEST");
        Boolean b = null;
        System.out.println(b);

    }

    @Test
    public void setArticleTest() throws Exception {
        Article article = new Article();
        article.setId(2);
        FileInputStream fileInputStream =
                new FileInputStream("/Users/yuan/Documents/md笔记/Java基础/Java中的集合.md");
        byte[] bytes = fileInputStream.readAllBytes();
        String s = new String(bytes, 0, bytes.length, "UTF-8");

        article.setContent(s);
        articleService.setArticleById(article);
        //System.out.println(b);
    }

    @Test
    public void testDate(){
        Timestamp timestamp = new Timestamp(System.currentTimeMillis()*2);
        System.out.println(timestamp);
    }



}
