pipeline {
  agent {
    node {
      label 'docker'
    }
  }
  stages {
    wrap([$class: 'AnsiColorBuildWrapper']) {
      stage('Start') {
        steps {
          sh '''hostname
  date
  ./.ci/docker-up.sh'''
        }
      }
      stage('Test') {
        steps {
          sh '''hostname
  date
  ./.ci/test.sh'''
        }
      }
    }
  }
}