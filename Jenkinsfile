throttle(['throttleDocker']){
  node('docker') {
    try{
      wrap([$class: 'AnsiColorBuildWrapper', 'colorMapName': 'xterm']) {
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
  ./.ci/test-unit.sh'''
            },
            "funcional": {
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
    finally {
      sh '''hostname
  date
  ./.ci/docker-down.sh'''
    }
  }
}

