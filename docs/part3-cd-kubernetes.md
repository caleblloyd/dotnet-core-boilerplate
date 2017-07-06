# Part 3: Continuous Deployment to Kubernetes

## Kubernetes Setup

We recommend that you use a managed Kubernetes installation.  Some options are:

- [MiniKube](https://github.com/kubernetes/minikube)
- [Cannonical Distribution of Kubernetes](https://www.ubuntu.com/containers/kubernetes)

## Continuous Deployment through Jenkins

1. Switch to the `cd-kubernetes` branch in the repository

2. Login to your Jenkins Build Agent and authenticate to your Docker registry using `docker login [registry]`

3. [Install Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/#install-kubectl-binary-via-curl) on your Jenkins build agent.

4. Put your kubernetes credentials into `~/.kube/config` on your Jenkins agent.  Ensure that the command `kubectl get deployments` works on your Jenkins Agent

5. Edit the `Jenkinsfile` - under the `Deploy to Kubernetes` stage, update the registry URL to point at your Docker registry.

6. Run Jenkins Blue Ocean against the `cd-kubernetes` branch to deploy to your Docker Swarm
