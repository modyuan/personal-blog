package com.yzmoe.personalblog.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpServletResponse;

@Controller
public class ViewController {

    @GetMapping({"/","/text/*","/list/*","/about","/login"})
    public String index(){
        return "index";
    }

    @GetMapping("/back")
    public String back(){
        return "back/back";
    }

}
