throttle(['throttleDocker']){
  node('docker') {
    try{
      wrap([$class: 'AnsiColorBuildWrapper']) {
        stage('Setup') {
          checkout scm
          sh '''./.ci/docker-up.sh'''
        }
        stage('Test'){
          parallel (
            "unit": {
              sh '''./.ci/test-unit.sh'''
            },
            "functional": {
              sh '''./.ci/test-functional.sh'''
            }
          )
        }
      }
    }
    finally {
      stage('Cleanup'){
        sh '''./.ci/docker-down.sh'''
      }
    }
  }
}
