pipeline {
  agent {
    node {
      label 'docker'
    }
  }
  stages {
    stage('Test') {
      steps {
        wrap([$class: 'AnsiColorBuildWrapper']) {
          sh '''hostname
date
./.ci/docker-up.sh'''
          parallel(
            "Unit": {
              sh '''hostname
date
./.ci/test-unit.sh'''
            },
            "Functional": {
              sh '''hostname
date
./.ci/test-functional.sh'''              
            }
          )
        }
      }
    }
    stage('Publish') {
      steps {
        wrap([$class: 'AnsiColorBuildWrapper']) {
          sh '''hostname
  date
  echo "publish"'''
        }
      }
    }
  }
}
