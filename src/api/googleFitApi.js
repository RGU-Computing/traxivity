import GoogleFit, { Scopes } from 'react-native-google-fit'

export function getSteps(options, i, callback) {
  GoogleFit.getDailyStepCountSamples(options)
    .then((res) => {
      var result = res.filter(obj => obj.source === "com.google.android.gms:estimated_steps")[0].steps
      callback(result, i)
    })
    .catch((err) => {console.warn(err)})
}

export function getCals(options, callback) {
  GoogleFit.getDailyCalorieSamples(options, (err, res) => {
    callback(res)
  })
}

export function getDists(options, callback) {
  GoogleFit.getDailyDistanceSamples(options, (err, res) => {
    callback(res)
  })
}