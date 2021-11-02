#!/bin/bash 

#export BUILD_ID=dontKillMe这一句很重要，这样指定了，项目启动之后才不会被Jenkins杀掉。
export BUILD_ID=dontKillMe

#指定最后编译好的jar存放的位置
www_path=/home/sdlk/D_disk/jenk/store

#Jenkins中编译好的jar位置
jar_path=/var/lib/jenkins/workspace/xxl-job/target

deploy_path=/home/sdlk/prod/

#Jenkins中编译好的jar名称
jar_name=job-admin-2.2.0.jar

#获取运行编译好的进程ID，便于我们在重新部署项目的时候先杀掉以前的进程
pid=$(cat /home/sdlk/D_disk/jenk/store/xxl-job.pid)

#进入指定的编译好的jar的位置
cd  ${jar_path}

#cp -rf ${jar_path}/${jar_name} ${deploy_path}

#将编译好的jar复制到最后指定的位置
cp  ${jar_path}/${jar_name} ${www_path}

#进入最后指定存放jar的位置
cd  ${www_path}

#杀掉以前可能启动的项目进程
kill -9 ${pid}

#启动jar，指定SpringBoot的profiles为beta,后台启动
java -jar -Dspring.profiles.active=local ${jar_name} &

#将进程ID存入到ufind-web.pid文件中
echo $! > /home/sdlk/D_disk/jenk/store/xxl-job.pid