var canvasUtils = function() {
    this.canvasSupport = canvasSupport;

    function canvasSupport() {
        return !!document.createElement('canvas').getContext;
    }
}
