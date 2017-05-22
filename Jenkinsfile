pipeline {
    agent any
    stages {
        stage('Test') {
            steps {
                node {
                    wrap([$class: 'org.boxboat.plugins.lxd.HelloWorldWrapper']) {
                        sh '''cat /tmp/jenkins'''
                    }
                }
            }
        }
        stage('Publish') {
            steps {
                node {
                    wrap([$class: 'org.boxboat.plugins.lxd.HelloWorldWrapper']) {
                        sh '''cat /tmp/jenkins'''
                    }
                }
            }
        }
    } 
}
