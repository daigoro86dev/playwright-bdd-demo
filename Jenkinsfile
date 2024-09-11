#!/usr/bin/groovy
import groovy.json.JsonOutput

pipeline {
    agent { docker { image 'daigoro86dev/playwright-bdd-docker:latest' } }
    environment {
        NODE_ENV = "${env.NODE_ENV}"
        PW_PROJECT= "${env.PW_PROJECT}"
        PW_WORKERS = "${env.PW_WORKERS}"
        PW_SHARDS = "${env.PW_SHARDS}"
        PW_TAG = "${env.PW_TAG}"
        PW_SCREENSHOT_ON_FAIL = "${env.PW_SCREENSHOT_ON_FAIL}"
        TR_DOMAIN = "${env.TR_DOMAIN}"
        TR_USERNAME = "${env.TR_USERNAME}"
        TR_PASSWORD = "${env.TR_PASSWORD}"
        TR_TITLE = "${env.TR_TITLE}"
        USE_ALLURE = 1
        PLAYWRIGHT_JUNIT_OUTPUT_NAME="junit_results/results.xml"
    }
    stages {
        stage("Install dependencies"){
            steps {
                sh 'pnpm i --prod'
            }
        }
        stage("Execute bddgen"){
            steps {
                sh 'pnpm run bddgen'
            }
        }
        stage("Run PlayWright tests"){
            steps {
                script {
                    parallel executeTestParallel()
                }
            }
        }    
    }
    post {
        always {
            sendReportToTestRail()
            cleanWs()
        }
    }
}

String getTestCommand(String shard) {
    return "pnpm exec playwright test --workers=${env.PW_WORKERS} --shard=${shard}/${env.PW_SHARDS} --grep \"^(?=.*@${env.PW_TAG})\" --project=${env.PW_PROJECT}"
}

void executeTestParallel() {
    def tests = [:]
    for (int i = 1; i <= env.PW_SHARDS.toInteger(); i++) {
        def command = getTestCommand("${i}")
        def stageName = "Shard ${i}"
        tests[command] = { 
            stage("${env.PW_TAG} - ${stageName}") {
                sh "${command}"
            }
        }
    }
    return tests
}

void sendReportToTestRail(){
    sh "pnpm exec playwright merge-reports --reporter junit ./blob-report"
    sh "uvx trcli -y -h '${TR_DOMAIN}' --project 'Demo Project' --username '${TR_USERNAME}' --password '${TR_PASSWORD}' parse_junit --title '${TR_TITLE}' -f './${PLAYWRIGHT_JUNIT_OUTPUT_NAME}'"
}
