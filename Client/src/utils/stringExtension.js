String.prototype.replaceWhitespaceWithLine = function () {
    return this.replace(/\s+/g, '-');
};