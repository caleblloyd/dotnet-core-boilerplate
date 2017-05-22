pipeline {
    agent any
    stages {
        stage('Test') {
            steps {
                wrap([$class: 'org.boxboat.plugins.lxd.HelloWorldWrapper']) {
                    sh '''#!/bin/bash

                    echo "test"'''
                }
            }
        }
        stage('Publish') {
            steps {
                wrap([$class: 'org.boxboat.plugins.lxd.HelloWorldWrapper']) {
                    sh '''#!/bin/bash

                    echo "publish"'''
                }
            }
        }
    } 
}
