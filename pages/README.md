#页面文件夹

pages下的index.vue是首页文件，每新建一个vue文件会以文件名为页面路径名；
如：新建了login.vue文件，那么在浏览器的url是http://localhost:3000/login

新建文件夹则以文件夹名为路径名，但是页面文件文件是新文件夹中的index.vue文件，新文件夹中有除index.vue文件之外的文件，
则页面路径是 协议://域名:端口/pages下文件夹名/pages下文件夹中的文件名;
如： http://localhost:3000/login/auth

``` bash
    index.vue                       #首页
    login.vue                       #登录页面
    admin                           #后台管理页面文件夹
        index.vue                   #后台管理主页
        media.vue                   #媒体文件管理页面
        posts                       #文章文件夹
            index.vue               #文章列表管理页面
            edit.vue                #单一文章内容编辑、新增页面
            tag.vue                 #文章标签管理页面
            categories.vue          #文章分类管理页面
        settings.vue                #后台设置页面
        users.vue                   #用户管理页面
```


本项目内的命名规则： 样式class命名统一使用下划线，vue事件命名统一使用驼峰命名