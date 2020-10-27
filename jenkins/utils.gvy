def checkDirectoryChanges(path) {
    try {
        sh "git diff --quiet --exit-code HEAD~1..HEAD ${path}/"
        echo 'Без сборки так как в директории нет изменений'
        return false
    } catch (err) {
        return true
    }
}
