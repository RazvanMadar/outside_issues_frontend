const callHttpMethod = (httpCall, callback) => {
  fetch(httpCall)
    .then(function (res) {
      if (res.ok) {
          res.json().then((data) => callback(data, res.status, null));
      } else {
          res.json().then((error) => callback(null, res.status, error));
      }
    })
    .catch(function (error) {
      callback(null, 1, error);
    });
};

const callBlobMethod = (httpCall, callback) => {
    fetch(httpCall)
        .then(function (res) {
            if (res.ok) {
                res.blob().then((data) => callback(data, res.status, null));
            } else {
                res.blob().then((error) => callback(null, res.status, error));
            }
        })
        .catch(function (error) {
            callback(null, 1, error);
        });
}

export default {
    callHttpMethod, callBlobMethod
};
