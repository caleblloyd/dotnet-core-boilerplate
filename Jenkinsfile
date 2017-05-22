pipeline {
    agent any
    stages {
        stage('Test') {
            steps {
                wrap([$class: 'org.boxboat.plugins.lxd.HelloWorldWrapper']) {
                    sh '''
                    ls /tmp
                    cat /tmp/jenkins'''
                }
            }
        }
        stage('Publish') {
            steps {
                wrap([$class: 'org.boxboat.plugins.lxd.HelloWorldWrapper']) {
                    sh '''
                    ls /tmp
                    cat /tmp/jenkins'''
                }
            }
        }
    } 
}
