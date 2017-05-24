node {
  label 'docker'
  wrap([$class: 'AnsiColorBuildWrapper']) {
  stage('Setup') {
      sh '''hostname
date
./.ci/docker-up.sh'''
    }
    stage('Publish') {
      sh '''hostname
date
echo "publish"'''
    }
  }
}
