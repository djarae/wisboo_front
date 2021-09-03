// React
import React, { useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
 import Button from '@material-ui/core/Button';
 import Grid from '@material-ui/core/Grid';
 import { Container } from '@material-ui/core';
// Styles
import "./App.css";
//Unit Functions
import { formatingValue } from './functions/formatingValue';

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
                  question_type: "",
                  text: "",
                  options: []
              }
            ]
        }
      });

    const classes        = useStyles();
//JS
  //FUNCTIONS
      const items = []
      inicilizateOptions()

      

      function inicilizateOptions(){
        for (let i=0;i<jsonEncuesta.form.questions[0].options.length;i++) {

          items.push( <tr>
            <td>
              OPCION 1
            </td>
            <td> 
              <input type="text" name="X" />
            </td>
        </tr>)
        }
        
      }

      function addOption(){
       let jsonAux= {
          form: {
              id : 0,
              name: "",
              description: "",
              questions: [{
                    id: 0,
                    question_type: "",
                    text: "",
                    options: ["Option1"]
                }
              ]
          }
        }
        setJsonEncuesta( jsonAux);
       
        inicilizateOptions()
        console.log("opcion anadida")

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
                    <input type="text" name="txtTitulo" />
                  </td>
              </tr>
              <tr>
                  <td>
                    Descripcion 
                  </td>
                  <td> 
                   <input type="text" name="txtDescripcion" />
                  </td>
              </tr>
          </table>
         <form className="questionForm"> 
              <table>
                  <tr>
                      <td>
                        Tipo de pregunta 
                      </td>
                      <td> 
                        <input type="text" name="txtTipoPregunta" />
                      </td>
                  </tr>
                  <tr>
                      <td>
                        Pregunta 
                      </td>
                      <td> 
                          <input type="text" name="txtPregunta" />
                      </td>
                  </tr>
              </table>
              <form className="optionsForm"> 


                  <table>
                       {items}
                  </table>
                  <button type="button"   onClick={() => addOption()} >Agregar Opcion</button>
                  <button type="button">Guardar Pregunta</button>
             </form>
             <button type="button">Agregar Pregunta</button>
         </form>
         <button type="button">Crear Encuesta</button>
       </Container>
        <Container className={classes.container}>
            <h1> TITULO DE ENCUESTA</h1>
            <h1> Descripcion encuesta</h1>
        </Container>
      </Grid>
  );
}

// export default withAuthenticator(App);
export default App;
