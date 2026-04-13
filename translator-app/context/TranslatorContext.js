class TranslatorContext {

    constructor(strategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy) {
        this.strategy = strategy;
    }

    async translate(text, source, target) {
        return this.strategy.translate(text, source, target);
    }
}

module.exports = TranslatorContext;