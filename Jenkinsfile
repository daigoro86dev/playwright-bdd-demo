#!/usr/bin/groovy
import groovy.json.JsonOutput

pipeline {
    options {
        buildDiscarder(logRotator(numToKeepStr: '5'))
        timeout(time: 30, unit: 'MINUTES')
    }
    // agent { docker { image 'mcr.microsoft.com/playwright:v1.46.0-jammy' } }
    agent none
    environment {
        NODE_ENV = "${env.NODE_ENV}"
        PW_PROJECT= "${env.PW_PROJECT}"
        PW_WORKERS = "${env.PW_WORKERS}"
        PW_SHARDS = "${env.PW_SHARDS}"
        PW_TAG = "${env.PW_TAG}"
        PW_SCREENSHOT_ON_FAIL = "${env.PW_SCREENSHOT_ON_FAIL}"
        TR_DOMAIN = "${env.TR_DOMAIN}"
        TR_USERNAME = "${env.TR_USERNAME}"
        TR_PASSWORD = "${env.PASSWORD}"
        USE_ALLURE = 1
    }
    stages {
        // stage("Install Node Dependencies"){
        //     steps {
        //         script {
        //             echo sh(script: "npm i --no-fund --no-audit --omit=dev")
        //         }
        //     }
        // }
        // stage("Execute bddgen"){
        //     steps {
        //         script {
        //             echo sh(script: "npx bddgen")
        //         }
        //     }
        // }
        // stage("Run PlayWright tests"){
        //     steps {
        //         script {
        //             parallel executeTestParallel()
        //         }
        //     }
        // }
        stage("Send TR report"){
            agent {
                docker { image 'python:3.12-slim-bookworm' }
            }
            steps {
                script {
                    echo sh("curl -LsSf https://astral.sh/uv/install.sh | sh")
                    echo sh("uv python install 3.12")
                    // sendReportToTestRail()
                }
            }
        }    
    }
    post {
        always {
            archiveArtifacts artifacts: 'results.xml', followSymlinks: false
            // archiveArtifacts artifacts: 'allure-results/*', followSymlinks: false
            // script {
            //     ws("$workspace/") {
            //         allure([
            //             includeProperties: false,
            //             jdk: '',
            //             properties: [],
            //             reportBuildPolicy: 'ALWAYS',
            //             results: [
            //                 [path: 'allure-results']
            //             ]
            //         ])
            //     }
            // }
            sendReportToTestRail()
            cleanWs()
        }
    }
}

String getTestCommand(String shard) {
    return "npx playwright test --workers=${env.PW_WORKERS} --shard=${shard}/${env.PW_SHARDS} --grep \"^(?=.*@${env.PW_TAG})\" --project=${env.PW_PROJECT}"
}

void executeTestParallel() {
    def tests = [:]
    for (int i = 1; i <= env.PW_SHARDS.toInteger(); i++) {
        def command = getTestCommand("${i}")
        def stageName = "Shard ${i}"
        tests[command] = { 
            stage("${env.PW_TAG} - ${stageName}") {
                echo sh(script: "${command}")
            }
        }
    }
    return tests
}

void sendReportToTestRail(){
    echo sh(script: "uvx trcli -y -h '${TR_DOMAIN}' --project 'Demo Project' --username '${TR_USERNAME}' --password '${TR_PASSWORD}' parse_junit --title 'Playwright Automated Demo Test Run' -f './results.xml'")
}
