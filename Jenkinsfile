pipeline {
  agent any
  wrap([$class: 'HelloWorldBuilder']) {
    stages {
      stage('Test') {
        steps {
          sh '''#!/bin/bash

  ./.ci/test.sh'''
        }
      }
      stage('Publish') {
        steps {
          sh '''#!/bin/bash

  ./.ci/publish.sh'''
        }
      }
    }
  }
}
