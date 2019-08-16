#页面文件夹

pages下的index.vue是首页文件，每新建一个vue文件会以文件名为页面路径名；
如：新建了login.vue文件，那么在浏览器的url是http://localhost:3000/login

新建文件夹则以文件夹名为路径名，但是页面文件文件是新文件夹中的index.vue文件，新文件夹中有除index.vue文件之外的文件，
则页面路径是 协议://域名:端口/pages下文件夹名/pages下文件夹中的文件名;
如： http://localhost:3000/login/auth