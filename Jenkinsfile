pipeline {
  agent {
    node {
      label 'docker'
    }
  }
  stages {
    stage('Start') {
      steps {
        wrap([$class: 'AnsiColorBuildWrapper']) {
          sh '''hostname
  date
  ./.ci/docker-up.sh'''
        }
      }
    }
    stage('Test') {
      steps {
        wrap([$class: 'AnsiColorBuildWrapper']) {
          sh '''hostname
  date
  ./.ci/test.sh'''
        }
      }
    }
  }
}
