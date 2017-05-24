pipeline {
  stages {
    node {
      label 'docker'
      wrap([$class: 'AnsiColorBuildWrapper']) {
        stage('Setup') {
          steps {  
            sh '''hostname
    date
    ./.ci/docker-up.sh'''
          }
        }
        stage('Test'){
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
        stage('Publish') {
          steps {
            sh '''hostname
    date
    echo "publish"'''
          }
        }
      }
    }
  }
}
