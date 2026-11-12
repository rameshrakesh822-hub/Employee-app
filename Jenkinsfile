

pipeline {
    agent any

    stages {
        stage('Build Docker Image') {
            steps {
                sh '''
                docker build -t employeeapp:${BUILD_NUMBER} -f Dockerfile .
                docker tag employeeapp:${BUILD_NUMBER} employeeapp:latest
                '''
            }
        }

        stage('Deploy Website') {
            steps {
                sh '''
                docker stop employeeapp || true
                docker rm employeeapp || true

                docker run -d \
                --name employeeapp \
                -p 80:80 \
                employeeapp:${BUILD_NUMBER}
                '''
            }
        }
    }
}
