pipeline {
    agent any

    environment {
        CI = 'true'
        // Disable interactive prompts during browser install
        DEBIAN_FRONTEND = 'noninteractive'
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
                echo 'Installing Playwright browser binaries and system dependencies...'
                // Install browser binaries and OS dependencies required for headless browser execution
                sh 'npx playwright install --with-deps'
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
            // Built-in Jenkins artifact archiving
            archiveArtifacts artifacts: 'playwright-report/**, allure-results/**, allure-report/**, test-results/**', allowEmptyArchive: true

            script {
                // Publish Playwright HTML Report (requires HTML Publisher Plugin)
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
                    echo "HTML Publisher plugin step skipped or not available: ${e.message}"
                }

                // Publish Allure Report (requires Allure Jenkins Plugin)
                try {
                    allure([
                        includeProperties: false,
                        jdk: '',
                        properties: [],
                        reportBuildPolicy: 'ALWAYS',
                        results: [[path: 'allure-results']]
                    ])
                } catch (Exception e) {
                    echo "Allure Jenkins plugin step skipped or not available: ${e.message}"
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
