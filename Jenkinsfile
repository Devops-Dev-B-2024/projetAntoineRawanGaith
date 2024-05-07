pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                // Installe les dépendances Node.js
                sh 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                // Exécute les tests avec npm
                sh 'npm test'
            }
        }
        stage('Deploy') {
            steps {
                sh 'echo "Déploiement de l\'application"'
            }
        }
    }

    // Ajoutez des options de post-build, comme les notifications par e-mail, si nécessaire
    post {
        always {
            // Envoie une notification par e-mail
            emailext (
                subject: "Notification de Build - ${currentBuild.result}",
                body: "La build ${env.BUILD_NUMBER} de votre projet a ${currentBuild.result == 'SUCCESS' ? 'réussi' : 'échoué'}.",
                to: "Benhadighaith@gmail.com"
            )
        }
    }
}


