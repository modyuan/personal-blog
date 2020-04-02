package com.yzmoe.personalblog.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.yzmoe.personalblog.mapper.ArticleMapper;
import com.yzmoe.personalblog.pojo.Article;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.InvalidParameterException;
import java.util.List;


@Service
@Slf4j
public class ArticleServiceImpl implements ArticleService {

    @Autowired
    ArticleMapper mapper;

    static boolean isAllUpdateArgsNull(Article article){
        return (article.getTitle() == null
                && article.getAuthor() == null
                && article.getContent()==null
                && article.getTags() ==null);
    }

    static boolean isOneInsertArgNull(Article article){
        return (article.getTitle()==null
                || article.getContent()==null
                || article.getAuthor()==null);
    }

    @Override
    public void addArticle(Article article) throws Exception {
        //数据库会自动设置两个时间。
        article.setCreateTime(null);
        article.setModifiedTime(null);

        if(isOneInsertArgNull(article)){
            throw new InvalidParameterException("title|author|content 不能为空");
        }
        int r = 0;
        try{
            r = mapper.insert(article);
            log.info("插入文章：id={} {}"+ article.getId(),article.getId(),(r>0)?"成功":"失败！");
            if(r==0) throw new Exception();
        }catch (Exception e){
            log.info("插入文章：id={} {}"+ article.getId(),article.getId(),"失败！原因："+ e.getMessage());
            throw new Exception("未知原因");
        }
    }

    @Override
    public void delArticle(int id) throws Exception {
        int r = 0;
        try{
            r = mapper.deleteById(id);
            log.info("删除文章 id={} {}",id,(r>0)?"成功":"失败！id不存在");

        }catch (Exception e){
            log.info("删除文章 id={} {}",id,"失败！原因: "+e.getMessage());
            throw new Exception("未知原因");
        }
        if(r==0) throw new InvalidParameterException("不存在的文章Id="+id);
    }

    @Override
    public void setArticleById(Article article) throws Exception{
        //数据库会自动设置两个时间。
        article.setModifiedTime(null);
        article.setCreateTime(null);

        if(isAllUpdateArgsNull(article)){
            throw new InvalidParameterException("没有要更新的字段");
        }
        boolean r = false;
        try{
            r = mapper.updateById(article)>0;
            log.info("更新文章 id={} {}",article.getId(),r?"成功":"失败！");
        }catch (Exception e){
            throw new Exception("未知原因");
        }

        if(!r){
            throw new InvalidParameterException("没有匹配的Id");
        }
    }

    @Override
    public Article getArticleById(int id) {
        Article article = mapper.selectById(id);
        log.info("获取文章 id={} {}",id,(article!=null)?"成功":"失败！");
        return article;
    }

    @Override
    public List<Article> getArticlesBriefSortedByDate(int pageIndex, int pageSize, boolean desc) {
        QueryWrapper<Article> wrapper = new QueryWrapper<>();
        wrapper.orderBy(true,!desc,"create_time");
        wrapper.select("id","title","author","tags","brief","create_time");
        Page<Article> page = new Page<>(pageIndex,pageSize);
        IPage<Article> articleIPage = mapper.selectPage(page, wrapper);
        List<Article> records = articleIPage.getRecords();
        log.info("获取文章列表 第{}页，每页{}条，当前页{}条.",pageIndex,pageSize,records.size());
        return records;
    }

    @Override
    public Integer getArticleCount(){
        return mapper.selectCount(null);
    }
}
