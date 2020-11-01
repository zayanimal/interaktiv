FROM jenkins:1.596

USER root
RUN apt-get update \
      && apt-get install -y sudo \
      && rm -rf /var/lib/apt/lists/*
RUN echo "jenkins ALL=NOPASSWD: ALL" >> /etc/sudoers

USER jenkins

# https://github.com/jenkinsci/docker

# docker run --name jenkins -d -p 8080:8080 -p 50000:50000 -v /var/jenkins_home:/var/jenkins_home jenkins/jenkins:lts

# если не будет прав на монтирование директории выполнить следующее

# docker run -p 8080:8080 -p 50000:50000 -it jenkins bin/bash

# id - должно показать примерно такое: uid=1000(jenkins) gid=1000(jenkins) groups=1000(jenkins)

# chown -R 1000:1000 .
