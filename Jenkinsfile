pipeline {
    agent any
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
