pipeline {
  agent {
    node {
      label 'docker'
    }
    
  }
  stages {
    stage('Test') {
      steps {
        sh 'docker run --rm docker/whalesay cowsay test'
      }
    }
    stage('Publish') {
      steps {
        sh 'docker run --rm docker/whalesay cowsay publish'
      }
    }
  }
}