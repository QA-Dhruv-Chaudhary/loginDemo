pipeline {
    agent any

    parameters {
        string(name: 'RECIPIENT_EMAIL', defaultValue: '', description: 'Enter recipient email')
    }

    environment {
        RECIPIENT_EMAIL = "${env.RECIPIENT_EMAIL}"
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
            // Archive report
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true

            script {
                def status = currentBuild.currentResult
                def recipientEmail = params.RECIPIENT_EMAIL?.trim()
                if (!recipientEmail) {
                    recipientEmail = env.RECIPIENT_EMAIL?.trim()
                }

                def message = ""
                if (status == "SUCCESS") {
                    message = "✅ All test cases passed successfully."
                } else if (status == "FAILURE") {
                    message = "❌ Some test cases failed. Please check the report."
                } else {
                    message = "⚠️ Build is unstable. Review required."
                }

                bat '''
                    if exist "playwright-report\\index.html" (
                        copy /Y "playwright-report\\index.html" "playwright-report\\Jenkins-Testo.html"
                    )
                '''

                if (recipientEmail) {
                    emailext (
                        subject: "${status == 'SUCCESS' ? '✅ Playwright Tests Passed' : '❌ Playwright Tests Failed'}",

                        body: """
🚀 Playwright Test Execution Report

━━━━━━━━━━━━━━━━━━━━━━
📌 Build Details
━━━━━━━━━━━━━━━━━━━━━━
🔹 Status       : ${status}
🔹 Sent Using   : Jenkins

━━━━━━━━━━━━━━━━━━━━━━
📊 Execution Summary
━━━━━━━━━━━━━━━━━━━━━━
${message}

━━━━━━━━━━━━━━━━━━━━━━
🙌 Thanks,
QA Automation Team
""",

                        to: recipientEmail,
                        attachmentsPattern: 'playwright-report/Jenkins-Testo.html'
                    )
                } else {
                    echo 'RECIPIENT_EMAIL is not set. Skipping email notification.'
                }
            }
        }
    }
}