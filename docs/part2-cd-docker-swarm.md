# Part 2: Continuous Deployment to Docker Swarm

First, setup a 2-node Docker swarm.  These instructions assume that systemd is used to manage services.

## Docker Swarm Manager Setup

1. Install Docker Swarm
```
curl -sSL https://get.docker.com/ | sh
```

2. Initialize Docker Swarm.  Make note of the `docker swarm join` instructions that are listed (this can be accessed at any time by running `docker swarm join-token worker` on a swarm manager.
```
docker swarm init
```

3. Expose Docker TCP Socket.  Run `sudo systemctl edit docker` and paste the following: (replace `0.0.0.0` with internal IP address if this node has a public IP address)
```
[Service]
ExecStart=
ExecStart=/usr/bin/dockerd -H tcp://0.0.0.0:2375 -H unix:///var/run/docker.sock
```

4. Restart Docker service and check that it is running
```
sudo systemctl restart docker
sudo systemctl status docker
```

## Docker Swarm Worker Setup

1. Install Docker Swarm
```
curl -sSL https://get.docker.com/ | sh
```

2. Join the Swarm using the instructions from the swarm manager.
```
docker swarm join --token [token] [swarm manager ip]:2377
```

## Initialize the Docker Swarm

From the repository root, run the following:

```
cd cd/swarm/
export DOCKER_HOST=tcp://[swarm manager ip]:2375
./init.sh
```

## Continuous Deployment through Jenkins

1. Switch to the `cd-docker-swarm` branch in the repository

2. Login to your Jenkins Build Agent and authenticate to your Docker registry using `docker login [registry]`

3. Edit the `Jenkinsfile` - under the `Deploy to Docker Swarm` stage, update the registry URL to point at your Docker registry and update the `DOCKER_HOST` to point at your Docker Swarm manager.

4. Run Jenkins Blue Ocean against the `cd-docker-swarm` branch to deploy to your Docker Swarm
