function canvasApp() {
    var theCanvas = document.getElementById("canvasOne");

    if (!theCanvas || !theCanvas.getContext) {
        return;
    }

    var context = theCanvas.getContext("2d");

    drawScreen();

    function drawScreen() {
        // 화면에 큰 사각형을 그린다.
        context.fillStyle = "black";
        context.fillRect(10, 10, 200, 200);

        // globalCompositeOperation 값은 그대로 둔다.
        // 빨간색 사각형을 그린다.
        context.fillStyle = "red";
        context.fillRect(1, 1, 50, 50);

        // source-over로 설정한다.
        context.globalCompositeOperation = "source-over";

        // 옆에 빨간색 사각형을 그린다.
        context.fillRect(60, 1, 50, 50);

        // destination-atop으로 설정한다.
        context.globalCompositeOperation = "destination-over";
        context.fillRect(1, 60, 50, 50);

        // globalAlpha를 설정한다.
        context.globalAlpha = .5;

        // source-atop으로 설정한다.
        context.globalCompositeOperation = "source-atop";
        context.fillRect(60, 60, 50, 50);
    }
}
