node {
  label 'docker'
  wrap([$class: 'AnsiColorBuildWrapper']) {
    stage('Setup') {
        checkout scm
        sh '''hostname
date
./.ci/docker-up.sh'''
      }
    stage('Test'){
      parallel (
        "unit": {
          sh '''hostname
date
ls -al
ls -al .ci
./.ci/test-unit.sh'''
        },
        "funcional": {
          sh '''hostname
date
ls -al
ls -al .ci
./.ci/test-functional.sh'''
        }
      )
    }
    stage('Publish') {
      sh '''hostname
date
echo "publish"'''
    }
  }
}
