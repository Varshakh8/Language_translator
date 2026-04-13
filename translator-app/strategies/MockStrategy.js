const TranslationStrategy = require("./TranslationStrategy");

class MockStrategy extends TranslationStrategy {
    async translate(text) {
        return "Demo: " + text;
    }
}
module.exports = MockStrategy;