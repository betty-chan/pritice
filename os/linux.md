## 文件操作
```shell
#删除文件夹或者文件
rm -rf spiderCMS_frontend
##移动目录
mv webpack /home/xiongqiao
```

## 进程管理
```shell
#查看端口进程
netstat -nap | grep 8084
lsof -i:8084
#查看进程路径
ls -l /proc/1089
#关闭进程
kill -9 1089
```

## 网络管理
```shell
#查看内网ip
ifconfig -a
#查看网关ip,其中网关标识G
route -n 
```

## 其他
```shell
#拉取git代码
git clone https://gitee.com/betty-chan/spiderCMS_frontend.git
#重新加载nginx配置文件
nginx -s reload
```
> 常用目录
- /etc/nginx/conf.d/：nginx配置目录