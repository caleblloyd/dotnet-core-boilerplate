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
                wrap([$class: 'HelloWorldWrapper']) {
                    sh '''#!/bin/bash

                    ./.ci/publish.sh'''
                }
            }
        }
    } 
}
