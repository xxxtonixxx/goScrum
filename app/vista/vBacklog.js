/*
      .__              __________                __   .__                 
___  _|__| ______  _  _\______   \_____    ____ |  | _|  |   ____   ____  
\  \/ /  |/ __ \ \/ \/ /|    |  _/\__  \ _/ ___\|  |/ /  |  /  _ \ / ___\ 
 \   /|  \  ___/\     / |    |   \ / __ \\  \___|    <|  |_(  <_> ) /_/  >
  \_/ |__|\___  >\/\_/  |______  /(____  /\___  >__|_ \____/\____/\___  / 
              \/               \/      \/     \/     \/          /_____/
*/
var vBacklog = (function() {
    'use strict';
    // Aquí sólo iría los métodos para pintar lo que le lleguen.
    return {
        init: function() {
            var btnNewHistoria = document.getElementById("btnNewHistoria");
            var btnCancel = document.getElementById("btnCancel");
            
            btnNewHistoria.addEventListener("click", vBacklog.acciones.showFormNewHistoria);
            btnCancel.addEventListener("click",vBacklog.acciones.hideForm);
            
            console.log("Vista rulando");
        },
        acciones: {
            addHistoria: function(historia) {
                var divHistorias = document.getElementById("divHistoriasUsuario"); 
                var nodeHistoria = vBacklog.acciones.drawHistoria(historia);
                divHistorias.appendChild(nodeHistoria);
            },
            removeHistoria: function(historia) {
                var nodeHistoria = document.getElementById(historia.getID());
                var divHistorias = document.getElementById("divHistoriasUsuario");
                divHistorias.removeChild(nodeHistoria);
            },
            updateHistoria: function(newNodeHistoria,oldID) {
                console.log(oldID);
                var oldNodeHistoria = document.getElementById(oldID);
                var padre = oldNodeHistoria.parentNode;
                padre.replaceChild(newNodeHistoria, oldNodeHistoria)
            },
            drawHistoria: function drawHistoria(historia) {
                var id = historia.getID();
                var domObject = document.createElement("div");
                domObject.setAttribute("class", "historia");
                domObject.setAttribute("id", id);
                domObject.innerHTML = "<ul>"+
                                            "<li>nombre = <span class='idHU'>"+historia.getID()+"</span></li>"+
                                            "<li>valor = <span class='valorHU'>"+historia.getValor()+"</span></li>"+
                                            "<li>coste = <span class='costeHU'>"+historia.getCoste()+"</span></li>"+
                                            "<li>descripcion = <span class='descripcionHU'>"+historia.getDescripcion()+"</span></li>"+
                                        "</ul>"+
                                        "<button id='btnUpdateHU"+historia.getID()+"' onclick='vBacklog.acciones.showFormUpdateHistoria(this.parentNode)'>Modificar</button>"+
                                        "<button id='btnRemoveHU"+historia.getID()+"' onclick='bBacklog.eventos.tryRemoveHistoria(this.parentNode)'>Borrar</button>";
                return domObject;
            },
            getHistoriaFromNode: function(nodeHistoria) {
                var id = nodeHistoria.getElementsByClassName("idHU")[0].innerHTML,
                    descripcion = nodeHistoria.getElementsByClassName("descripcionHU")[0].innerHTML,
                    valor = nodeHistoria.getElementsByClassName("valorHU")[0].innerHTML,
                    coste = nodeHistoria.getElementsByClassName("costeHU")[0].innerHTML;
               
                console.log("ID de la historia eliminada: " + id);
                
                return new HistoriaUsuario(id, descripcion, valor,coste);
            },
            getHistoriaFromForm: function() {
                var txtNombre = document.getElementById("txtID").value,
                    txtCoste = document.getElementById("txtCoste").value,
                    txtValor = document.getElementById("txtValor").value,
                    txtDesc = document.getElementById("txtDesc").value;
                
                var historia = new HistoriaUsuario(txtNombre, txtDesc, txtValor,txtCoste);
                return historia;
            },
            getOldID: function(){
                return document.getElementById("oldID").innerHTML;
            },
            showFormNewHistoria: function() {
                document.getElementById("btnReset").click();
                document.getElementById("txtID").focus();
                var form = document.getElementById("formulario");
                var btnApply = document.getElementById("btnApply");
                var formulario = document.getElementById("formNewHistoria");
                var divFondo = document.getElementById("fondo");
                form.onsubmit = bBacklog.eventos.tryAddHistoria;
                btnApply.setAttribute("onclick", "");
                formulario.setAttribute("class","drawFormWhenNewHistoria");
                divFondo.setAttribute("class","drawBackgroundWhenNewHistoria");
            },
            showFormUpdateHistoria: function(nodeHistoria){
                console.log(document.getElementById("btnReset"));
                var oldID = nodeHistoria.getAttribute("id");
                var form = document.getElementById("formulario");
                var formulario = document.getElementById("formNewHistoria");
                var divFondo = document.getElementById("fondo");
                form.onsubmit = bBacklog.eventos.tryUpdateHistoria;
                
                var nodeOldID = document.getElementById("oldID");
                nodeOldID.innerHTML = oldID;
                console.log(oldID+" en vBacklog");
                
                formulario.setAttribute("class","drawFormWhenNewHistoria");
                divFondo.setAttribute("class","drawBackgroundWhenNewHistoria");          
               
                document.getElementById("txtID").value = nodeHistoria.getElementsByClassName("idHU")[0].innerHTML;
                document.getElementById("txtCoste").value = nodeHistoria.getElementsByClassName("costeHU")[0].innerHTML;
                document.getElementById("txtValor").value = nodeHistoria.getElementsByClassName("valorHU")[0].innerHTML;
                document.getElementById("txtDesc").value = nodeHistoria.getElementsByClassName("descripcionHU")[0].innerHTML;
                
            },
            hideForm: function() {
                var formulario = document.getElementById("formNewHistoria");
                var divFondo = document.getElementById("fondo");
                formulario.setAttribute("class","hidden");
                divFondo.setAttribute("class","hidden");
            }
        }
    };
})();