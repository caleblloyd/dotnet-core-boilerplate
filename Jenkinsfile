wrap([$class: 'org.boxboat.plugins.lxd.HelloWorldWrapper']) {
    pipeline {
        agent any
        stages {
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
