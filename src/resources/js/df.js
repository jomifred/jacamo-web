/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
RETRIEVE DATA FROM DIRECTORY FACILITATOR
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

/*Get DF */
function getDF() {
  var df = "[{\"agent\":\"ag1\",\"services\":[\"s1\",\"s2\"]},{\"agent\":\"ag2\",\"services\":[\"s2\",\"s3\"]}]";
  const Http = new XMLHttpRequest();
  Http.open("GET", "./services");
  Http.send();
  Http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      df = JSON.parse(Http.responseText);
      updateDFTable(df);
    }
  };
};

function updateDFTable(df) {
  var table = document.getElementById("dftable");

  for (var i = 0; i < df.length; i++) {
    for (var j = 0; j < df[i].services.length; j++) {
      var tr = table.insertRow(-1);
      var cellAgent = tr.insertCell(-1);
      var cellService = tr.insertCell(-1);
      cellAgent.innerHTML = df[i].agent;
      cellService.innerHTML = df[i].services[j];
    }
  }

}