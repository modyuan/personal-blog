package com.yzmoe.personalblog.controller;

import com.yzmoe.personalblog.pojo.Article;
import com.yzmoe.personalblog.pojo.ResultMsg;
import com.yzmoe.personalblog.pojo.User;
import com.yzmoe.personalblog.service.ArticleService;
import com.yzmoe.personalblog.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;


//后台管理的控制器
@RestController
@RequestMapping("/back")
public class BackManagerController {

    @Autowired
    ArticleService articleService;

    @Autowired
    LoginService loginService;

    @PostMapping("/article")
    public ResultMsg addArticle(@RequestBody Article article){
        try {
            articleService.addArticle(article);
            return new ResultMsg(true,article.getId().toString());
        } catch (Exception e) {
            return new ResultMsg(false,e.getMessage());
        }
    }

    @PutMapping("/article")
    public ResultMsg updateArticle(@RequestBody Article article){
        try {
            articleService.setArticleById(article);
            return new ResultMsg(true,"成功");
        } catch (Exception e) {
            return new ResultMsg(false,e.getMessage());
        }
    }

    @DeleteMapping("/article/{id}")
    public ResultMsg deleteArticle(@PathVariable int id){
        try {
            articleService.delArticle(id);
            return ResultMsg.succeed();
        } catch (Exception e) {
            return ResultMsg.fail(e.getMessage());
        }
    }

    @PutMapping("/user")
    public ResultMsg resetPassword(User user, HttpServletResponse response){
        boolean b = loginService.changePassword(user);
        if(b){
            return ResultMsg.succeed();
        }else{
            response.setStatus(400);
            return ResultMsg.fail("更改失败！");
        }
    }

}
