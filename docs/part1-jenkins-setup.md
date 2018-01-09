# Part 1: Jenkins Setup

## Jenkins Master

1. Install Docker
```
curl -sSL https://get.docker.com/ | sh
```

2. Add `ubuntu` user to `docker` group
```
sudo usermod -aG docker ubuntu
newgrp docker
```

3. Run Jenkins container and tail logs
```
mkdir ~/jenkins
cd ~/jenkins
docker pull jenkins/jenkins:lts
docker run -d --name jenkins -p 8080:8080 -p 50000:50000 -v $(pwd):/var/jenkins_home --restart always jenkins/jenkins:lts
docker logs -f jenkins
```

4. Open web UI to jenkins and install following plugins:
- AnsiColor
- Blue Ocean
- Self-Organizing Swarm Plug-in Modules
- Throttle Concurrent Builds Plug-in

## Jenkins Agent

1. Install Docker
```
curl -sSL https://get.docker.com/ | sh
```

2. Add `ubuntu` user to `docker` group
```
sudo usermod -aG docker ubuntu
newgrp docker
```

3. Install `openjdk-8-jdk`
```
sudo apt install openjdk-8-jdk
```

4. Download Jenkins Swarm Client
```
sudo -s
mkdir -p /usr/local/jenkins
cd /usr/local/jenkins
wget https://repo.jenkins-ci.org/releases/org/jenkins-ci/plugins/swarm-client/3.7/swarm-client-3.7.jar
touch swarm.sh
chmod +x swarm.sh
```

5. Edit the file `/usr/local/jenkins/swarm.sh` so that it contains the following:
```
#!/bin/bash
cd $(dirname $0)

JENKINS_IP="10.0.0.1"
USERNAME="admin"
PASSWORD="12345678"

java -jar swarm-client-3.7.jar -name "$(hostname)" -executors 8 -labels docker -master "http://$JENKINS_IP:8080" -username "$USERNAME" -password "$PASSWORD" -fsroot /tmp
```

6. Edit the file `/etc/systemd/system/jenkins.service` so that it contains the following:
```
[Unit]
Description=Jenkins
After=network.target

[Service]
User=ubuntu
Restart=always
Type=simple
ExecStart=/usr/local/jenkins/swarm.sh

[Install]
WantedBy=multi-user.target
```

7. Start the service:
```
systemctl enable jenkins
systemctl start jenkins
```

8. Download docker-compose and vegeta binaries to `/usr/local`
```
cd /usr/local/bin
wget https://github.com/docker/compose/releases/download/1.13.0/docker-compose-Linux-x86_64
mv docker-compose* docker-compose
chmod +x docker-compose
wget https://github.com/tsenart/vegeta/releases/download/v6.3.0/vegeta-v6.3.0-linux-amd64.tar.gz
tar xf *.gz
rm *.gz
```
