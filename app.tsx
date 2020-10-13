declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');

pt = {};
pt.bday = null;
pt.family_name = null;
pt.gender = null;
pt.given_name = null;

var _round = function(val, dec){ return Math.round(val*Math.pow(10,dec))/Math.pow(10,dec); }

function getPath(obj, path) {
  var out = obj;
  $.each(path.split("."), function(i, key) {
    out = out ? out[key] : undefined;
  });
  return out;
}

var get_demographics = function(){
  return $.Deferred(function(dfd){
    patient.read().then(function(patient){
      pt.given_name = patient.name[0].given.join(" ");
      pt.family_name = patient.name[0].family.join(" ");
      pt.gender = patient.gender;
      pt.bday = patient.birthDate;
      dfd.resolve();
    })
  }).promise();
};

FHIR.oauth2.ready(function(smart){
  window.smart = smart;
  window.patient = smart.patient;
  $.when(
     get_demographics()
  )
  .then(function(){
    // main demo info
    $('.family_name').text(pt.family_name)
    $('.given_name').text(pt.given_name)
    $('.birthday').text(pt.bday)
    var b = new XDate(pt.bday)
    $('.age').text(Math.round(b.diffYears(new XDate())));
    $('.gender').text(pt.gender[0])
    $('.date_and_time').text(XDate().toString('MM/dd/yy hh:mmtt'))

    $('#bp_date_ps').text(pt.sbp ? new XDate(pt.sbp[0]).toString('MM/dd/yy') : '')
    $('#ldl_date_ps').text(pt.ldl ? new XDate(pt.ldl[0]).toString('MM/dd/yy') : '')
    $('#a1c_date_ps').text(pt.a1c ? new XDate(pt.a1c[0]).toString('MM/dd/yy') : '')
  };

export class Hello extends React.Component {
    render() {
        return (
            <h1>Welcome to React!! { pt.given_name }</h1>
        );
    }
}

ReactDOM.render(<Hello />, document.getElementById('root'));
