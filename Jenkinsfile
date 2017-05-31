throttle(['throttleDocker']) {
  node('docker') {
    wrap([$class: 'AnsiColorBuildWrapper']) {
      try{
        stage('Setup') {
          checkout scm
          sh '''./ci/docker-up.sh'''
        }
        stage('Test'){
          parallel (
            "unit": {
              sh '''./ci/test/unit.sh'''
            },
            "functional": {
              sh '''./ci/test/functional.sh'''
            }
          )
        }
        stage('Capacity Test') {
          sh '''./ci/test/stress.sh'''
        }
      }
      finally {
        stage('Cleanup') {
          sh '''./ci/docker-down.sh'''
        }
      }
    }
  }
}
