pipeline {
  agent {
    node {
      label 'docker'
    }
    
  }
  stages {
    stage('Test') {
      steps {
        sh '''hostname
docker run --rm docker/whalesay cowsay test'''
      }
    }
    stage('Publish') {
      steps {
        sh '''hostname
docker run --rm docker/whalesay cowsay publish'''
      }
    }
  }
}