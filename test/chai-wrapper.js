async function loadChai() {
    try {
        const chaiModule = await import('chai');
        const chaiAsPromisedModule = await import('chai-as-promised');

        const chai = chaiModule.default !== undefined ? chaiModule.default : chaiModule;
        const chaiAsPromised = chaiAsPromisedModule.default !== undefined ? chaiAsPromisedModule.default : chaiAsPromisedModule;  

        if (chai && chai.use) {
            chai.use(chaiAsPromised);
        }

        return chai;
    } catch (error) {
        console.error('❌ Erreur lors du chargement de chai:', error);
        throw error;
    }
}

module.exports = loadChai();
