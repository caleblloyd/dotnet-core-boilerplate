pipeline {
  agent {
    node {
      label 'docker'
    }
    
  }
  stages {
    stage('Test1') {
      steps {
        parallel(
          "Test1": {
            sh '''hostname
date
docker run --rm docker/whalesay cowsay test1'''
            
          },
          "Test2": {
            sh '''hostname
date
docker run --rm docker/whalesay cowsay test2'''
            
          }
        )
      }
    }
    stage('Publish') {
      steps {
        sh '''hostname
date
docker run --rm docker/whalesay cowsay publish'''
      }
    }
  }
}