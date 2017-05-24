node {
  label 'docker'
  wrap([$class: 'AnsiColorBuildWrapper']) {
    stage('Setup') {
        sh '''hostname
date
./.ci/docker-up.sh'''
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
      sh '''hostname
date
echo "publish"'''
      }
    }
}
