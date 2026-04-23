pipeline {
    agent any

    parameters {
        string(name: 'RECIPIENT_EMAIL', defaultValue: '', description: 'Enter recipient email')
    }

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
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true

            script {
                def status = currentBuild.currentResult
                def recipientEmail = params.RECIPIENT_EMAIL?.trim()

                def message = status == "SUCCESS" 
                    ? "✅ All test cases passed successfully."
                    : "❌ Some test cases failed. Please check the report."

                if (recipientEmail) {
                    emailext (
                        subject: "${status == 'SUCCESS' ? '✅ Playwright Passed' : '❌ Playwright Failed'}",

                        body: """
🚀 Playwright Test Report

Status       : ${status}
Job Name     : ${env.JOB_NAME}
Build Number : ${env.BUILD_NUMBER}

""",

                        to: recipientEmail,
                        attachmentsPattern: 'playwright-report/JenkinsAction.html'
                    )
                } else {
                    echo '❌ No email entered. Skipping email.'
                }
            }
        }
    }
}