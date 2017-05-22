pipeline {
    agent any
    stages {
        wrap([$class: 'org.boxboat.plugins.lxd.HelloWorldWrapper']) {
            stage('Test') {
                steps {
                    sh '''#!/bin/bash

                    echo "test"'''
                }
            }
            stage('Publish') {
                steps {
                    sh '''#!/bin/bash

                    echo "publish"'''
                }
            }
        }
    } 
}
