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
        node {
          sh '''hostname
date
./.ci/test-unit.sh'''
        },
        node {
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
