pipeline {
    agent any
    stages {
        stage('Test') {
            steps {
                wrap([$class: 'HelloWorldWrapper']) {
                    sh '''#!/bin/bash

                    echo "test"'''
                }
            }
        }
        stage('Publish') {
            steps {
                wrap([$class: 'HelloWorldWrapper']) {
                    sh '''#!/bin/bash

                    echo "publish"'''
                }
            }
        }
    } 
}
