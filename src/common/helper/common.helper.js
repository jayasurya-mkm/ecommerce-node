
function multerCustomeFilePathMaker(files, removerPath = 'src/public') {
    return 'http://localhost:9000' + files[0].destination.replace(removerPath, '') +'/'+ files[0].filename;
}

module.exports = {
    multerCustomeFilePathMaker
}