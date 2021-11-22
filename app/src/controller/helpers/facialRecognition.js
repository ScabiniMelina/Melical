import {
  databaseOperation
} from "./fetchRequest.js";

function showProgressBar(e) {
  try {
    const input = e.target;
    const progressBar = document.querySelector(input.dataset.progressBar);
    const progressBarContainer = progressBar.parentNode;
    const files = input.files;
    let amountProgress = 0;
    let totalSizeToLoad = 0;
    for (let file of files) {
      totalSizeToLoad += file["size"];
    }
    progressBar.style.width = `0%`;
    if (files.length < 1) {
      progressBarContainer.classList.add('d-none');
    } else {
      progressBarContainer.classList.remove('d-none');
    }

    for (let file of files) {
      let reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.addEventListener("progress", (e) => {
        let progress = Math.round(((amountProgress + e.loaded) * 100.0) / totalSizeToLoad);
        console.log(progress);
        progressBar.style.width = `${progress}%`
      })
    }
  } catch (error) {
    console.log('error ' + error);
  }
}

Promise.all([
  faceapi.nets.faceRecognitionNet.loadFromUri('/controller/helpers/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/controller/helpers/models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('/controller/helpers/models')
]).then(async () => {
  const labeledFaceDescriptors = await loadLabeledImages()
  const faceMatcher = await new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
  const input = document.querySelector('#imageUpload');
  const spinerContainer = document.querySelector('#spinnerContainer');
  spinerContainer.parentNode.removeChild(spinerContainer);
  input.classList.remove('d-none');
  document.addEventListener('change', async (e) => {
    if (e.target.matches('#imageUpload')) {
      showProgressBar(e)
      await startFacialRecognition(labeledFaceDescriptors, faceMatcher);
    }
  })
})

async function startFacialRecognition(labeledFaceDescriptors, faceMatcher) {
  const faceImageContainer = document.getElementById("faceImageContainer");
  faceImageContainer.innerHTML = "";
  console.log("Activando reconocimiento facial");
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

async function getLabels() {
  const imageFolder = await databaseOperation("get", "PatientWhitPhoto")
  return imageFolder;
}

async function loadLabeledImages() {
  labels = await getLabels();
  return Promise.all(
    Object.entries(labels).map(async label => {
      const descriptions = []

      for (let imageName of label[1]) {
        console.log(imageName)
        const img = await faceapi.fetchImage(`/view/assets/img/patientFaces/${label[0]}/${imageName}`)
        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
        descriptions.push(detections.descriptor)

      }
      return new faceapi.LabeledFaceDescriptors(label[0], descriptions)
    })
  )
}