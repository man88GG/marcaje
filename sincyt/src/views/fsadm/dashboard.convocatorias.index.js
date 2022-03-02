$(document).ready(function () {

});


function subirArchivo() {

    var metadata = {
            valor : 25,
            resultadoEsperado : "si",
            modulo : "RPE"
        };

    $('#formularioCarga').form('submit',{
            url : 'http://localhost:5000/apis/fsadm/upload?metadata=' + JSON.stringify(metadata) ,
            success : function (respuesta) {
                //var resultado = JSON.parse(respuesta);
               // console.log(respuesta);
            }
        });

}

