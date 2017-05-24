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
    stage('Publish') {
      steps {
        sh '''hostname
date
echo "publish"'''
      }
    }
  }
}
