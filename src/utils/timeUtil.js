let startTime;
let isRunning = false;

export function startTimer(req, res) {
  if (isRunning) {
    return res.status(400).send({ message: '타이머가 이미 실행 중입니다.' });
  }

  isRunning = true;
  startTime = new Date();

  res.status(201).send({ message: '타이머 시작', startTime });
}

export function stopTimer() {
  if (!isRunning) {
    return { message: '타이머가 실행되지 않았습니다.' };
  }
  isRunning = false;
  const endTime = new Date();
  const elapsedMilliseconds = endTime.getTime() - startTime.getTime();
  const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);

  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;

  const formattedTime = `${String(minutes).padStart(2, '0')}분 ${String(seconds).padStart(2, '0')}초`;

  return { elapsedSeconds, elapsedTime: formattedTime };
}
