// React
import React, { useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
 import Button from '@material-ui/core/Button';
 import Grid from '@material-ui/core/Grid';
 import { Container } from '@material-ui/core';
 import cloneDeep from 'lodash/cloneDeep';
import {postEncuesta} from './functions/httpFunctions';

// Styles
import "./App.css";
//Unit Functions

function App() {
//Css
  //Styles
    const useStyles = makeStyles({
      button: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
      },
      grid: {
        background: 'linear-gradient(45deg, #552586 30%, #804FB3 90%)',
        height    : "1000px",
        width     : "100%",

      },
      container: {
        height    : "400px",
        width     : "50%"
      }
    });

//Hooks
    const [jsonEncuesta, setJsonEncuesta] = useState({
        form: {
            id : 0,
            name: "",
            description: "",
            questions: [{
              id: 0,
              question_type: "xd",
              text : "Ingrese  los datos de su primera pregunta par aeste cuestionario",
              options: ["Valor Base Option"]
            }
            ]
        }
      });

    const classes        = useStyles();

//JS
  //FUNCTIONS
      let itemsQuestions = []
      let questionsRealT = []

      inicializateQuestions()
      realTQuestions()


      function realTQuestions(){

        for (let i=0;i<jsonEncuesta.form.questions.length;i++) {

          let optionsRealT = []

            for (let j=0;j<jsonEncuesta.form.questions[i].options.length;j++){
                    optionsRealT.push(<tr>
                      <td>
                            <h1> {jsonEncuesta.form.questions[i].options[j]}</h1>
                      </td>
                  </tr>)
            }

          questionsRealT.push(
            <table>
              <tr>
                  <td>
                        <h1> {jsonEncuesta.form.questions[i].text}</h1>
                  </td>
              </tr>
                      {optionsRealT}
          </table>
            
          )
        }
      }

      function inicializateQuestions(){
        for (let i=0;i<jsonEncuesta.form.questions.length;i++) {

          let itemsOptions = []
          for (let j=0;j<jsonEncuesta.form.questions[i].options.length;j++) {
            itemsOptions.push(
              <tr>
                  <td>
                       OPCION {j} : 
                  </td>
                  <td>
                         <input type="text" name={"QuestionID="+i+"?OptionID:"+j+"$"} onChange={(e) => actualizarEncuesta(e)} />
                  </td>
              </tr>
            )
          }




          // inicializateOptions(i)
          itemsQuestions.push(
          <table>
            <tr>
                <td>
                  Tipo de pregunta
                </td>
                <td>
                  <input type="text" name={i+"question_type_txt"} onChange={(e) => actualizarEncuesta(e)} />
                </td>
            </tr>
            <tr>
                <td>
                  Pregunta
                </td>
                <td>
                    <input type="text" name={i+"text_txt"} onChange={(e) => actualizarEncuesta(e)}/>
                </td>
            </tr>
          
              {itemsOptions}


            <tr>
                <td>
                    <button type="button" onClick={() => addOption(i)} >Agregar Opcion</button>
                </td>
            </tr>
         
        </table>)
        }
      }

      function addQuestion(){
        let  jsonAux = JSON.parse(JSON.stringify(jsonEncuesta));
        let idNewQuestion =    jsonAux.form.questions.length
        jsonAux.form.questions.push({
          id: idNewQuestion,
          question_type: "question_type Base",
          text: "text Base Pregunta",
          options: []
        })
         setJsonEncuesta(jsonAux);
         inicializateQuestions(idNewQuestion)
     }



     function addOption(idQuestion){
      let  jsonAux = JSON.parse(JSON.stringify(jsonEncuesta));
      let idNewOption =    jsonAux.form.questions[idQuestion].options.length
      jsonAux.form.questions[idQuestion].options.push("Option Text Base ID:  "+idNewOption)
       setJsonEncuesta(jsonAux);
      //  inicializateQuestions(idNewQuestion)
       console.log(jsonAux)
   }

       function actualizarEncuesta(event){
        const name = event.target.name;
        const value = event.target.value;


        let jsonAux = JSON.parse(JSON.stringify(jsonEncuesta));

        if (name=="txtTitulo"){
          jsonAux.form.name = value

        }
        if (name=="txtDescripcion"){
          jsonAux.form.description = value
        }

        if (name.indexOf("question_type")>(-1)){
          let ubicacion = name.indexOf("question_type")
          let index=     parseInt(name.substring(0,ubicacion))
          jsonAux.form.questions[index].question_type = value
          realTQuestions()
        }


        console.log("el name es"+name)
        if (name.indexOf("text_txt")>(-1)){
          let ubicacion = name.indexOf("text_txt")
          let index=     parseInt(name.substring(0,ubicacion))
          console.log("el index es "+index)
          jsonAux.form.questions[index].text = value
          realTQuestions()
        }


        if (name.indexOf("=")>(-1)){
          let inicioIDQuestion = name.indexOf("=")
          let finIDQuestion = name.indexOf("?")
          let indexQuestion=     parseInt(name.substring(inicioIDQuestion+1 ,finIDQuestion+1))

     
          let inicioIDOption = name.indexOf(":")
          let finIDOption = name.indexOf("$")
          let indexOption=     parseInt(name.substring(inicioIDOption+1,finIDOption+1))
        

          console.log("el index question es "+indexQuestion)
          console.log("el index option es "+indexOption)


          jsonAux.form.questions[indexQuestion].options[indexOption]= value
          // realTQuestions()
        }




        setJsonEncuesta( jsonAux);

        console.log(jsonEncuesta)

       }




       

//HTML
  return (
      <Grid container spacing={250} className={classes.grid}>
        <Container className={classes.container}>
          <h1> CREACION DE ENCUESTA</h1>
          <table>
              <tr>
                  <td>
                    Titulo
                  </td>
                  <td>
                    <input type="text" name="txtTitulo" onChange={(e) => actualizarEncuesta(e)} />
                  </td>
              </tr>
              <tr>
                  <td>
                    Descripcion
                  </td>
                  <td>
                   <input type="text" name="txtDescripcion" onChange={(e) => actualizarEncuesta(e)}  />
                  </td>
              </tr>
          </table>
         <form className="questionForm">
              {itemsQuestions}
         </form>
         <button type="button" onClick={() => addQuestion(jsonEncuesta)} >Agregar Pregunta</button>
         <p></p>
         <button type="button"  onClick={() => postEncuesta(JSON.parse(JSON.stringify(jsonEncuesta)))}>Guardar Encuesta</button>
       </Container>
        <Container className={classes.container}  >
          <form className="previewForm" >
            <h1> {jsonEncuesta.form.name}</h1>
            <h1> {jsonEncuesta.form.description}</h1>
            <form>
                {questionsRealT}
            </form>
          </form >
        </Container>
      </Grid>
  );
}

// export default withAuthenticator(App);
export default App;
