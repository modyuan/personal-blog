
-- create user
drop table if exists blog_user;
create table blog_user (
    username varchar(20) primary key,
    password varchar(64) not null,
    last_login_time datetime not null
);


-- create article
drop table if exists blog_article;
create table blog_article(
    id INT UNSIGNED primary key auto_increment,
    title TEXT not null,
    author TEXT not null,
    tags TEXT,
    brief TEXT,
    content MEDIUMTEXT,
    create_time DATETIME not null default CURRENT_TIMESTAMP,
    modified_time DATETIME not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
    deleted smallint not null default 0
);