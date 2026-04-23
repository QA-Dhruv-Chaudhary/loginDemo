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
            // Archive report
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true

            script {
                def status = currentBuild.currentResult

                def message = ""
                if (status == "SUCCESS") {
                    message = "✅ All test cases passed successfully."
                } else if (status == "FAILURE") {
                    message = "❌ Some test cases failed. Please check the report."
                } else {
                    message = "⚠️ Build is unstable. Review required."
                }

                emailext (
                    subject: "${status == 'SUCCESS' ? '✅ Playwright Tests Passed' : '❌ Playwright Tests Failed'}",

                    body: """
🚀 Playwright Test Execution Report

━━━━━━━━━━━━━━━━━━━━━━
📌 Build Details
━━━━━━━━━━━━━━━━━━━━━━
🔹 Status       : ${status}
🔹 Job Name     : ${env.JOB_NAME}
🔹 Build Number : ${env.BUILD_NUMBER}

━━━━━━━━━━━━━━━━━━━━━━
📊 Execution Summary
━━━━━━━━━━━━━━━━━━━━━━
${message}

━━━━━━━━━━━━━━━━━━━━━━
🔗 View Report
━━━━━━━━━━━━━━━━━━━━━━
${env.BUILD_URL}artifact/playwright-report/index.html

━━━━━━━━━━━━━━━━━━━━━━
🙌 Thanks,
QA Automation Team
""",

                    to: "dhruvn1236@gmail.com",
                    attachmentsPattern: 'playwright-report/index.html'
                )
            }
        }
    }
}