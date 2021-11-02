#进入生产项目部署路径
cd /data/app
#进行备份
mv ${project}.jar  backup
mv ${project}*.jar ${project}.jar
#停止原有项目
pm2 stop ${project}.json
kill -9 `ps -ef  | grep${project}.jar | grep -v grep | awk '{print $2}'`
#启动新的项目
pm2 start ${project}.json