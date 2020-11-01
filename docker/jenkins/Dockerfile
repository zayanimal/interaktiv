FROM jenkins:lts
USER root
RUN apt-get update && apt-get install -y tree nano curl sudo
RUN curl https://get.docker.com/builds/Linux/x86_64/docker-latest.tgz | tar xvz -C /tmp/ && mv /tmp/docker/docker /usr/bin/docker
RUN usermod -a -G sudo jenkins
RUN echo "jenkins ALL=(ALL:ALL) NOPASSWD:ALL" >> /etc/sudoers
USER jenkins

# https://github.com/jenkinsci/docker

# docker run --name jenkins -d -p 8080:8080 -p 50000:50000 -v /var/jenkins_home:/var/jenkins_home jenkins/jenkins:lts

# если не будет прав на монтирование директории выполнить следующее

# docker run -p 8080:8080 -p 50000:50000 -it jenkins bin/bash

# id - должно показать примерно такое: uid=1000(jenkins) gid=1000(jenkins) groups=1000(jenkins)

# chown -R 1000:1000 .
