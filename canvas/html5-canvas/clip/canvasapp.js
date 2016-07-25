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
        context.save();
        context.beginPath();

        // 0,0을 시작점으로 하는 가로, 세로 50인 사각형 영역을 선택한다.
        // context.rect(0, 0, 50, 50);
        context.arc(0, 0, 100, (Math.PI / 180) * 0, (Math.PI / 180) * 360, false)
        context.clip();

        // 빨간색 원 그리기
        context.beginPath();
        context.strokeStyle = "red"; // 표준 색상 이름 사용
        context.lineWidth = 5;
        context.arc(100, 100, 100, (Math.PI / 180) * 0, (Math.PI / 180) * 360, false);

        // 원 그리기
        context.stroke();
        context.closePath();
        context.restore();

        // 전체 캔버스를 영역으로 선택한다.
        context.beginPath();
        context.rect(0, 0, 500, 500);
        context.clip();

        // 파란색 원을 그린다.
        context.beginPath();
        context.strokeStyle = "blue"; // 표준 색상 이름 사용
        context.lineWidth = 5;
        context.arc(100, 100, 50, (Math.PI / 180) * 0, (Math.PI / 180) * 360, false);

        // 원 그리기
        context.stroke();
        context.closePath();
    }
}
