# https://github.com/jenkinsci/docker

# docker run --name jenkins -d -p 8080:8080 -p 50000:50000 -v /var/jenkins_home:/var/jenkins_home jenkins/jenkins:lts

# если не будет прав на монтирование директории выполнить следующее

# docker run -p 8080:8080 -p 50000:50000 -it jenkins bin/bash

# id - должно показать примерно такое: uid=1000(jenkins) gid=1000(jenkins) groups=1000(jenkins)

# chown -R 1000:1000 .



# https://medium.com/@schogini/running-docker-inside-and-outside-of-a-jenkins-container-along-with-docker-compose-a-tiny-c908c21557aa

# docker run --name jenkins -itd -e JENKINS_USER=$(id -u) \
# --log-opt max-size=1g \
# -v /var/run/docker.sock:/var/run/docker.sock \
# -v /var/jenkins_home:/var/jenkins_home \
# -v $(which docker):/usr/bin/docker \
# -p 8080:8080 -p 50000:50000  \
# -u root \
# jenkins/jenkins:lts