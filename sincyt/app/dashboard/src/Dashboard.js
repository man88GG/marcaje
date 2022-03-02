import React, {Component} from 'react';

//Componentes
import {
    Navbar,
    Dropdown,
    Form,
    Nav,
    Image,
    Card, Container, NavbarBrand,
} from "react-bootstrap";


import {
    Button,
    Snackbar,
    Grid,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Fab,
    TextField,
    CircularProgress,
    Divider,
    Checkbox,
    CardMedia
}
from "@material-ui/core";


import{
    Alert,
    AlertTitle,
    Autocomplete,
}
from "@material-ui/lab";

import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider
} from "@material-ui/pickers";

import DateFnsUtils from '@date-io/date-fns';

// Archivos e imagenes
import './Dashboard.css';
import 'react-notifications/lib/notifications.css';
import  logoSen  from "./raw/img/salida2.svg";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import FilterList from '@material-ui/icons/FilterList';
import DetalleConvocatoria from "./DetalleConvocatoria";
import {NavbarText} from "react-bootstrap/Navbar";
import {Footer} from "react-materialize";

//Globales
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const url_base = 'https://api.senacyt.gob.gt';

class TableroConvocatorias extends Component{

    constructor() {
        super();
        this.state = {
            abiertoFiltros: false,
            conexionFallida: false,
            textoConexionFallida : "",
            lineasFinanciamiento: [],
            programasFonacyt: [{nombre: 'Programa1'}, {nombre: 'Programa2'}],
            // fechaInicio: (new Date()),
            // fechaFin: (new Date()),
            fechaInicio : "",
            fechaFin : '',
            cargandoConvocatorias : true,
            convocaotoriasContenido : [],
            valordeSegundoInput : "",
            estadoListadoGeneral : true,
            estadoDetalleConvocatoria : false,
            convocatoriaSeleccionada : false,
            idBusquedaFiltro : -1,
            filtroPrograma : -1,
            filtroLinea : -1,
            errorFiltros : false,
            textoErrorFiltros : ''
        }
        ;
        this.cargarInformacion();
        this.cargaInformacionProgramas();
    }

    cambioFecha = (fecha) => {
        this.setState( state => ({
            fechaInicio : new Date(fecha)
        }))
    }

    cambioFecha2 = (fecha) => {

        this.setState( state => ({
            fechaFin : new Date(fecha)
        }))

        /*
        this.state.fechaFin.setHours(0,0,0,0);
        this.state.fechaInicio.setHours(0,0,0,0);

        if(this.state.fechaInicio.getTime() === this.state.fechaFin.getTime()){
            alert("Mismo dia")
        }else if(this.state.fechaInicio < fecha.getTime()){

        }
        */
    }

    abrirFiltros = () => {
        this.setState( state => ({
            abiertoFiltros: true
        }))
    }

    cerrarFiltros = () => {
        this.setState(state => ({
            abiertoFiltros: false,
            lineasFinanciamiento: [],
            valordeSegundoInput: "",
            filtroPrograma: -1,
            filtroLinea: -1,
            fechaInicio: '',
            fechaFin: ''
        }));
    }

    notificacionConexionFallidaShow = () => {
        this.setState(state => ({
            conexionFallida: true
        }));
    }

    notificacionConexionFallidaClose = () => {
        this.setState(state => ({
            conexionFallida: false
        }));
    }

    accionRender1 = () => {
        console.log("probanbdo");
    }

    TextFieldComponent = (props) => {
        return <TextField {...props} disabled={true} readOnly={true} style={{textAlign:"center"}}/>
    }

    busquedaPorFiltro = () => {

        const fecha_inicio = new Date(this.state.fechaInicio);
        fecha_inicio.setHours(0,0,0,0);
        const fecha_final = new Date(this.state.fechaFin);
        fecha_final.setHours(0,0,0,0);

        let init = fecha_inicio.getFullYear() + "-" + (fecha_inicio.getMonth() + 1) + "-" + fecha_inicio.getDate();
        let fins = fecha_final.getFullYear() + "-" + (fecha_final.getMonth() + 1) + "-" + fecha_final.getDate();

        if(fecha_inicio <= fecha_final || ( this.state.fechaInicio == this.state.fechaFin && this.state.fechaFin == "")){

            const url = url_base +  ':8080/apis/dash/listadoConvocatoriasFiltrado?inicio=' + init + '&fin=' + fins + '&programa=' + this.state.filtroPrograma + '&linea=' + this.state.filtroLinea;

            fetch(url)
                .then(res => res.json())
                .then(result => {

                    let resultadosConsultaComponentes = [];
                    for( let i = 0 ; i < result.length; i = i + 1){
                        resultadosConsultaComponentes.push(this.crearNuevaConvocatoriaComponente(result[i]));
                    }
                    this.setState(state => ({
                        abiertoFiltros: false,
                        lineasFinanciamiento: [],
                        valordeSegundoInput: "",
                        filtroPrograma: -1,
                        filtroLinea: -1,
                        fechaInicio: '',
                        fechaFin: ''
                    }));


                    this.setState( state => ({
                        convocaotoriasContenido: resultadosConsultaComponentes,
                    }));

                })
                .catch(error => {
                    this.setState(state => ({
                        textoErrorFiltros:  'Error, no se pudo realizar la conexión con el servidor.',
                        errorFiltros:  true
                    }));
                });


        }else{

            this.setState(state => ({
                textoErrorFiltros:  'Error, fecha inicial debe ser menor que la fecha final.',
                errorFiltros:  true
            }));
        }


    }

    crearNuevaConvocatoriaComponente = ( objectoConvocatoria ) => {
        return (
            <Grid item lg={3} md={5} xs={12} sm={6}  key={objectoConvocatoria.numeroConvocatoria}>
                <Card style={{ height: 'auto' }}>
                    <Card.Img variant="top" src={logoSen} style={{ height: 'auto', width : '90%', marginBottom : -10, backgroundColor : 'transparent'}} />
                    <Card.Body style={{ height: 'auto' }}>
                        <Card.Subtitle>Convocatoria { objectoConvocatoria.numero_convocatoria }</Card.Subtitle>
                        <Card.Text>{ objectoConvocatoria.nombre }</Card.Text>
                        <hr/>
                        <Card.Text style={{ height: '13vh', overflow: 'hidden'}}>
                           <i>{ objectoConvocatoria.descripcion }</i>
                        </Card.Text>
                        <hr style={{marginBottom:"0px"}}/>
                        <Button variant={"outlined"} onClick={ () => { this.mostrarDetalleConvocatoria(objectoConvocatoria.numero_convocatoria) } } fullWidth style={{marginBottom:"0.5rem", marginTop : '0.5rem'}}>Más información</Button>
                        <div className="card-footer">
                            <small className="text-muted"><b>Fecha inicio:</b> { objectoConvocatoria.fecha_inicio.split('T')[0] }</small> - <small className="text-muted"><b>Fecha fin:</b> { objectoConvocatoria.fecha_fin.split('T')[0] }</small>
                        </div>
                    </Card.Body>
                </Card>
            </Grid>
        );
    }

    mostrarDetalleConvocatoria = (numeroConvocatoria) => {

        this.setState(state => ({
            estadoListadoGeneral : false,
            estadoDetalleConvocatoria :  true,
            convocatoriaSeleccionada:  numeroConvocatoria
        }));
    }

    cargaInformacionProgramas(){

        const url = url_base + ':8080/apis/dash/listadoProgramasFonacyt';
        fetch(url)
            .then((res) => res.json())
            .then((result) => {
                this.setState(state => ({
                    programasFonacyt: result
                }));
            })
            .catch((error) => {
                console.log(error);
            });

    }

    cargaInformacionLineasFinanciamiento = (evento, linea) => {

        this.setState(state => ({
            filtroPrograma: linea.id_linea
        }));

        if(linea === null){
            this.setState(state => ({
                lineasFinanciamiento: [],
                valordeSegundoInput: ""
            }));
        }
        else{
            const url = url_base + ':8080/apis/dash/listadoLineasFinanciamiento?id=' +linea.id_linea;
            const respuesta = fetch(url)
                .then((res) => res.json())
                .then((result) => {
                    this.setState(state => ({
                        lineasFinanciamiento: result,
                        valordeSegundoInput: ""
                    }));
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    cargarInformacion (){

        const url = url_base + ':8080/apis/dash/listadoConvocatorias';

        fetch(url)
            .then((response) => response.json())
            .then((result) => {
                this.setState( state => ({
                    cargandoConvocatorias: false
                }));
                let resultadosConsultaComponentes = [];
                for( let i = 0 ; i < result.length; i = i + 1){
                    resultadosConsultaComponentes.push(this.crearNuevaConvocatoriaComponente(result[i]));
                }

                console.log("------->")
                console.log(result.length);
                console.log("------->")

                this.setState( state => ({
                    convocaotoriasContenido: resultadosConsultaComponentes
                }));
            })
            .catch( (error) => {
                this.setState( state => ({
                    cargandoConvocatorias: false
                }));
                alert(error);
                this.setState(state => ({
                    conexionFallida: true
                }));
                return(
                    {
                        error : error,
                        estado : 440
                    }
                );
            });

    }

    render(){
        return (
            <div className="Dashboard">
                <Navbar expand="lg" className="navPrincipal" fixed={"top"} >
                    <Navbar.Brand href="/">
                        <Image src={logoSen} height={"50"} className= "d-inline-block align-top"/>{' '}
                        {/*<Navbar.Text>Convocatorias FONACYT</Navbar.Text>*/}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav" className="navSecundario">
                        <Nav className="mr-auto">
                            <Form>
                                <Button href="/" variant={"text"} fullWidth={true}>Convocatorias Fonacyt</Button>
                            </Form>
                            <Dropdown.Divider/>
                            <Form inline>
                                <Button href="https://it.senacyt.gob.gt/portal/" fullWidth={true}>Información</Button>
                            </Form>
                            <Dropdown.Divider/>
                        </Nav>
                        <Form inline>
                            {/*<FormControl type="text" placeholder="Buscar texto" className="mr-sm-2"/>*/}
                            <Button href="https://senacyt.gob.gt">Secretaria Nacional de Ciencia y Tecnología</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
                <main className="mainPrincipal">
                    <Snackbar
                        id="snackBarNotificacion"
                        open={this.state.conexionFallida}
                        onClose={this.notificacionConexionFallidaClose}
                        autoHideDuration={5000}
                        anchorOrigin={ { vertical : 'bottom', horizontal : 'center' }}
                        style={{ textAlign : 'left'}}
                    >
                        <Alert severity="error" variant={"filled"}>
                            <AlertTitle style={{ textAlign:"left"}}>Error</AlertTitle>
                            Esperando respuesta de servidor, el servidor no responde....
                            <p>{ this.state.textoConexionFallida }</p>
                        </Alert>
                    </Snackbar>

                    <Navbar fixed={"bottom"} expand={"sm"} className="footerPequeño">
                        <p style={{fontSize : '10px', fontWeight:'bold'}}>@SENACYT - 2020</p>
                    </Navbar>
                    {/*
                    <footer style={{ position : 'absolute', bottom: '0', width:'100%' }}>
                        <p>@SENACYT - 2020</p>
                    </footer>
                    */}
                    <React.Fragment key={'left'}>
                        <Drawer id={'barraFiltrosLateral'} anchor={'left'}  style={{ width : '50vh'}} open={this.state.abiertoFiltros} onClose={ this.cerrarFiltros /*() => { this.setState( state => ({ abiertoFiltros: false}))}*/}>
                            <List className={'container'}>
                                <ListItem>
                                    <FilterList/>
                                    Filtros de Busqueda
                                </ListItem>
                                <Divider/>
                                <ListItemText style={{marginLeft:'1rem'}}>
                                    <b>Programas:</b>
                                </ListItemText>
                                <ListItem>
                                    <Autocomplete
                                        id="combo-box-demo1"
                                        renderOption={(option, { selected }) => (
                                            <React.Fragment >
                                                <Checkbox
                                                    icon={icon}
                                                    checkedIcon={checkedIcon}
                                                    style={{ marginRight: 8, fontSize : '10px' }}
                                                    checked={selected}
                                                />
                                                {option.nombre + " - " + option.acronimo }
                                            </React.Fragment>
                                        )}
                                        size={"small"}
                                        onChange={this.cargaInformacionLineasFinanciamiento}
                                        options={this.state.programasFonacyt}
                                        getOptionLabel={option => option.nombre}
                                        style={{ width: 300, fontSize : 7 }}
                                        renderInput={params => <TextField {...params} label="Programas" variant="outlined"  />}
                                    />
                                </ListItem>
                                <Divider/>
                                <ListItemText style={{marginLeft:'1rem'}}>
                                    <b>Lineas de Financimiento:</b>
                                </ListItemText>
                                <ListItem>
                                    <Autocomplete
                                        id="combo-box-demo2"
                                        renderOption={(option, { selected }) => (
                                            <React.Fragment>
                                                <Checkbox
                                                    icon={icon}
                                                    checkedIcon={checkedIcon}
                                                    style={{ marginRight: 8 }}
                                                    checked={selected}
                                                />
                                                {option.nombre  + " - " + option.acronimo}
                                            </React.Fragment>
                                        )}
                                        size={"small"}
                                        options={this.state.lineasFinanciamiento}
                                        inputValue={this.state.valordeSegundoInput}
                                        onChange={ (evento, valor ) => {
                                            this.setState(state => ({
                                                valordeSegundoInput : valor !== null ? valor.nombre : "",
                                                idBusquedaFiltro: valor !== null ? valor.id_linea : -1,
                                                filtroLinea: valor.id_linea
                                        })) }}
                                        getOptionLabel={option => option.nombre}
                                        style={{ width: 300 }}
                                        renderInput={params => <TextField {...params} label="Lineas" variant="outlined" />}
                                    />
                                </ListItem>
                                <Divider/>
                                <ListItemText style={{marginLeft:'1rem'}}>
                                    <b>Rango de Fecha:</b>
                                </ListItemText>
                                <ListItem style={{justifyContent:'center'}}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <List>
                                            <ListItem>
                                                <KeyboardDatePicker
                                                    format="dd/MM/yyyy"
                                                    margin="normal"
                                                    id="date-picker-inline1"
                                                    label="Fecha Inicio:"
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                    style={{textAlign:'center'}}
                                                    value={this.state.fechaInicio}
                                                    onChange={this.cambioFecha}
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <KeyboardDatePicker
                                                    format="dd/MM/yyyy"
                                                    margin="normal"
                                                    id="date-picker-inline2"
                                                    label="Fecha final:"
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                    style={{textAlign:'center'}}
                                                    value={this.state.fechaFin}
                                                    onChange={this.cambioFecha2}
                                                />
                                            </ListItem>
                                        </List>
                                    </MuiPickersUtilsProvider>
                                </ListItem>
                                <Divider/>
                                <ListItem style={{justifyContent:"center"}}>
                                    <Snackbar
                                        id="snackBarNotificacion"
                                        open={ this.state.errorFiltros }
                                        onClose={ () => { this.setState( state => ({ errorFiltros : false })) }}
                                        autoHideDuration={5000}
                                        anchorOrigin={ { vertical : 'bottom', horizontal : 'center' }}
                                        style={{ textAlign : 'left'}}
                                    >
                                        <Alert severity="warning" variant={"filled"}>
                                            <AlertTitle style={{ textAlign:"left"}}>Error</AlertTitle>
                                            { this.state.textoErrorFiltros }
                                        </Alert>
                                    </Snackbar>
                                    <Button color={"primary"} variant={"contained"} onClick={this.busquedaPorFiltro}>Buscar por Filtro</Button>
                                </ListItem>
                                <Divider>
                                </Divider>
                            </List>
                        </Drawer>
                    </React.Fragment>
                    { this.state.estadoDetalleConvocatoria && <DetalleConvocatoria convocatoria={this.state.convocatoriaSeleccionada} /> }
                    { this.state.estadoListadoGeneral &&
                    <div className="divTablero" align={"center"} id={"tableroConvocatoriasDIV"}>
                        <Fab size={"small"} color={"default"}  variant="extended" style={{marginTop: '0.5rem', backgroundColor:"white"}}
                             onClick={this.abrirFiltros /*()=>{this.setState(state => ({ abiertoFiltros: true }))}*/}>
                            <FilterList/>
                            Filtros de Busqueda
                        </Fab>
                        <br/>
                        <br/>
                        {this.state.cargandoConvocatorias && <CircularProgress style={{  color : 'orange' }} value={100}/>}

                        <div className="divIntermedioConvocatorias">
                            <Grid container direction={"row"} spacing={5} alignItems={"center"} justify={"center"} style={{flexGrow: 1, width : '100%', height : '100%'}}>
                                {
                                    true && this.state.convocaotoriasContenido
                                }
                            </Grid>
                        </div>
                    </div>
                    }
                </main>
            </div>

    );
    }

}

export default TableroConvocatorias;