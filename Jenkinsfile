pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/QA-Dhruv-Chaudhary/loginDemo.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npx playwright test'
            }
        }
    }

    post {
        always {
            // Report archive karega Jenkins me
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true

            // Email bhejega
            emailext (
                subject: "Playwright Build: ${currentBuild.currentResult}",
                body: """
                Hi,

                Build Status: ${currentBuild.currentResult}
                Job Name: ${env.JOB_NAME}
                Build Number: ${env.BUILD_NUMBER}

                Check attached Playwright report.

                Thanks
                """,
                to: "dhruvn1236@gmail.com",
                attachmentsPattern: 'playwright-report/**'
            )
        }
    }
}