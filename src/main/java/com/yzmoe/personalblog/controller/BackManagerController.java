package com.yzmoe.personalblog.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.yzmoe.personalblog.pojo.Article;
import com.yzmoe.personalblog.pojo.ResultMsg;
import com.yzmoe.personalblog.pojo.User;
import com.yzmoe.personalblog.service.ArticleService;
import com.yzmoe.personalblog.service.LoginService;
import org.apache.shiro.authz.annotation.RequiresAuthentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;


@ControllerAdvice
class ShiroExceptionHandler{
    @ExceptionHandler({org.apache.shiro.authz.AuthorizationException.class})
    @ResponseBody
    public Object handlerNullPointerException(Exception ex,HttpServletResponse response){
        response.setStatus(401);
        System.out.println("handled!!");
        return ResultMsg.fail("need log in");
    }
}

//后台管理的控制器
@RestController
@RequiresAuthentication
@RequestMapping("/api")
public class BackManagerController {

    @Autowired
    ArticleService articleService;

    @Autowired
    LoginService loginService;

    // 新的Blog上传
    @PostMapping("/article")
    public Object addArticle(@RequestBody Article article, HttpServletResponse response){
        try {
            if(article.getBrief()==null){
                article.setBrief(article.getContent().substring(0,Math.min( 200, article.getContent().length())));
            }
            articleService.addArticle(article);
            Map<String,Integer> result = new HashMap<>();
            result.put("id",article.getId());
            return result;
        } catch (Exception e) {
            response.setStatus(400);
            return new ResultMsg(false,e.getMessage());
        }
    }

    @PutMapping("/article")
    public ResultMsg updateArticle(@RequestBody Article article,HttpServletResponse response){
        try {
            if(article.getBrief()==null){
                article.setBrief(article.getContent().substring(0,Math.min( 200, article.getContent().length())));
            }
            articleService.setArticleById(article);
            return new ResultMsg(true,"成功");
        } catch (Exception e) {
            response.setStatus(400);
            return new ResultMsg(false,e.getMessage());
        }
    }

    @DeleteMapping("/article/{id}")
    public ResultMsg deleteArticle(@PathVariable int id, HttpServletResponse response){
        try {
            articleService.delArticle(id);
            return ResultMsg.succeed();
        } catch (Exception e) {
            response.setStatus(400);
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
