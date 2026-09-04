pipeline {
    agent any

    environment {
        CI = 'true'
        // Disable interactive prompts during browser install
        DEBIAN_FRONTEND = 'noninteractive'
       
        BASE_URL="https://demoqa.com"
        API_URL="https://reqres.in"
        USERNAME = credentials('demoqa-username')
        PASSWORD = credentials('demoqa-password')
        REQRES_API_KEY = credentials('reqres-api-key')
    }

    options {
        timeout(time: 30, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '10'))
        ansiColor('xterm')
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing project dependencies...'
                sh 'npm ci || npm install'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                echo 'Installing Playwright browsers...'
                sh 'npx playwright install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                echo 'Executing Playwright automation tests...'
                // Run tests using npm script
                sh 'npm test'
            }
        }

        stage('Generate Allure Report') {
            steps {
                script {
                    echo 'Generating Allure Report...'
                    sh 'npm run allure:generate || true'
                }
            }
        }
    }

    post {
    always {
        echo 'Archiving build artifacts and reports...'

        archiveArtifacts(
            artifacts: 'playwright-report/**, allure-results/**, allure-report/**, test-results/**',
            allowEmptyArchive: true
        )

        script {
            // Publish Playwright HTML Report
            try {
                publishHTML([
                    allowMissing: true,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Test Report'
                ])
            } catch (Exception e) {
                echo "Playwright HTML report skipped: ${e.message}"
            }

            // Publish Allure HTML Report
            try {
                publishHTML([
                    allowMissing: true,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'allure-report',
                    reportFiles: 'index.html',
                    reportName: 'Allure Report'
                ])
            } catch (Exception e) {
                echo "Allure HTML report skipped: ${e.message}"
            }
        }
    }

    success {
        echo '✅ Pipeline execution completed successfully!'
    }

    failure {
        echo '❌ Pipeline execution failed. Please inspect test results and logs.'
    }
}
}
