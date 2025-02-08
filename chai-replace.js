const fs = require('fs');
const path = require('path');

// Dossier des tests
const testDir = path.join(__dirname, 'test');

// Recherche récursive de tous les fichiers .js dans test/
function getTestFiles(dir) {
    let files = [];
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            files = files.concat(getTestFiles(fullPath));
        } else if (file.endsWith('.js')) {
            files.push(fullPath);
        }
    });
    return files;
}

// Fonction pour calculer le bon chemin relatif vers `chai-wrapper.js`
function getRelativePath(filePath) {
    // Trouver le nombre de niveaux de profondeur
    const depth = path.relative(testDir, filePath).split(path.sep).length - 1;

    // Si le fichier est directement dans `test/`, chemin direct
    if (depth === 0) {
        return './chai-wrapper.js';
    }

    // Construire le bon chemin pour les fichiers plus profonds
    return '../'.repeat(depth) + 'chai-wrapper.js';
}

// Fonction de remplacement des imports de chai
function replaceChaiImports(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Vérifier si le fichier contient `require('chai')`
    if (content.includes("require('chai')")) {
        console.log(`📌 Mise à jour : ${filePath}`);

        // Supprimer toutes les anciennes références à `chai`
        content = content.replace(/require\(['"]chai['"]\).use\(require\(['"]chai-as-promised['"]\)\);?/g, '');
        content = content.replace(/const { (.*)?expect(.*)? } = require\(['"]chai['"]\);?/g, '');
        content = content.replace(/const chai = require\(['"]chai['"]\);?/g, '');

        // Déterminer le bon chemin relatif
        const relativePath = getRelativePath(filePath);
        const chaiImport = `const chai = require('${relativePath}');\nchai.then(loadedChai => { global.expect = loadedChai.expect; global.assert = loadedChai.assert; });\n`;

        // Trouver la ligne où `require('mocha')` est présent
        const lines = content.split('\n');
        const mochaIndex = lines.findIndex(line => line.includes("require('mocha')"));

        if (mochaIndex !== -1) {
            // Insérer juste après `require('mocha')`
            lines.splice(mochaIndex + 1, 0, chaiImport);
        } else {
            // Si `require('mocha')` n'est pas trouvé, insérer en haut du fichier
            lines.unshift(chaiImport);
        }

        // Réécrire le fichier avec les modifications
        content = lines.join('\n');
        fs.writeFileSync(filePath, content, 'utf8');
    }
}

// Appliquer le remplacement à tous les fichiers test/
const testFiles = getTestFiles(testDir);
testFiles.forEach(replaceChaiImports);

console.log('✅ Tous les fichiers ont été mis à jour.');
