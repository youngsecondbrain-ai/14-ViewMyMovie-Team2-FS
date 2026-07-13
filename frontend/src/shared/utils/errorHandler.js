import { getRandomPosterImage } from './selectionUtils.js'

function handlePosterError(event) {
  // 현재 img 요소의 에러 핸들러를 제거해 대체 이미지 실패 시 반복 실행을 방지
  event.currentTarget.onerror = null
  event.currentTarget.src = getRandomPosterImage()
}

export { handlePosterError }
