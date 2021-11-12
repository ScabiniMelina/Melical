import {
  databaseOperation
} from "./fetchRequest.js";

Promise.all([
  faceapi.nets.faceRecognitionNet.loadFromUri('/controller/helpers/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/controller/helpers/models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('/controller/helpers/models')
]).then(async () => {
  const labeledFaceDescriptors = await loadLabeledImages()
  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
  document.addEventListener('change', async (e) => {
    if (e.target.matches('#imageUpload')) {
      await startFacialRecognition(labeledFaceDescriptors, faceMatcher);
    }
  })
})

async function startFacialRecognition(labeledFaceDescriptors, faceMatcher) {
  const faceImageContainer = document.getElementById("faceImageContainer");
  // const imageUpload = document.getElementById('imageUpload');
  console.log("reconocimiento facial");

  let image
  let canvas
  if (image) image.remove()
  if (canvas) canvas.remove()
  image = await faceapi.bufferToImage(imageUpload.files[0])
  faceImageContainer.append(image)
  canvas = faceapi.createCanvasFromMedia(image)
  faceImageContainer.append(canvas)
  const displaySize = {
    width: image.width,
    height: image.height
  }
  faceapi.matchDimensions(canvas, displaySize)
  const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors()
  const resizedDetections = faceapi.resizeResults(detections, displaySize)
  const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
  results.forEach((result, i) => {
    const box = resizedDetections[i].detection.box
    const drawBox = new faceapi.draw.DrawBox(box, {
      label: result.toString()
    })
    drawBox.draw(canvas)
  })

}


function loadLabeledImages() {
  databaseOperation("get", "PatientWhitPhoto").then(labels => {
    console.log(labels)
  })

  const labels = ['Black Widow', 'Captain America', 'Captain Marvel', 'Hawkeye', 'Jim Rhodes', 'Thor', 'Tony Stark']
  return Promise.all(
    labels.map(async label => {
      const descriptions = []
      for (let i = 1; i <= 2; i++) {
        const img = await faceapi.fetchImage(`../../view/assets/img/patientFaces/${label}/${i}.jpg`)
        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
        descriptions.push(detections.descriptor)
      }

      return new faceapi.LabeledFaceDescriptors(label, descriptions)
    })
  )
}