pipeline {
  agent {
    docker {
      image 'alpine'
    }
    
  }
  stages {
    stage('Test') {
      steps {
        sh '''
                    ls /tmp
                    cat /tmp/jenkins'''
      }
    }
    stage('Publish') {
      steps {
        sh '''
                    ls /tmp
                    cat /tmp/jenkins'''
      }
    }
  }
}