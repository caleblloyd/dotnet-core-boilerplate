pipeline {
  agent {
    docker {
      image 'alpine'
    }
    
  }
  stages {
    stage('Test') {
      steps {
        node(label: 'docker') {
          sh '''ls /tmp
echo "test"'''
        }
        
      }
    }
    stage('Publish') {
      steps {
        node(label: 'docker') {
          sh '''ls /tmp
echo "publish"'''
        }
        
      }
    }
  }
}